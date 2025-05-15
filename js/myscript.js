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

$(".catering_slider").owlCarousel({
  loop: true,
  margin: 10,
  items: 1,
  nav: false,
  autoplay: false,
  dots: true,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    }
  }
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


// pagination & FIlter
document.addEventListener("DOMContentLoaded", function () {
  const cards = Array.from(document.querySelectorAll(".card"));
  const filters = {
    service: null,
    type: null,
    cuisine: null,
    food: null
  };

  const perPage = 9;
  let currentPage = 1;

  const appliedFiltersContainer = document.getElementById("appliedFiltersContainer");
  const clearBtns = document.querySelectorAll("#clearFilters");
  const cardsContainer = document.getElementById("cardsContainer");
  const noProductsMessage = document.getElementById("noProductsMessage");
  const currentPageInput = document.getElementById("currentPageInput");
  const totalPagesEl = document.getElementById("totalPages");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const goBtn = document.getElementById("goBtn");
  const previousBtn = document.getElementById("previousBtn");
  const paginationWrapper = document.querySelector(".pagination-wrapper");

  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("searchInput");

  let searchQuery = ""; // To hold the search query

  // Add event listeners for filter buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const group = btn.getAttribute("data-group");
      const value = btn.getAttribute("data-filter");

      // Handle the "ALL" filter button
      if (value === 'all') {
        filters[group] = null; // Reset the food filter to show all products
        filterButtons.forEach((b) => b.classList.remove("active")); // Remove 'active' class from all buttons
        btn.classList.add("active"); // Add 'active' class to the clicked 'ALL' button
      } else {
        // Toggle filter value for other buttons
        filters[group] = filters[group] === value ? null : value;
        filterButtons.forEach((b) => {
          if (b.getAttribute("data-group") === group) {
            b.classList.remove("active");
          }
        });
        btn.classList.add("active");
      }

      currentPage = 1;  // Reset to the first page after filter change
      updateFilters();
    });
  });

  // Add event listener for search input
  searchInput.addEventListener("input", function () {
    searchQuery = searchInput.value.toLowerCase();  // Capture the search input
    currentPage = 1;  // Reset to the first page on search
    updateFilters();  // Update the filtered cards
  });

  // Function to update the applied filters display
  function updateAppliedFilters() {
    appliedFiltersContainer.innerHTML = "";

    for (const group in filters) {
      if (filters[group]) {
        const span = document.createElement("span");
        // span.textContent = `${group}: ${filters[group]} `;
        span.textContent = `${filters[group]} `;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "x";
        removeBtn.classList.add("remove-filter-btn");

        // Add click event to the "Remove" button
        removeBtn.addEventListener("click", () => {
          filters[group] = null;
          updateFilters();
        });

        span.appendChild(removeBtn);
        appliedFiltersContainer.appendChild(span);
      }
    }
  }

  // Function to update the displayed cards based on the filters and search query
  function updateFilters() {
    const filteredCards = cards.filter((card) => {
      const cardText = card.textContent.toLowerCase(); // Get the text content of the card

      // Apply filters
      const matchesFilters =
        (!filters.service || card.classList.contains(filters.service)) &&
        (!filters.type || card.classList.contains(filters.type)) &&
        (!filters.cuisine || card.classList.contains(filters.cuisine)) &&
        (!filters.food || card.classList.contains(filters.food));

      // Check if the card matches the search query
      const matchesSearch = cardText.includes(searchQuery);

      return matchesFilters && matchesSearch;
    });

    // Display or hide "No products found" message
    noProductsMessage.style.display = filteredCards.length === 0 ? "block" : "none";

    // Pagination logic
    const totalPages = Math.ceil(filteredCards.length / perPage) || 1;
    totalPagesEl.textContent = totalPages;
    currentPageInput.value = currentPage;

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    // Hide all cards initially
    cards.forEach((card) => card.style.display = "none");

    // Show the filtered and paginated cards
    filteredCards.slice(start, end).forEach((card) => {
      card.style.display = "block";
    });

    updateAppliedFilters();

    // Show/hide previous button based on current page
    if (currentPage === 1) {
      previousBtn.style.display = "none"; // Hide "previous" on the first page
    } else {
      previousBtn.style.display = "inline-block"; // Show "previous" from the second page
    }

    // Show/hide next button based on total pages and current page
    if (currentPage === totalPages) {
      nextBtn.style.display = "none"; // Hide "next" on the last page
      goBtn.style.display = "none"; // Hide "Go" on the last page
    } else {
      nextBtn.style.display = "inline-block"; // Show "next" on all pages except the last
      goBtn.style.display = "inline-block"; // Show "Go" on pages before the last
    }

    // Hide pagination section if less than 9 cards
    if (filteredCards.length <= perPage) {
      paginationWrapper.style.display = "none";
    } else {
      paginationWrapper.style.display = "block";
    }
  }

  // Event listeners for clearing filters
  clearBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Reset all filters
      for (const group in filters) {
        filters[group] = null;
      }
      filterButtons.forEach((b) => b.classList.remove("active"));
      currentPage = 1;  // Reset to the first page
      updateFilters();
    });
  });

  // Event listener for the "Previous" button in pagination
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updateFilters();
    }
  });

  // Event listener for the "Next" button in pagination
  nextBtn.addEventListener("click", () => {
    const filteredCards = cards.filter((card) => {
      const cardText = card.textContent.toLowerCase();
      const matchesFilters =
        (!filters.service || card.classList.contains(filters.service)) &&
        (!filters.type || card.classList.contains(filters.type)) &&
        (!filters.cuisine || card.classList.contains(filters.cuisine)) &&
        (!filters.food || card.classList.contains(filters.food));
      const matchesSearch = cardText.includes(searchQuery);
      return matchesFilters && matchesSearch;
    });
    const totalPages = Math.ceil(filteredCards.length / perPage) || 1;

    if (currentPage < totalPages) {
      currentPage++;
      updateFilters();
    }
  });

  // Event listener for the "Go" button (next page)
  goBtn.addEventListener("click", () => {
    nextBtn.click();
  });

  // Event listener for the "Previous Page" button
  previousBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updateFilters();
    }
  });

  updateFilters(); // Initial run to display cards based on initial state
});





