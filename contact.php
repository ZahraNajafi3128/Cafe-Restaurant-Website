<?php
$h="localhost";
$u="root";
$p="";
$db="coferestaurant";

$s1 = mysqli_connect($h,$u,$p,$db);
mysqli_set_charset($s1,"utf8mb4");

$fullname = $_POST['fullname'];
$phone    = $_POST['phone'];
$email    = $_POST['email'];
$messages = $_POST['messages'];

$s2="INSERT INTO contact_messages(fullname, phone, email, messages)
     VALUES('$fullname','$phone','$email','$messages')";

$s3=mysqli_query($s1,$s2);
if($s3)
    echo "<script>alert('پیام شما ثبت شد.'); window.location.href='contact.html';</script>";
else
    echo "error: " . mysqli_error($s1);
?>
