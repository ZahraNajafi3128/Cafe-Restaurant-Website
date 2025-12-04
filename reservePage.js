// همبرگری: باز و بسته کردن منوی کناری در موبایل
const menuToggle = document.getElementById('menuToggle');
const sideMenu   = document.getElementById('sideMenu');
const backdrop   = document.getElementById('backdrop');

if (menuToggle && sideMenu && backdrop) {
  menuToggle.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
    backdrop.classList.toggle('show');
  });

  backdrop.addEventListener('click', () => {
    sideMenu.classList.remove('open');
    backdrop.classList.remove('show');
  });
}

// آپلود و پیش‌نمایش آواتار
const avatarInput   = document.getElementById('avatar-input');
const avatarPreview = document.getElementById('avatarPreview');

if (avatarInput && avatarPreview) {
  avatarInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      avatarPreview.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ----- فرم رزرو مراسم -----

const reserveForm = document.getElementById('reserveForm');
const eventTypeEl = document.getElementById('eventType');
const guestsEl    = document.getElementById('guests');
const dateEl      = document.getElementById('date');
const timeEl      = document.getElementById('time');

if (reserveForm) {
  reserveForm.addEventListener('submit', (e) => {
    e.preventDefault(); // جلوگیری از ارسال واقعی فرم

    const eventType = eventTypeEl.value.trim();
    const guests    = guestsEl.value.trim();
    const date      = dateEl.value;
    const time      = timeEl.value;

    if (!eventType || !guests || !date || !time) {
      alert('لطفاً همه فیلدهای الزامی (نوع مراسم، تعداد میهمانان، تاریخ و ساعت) را تکمیل کنید.');
      return;
    }

    // اینجا می‌توانی ارسال اطلاعات به سرور را اضافه کنی
    alert('درخواست رزرو شما ثبت شد. به‌زودی برای هماهنگی با شما تماس خواهیم گرفت.');

    reserveForm.reset();
  });
}
