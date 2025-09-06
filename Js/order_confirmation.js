const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const orderItemsContainer = document.getElementById("order-items");
const orderTotal = document.getElementById("order-total");

let total = 0;

cartItems.forEach((item) => {
  const row = document.createElement("tr");

  const qty = item.quantity || 1;
  const price = parseFloat(item.price) || 0;
  const itemTotal = price * qty;
  total += itemTotal;

  row.innerHTML = `
    <td>
      <img src="${item.image || item.image_link || "../images/default.png"}" 
           alt="${item.name || "Product"}" 
           class="img-thumbnail" style="width: 80px; height: 80px; object-fit: cover;">
    </td>
    <td class="text-start">
      <h6 class="mb-1">${item.name || "Unnamed Product"}</h6>
    </td>
    <td>$${price.toFixed(2)}</td>
    <td>${qty}</td>
    <td class="fw-bold">$${itemTotal.toFixed(2)}</td>
  `;

  orderItemsContainer.appendChild(row);
});

orderTotal.textContent = "$" + total.toFixed(2);
