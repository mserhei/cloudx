function listenMouse(event) {
  drawCursor(event);
}

function drawCursor(e) {
  const windowWidth = window.innerWidth;
  let deg = 0;
  if (windowWidth / 2 > e.x) {
    deg = -45 * (1 - (e.x / windowWidth) * 2);
  } else {
    deg = ((45 * (e.x - windowWidth / 2)) / windowWidth) * 2;
  }
  const mouse = document.querySelector('.mouse');
  mouse.style.transform = `translate(${e.x}px, ${e.y}px) rotate(${deg}deg)`;
  if (e.x > windowWidth - 10 || e.x < 10 || e.y < 10) mouse.style.opacity = '0';
  else mouse.style.opacity = '1';
}

function listenMouseOver(event) {
  const rocket = document.querySelector('.mouse__hover-ring');
  if (event.target.nodeName === 'A' || event.target.nodeName === 'BUTTON') {
    if (!event.target.classList.contains('active')) {
      rocket.style.opacity = '1';
      rocket.style.transform = 'scale(1.1)';
    } else {
      rocket.style.opacity = '0';
      rocket.style.transform = 'scale(0)';
    }
  }
}

export default listenMouse;
export { listenMouseOver };
