document.querySelectorAll('.dropdown-parent > a').forEach(link => {
  link.addEventListener('click', (e) => {
    const dropdown = link.nextElementSibling;
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    } else {
      dropdown.style.display = "block";
    }
  });
});

$(function () {

  $('.clients-carousel').owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    navText: [
      '<i class="fa-solid fa-arrow-left"></i>',
      '<i class="fa-solid fa-arrow-right"></i>'
    ],
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 1.2
      },
      1200: {
        items: 2.2
      }
    }
  });
});

$(".testimonials-slider").owlCarousel({
  loop: true,
  margin: 10,
  items: 1,
  nav: false,
  autoplay: false,
  dots: true,
  navText: [
    '<i class="fa-solid fa-angle-left"></i>',
    '<i class="fa-solid fa-angle-right"></i>'
  ]

});

// faq
$(document).ready(function () {
  $(".faqs-container .faq-singular:first-child").addClass("active").children(".faq-answer").slideDown();//Remove this line if you dont want the first item to be opened automatically.
  $(".faq-question").on("click", function () {
    if ($(this).parent().hasClass("active")) {
      $(this).next().slideUp();
      $(this).parent().removeClass("active");
    }
    else {
      $(".faq-answer").slideUp();
      $(".faq-singular").removeClass("active");
      $(this).parent().addClass("active");
      $(this).next().slideDown();
    }
  });
});

// counter section start
function animateCounter(element, target) {
  let count = 0;
  const screenSize = window.innerWidth;
  const speed = screenSize < 768 ? 100 : 200;

  const increment = target / speed;

  const updateCounter = () => {
    count += increment;
    if (count >= target) {
      element.textContent = target;
    } else {
      element.textContent = Math.ceil(count);
      requestAnimationFrame(updateCounter);
    }
  };

  updateCounter();
}
document.addEventListener('DOMContentLoaded', () => {
  const numbers = document.querySelectorAll('.number');

  numbers.forEach(number => {
    const target = +number.getAttribute('data-target');
    animateCounter(number, target);
  });
});
