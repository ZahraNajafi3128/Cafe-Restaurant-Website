const resumeInput = document.getElementById('resume');
const uploadBox = document.querySelector('.upload-box');
const form = document.getElementById('apply-form');

if (uploadBox && resumeInput) {
  uploadBox.addEventListener('click', () => {
    resumeInput.click();
  });

  resumeInput.addEventListener('change', () => {
    const span = uploadBox.querySelector('span');
    span.textContent = resumeInput.files.length
      ? resumeInput.files[0].name
      : 'آپلود رزومه';
  });
}

if (form && resumeInput) {
  form.addEventListener('submit', (e) => {
    if (!resumeInput.files || resumeInput.files.length === 0) {
      e.preventDefault();
      alert('لطفاً رزومه را آپلود کنید.');
    }
  });
}
