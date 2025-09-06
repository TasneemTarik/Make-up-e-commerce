const track = document.querySelector(".brand-logos");
const dots = document.querySelectorAll(".dot");

let index = 0;
const slideWidth = 900 / 4; // نفس عرض الـ section
const totalSlides = dots.length;

// تغيير السلايد
function showSlide(i) {
  index = i;
  track.style.transform = `translateX(-${index * slideWidth}px)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

// auto play
setInterval(() => {
  index = (index + 1) % totalSlides;
  showSlide(index);
}, 4000);

// click on dots
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showSlide(i);
  });
});