// detail filter open
$('.reveal-click').click(function () {
  let panel = $('.service_listing .service_lft');
  if (panel.is(':visible')) {
    panel.animate({ width: '0' }, 300, function () {
      panel.hide();
    });
  } else {
    panel.show().animate({ width: '100%' }, 300); // or your default width
  }

  $(this).toggleClass('clientsClose');
});



// const deliverTriggers = document.querySelectorAll('.edit_deliver');
// const deliverContent = document.querySelector('.deliver_pick');

// function openDeliverPopup() {
//   deliverContent.style.display = 'block';
// }

// function closeDeliverPopup() {
//   deliverContent.style.display = 'none';
// }

// deliverTriggers.forEach(trigger => {
//   trigger.addEventListener('click', openDeliverPopup);
// });


// light box close
$('.light-click').click(function () {
  let panel = $('.lightbox');
  if (panel.is(':visible')) {
    panel.animate({ width: '0' }, 300, function () {
      panel.hide();
    });
  } else {
    panel.show().animate({ width: '100%' }, 300); // or your default width
  }

  $(this).toggleClass('clientsClose');
});

// lightbox add item
$('.add-item').click(function () {
  let panel = $('.lightbox');


  if (!panel.is(':visible')) {
    panel.show().animate({ width: '100%' }, 300);
  }

  $(this).addClass('clientsClose');
});

// Detail cart open

$('.mobcart-click').click(function () {
  let panel = $('.detail_main .detail_cart');
  if (panel.is(':visible')) {
    panel.animate({ width: '0' }, 300, function () {
      panel.hide();
    });
  } else {
    panel.show().animate({ width: '100%' }, 300); // or your default width
  }

  $(this).toggleClass('clientsClose');
});



// detail filter

const lightbox = document.getElementById('lightbox');
const gallery = lightbox.querySelector('.dish_gallery');
let currentGrid = null; // Track the current grid the user is working with.

// When "+" button clicked (in the main-rightmenu)
function addNewItem(sectionId) {
  currentGrid = document.getElementById(sectionId);  // Set the current grid based on the section clicked
  lightbox.classList.add('show');
}

