import { Product } from "./Product.js";
import { updateCartInfo } from "./navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("cart-body");
  renderCart();
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("confirm-shipping")) {
      alert("✅ Shipping confirmed!");
      window.location.href = "../checkout.html";
    }

    if (e.target.classList.contains("continue-shopping")) {
      window.location.href = "../index.html";
    }
  });
  tbody.addEventListener("click", (e) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const id = e.target.dataset.id;

    if (e.target.classList.contains("increase")) {
      cart = cart.map((p) => {
        if (p.id == id) p.quantity++;
        return p;
      });
    }

    if (e.target.classList.contains("decrease")) {
      cart = cart.map((p) => {
        if (p.id == id && p.quantity > 1) p.quantity--;
        return p;
      });
    }

    if (e.target.classList.contains("remove")) {
      cart = cart.filter((p) => p.id != id);
    }

    if (e.target.classList.contains("clear-all")) {
      cart = [];
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartInfo();
  });

  function renderCart() {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    let cartProducts = cartData.map((p) => new Product(p));

    let total = 0;
    tbody.innerHTML = "";

    cartProducts.forEach((prod) => {
      const rowTotal = prod.getTotal();
      total += rowTotal;

      tbody.innerHTML += `
        <tr>
          <td><img src="${prod.image}" width="60" /></td>
          <td>${prod.name}</td>
          <td>$${prod.price.toFixed(2)}</td>
          <td>
            <button class="decrease" data-id="${prod.id}">-</button>
            ${prod.quantity}
            <button class="increase" data-id="${prod.id}">+</button>
          </td>
          <td>$${rowTotal.toFixed(2)}</td>
          <td><button class="remove" data-id="${prod.id}">X</button></td>
        </tr>
      `;
    });

    tbody.innerHTML += `
      <tr>
        <td colspan="4" class="text-end"><strong>Total:</strong></td>
        <td><strong>$${total.toFixed(2)}</strong></td>
        <td><button class="clear-all">Clear All</button></td>
      </tr>
    `;
  }
});
