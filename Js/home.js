import { ProductService } from "./Product_services.js";
const service = new ProductService();
service.loadProducts().then(() => {
  service.renderProducts("trending-products");
});


document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const userLink = document.getElementById("userLink");

  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (currentUser) {
    userLink.innerHTML = `<span>👤 ${currentUser.name}</span>`;
    logoutBtn.style.display = "inline-block";
  } else {
    logoutBtn.style.display = "none";
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "../Login.html"; // رجّعه على صفحة اللوجين
  });
});
