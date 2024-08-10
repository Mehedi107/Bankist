'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////
// Smooth Scroll behavior

const btnLoadMore = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

btnLoadMore.addEventListener('click', function(e) {
section1.scrollIntoView({behavior:'smooth'})
})

// Navigation links
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault()

  // Matching strategy
  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior:'smooth'})
  }
})