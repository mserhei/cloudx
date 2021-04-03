let mouseTimer;

function listenMouse(event) {
  drawCursor(event);
  !mouseTimer && listenMouseOver(event);
}

const mouse = document.querySelector('.mouse');
const rocket = document.querySelector('.mouse__hover-ring');

function drawCursor(e) {
  const windowWidth = window.innerWidth;
  let deg = 0;
  if (windowWidth / 2 > e.x) {
    deg = -45 * (1 - (e.x / windowWidth) * 2);
  } else {
    deg = ((45 * (e.x - windowWidth / 2)) / windowWidth) * 2;
  }
  mouse.style.transform = `translate(${e.x}px, ${e.y}px) rotate(${deg}deg)`;
  if (e.x > windowWidth - 10 || e.x < 10 || e.y < 10) mouse.style.opacity = '0';
  else if (e.target.closest('form') && !e.target.hasAttribute('data-mouse'))
    mouse.style.opacity = '0';
  else mouse.style.opacity = '1';
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
    } else {
      rocket.style.opacity = '0';
      rocket.style.transform = 'scale(0)';
    }
  } else {
    rocket.style.opacity = '0';
    rocket.style.transform = 'scale(0)';
  }
}

function clickMouse(event) {
  clearTimeout(mouseTimer);
  rocket.style.opacity = '1';
  rocket.style.transform = 'scale(2)';
  mouseTimer = setTimeout(() => {
    rocket.style.opacity = '0';
    rocket.style.transform = 'scale(1.1)';
    mouseTimer = null;
    listenMouseOver(event);
  }, 250);
}

export default listenMouse;
export { clickMouse };
