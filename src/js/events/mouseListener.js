import { myMobile } from './scrollListener';

let mouseTimer;
let opacityTimeout;

function listenMouse(event) {
  if (myMobile.any()) return;
  drawCursor(event);
  !mouseTimer && listenMouseOver(event);
}

const mouse = document.querySelector('.mouse');
const mouseCircle = document.querySelector('.white-circle');
const rocket = document.querySelector('.mouse__hover-ring');

function drawCursor(e) {
  clearTimeout(opacityTimeout);
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const header = document.querySelector('#hero-header-move');

  let headerX = 0;
  let headerY = 0;

  let deg = 0;
  if (windowWidth / 2 > e.x) {
    deg = -45 * (1 - (e.x / windowWidth) * 2);
    headerX = -deg / 4.5;
  } else {
    deg = ((45 * (e.x - windowWidth / 2)) / windowWidth) * 2;
    headerX = -deg / 4.5;
  }
  if (windowHeight / 2 > e.y) {
    headerY = 10 * (1 - (e.y / windowWidth) * 2);
  } else {
    headerY = -((10 * (e.y - windowWidth / 2)) / windowWidth) * 2;
  }
  if (header) header.style.transform = `translate(${headerX}px, ${headerY}px)`;

  mouse.style.transform = `translate(${e.x}px, ${e.y}px) rotate(${deg}deg)`;
  if (e.x > windowWidth - 20 || e.x < 20 || e.y < 20) mouse.style.opacity = '0';
  else if (e.target.closest('form') && !e.target.hasAttribute('data-mouse'))
    mouse.style.opacity = '0';
  else mouse.style.opacity = '1';
  opacityTimeout = setTimeout(() => (mouse.style.opacity = '0'), 1000);
}

function listenMouseOver(event) {
  if (
    event.target.nodeName === 'A' ||
    event.target.nodeName === 'BUTTON' ||
    event.target.hasAttribute('data-mouse')
  ) {
    if (!event.target.classList.contains('active')) {
      rocket.style.opacity = '1';
      rocket.style.transform = 'scale(1.1)';
      if (mouseCircle) mouseCircle.style.boxShadow = 'none';
      return;
    }
  }
  if (mouseCircle) mouseCircle.style.boxShadow = '';
  rocket.style.opacity = '0';
  rocket.style.transform = 'scale(0)';
}

function clickMouse(event) {
  clearTimeout(mouseTimer);
  rocket.style.opacity = '1';
  rocket.style.transform = 'scale(1.4)';
  mouseTimer = setTimeout(() => {
    rocket.style.opacity = '0';
    rocket.style.transform = 'scale(1.1)';
    mouseTimer = null;
    listenMouseOver(event);
  }, 250);
}

function changeMouse() {
  document.querySelector('.mouse__rocket').classList.toggle('white-circle');
}

export default listenMouse;
export { clickMouse, changeMouse };
