let timer;

function movePad(event) {
  const rails = document.getElementById('scroll-rail');
  const pad = document.getElementById('scroll-pad');
  rails.style.opacity = '1';
  rails.style.transform = 'translateX(0px)';
  clearTimeout(timer);
  timer = setTimeout(() => {
    rails.style.opacity = '0';
    rails.style.transform = 'translateX(10px)';
    pad.style.height = '0';
  }, 2000);
  const rootCont = document.getElementById('root-content');
  const { height, y } = rootCont.getBoundingClientRect();
  const parentHeight = window.innerHeight;
  const childHeight = rootCont.scrollHeight + 140;
  const padHeight = Math.round(parentHeight ** 2 / childHeight);
  const position = (y * (parentHeight - padHeight)) / childHeight;
  pad.style.height = padHeight + 'px';
  pad.style.transform = `translateY(${-position}px)`;

  const header = document.querySelector('#hero-header-scroll');
  const planet = document.querySelector('.new-hero__planet');
  const server = document.querySelector('.new-hero__server');
  document.body.style.backgroundPositionY = `${-y * 0.02}px`;

  if (header) {
    planet.style.transform = `translate(${-y * 0.2}px, ${-y * 0.3}px) rotate(${(
      1 -
      y / 40
    ).toFixed(1)}deg) scale(${(1 + y / height).toFixed(2)})`;
    if (-y < 400) {
      header.style.transform = `translateY(${-y * 1.1}px)`;
      header.style.opacity = `${(1 + y / 400).toFixed(1)}`;
      server.style.transform = `translateY(${y * 0.2}px)`;
      server.style.opacity = `${(1 + y / 400).toFixed(1)}`;
    } else {
      header.style.opacity = '0';
      server.style.opacity = '0';
    }
  }
}

export default movePad;
