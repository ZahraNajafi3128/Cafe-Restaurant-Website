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

const avatarInput = document.getElementById('avatar-input');
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

const reserveForm = document.getElementById('reserveForm');

if (reserveForm) {
  reserveForm.addEventListener('submit', (e) => {
    const eventTitle = document.getElementById('eventType').value.trim();
    const guests     = document.getElementById('guests').value.trim();
    const date       = document.getElementById('date').value;
    const time       = document.getElementById('time').value;

    if (!eventTitle || !guests || !date || !time) {
      e.preventDefault(); 
      alert('لطفاً همه فیلدهای الزامی را تکمیل کنید.');
    }
  });
}
