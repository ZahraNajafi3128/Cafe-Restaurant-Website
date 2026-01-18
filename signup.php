<?php
mysqli_report(MYSQLI_REPORT_OFF);

$h="localhost";
$u="root";
$p="";
$n="coferestaurant";
$s1=mysqli_connect($h,$u,$p,$n);

$phone = $_POST['phone'];

$check = mysqli_query($s1, "SELECT id FROM users WHERE phone='$phone' LIMIT 1");
if(mysqli_num_rows($check) > 0){
    echo "<script>
            alert('این کاربر قبلاً ثبت‌نام کرده است.');
            window.location.href = 'login.html';
          </script>";
    exit;
}

$s2="insert into users (username,email,phone,passwords)
     values ('$_POST[username]','$_POST[email]','$_POST[phone]','$_POST[password]')";

$s3=mysqli_query($s1,$s2);

if($s3){
    echo "<script>
            alert('ثبت‌نام با موفقیت انجام شد.');
            window.location.href = 'login.html';
          </script>";
    exit;
}else{
    echo "<script>
            alert('خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.');
            history.back();
          </script>";
    exit;
}
?>
