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

const ordersList     = document.getElementById('ordersList');
const emptyMessage   = document.getElementById('emptyMessage');
const ordersSection  = document.getElementById('ordersSection');
const subtotalSpan   = document.getElementById('subtotalAmount');
const vatSpan        = document.getElementById('vatAmount');
const shippingSpan   = document.getElementById('shippingAmount');
const grandTotalSpan = document.getElementById('grandTotal');
const payButton      = document.getElementById('payButton');
const clearAllBtn    = document.getElementById('clearAllBtn');

const CART_KEY = 'oasis_cart';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

const VAT_RATE      = 0.025;
const SHIPPING_COST = 100000;

function formatCurrency(value) {
  return value.toLocaleString('fa-IR') + ' تومان';
}

function updateSummary() {
  const items = ordersList.querySelectorAll('.order-item');
  let subtotal = 0;

  items.forEach(item => {
    const price = parseInt(item.dataset.price, 10);
    const qty   = parseInt(item.querySelector('.qty-value').textContent, 10);
    subtotal += price * qty;
  });

  if (items.length === 0 || subtotal === 0) {
    ordersSection.hidden = true;
    emptyMessage.hidden  = false;
    payButton.disabled   = true;
    return;
  }

  const vat      = Math.round(subtotal * VAT_RATE);
  const shipping = SHIPPING_COST;
  const total    = subtotal + vat + shipping;

  subtotalSpan.textContent   = formatCurrency(subtotal);
  vatSpan.textContent        = formatCurrency(vat);
  shippingSpan.textContent   = formatCurrency(shipping);
  grandTotalSpan.textContent = formatCurrency(total);

  ordersSection.hidden = false;
  emptyMessage.hidden  = true;
  payButton.disabled   = false;
}

function updateMinusIcon(item) {
  const qtyEl   = item.querySelector('.qty-value');
  const minusEl = item.querySelector('.qty-circle.minus');
  if (!qtyEl || !minusEl) return;

  const qty = parseInt(qtyEl.textContent, 10) || 0;

  if (qty <= 1) {
    minusEl.setAttribute('data-icon', 'trash');
    minusEl.textContent = "";
  } else {
    minusEl.setAttribute('data-icon', 'minus');
    minusEl.textContent = "−";
  }
}

function createOrderItem(name, price, qty) {
  const item = document.createElement('div');
  item.className = 'order-item';
  item.dataset.id = name;
  item.dataset.price = String(price);

  item.innerHTML = `
    <div class="order-box">
      <div class="qty-control">
        <button class="qty-circle minus" aria-label="کاهش / حذف">−</button>
        <span class="qty-value">${qty}</span>
        <button class="qty-circle plus" aria-label="افزایش">+</button>
      </div>
      <div class="order-name">${name}</div>
    </div>
  `;
  return item;
}

function renderOrders(cartObj) {
  ordersList.innerHTML = "";

  for (const [name, data] of Object.entries(cartObj)) {
    if (!data) continue;
    const qty = Number(data.qty) || 0;
    const price = Number(data.price) || 0;
    if (qty <= 0) continue;

    const row = createOrderItem(name, price, qty);
    ordersList.appendChild(row);
    updateMinusIcon(row);
  }

  updateSummary();
}

function syncFromStorage() {
  const cart = loadCart();
  renderOrders(cart);
}

ordersList.addEventListener('click', (e) => {
  const btn = e.target.closest('.qty-circle');
  if (!btn) return;

  const item = btn.closest('.order-item');
  if (!item) return;

  const name = item.querySelector('.order-name')?.textContent?.trim();
  if (!name) return;

  const price = Number(item.dataset.price) || 0;
  const qtyEl = item.querySelector('.qty-value');
  let qty = parseInt(qtyEl.textContent, 10) || 0;

  const cart = loadCart();

  if (btn.classList.contains('plus')) {
    qty += 1;
    qtyEl.textContent = qty;

    cart[name] = { price, qty };
    saveCart(cart);
  }

  if (btn.classList.contains('minus')) {
    if (qty <= 1) {
      item.remove();
      delete cart[name];
      saveCart(cart);
      updateSummary();
      return;
    } else {
      qty -= 1;
      qtyEl.textContent = qty;

      cart[name] = { price, qty };
      saveCart(cart);
    }
  }

  updateMinusIcon(item);
  updateSummary();
});

if (clearAllBtn) {
  clearAllBtn.addEventListener('click', () => {
    saveCart({});
    syncFromStorage();
  });
}

if (payButton) {
  payButton.addEventListener('click', () => {
    window.location.href = 'checkout.html';
  });
}

syncFromStorage();

window.addEventListener('pageshow', () => {
  syncFromStorage();
});
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') syncFromStorage();
});
