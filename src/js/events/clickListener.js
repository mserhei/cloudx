import { decideRout } from '../history/mainHistory';
import myModal from '../utils/modalClass';
import slider from '../utils/slider';
import openMenu from '../pages/burger';
import { lang } from '../history/mainHistory';
import { changeLangPath } from './changeListener';
import { save } from '../utils/storage';
import { resizeServices } from '../utils/preload';
import { clickMouse } from './mouseListener';

const drawHome = () => import('../pages/home');

export default function listenClicks(event) {
  clickMouse(event);

  if (event.target.classList.contains('social__link'))
    return event.preventDefault();

  if (event.target.id.includes('id_rout')) {
    event.preventDefault();
    render(event);
  }

  if (event.target.hasAttribute('data-modal')) {
    event.preventDefault();
    myModal.openModal(event);
  }

  if (event.target.hasAttribute('data-slide')) {
    slider.changeSlidesOnEvent(event);
  }

  if (event.target.hasAttribute('data-burger')) {
    event.preventDefault();
    openMenu(event);
  }

  if (event.target.hasAttribute('data-lang')) {
    const previousLang = lang.name;
    save('Lang', event.target.dataset.lang);
    const newLang = event.target.dataset.lang;
    const path = changeLangPath(previousLang, newLang);
    const index = path.indexOf('#');
    let href = null;
    if (index >= 0) href = path.slice(index);
    decideRout(path, href, true);
  }

  if (event.target.hasAttribute('data-form')) {
    event.preventDefault();
    const tabs = document.querySelectorAll('.modal__tab');
    const forms = document.querySelectorAll('.modal__form');
    if (!event.target.closest('.modal__tab').classList.contains('active'))
      tabs.forEach((el, i) => {
        el.classList.toggle('active');
        forms[i].classList.toggle('active');
      });
  }

  if (event.target.hasAttribute('data-service')) {
    event.preventDefault();
    if (!event.target.classList.contains('active')) {
      const serviceLinksRefs = document.querySelectorAll('a[data-service]');
      serviceLinksRefs.forEach(el => el.classList.remove('active'));
      event.target.classList.add('active');

      let ind = 0;
      const serviceLists = Array.from(
        document.querySelector('.services__main').children,
      );
      const services = Array.from(
        document.querySelector('.services__tabs').children,
      );
      const index = Number(event.target.dataset.service);

      services.forEach((el, i) => {
        if (el.classList.contains('current')) ind = i;
        el.classList.remove('current');
        if (i === index) el.classList.add('current');
      });
      if (index === ind) return;

      serviceLists.forEach((el, i) => {
        el.classList.remove('active');
        if (i === index) {
          el.classList.add('active');
        }
      });

      resizeServices(true);
    }
  }
}

function render(e) {
  if (e.target.hasAttribute('disabled')) return;
  if (e.target.hasAttribute('data-id')) clearAccent();
  const path = e.target.getAttribute('href');
  const index = path.indexOf('#');
  let href = null;
  if (index >= 0) href = path.slice(index);
  decideRout(path, href);
  if (document.getElementById('id_nav').classList.contains('open'))
    document.getElementById('burger-menu').click();
}

function makeAccent({ path }) {
  clearAccent();
  if (path.split('/').reverse()[0] === lang.name) path = '/';
  let target = document.querySelector(`[href='${path}']`);
  if (location.hash) target = document.querySelector(`[href*='${path}']`);
  if (target) {
    target.classList.add('coloured');
    target.setAttribute('disabled', '');
  }
}

function clearAccent() {
  const accent = document.querySelector('.coloured');
  if (!accent) return;
  accent.classList.remove('coloured');
  accent.removeAttribute('disabled');
}

export { makeAccent };
