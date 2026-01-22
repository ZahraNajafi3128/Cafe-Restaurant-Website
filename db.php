<?php
$h = "localhost";
$u = "root";
$p = "";
$n = "coferestaurant";

$s1 = mysqli_connect($h, $u, $p, $n);

if (!$s1) {
    die("DB connect error: " . mysqli_connect_error());
}

mysqli_set_charset($s1, "utf8mb4");
