export function updateCartInfo() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  let itemCount = cart.reduce((sum, p) => sum + p.quantity, 0);

  // تحديث المبلغ
  const cartTotalElem = document.querySelector(".cart-total");
  if (cartTotalElem) {
    cartTotalElem.textContent = `$${total.toFixed(2)}`;
  }

  // تحديث عدد المنتجات
  const cartBadgeElem = document.querySelector(".cart-badge");
  if (cartBadgeElem) {
    cartBadgeElem.textContent = itemCount;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const userLink = document.getElementsByClassName("user-link");

  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log(currentUser.fullname);
  console.log(userLink);
  if (currentUser ) {
    userLink[0].innerHTML = `<span> ${currentUser.fullname}</span>`;
    logoutBtn.style.display = "inline-block";

    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "../Login.html";
    });
  } else if (logoutBtn) {
    logoutBtn.style.display = "none";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const usernameElem = document.querySelector(".username");
  const userLink = document.querySelector(".user-link");

  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser && usernameElem && userLink) {
    usernameElem.textContent = loggedInUser;
    userLink.setAttribute("href", "#");
  } else if (usernameElem && userLink) {
    usernameElem.textContent = "";
    userLink.setAttribute("href", "../Login.html");
  }
});
// navbar.js
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
updateCartInfo();
document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".cart-icon-wrapper");
  const cartDetails = document.getElementById("cart-details");

  // cart stored in localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function renderCartDetails() {
    let cart = getCart();

    if (cart.length === 0) {
      cartDetails.innerHTML = `<p>Your cart is empty.</p>`;
      return;
    }

    // cartDetails.innerHTML = `
    //   <table class="table align-middle">
    //     <thead>
    //       <tr>
    //         <th>Product</th>
    //         <th>Qty</th>
    //         <th>Price</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       ${cart
    //         .map(
    //           (item) => `
    //         <tr>
    //           <td>${item.name}</td>
    //           <td>${item.quantity}</td>
    //           <td>$${(item.price * item.quantity).toFixed(2)}</td>
    //         </tr>
    //       `
    //         )
    //         .join("")}
    //     </tbody>
    //   </table>
    // `;
  }

  // عند الضغط على أيقونة الكارت
  cartIcon.addEventListener("click", () => {
    renderCartDetails();
    // let cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
    cartModal.show();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".cart-icon-wrapper");
  if (cartIcon) {
    cartIcon.addEventListener("click", toggleCart);
  }
});
  const sideCart = document.getElementById("sideCart");

function toggleCart() {
  const overlay = document.getElementById("cartOverlay");
        sideCart.style.display = "flex";
  // sideCart.classList.toggle("active");
  // overlay.style.display = sideCart.classList.contains("active")
  //   ? "block"
  //   : "none";
    
}
const cartIcon = document.getElementById("cartIcon");
cartIcon.addEventListener("click", toggleCart);
const closeBtn = document.getElementById("closeCartBtn");
closeBtn.addEventListener("click", ()=>{
sideCart.style.display = "none";
});
// overlay.addEventListener("click", toggleCart);