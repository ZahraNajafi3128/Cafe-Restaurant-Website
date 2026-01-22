const CART_KEY = 'oasis_cart';
const VAT_RATE = 0.025;
const SHIPPING_COST = 100000;

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; }
  catch { return {}; }
}

function clearCartHard() {
  localStorage.removeItem(CART_KEY);
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

  summaryItemsEl.innerHTML = '';
  const subtotal = calcSubtotal(cart);

  const formatCurrency = (v) => (Number(v) || 0).toLocaleString('fa-IR') + ' تومان';

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

    const row = document.createElement('div');
    row.className = 'order-item';
    row.innerHTML = `<span>${name} × ${qty}</span><span>${formatCurrency(price * qty)}</span>`;
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
      err.textContent = 'سبد خرید خالی است.';
      renderSummary();
      return;
    }

    if (!form.checkValidity()) {
      err.hidden = false;
      err.textContent = 'لطفاً فیلدهای ضروری را کامل و درست وارد کنید.';
      return;
    }

    err.hidden = true;
    payBtn.disabled = true;

    const payload = {
      customer_name: document.getElementById('name').value.trim(),
      customer_phone: document.getElementById('phone').value.trim(),
      shipping_address: document.getElementById('address').value.trim(),
      cart
    };

    try {
      const res = await fetch('checkout.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload)
      });

      const raw = await res.text();
      console.log('checkout.php raw:', raw);

      let data = null;
      try { data = JSON.parse(raw); } catch {}

      if (!res.ok) {
        throw new Error((data && data.message) ? data.message : (raw || ('HTTP ' + res.status)));
      }
      if (!data || !data.ok) {
        throw new Error((data && data.message) ? data.message : 'Unknown server error');
      }

      alert('سفارش ثبت شد. کد سفارش: ' + data.order_id);

      clearCartHard();
      renderSummary();
      window.location.href = 'menuPage.html';
    } catch (e2) {
      payBtn.disabled = false;
      err.hidden = false;
      err.textContent = e2.message || 'خطا در ثبت سفارش.';
      console.error(e2);
    }
  });
});

window.addEventListener('pageshow', () => renderSummary());
