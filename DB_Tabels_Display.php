<?php
$h="localhost";
$u="root";
$p="";
$n="coferestaurant";
$s1=mysqli_connect($h,$u,$p,$n);
$s2= "select * from users";
$s3=mysqli_query($s1,$s2);

echo "users table:";
echo "<table border='2px'><tr><th>id </th><th>username</th><th>email</th><th>phone</th><th>passwords</th></tr>";
while($s4=mysqli_fetch_array($s3)){
    echo "<tr><td>";
    echo $s4['id'];
    echo "</td><td>";
    echo $s4['username'];
    echo "</td><td>";
    echo $s4['email'];
    echo "</td><td>";
    echo $s4['phone'];
    echo "</td><td>";
    echo $s4['passwords'];
}
echo "</table>";

$s2= "select * from resumes";
$s3=mysqli_query($s1,$s2);
echo "<br><br>";
echo "resumes table:";
echo "<table border='2px'><tr><th>id </th><th>firstname</th><th>lastname</th><th>phone</th><th>resume_path</th></tr>";
while($s4=mysqli_fetch_array($s3)){
    echo "<tr><td>";
    echo $s4['id'];
    echo "</td><td>";
    echo $s4['firstname'];
    echo "</td><td>";
    echo $s4['lastname'];
    echo "</td><td>";
    echo $s4['phone'];
    echo "</td><td>";
    echo $s4['resume_path'];
}
echo "</table>";


$s2= "select * from reservations";
$s3=mysqli_query($s1,$s2);
echo "<br><br>";
echo "reservations table:";
echo "<table border='2px'><tr><th>id </th><th>user_id</th><th>event_title</th><th>guests_count</th><th>reservation_datetime</th><th>notes</th></tr>";
while($s4=mysqli_fetch_array($s3)){
    echo "<tr><td>";
    echo $s4['id'];
    echo "</td><td>";
    echo $s4['user_id'];
    echo "</td><td>";
    echo $s4['event_title'];
    echo "</td><td>";
    echo $s4['guests_count'];
    echo "</td><td>";
    echo $s4['reservation_datetime'];
    echo "</td><td>";
    echo $s4['notes'];
}
echo "</table>";


$s2= "select * from feedback";
$s3=mysqli_query($s1,$s2);
echo "<br><br>";
echo "feedback table:";
echo "<table border='2px'><tr><th>id </th><th>user_id</th><th>messages</th><th>image_path</th></tr>";
while($s4=mysqli_fetch_array($s3)){
    echo "<tr><td>";
    echo $s4['id'];
    echo "</td><td>";
    echo $s4['user_id'];
    echo "</td><td>";
    echo $s4['messages'];
    echo "</td><td>";
    echo $s4['image_path'];
}
echo "</table>";


$s2= "select * from contact_messages";
$s3=mysqli_query($s1,$s2);
echo "<br><br>";
echo "contact_messages table:";
echo "<table border='2px'><tr><th>id </th><th>fullname</th><th>phone</th><th>email</th><th>messages</th></tr>";
while($s4=mysqli_fetch_array($s3)){
    echo "<tr><td>";
    echo $s4['id'];
    echo "</td><td>";
    echo $s4['fullname'];
    echo "</td><td>";
    echo $s4['phone'];
    echo "</td><td>";
    echo $s4['email'];
    echo "</td><td>";
    echo $s4['messages'];
}
echo "</table>";


$s2= "select * from order_items";
$s3=mysqli_query($s1,$s2);
echo "<br><br>";
echo "order_items table:";
echo "<table border='2px'><tr><th>id </th><th>order_id </th><th> item_name </th><th>unit_price </th><th>quantity </th></tr>";
while($s4=mysqli_fetch_array($s3)){
    echo "<tr><td>";
    echo $s4['id'];
    echo "</td><td>";
    echo $s4['order_id'];
    echo "</td><td>";
    echo $s4['item_name'];
    echo "</td><td>";
    echo $s4['unit_price'];
    echo "</td><td>";
    echo $s4['quantity'];
}
echo "</table>";


$s2= "select * from orders";
$s3=mysqli_query($s1,$s2);
echo "<br><br>";
echo "orders table:";
echo "<table border='2px'><tr><th>id </th><th>user_id </th><th> customer_name </th><th> customer_phone </th><th>shipping_address </th><th>total_amount </th><th>status </th></tr>";
while($s4=mysqli_fetch_array($s3)){
    echo "<tr><td>";
    echo $s4['id'];
    echo "</td><td>";
    echo $s4['user_id'];
    echo "</td><td>";
    echo $s4['customer_name'];
    echo "</td><td>";
    echo $s4['customer_phone'];
    echo "</td><td>";
    echo $s4['shipping_address'];
    echo "</td><td>";
    echo $s4['total_amount'];
    echo "</td><td>";
    echo $s4['status'];
}
echo "</table>";
?>
