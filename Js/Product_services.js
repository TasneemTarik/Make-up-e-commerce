import { Product } from "./Product.js"; // كلاس المنتج

export class ProductService {
  constructor() {
    this.apiUrl =
      "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";
    this.products = [];
  }

  async loadProducts() {
    try {
      const cached = localStorage.getItem("products");
      if (cached) {
        const rawProducts = JSON.parse(cached);
        this.products = rawProducts.map((p) => new Product(p));
        return this.products;
      }

      const res = await fetch(this.apiUrl);
      const rawProducts = await res.json();

      this.products = rawProducts.map((p) => new Product(p));

      localStorage.setItem("products", JSON.stringify(rawProducts));
      return this.products;
    } catch (err) {
      console.error("Error loading products:", err);
      return [];
    }
  }

  getProductById(id) {
    return this.products.find((p) => p.id == id);
  }

  renderProducts(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    this.products.slice(0, 30).forEach((item) => {
      const card = document.createElement("div");
      card.className = "product";

      // fallback للصورة
      const imageSrc =
        item.image && item.image !== "null"
          ? item.image
          : "../images/default.png";

      card.innerHTML = `
        <img src="${imageSrc}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>$${item.price.toFixed(2)}</p>
        <div class="add-to-cart">
          <button class="view-btn" data-id="${item.id}">View</button>
          <button class="add-btn" data-id="${item.id}">Add to Cart</button>
        </div>
      `;

      container.appendChild(card);
    });

    // Event Delegation
    document.addEventListener("click", (e) => {
      // View
      if (e.target.classList.contains("view-btn")) {
        const productId = e.target.dataset.id;
        const product = this.getProductById(productId);
        this.showProductDetails(product);
      }

      // Add to cart
      if (e.target.classList.contains("add-btn")) {
        const productId = e.target.dataset.id;
        const product = this.getProductById(productId);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find((p) => p.id == product.id);

        if (existing) {
          existing.quantity += 1;
        } else {
          product.quantity = 1;
          cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        function showToast(message) {
          const toast = document.getElementById("toast");
          toast.textContent = message;
          toast.className = "toast show";
          setTimeout(() => {
            toast.className = "toast";
          }, 3000);
        }

        // مثال: بدل alert
        showToast("✅ Added to cart!");

        window.location.href = "../Cart.html";
      }
    });
  }

  // 👇 هنا تفاصيل المنتج في المودال
  showProductDetails(product) {
    const modal = document.getElementById("detailsModal");
    const modalContent = modal.querySelector(".modal-content");

    modalContent.innerHTML = `
      <span class="close">&times;</span>
      <img src="${product.image}" alt="${product.name}" />
      <h2>${product.name}</h2>
      <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
<p>${
      product.description && product.description.trim() !== ""
        ? product.description
        : ""
    }</p>      <button class="add-btn" data-id="${
      product.id
    }">Add to Cart</button>
    `;

    modal.style.display = "block";

    // إغلاق المودال بزرار X
    modal.querySelector(".close").onclick = () => {
      modal.style.display = "none";
    };

    // إغلاق المودال لما يضغط بره المحتوى
    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
}
