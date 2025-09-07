document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".cart-icon-wrapper");
  if (cartIcon) cartIcon.addEventListener("click", toggleCart);
  const closeBtn = document.getElementById("closeCartBtn");
  const overlay = document.getElementById("cartOverlay");

  if (cartIcon) cartIcon.addEventListener("click", toggleCart);
  if (closeBtn) closeBtn.addEventListener("click", toggleCart);
  if (overlay) overlay.addEventListener("click", toggleCart);

  renderSideCart();
});

function toggleCart() {
  console.log("clicked");
  const sideCart = document.getElementById("sideCart");
  const overlay = document.getElementById("cartOverlay");

  sideCart.classList.toggle("active");
  overlay.style.display = sideCart.classList.contains("active")
    ? "block"
    : "none";
}
// عرض المنتجات اللي في localStorage.cart
function renderSideCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartBody = document.getElementById("sideCartBody");
  const cartTotalElem = document.getElementById("cart-total");

  if (cart.length === 0) {
    cartBody.innerHTML = "<p>No items yet.</p>";
    cartTotalElem.textContent = "$0.00";
    return;
  }

  let total = 0;
  cartBody.innerHTML = cart
    .map((item) => {
      total += item.price * item.quantity;
      return `
        <div class="d-flex justify-content-between mb-2">
          <div>
            <strong>${item.name}</strong><br>
            <small>Qty: ${item.quantity}</small>
          </div>
          <div>$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      `;
    })
    .join("");

  cartTotalElem.textContent = `$${total.toFixed(2)}`;
}
