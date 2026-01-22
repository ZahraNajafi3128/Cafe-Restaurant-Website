<?php
header('Content-Type: application/json; charset=utf-8');
session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log');

function respond(int $code, array $payload) {
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}
function dlog($msg, $data=null) {
    $line = "[".date('Y-m-d H:i:s')."] ".$msg;
    if ($data !== null) $line .= " | " . print_r($data, true);
    $line .= PHP_EOL;
    file_put_contents(__DIR__ . '/checkout_debug.log', $line, FILE_APPEND);
}

try {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        respond(405, ['ok'=>false,'message'=>'Method not allowed']);
    }

    require_once __DIR__ . "/db.php";
    if (!isset($s1) || !$s1) {
        respond(500, ['ok'=>false,'message'=>'DB connection ($s1) not available']);
    }
    $s1->set_charset("utf8mb4");

    $raw = file_get_contents("php://input");
    $data = json_decode($raw, true);

    dlog("Called", [
        'uri' => $_SERVER['REQUEST_URI'] ?? null,
        'raw_len' => strlen($raw),
        'json_ok' => is_array($data),
        'session' => $_SESSION,
    ]);

    if (!is_array($data)) {
        respond(400, ['ok'=>false,'message'=>'Invalid JSON']);
    }

    $user_id = 1;

    $customer_name = trim($data['customer_name'] ?? '');
    $customer_phone = trim($data['customer_phone'] ?? '');
    $shipping_address = trim($data['shipping_address'] ?? '');
    $cart = $data['cart'] ?? null;

    if ($customer_name === '' || $customer_phone === '' || $shipping_address === '' || !is_array($cart)) {
        respond(400, ['ok'=>false,'message'=>'Missing fields or cart not array']);
    }

    $items = [];
    $subtotal = 0;

    foreach ($cart as $name => $row) {
        $item_name = trim((string)$name);
        $unit_price = (int)($row['price'] ?? 0);
        $qty = (int)($row['qty'] ?? 0);

        if ($item_name === '' || $unit_price <= 0 || $qty <= 0) continue;

        $subtotal += $unit_price * $qty;
        $items[] = [$item_name, $unit_price, $qty];
    }

    if ($subtotal <= 0 || count($items) === 0) {
        respond(400, ['ok'=>false,'message'=>'Cart empty/invalid']);
    }

    $vat = (int) round($subtotal * 0.025);
    $shipping = 100000;
    $total_amount = $subtotal + $vat + $shipping;

    $s1->begin_transaction();

    $stmtOrder = $s1->prepare(
        "INSERT INTO orders (user_id, customer_name, customer_phone, shipping_address, total_amount, status)
         VALUES (?, ?, ?, ?, ?, 'registered')"
    );
    $stmtOrder->bind_param("isssi", $user_id, $customer_name, $customer_phone, $shipping_address, $total_amount);
    $stmtOrder->execute();

    $order_id = $s1->insert_id;

    $stmtItem = $s1->prepare(
        "INSERT INTO order_items (order_id, item_name, unit_price, quantity)
         VALUES (?, ?, ?, ?)"
    );
    foreach ($items as $it) {
        [$item_name, $unit_price, $qty] = $it;
        $stmtItem->bind_param("isii", $order_id, $item_name, $unit_price, $qty);
        $stmtItem->execute();
    }

    $s1->commit();

    dlog("Saved", ['order_id'=>$order_id, 'items'=>count($items), 'total'=>$total_amount]);

    respond(200, ['ok'=>true, 'order_id'=>$order_id]);

} catch (Throwable $e) {
    if (isset($s1) && $s1) {
        try { $s1->rollback(); } catch (Throwable $e2) {}
    }
    dlog("ERROR", ['msg'=>$e->getMessage(), 'trace'=>$e->getTraceAsString()]);
    respond(500, ['ok'=>false, 'message'=>$e->getMessage()]);
}
