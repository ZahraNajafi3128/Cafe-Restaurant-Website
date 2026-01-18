<?php
mysqli_report(MYSQLI_REPORT_OFF);

session_start();

$h="localhost";
$u="root";
$p="";
$n="coferestaurant";

$s1 = mysqli_connect($h,$u,$p,$n);

$identifier = $_POST['identifier'];
$password   = $_POST['password'];

$s2 = "SELECT * FROM users
       WHERE (username='$identifier' OR email='$identifier')
       AND passwords='$password'
       LIMIT 1";

$s3 = mysqli_query($s1,$s2);

if(mysqli_num_rows($s3) == 1){
    $user = mysqli_fetch_assoc($s3);

    // اختیاری: برای اینکه بعداً تو پنل بفهمی کی لاگین کرده
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];

    echo "<script>
            alert('ورود با موفقیت انجام شد.');
            window.location.href = 'profilePage.html';
          </script>";
    exit;
}else{
    echo "<script>
            alert('کاربری با این مشخصات ثبت نشده، لطفاً ثبت‌نام کنید.');
            window.location.href = 'signin.html';
          </script>";
    exit;
}
?>
