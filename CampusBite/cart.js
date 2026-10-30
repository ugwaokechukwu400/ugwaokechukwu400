// ==========================================
// CAMPUSBITE - CART.JS
// Handles rendering cart items, dynamic totals,
// login checks, and native form validation.
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  setupCheckoutForm();
});

// 1. RENDER CART TABLE & CALCULATE TOTALS
function renderCart() {
  const cartTableBody = document.getElementById("cartTableBody");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartTotalEl = document.getElementById("cartTotal");

  if (!cartTableBody) return;

  let currentCart = JSON.parse(localStorage.getItem("campusBiteCart")) || [];

  // If cart is empty, render empty state row
  if (currentCart.length === 0) {
    cartTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center py-4 text-muted fs-5">
          Your cart is empty! 🍽️ <br>
          <a href="./menu.html" class="btn btn-warning btn-sm mt-2 fw-semibold">Browse Menu</a>
        </td>
      </tr>
    `;
    if (cartSubtotalEl) cartSubtotalEl.textContent = "₦0";
    if (cartTotalEl) cartTotalEl.textContent = "₦200";
    return;
  }

  // Render items from localStorage
  let subtotal = 0;
  cartTableBody.innerHTML = currentCart.map((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    return `
      <tr>
        <td>
          <div class="d-flex align-items-center gap-3">
            <img src="${item.image || './Images/jollof_rice.jfif'}" alt="${item.name}" class="rounded" style="width: 50px; height: 50px; object-fit: cover;">
            <span class="fw-semibold text-dark">${item.name}</span>
          </div>
        </td>
        <td class="fw-semibold">₦${item.price.toLocaleString()}</td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <button class="btn btn-sm btn-outline-secondary px-2 py-0 fw-bold" onclick="updateQuantity(${index}, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary px-2 py-0 fw-bold" onclick="updateQuantity(${index}, 1)">+</button>
          </div>
        </td>
        <td class="fw-bold text-warning">₦${itemTotal.toLocaleString()}</td>
        <td>
          <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${index})">Remove</button>
        </td>
      </tr>
    `;
  }).join("");

  const total = subtotal + 200; // ₦200 campus runner fee
  if (cartSubtotalEl) cartSubtotalEl.textContent = `₦${subtotal.toLocaleString()}`;
  if (cartTotalEl) cartTotalEl.textContent = `₦${total.toLocaleString()}`;
}

// 2. QUANTITY ADJUSTMENTS & REMOVAL
function updateQuantity(index, change) {
  let currentCart = JSON.parse(localStorage.getItem("campusBiteCart")) || [];
  if (currentCart[index]) {
    currentCart[index].quantity += change;
    if (currentCart[index].quantity <= 0) {
      currentCart.splice(index, 1);
    }
    localStorage.setItem("campusBiteCart", JSON.stringify(currentCart));
    renderCart();
  }
}

function removeFromCart(index) {
  let currentCart = JSON.parse(localStorage.getItem("campusBiteCart")) || [];
  currentCart.splice(index, 1);
  localStorage.setItem("campusBiteCart", JSON.stringify(currentCart));
  renderCart();
}

function clearCart() {
  localStorage.removeItem("campusBiteCart");
  renderCart();
}

// 3. NATIVE FORM SUBMISSION & CHECKOUT GUARDRAILS
function setupCheckoutForm() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    // Prevent standard form submission refresh
    event.preventDefault();

    // 1. EMPTY CART CHECK
    let currentCart = JSON.parse(localStorage.getItem("campusBiteCart")) || [];
    if (currentCart.length === 0) {
      alert("Your cart is empty! Please add food first. 😋");
      window.location.href = "menu.html";
      return;
    }

    // 2. LOGIN / SIGN-UP GUARDRAIL
    let loggedInUser = localStorage.getItem("campusBiteLoggedInUser");
    if (!loggedInUser) {
      alert("Please log in or sign up to complete your food order! 🔐");
      window.location.href = "login.html";
      return;
    }

    // 3. PERSIST DELIVERY DETAILS
    const hostel = document.getElementById("hostelSelect")?.value;
    const room = document.getElementById("roomNo")?.value;
    const phone = document.getElementById("phoneNo")?.value;

    localStorage.setItem(
      "campusBiteDeliveryInfo",
      JSON.stringify({ hostel, room, phone })
    );

    // 4. PROCEED TO PAYMENT
    window.location.href = "checkout.html";
  });
}