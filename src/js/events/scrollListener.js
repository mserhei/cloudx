let timer;

const myMobile = {
  Android() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any() {
    return (
      myMobile.Android() ||
      myMobile.BlackBerry() ||
      myMobile.iOS() ||
      myMobile.Opera() ||
      myMobile.Windows()
    );
  },
};

function listenScroll(event) {
  const header = document.querySelector('#hero-header-scroll');
  const val = window.scrollY;
  console.log(val);
  if (header) {
    console.log(val);
    header.style.transform = `translateY(${val * 0.5}px)`;
  }
}

function movePad(event) {
  if (myMobile.any()) return;
  const head = document.querySelector('.header');
  const { height: headHeight } = window.getComputedStyle(head);
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

  const rootRel = document.getElementById('root');
  const rootCont = document.getElementById('root-content');
  const { y: Y } = rootRel.getBoundingClientRect();
  const { y } = rootCont.getBoundingClientRect();
  const parentHeight = rootRel.offsetHeight;
  const childHeight = rootCont.offsetHeight;

  const top = Array.from(headHeight.matchAll(/[0-9]/g)).join('');
  const padHeight = Math.round(parentHeight ** 2 / (childHeight - top));
  const position = ((y - top) * parentHeight) / childHeight;
  pad.style.height = padHeight + 'px';
  pad.style.transform = `translateY(${-position}px)`;

  const header = document.querySelector('#hero-header-scroll');
  const planet = document.querySelector('.new-hero__planet');
  const server = document.querySelector('.new-hero__server');
  if (header) {
    if (-y < 400) {
      header.style.transform = `translateY(${-y * 1.1}px)`;
      header.style.opacity = `${(1 + y / 400).toFixed(1)}`;
      planet.style.transform = `scale(${(1 - y / 800).toFixed(1)}) rotate(${(
        1 -
        y / 20
      ).toFixed(1)}deg)`;
      server.style.transform = `translate(${-y}px, ${-y * 1.5}px)`;
      server.style.opacity = `${(1 + y / 400).toFixed(1)}`;
    }
  }
}

export { movePad };
export default listenScroll;
