<?php
mysqli_report(MYSQLI_REPORT_OFF);
session_start();

$h  = "localhost";
$u  = "root";
$p  = "";
$db = "coferestaurant";

$s1 = mysqli_connect($h, $u, $p, $db);
mysqli_set_charset($s1, "utf8mb4");

if(!isset($_SESSION['user_id'])){
  echo "<script>
          alert('لطفاً اول وارد شوید.');
          window.location.href='login.html';
        </script>";
  exit;
}

$user_id = $_SESSION['user_id'];

$event_title  = $_POST['event_title'] ?? '';
$guests_count = $_POST['guests_count'] ?? '';
$date         = $_POST['date'] ?? '';
$time         = $_POST['time'] ?? '';
$notes        = $_POST['notes'] ?? '';

$reservation_datetime = $date . ' ' . $time . ':00';

$s2 = "INSERT INTO reservations (user_id, event_title, guests_count, reservation_datetime, notes)
       VALUES ('$user_id', '$event_title', '$guests_count', '$reservation_datetime', '$notes')";

$s3 = mysqli_query($s1, $s2);

if($s3){
  echo "<script>
          alert('درخواست رزرو شما ثبت شد.');
          window.location.href='reservePage.html';
        </script>";
  exit;
} else {
  echo "DB ERROR: " . mysqli_error($s1);
  exit;
}
?>
