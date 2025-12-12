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

const categoryBtns = document.querySelectorAll('.category-btn');
const menuCards    = document.querySelectorAll('.menu-card');

categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const selectedCategory = btn.getAttribute('data-category');

    menuCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const show = (selectedCategory === 'all' || cardCategory === selectedCategory);

      if (show) {
        card.style.display = 'block';
        setTimeout(() => card.style.opacity = '1', 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

const qtyWrappers = document.querySelectorAll('.qty-controls');

const cartCounts = {};

qtyWrappers.forEach(wrap => {
  const plusOnly  = wrap.querySelector('.qty-plus-only');
  const expanded  = wrap.querySelector('.qty-expanded');
  const minusBtn  = wrap.querySelector('.qty-minus');
  const plusBtn   = wrap.querySelector('.qty-plus');
  const countEl   = wrap.querySelector('.qty-count');

  const itemName = wrap.getAttribute('data-item');

  let count = 0;

  const render = () => {
    cartCounts[itemName] = count;

    if (count <= 0) {
      count = 0;
      plusOnly.style.display = 'inline-flex';
      expanded.classList.add('is-hidden');
      expanded.setAttribute('aria-hidden', 'true');
    } else {
      plusOnly.style.display = 'none';
      expanded.classList.remove('is-hidden');
      expanded.setAttribute('aria-hidden', 'false');
      countEl.textContent = count;
    }
  };

  plusOnly.addEventListener('click', (e) => {
    e.preventDefault();
    count = 1;
    render();
  });

  plusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    count += 1;
    render();
  });

  minusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    count -= 1;
    render();
  });

  render();
});

window.addEventListener('load', () => {
  menuCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 50);
  });
});
