<?php
mysqli_report(MYSQLI_REPORT_OFF);
session_start();

$h="localhost";
$u="root";
$p="";
$n="coferestaurant";

$s1 = mysqli_connect($h,$u,$p,$n);
mysqli_set_charset($s1,"utf8mb4");

// اگر لاگین نکرده بود
if(!isset($_SESSION['user_id'])){
  echo "<script>
          alert('لطفاً اول وارد شوید.');
          window.location.href='login.html';
        </script>";
  exit;
}

$user_id = $_SESSION['user_id'];

// متن فرم
$message = $_POST['message'] ?? '';
if(trim($message) == ''){
  echo "<script>
          alert('لطفاً متن انتقاد / پیشنهاد را وارد کنید.');
          history.back();
        </script>";
  exit;
}

// مسیر عکس (اگر آپلود شد)
$image_path = "";

// اگر فایل انتخاب شده بود
if(isset($_FILES['image']) && $_FILES['image']['name'] != ''){
  $folder = "uploads/feedback/";
  $fileName = $_FILES['image']['name'];
  $tmpName  = $_FILES['image']['tmp_name'];

  // انتقال فایل به پوشه
  $ok = move_uploaded_file($tmpName, $folder . $fileName); // [web:245]
  if($ok){
    $image_path = $folder . $fileName;
  } else {
    echo "UPLOAD ERROR: move_uploaded_file failed";
    exit;
  }
}

/*
  اینجا مهم‌ترین تغییر:
  چون ستون جدول شما اسمش messages هست، باید همین رو INSERT کنیم.
*/
$s2 = "INSERT INTO feedback (user_id, messages, image_path)
       VALUES ('$user_id', '$message', '$image_path')";

$s3 = mysqli_query($s1, $s2);

if($s3){
  echo "<script>
          alert('انتقاد / پیشنهاد شما ثبت شد. متشکریم!');
          window.location.href='feedbackPage.html';
        </script>";
  exit;
}else{
  echo "DB ERROR: " . mysqli_error($s1); // دیدن خطای دیتابیس [web:209]
  exit;
}
?>
