
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


$s2 = "CREATE TABLE orders(
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  shipping_address TEXT NOT NULL,
  total_amount INT UNSIGNED NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'registered',
  INDEX idx_orders_user_id (user_id),
  CONSTRAINT fk_orders_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

$s3 = mysqli_query($s1, $s2);
if($s3)
    echo "create orders table<br>";
else
    echo "orders error: " . mysqli_error($s1) . "<br>";


$s2 = "CREATE TABLE order_items(
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  unit_price INT UNSIGNED NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  INDEX idx_order_items_order_id (order_id),
  CONSTRAINT fk_order_items_order
    FOREIGN KEY (order_id) REFERENCES orders(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

$s3 = mysqli_query($s1, $s2);
if($s3)
    echo "create order_items table<br>";
else
    echo "order_items error: " . mysqli_error($s1) . "<br>";



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
  messages TEXT NOT NULL,
  image_path VARCHAR(255) NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

$s3=mysqli_query($s1,$s2);
if($s3)
    echo "create table";
else
    echo "error";





  $s2="CREATE TABLE resumes(
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(120) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  resume_path VARCHAR(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

$s3=mysqli_query($s1,$s2);
if($s3)
    echo "create table";
else
    echo "error";



$s2="CREATE TABLE contact_messages(
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullname VARCHAR(190) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(190) NOT NULL,
  messages TEXT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

$s3=mysqli_query($s1,$s2);
if($s3)
    echo "create table";
else
    echo "error";


mysqli_close($s1);
?>
