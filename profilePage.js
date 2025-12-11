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

const editBtn   = document.getElementById('contactEditBtn');
const viewBox   = document.getElementById('contactView');
const editForm  = document.getElementById('contactEditForm');
const cancelBtn = document.getElementById('contactCancelBtn');

function getCurrentValues() {
  return {
    fullName:  viewBox.querySelector('[data-field="fullName"]').textContent.trim(),
    email:     viewBox.querySelector('[data-field="email"]').textContent.trim(),
    mobile:    viewBox.querySelector('[data-field="mobile"]').textContent.trim(),
    homePhone: viewBox.querySelector('[data-field="homePhone"]').textContent.trim(),
    province:  viewBox.querySelector('[data-field="province"]').textContent.trim(),
    city:      viewBox.querySelector('[data-field="city"]').textContent.trim(),
    address:   viewBox.querySelector('[data-field="address"]').textContent.trim()
  };
}

function fillFormFromView() {
  const data = getCurrentValues();
  editForm.fullName.value  = data.fullName;
  editForm.email.value     = data.email;
  editForm.mobile.value    = data.mobile;
  editForm.homePhone.value = data.homePhone;
  editForm.province.value  = data.province;
  editForm.city.value      = data.city;
  editForm.address.value   = data.address;
}

if (editBtn && viewBox && editForm && cancelBtn) {
  editBtn.addEventListener('click', () => {
    fillFormFromView();
    viewBox.style.display  = 'none';
    editForm.style.display = 'block';
  });

  cancelBtn.addEventListener('click', () => {
    editForm.style.display = 'none';
    viewBox.style.display  = 'block';
  });

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    viewBox.querySelector('[data-field="fullName"]').textContent  = editForm.fullName.value  || '-';
    viewBox.querySelector('[data-field="email"]').textContent     = editForm.email.value     || '-';
    viewBox.querySelector('[data-field="mobile"]').textContent    = editForm.mobile.value    || '-';
    viewBox.querySelector('[data-field="homePhone"]').textContent = editForm.homePhone.value || '-';
    viewBox.querySelector('[data-field="province"]').textContent  = editForm.province.value  || '-';
    viewBox.querySelector('[data-field="city"]').textContent      = editForm.city.value      || '-';
    viewBox.querySelector('[data-field="address"]').textContent   = editForm.address.value   || '-';

    editForm.style.display = 'none';
    viewBox.style.display  = 'block';
  });
}
