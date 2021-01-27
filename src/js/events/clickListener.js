import { decideRout } from '../history/mainHistory';
import myModal from '../utils/modalClass';

export default function listenClicks(event) {
  if (event.target.id.includes('id_rout')) {
    event.preventDefault();
    render(event);
  }
  if (event.target.hasAttribute('data-modal')) {
    event.preventDefault();
    myModal.openModal(event);
  }
}

function render(e) {
  if (e.target.hasAttribute('disabled')) return;
  if (e.target.hasAttribute('data-id')) clearAccent();
  const path = e.target.getAttribute('href');
  decideRout(path);
}

function makeAccent({ path }) {
  const target = document.querySelector(`[href='${path}']`);
  clearAccent();
  target
    .closest('ul')
    .querySelectorAll('a')
    .forEach(el => el.removeAttribute('disabled'));
  target.classList.add('coloured');
  target.setAttribute('disabled', '');
}

function clearAccent() {
  const accent = document.querySelector('.coloured');
  accent && accent.classList.remove('coloured');
}

export { makeAccent };
