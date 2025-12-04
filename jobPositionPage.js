// وقتی روی هر کارت کلیک شود، به صفحه‌ی مربوطه می‌رود.
// لینک مقصد در data-link خود کارت تعریف شده است.
document.querySelectorAll('.job-card').forEach(card => {
  card.addEventListener('click', () => {
    const link = card.getAttribute('data-link');
    if (link) {
      window.location.href = link; // انتقال به صفحه‌ی جزئیات
    }
  });
});
