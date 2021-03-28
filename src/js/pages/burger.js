export default function openMenu(event) {
  const burger = document.getElementById('burger-menu');
  const expanded = burger.getAttribute('aria-expanded') === 'true' || false;
  burger.setAttribute('aria-expanded', !expanded);
  Array.from(burger.children).map(el => el.classList.toggle('closed'));
  const nav = document.getElementById('id_nav');
  nav.classList.toggle('open');
  burger.blur();
  return 1;
}
