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

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('فرم با موفقیت ارسال شد.');
  });
}
