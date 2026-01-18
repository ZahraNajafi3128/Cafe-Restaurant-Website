<?php
$h="localhost";
$u="root";
$p="";
$n="coferestaurant";
$s1=mysqli_connect($h,$u,$p);
$s2="create database coferestaurant";
$s3=mysqli_query($s1,$s2);
if($s3)
    echo "create database CofeRestaurant";
else
    echo "error";
?>