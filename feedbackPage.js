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

const feedbackForm = document.getElementById('feedbackForm');
const messageInput = document.getElementById('message');
const imageInput   = document.getElementById('imageInput');

if (feedbackForm) {
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const message = messageInput.value.trim();
    if (!message) {
      alert('لطفاً متن انتقاد / پیشنهاد را وارد کنید.');
      return;
    }

    alert('انتقاد / پیشنهاد شما ثبت شد. متشکریم!');

    feedbackForm.reset();
  });
}
