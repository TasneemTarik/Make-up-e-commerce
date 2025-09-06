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
  const userLink = document.getElementById("userLink");

  // افترض إن عندك يوزر متخزن في localStorage بعد اللوجين
  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (currentUser) {
    // يوزر موجود → اعرض اسمه و زرار logout
    userLink.innerHTML = `<span>👤 ${currentUser.name}</span>`;
    logoutBtn.style.display = "inline-block";
  } else {
    // مفيش يوزر → سيب اللينك يفتح صفحة Login
    logoutBtn.style.display = "none";
  }

  // زرار تسجيل الخروج
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "../Login.html"; // رجّعه على صفحة اللوجين
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const usernameElem = document.querySelector(".username");
  const userLink = document.querySelector(".user-link");

  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    // لو في يوزر عامل لوجين
    usernameElem.textContent = loggedInUser;
    userLink.setAttribute("href", "#"); // يشيل لينك الـ login
  } else {
    // لو مفيش لوجين
    usernameElem.textContent = "";
    userLink.setAttribute("href", "../Login.html"); // يوديه لصفحة اللوجين
  }
});
document.addEventListener("DOMContentLoaded", updateCartInfo);
