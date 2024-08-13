'use strict';

// Selectors
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnLoadMore = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelector('.nav__links');
const allSection = document.querySelectorAll('.section');

/////////////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////
// Smooth Scroll behavior

btnLoadMore.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Navigation links
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/////////////////////////////////////////////////
// Active tab
const btnTabContainer = document.querySelector('.operations__tab-container');
const btnTabAll = document.querySelectorAll('.operations__tab');
const tabContentAll = document.querySelectorAll('.operations__content');

btnTabContainer.addEventListener('click', function (e) {
  const tab = e.target.closest('.operations__tab');

  // Guard clause
  if (!tab) return;

  // Remove active class
  btnTabAll.forEach((tab) => tab.classList.remove('operations__tab--active'));
  tabContentAll.forEach((content) =>
    content.classList.remove('operations__content--active')
  );

  // Add active class to tab
  tab.classList.add('operations__tab--active');

  // Add active class to content
  document
    .querySelector(`.operations__content--${tab.dataset.tab}`)
    .classList.add('operations__content--active');
});

////////////////////////////////////////////////////
// Menu fade animation

// Add hover effect for menu items
navLinks.addEventListener('mouseover', (event) => {
  const hoveredItem = event.target.closest('.nav__item');

  if (hoveredItem) {
    // Set opacity for all items to create a fade effect
    navLinks.querySelectorAll('.nav__item').forEach((item) => {
      item.style.opacity = 0.5;
    });

    // Restore opacity for the hovered item
    hoveredItem.style.opacity = 1;
  }
});

// Reset opacity when mouse leaves the navigation
navLinks.addEventListener('mouseout', () => {
  navLinks.querySelectorAll('.nav__item').forEach((item) => {
    item.style.opacity = 1;
  });
});

////////////////////////////////////////////////////
// Sticky navigation

const navHeight = nav.getBoundingClientRect().height;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        nav.classList.remove('sticky');
      } else {
        nav.classList.add('sticky');
      }
    });
  },
  {
    threshold: 0,
    root: null,
    rootMargin: `-${navHeight}px`,
  }
);

observer.observe(header);

////////////////////////////////////////////////////
// Reveal Section

const option = {
  root: null,
  threshold: 0.15,
};

const sectionObserverCallback = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(
  sectionObserverCallback,
  option
);

allSection.forEach((section) => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});
