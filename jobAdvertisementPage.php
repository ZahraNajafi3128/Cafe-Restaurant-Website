<?php
$h="localhost";
$u="root";
$p="";
$db="coferestaurant";

$s1 = mysqli_connect($h,$u,$p,$db);
mysqli_set_charset($s1,"utf8mb4");

$firstname = $_POST['firstname'];
$lastname  = $_POST['lastname'];
$phone     = $_POST['phone'];

$resumeName = $_FILES['resume']['name'];
$tmpName    = $_FILES['resume']['tmp_name'];

$folder = "uploads/resumes/";
$path   = $folder . $resumeName;

move_uploaded_file($tmpName, $path);

$s2="INSERT INTO resumes(firstname, lastname, phone, resume_path)
     VALUES('$firstname','$lastname','$phone','$path')";

$s3=mysqli_query($s1,$s2);
if($s3)
    echo "<script>alert('رزومه با موفقیت ثبت شد'); window.location.href='jobAdvertisementPage.html';</script>";
else
    echo "error: " . mysqli_error($s1);
?>