// After clicking an image in the lightbox, the item should be uploaded to the correct section
gallery.addEventListener('click', function (event) {
  if (event.target.tagName === 'IMG') {
    // Find the parent item card's data-group attribute to determine which grid the item belongs to
    const parentItemCard = event.target.closest('.item-card');
    const dataGroup = parentItemCard ? parentItemCard.getAttribute('data-group') : null;

    // Get the item name from the <p> inside the clicked item
    const itemNameElement = parentItemCard ? parentItemCard.querySelector('p') : null;
    const itemName = itemNameElement ? itemNameElement.innerText.trim() : 'Item';

    if (dataGroup) {
      // Find the grid where the item should go based on data-group
      const targetGrid = document.getElementById(dataGroup);

      if (targetGrid) {
        // Create a new item card with the clicked image
        const newItem = document.createElement('div');
        newItem.classList.add('item-card');
        newItem.setAttribute('data-group', dataGroup); // Set dynamic data-group

        newItem.innerHTML = `
          <div class="menu_cardimg">
            <img src="${event.target.src}" alt="${itemName}">
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
          </div>
          <p>${itemName}</p>
        `;

        // Insert the new item into the correct grid in main-rightmenu
        const addItemBox = targetGrid.querySelector('.add-item');  // The "+ button" in the target grid
        targetGrid.insertBefore(newItem, addItemBox);  // Place it before the "+ button"

        // Close the lightbox
        lightbox.classList.remove('show');
      }
    }
  }
});

// Close the lightbox when clicking outside the image
lightbox.addEventListener('click', function (event) {
  if (event.target === lightbox) {
    lightbox.classList.remove('show');
  }
});

// Delegate delete button events from a parent container
document.querySelector('.main-rightmenu').addEventListener('click', function (event) {
  if (event.target && event.target.classList.contains('delete-btn')) {
    const itemCard = event.target.closest('.item-card');
    if (itemCard) {
      itemCard.remove();  // Remove the parent .item-card
    }
  }
});

// Create custom menus
document.querySelectorAll('.create-menu').forEach(button => {
  button.addEventListener('click', function () {
    // Select all item-cards inside all items-grid in the main-rightmenu
    const allItemGrids = document.querySelectorAll('.main-rightmenu .items-grid');

    // Loop through all items-grids and remove all item-cards
    allItemGrids.forEach(grid => {
      const itemCards = grid.querySelectorAll('.item-card');
      itemCards.forEach(card => card.remove());
    });
  });
});


// 

// Get all checkboxes and menu buttons
const checkboxes = document.querySelectorAll('.menu-section input[type="checkbox"]');
const menuButtons = document.querySelectorAll('.menu-section .menu-item[data-group]');
const showAllBtn = document.getElementById('showAllBtn'); // Get the Show All button

// Listen for changes on checkboxes
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    filterItems();
  });
});

// Listen for clicks on menu buttons
menuButtons.forEach(button => {
  button.addEventListener('click', function () {
    // Toggle active class
    if (button.classList.contains('active')) {
      button.classList.remove('active');
    } else {
      menuButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    }
    filterItems();
  });
});

// Listen for click on "Show All" button
showAllBtn.addEventListener('click', function () {
  // Uncheck all checkboxes
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  // Remove active class from all menu buttons
  menuButtons.forEach(button => {
    button.classList.remove('active');
  });

  // Now show all items
  filterItems();
});

// Filter function
function filterItems() {
  const selectedFilters = [];
  const activeButton = document.querySelector('.menu-section .menu-item.active');

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectedFilters.push(checkbox.getAttribute('data-group'));
    }
  });

  if (activeButton) {
    selectedFilters.push(activeButton.getAttribute('data-group'));
  }

  const itemCards = document.querySelectorAll('.item-card');

  if (selectedFilters.length === 0) {
    // No filters selected → Show all
    itemCards.forEach(card => {
      card.style.display = 'block';
    });
  } else {
    // Some filters selected → Filter
    itemCards.forEach(card => {
      const dataGroups = (card.getAttribute('data-group') || "").split(' ');

      const matchesFilter = selectedFilters.some(filter => dataGroups.includes(filter));

      if (matchesFilter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  filterItems();
});


const tabs = document.querySelectorAll('.main_dish .tab');

// Click event to scroll with 20px offset
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const target = document.querySelector(tab.getAttribute('data-target'));
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 10;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});


// Scroll event to update active tab
const sectionMap = Array.from(tabs).map(tab => ({
  tab,
  section: document.querySelector(tab.getAttribute('data-target'))
}));

window.addEventListener('scroll', () => {
  let scrollPosition = window.scrollY + 200; // Offset for early switch
  let current = null;

  sectionMap.forEach(({ tab, section }) => {
    if (section.offsetTop <= scrollPosition) {
      current = tab;
    }
  });

  if (current) {
    tabs.forEach(t => t.classList.remove('active'));
    current.classList.add('active');
  }
});

$('.menufilt-click').click(function () {
  let panel = $('#menu_detail .left_sidebar');
  if (panel.is(':visible')) {
    panel.animate({ width: '0' }, 300, function () {
      panel.hide();
    });
  } else {
    panel.show().animate({ width: '100%' }, 300); // or your default width
  }

  $(this).toggleClass('clientsClose');
});





