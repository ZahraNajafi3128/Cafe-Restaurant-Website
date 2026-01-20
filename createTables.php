
<?php
$h  = "localhost";
$u  = "root";
$p  = "";
$db = "coferestaurant";
$s1 = mysqli_connect($h, $u, $p, $db);
mysqli_set_charset($s1,"utf8mb4");

$s2="CREATE TABLE users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(190) NULL UNIQUE,
  email VARCHAR(190) NULL UNIQUE,
  phone VARCHAR(20) NOT NULL UNIQUE,
  passwords VARCHAR(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

$s3=mysqli_query($s1,$s2);
if($s3)
    echo "create table";
else
    echo "error";


$s2="CREATE TABLE orders(
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,

  customer_name VARCHAR(120) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(190) NULL,
  delivery_address TEXT NOT NULL,

  subtotal INT NOT NULL,
  vat INT NOT NULL,
  shipping INT NOT NULL,
  grand_total INT NOT NULL,

  payment_status ENUM('unpaid','paid','failed') NOT NULL DEFAULT 'unpaid',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

$s3=mysqli_query($s1,$s2);
if($s3)
    echo "create table";
else
    echo "error";



$s2="CREATE TABLE order_items(
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,

  item_name VARCHAR(150) NOT NULL,
  unit_price INT NOT NULL,
  qty INT NOT NULL,
  line_total INT NOT NULL,

  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

$s3=mysqli_query($s1,$s2);
if($s3)
    echo "create table";
else
    echo "error";



$s2="CREATE TABLE reservations(
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  event_title VARCHAR(150) NULL,
  guests_count INT NOT NULL,
  reservation_datetime DATETIME NOT NULL,
  notes TEXT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

$s3=mysqli_query($s1,$s2);
if($s3)
    echo "create table";
else
    echo "error";



$s2="CREATE TABLE feedback(
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  subject VARCHAR(150) NULL,
  message TEXT NOT NULL,
  status ENUM('new','seen','closed') NOT NULL DEFAULT 'new',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

$s3=mysqli_query($s1,$s2);
if($s3)
    echo "create table";
else
    echo "error";




$s2="CREATE TABLE contact_messages(
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  subject VARCHAR(150) NULL,
  message TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

$s3=mysqli_query($s1,$s2);
if($s3)
    echo "create table";
else
    echo "error";

mysqli_close($s1);
?>
