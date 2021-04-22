const headerAuthBtn = document.querySelector('.header__buttons_modal-button');
const headerAuthModal = document.querySelector('.header__auth');
const headerAuthClose = document.querySelector('.header__auth_close');

headerAuthBtn.addEventListener('click', () => {
  headerAuthModal.classList.toggle('active');
})

headerAuthClose.addEventListener('click', () => {
  headerAuthModal.classList.remove('active');
})

document.addEventListener('scroll', () => {
  headerAuthModal.classList.remove('active');
})



