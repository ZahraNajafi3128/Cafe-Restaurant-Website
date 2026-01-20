const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', (e) => {
    const fullname = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const messages = document.getElementById('comment').value.trim();

    if (!fullname || !email || !messages) {
      e.preventDefault();
      alert('لطفاً فیلدهای ستاره‌دار را کامل کنید.');
    }
  });
}
