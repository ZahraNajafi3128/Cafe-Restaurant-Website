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

// فقط چک متن خالی نباشد (اختیاری)
const feedbackForm = document.getElementById('feedbackForm');
const messageInput = document.getElementById('message');

if (feedbackForm) {
  feedbackForm.addEventListener('submit', (e) => {
    const msg = messageInput.value.trim();
    if (!msg) {
      e.preventDefault();
      alert('لطفاً متن انتقاد / پیشنهاد را وارد کنید.');
    }
  });
}
