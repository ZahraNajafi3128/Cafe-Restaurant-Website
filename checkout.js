const CART_KEY = 'oasis_cart';
const VAT_RATE = 0.025;
const SHIPPING_COST = 100000;

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch {
    return {};
  }
}

function formatCurrency(value) {
  return (Number(value) || 0).toLocaleString('fa-IR') + ' تومان';
}

function calcSubtotal(cart) {
  let subtotal = 0;
  for (const item of Object.values(cart)) {
    const price = Number(item?.price) || 0;
    const qty = Number(item?.qty) || 0;
    subtotal += price * qty;
  }
  return subtotal;
}

function renderSummary() {
  const cart = loadCart();

  const summaryItemsEl = document.getElementById('summaryItems');
  const shippingEl = document.getElementById('summaryShipping');
  const vatEl = document.getElementById('summaryVat');
  const totalEl = document.getElementById('summaryTotal');
  const payBtn = document.getElementById('payBtn');

  if (!summaryItemsEl || !shippingEl || !vatEl || !totalEl || !payBtn) return;

  summaryItemsEl.innerHTML = "";

  const subtotal = calcSubtotal(cart);

  if (subtotal <= 0) {
    summaryItemsEl.innerHTML = `<p class="summary-empty">سبد خرید خالی است.</p>`;
    shippingEl.textContent = formatCurrency(0);
    vatEl.textContent = formatCurrency(0);
    totalEl.textContent = formatCurrency(0);
    payBtn.disabled = true;
    return;
  }

  for (const [name, data] of Object.entries(cart)) {
    const price = Number(data?.price) || 0;
    const qty = Number(data?.qty) || 0;
    if (qty <= 0) continue;

    const lineTotal = price * qty;

    const row = document.createElement('div');
    row.className = 'order-item';
    row.innerHTML = `
      <span>${name} × ${qty}</span>
      <span>${formatCurrency(lineTotal)}</span>
    `;
    summaryItemsEl.appendChild(row);
  }

  const vat = Math.round(subtotal * VAT_RATE);
  const shipping = SHIPPING_COST;
  const total = subtotal + vat + shipping;

  shippingEl.textContent = formatCurrency(shipping);
  vatEl.textContent = formatCurrency(vat);
  totalEl.textContent = formatCurrency(total);
  payBtn.disabled = false;
}

function clearCartHard() {
  localStorage.removeItem(CART_KEY);
}

window.addEventListener('load', () => {
  renderSummary();

  const form = document.getElementById('checkoutForm');
  const err = document.getElementById('checkoutError');
  const payBtn = document.getElementById('payBtn');

  if (!form || !err || !payBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cart = loadCart();
    const subtotal = calcSubtotal(cart);

    if (subtotal <= 0) {
      err.hidden = false;
      renderSummary();
      return;
    }

    if (!form.checkValidity()) {
      err.hidden = false;
      return;
    }

    err.hidden = true;
    payBtn.disabled = true;

    try {


      alert('پرداخت با موفقیت ثبت شد.');

      clearCartHard();
      renderSummary();

      window.location.href = 'menuPage.html';
    } catch (e2) {
      payBtn.disabled = false;
      err.hidden = false;
      err.textContent = 'خطا در ثبت سفارش. دوباره تلاش کنید.';
    }
  });
});

window.addEventListener('pageshow', () => {
  renderSummary();
});
