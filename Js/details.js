document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("detailsModal");
  const span = document.querySelector(".close");
  const continueBtn = document.querySelector(".continue");
  const goCartBtn = document.querySelector(".go-cart");

  // لما يضغط Add to Cart → افتح البوب أب
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-btn")) {
      modal.style.display = "block";
    }
  });

  // يقفل عند الضغط على X
  span.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // يقفل عند الضغط برة
  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });

  // Continue Shopping → يقفل البوب أب
  continueBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Go to Cart → يوديه لصفحة الكارت
  goCartBtn.addEventListener("click", () => {
    window.location.href = "../Cart.html";
  });
});
