import slider from '../utils/slider';
import routers from '../history/routers';
const rootEl = document.getElementById('root');
const rootCont = document.getElementById('root-content');

const observer = new IntersectionObserver(startCircle, {
  threshold: 0.1,
});

const aboutObserver = new IntersectionObserver(
  entries =>
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('present'), 250);
      }
    }),
  {
    threshold: 0.1,
  },
);

function preload({ path }, hash) {
  const container = document.querySelectorAll('.container');
  const logo = document.querySelectorAll('.logo__image');
  if (slider.timer) slider.end();
  logo.forEach(el => el.classList.remove('in'));
  const circle = document.querySelector('#statistics');
  circle ? observer.observe(circle) : observer.disconnect();
  const services = document.querySelector('.services__main');
  aboutObserver.disconnect();
  container.forEach(el => {
    el.classList.remove('present');
    aboutObserver.observe(el);
  });
  if (hash) {
    rootCont.style.opacity = '0';
    const target = document.querySelector(hash);
    setTimeout(() => {
      rootCont.style.opacity = '1';
      rootEl.scrollTo({
        top: Math.round(target.offsetTop),
      });
    }, 500);
  } else {
    rootEl.scrollTo({
      top: 0,
      behavoir: 'smooth',
    });
  }
  setTimeout(
    () => logo.length && logo.forEach(el => el.classList.add('in')),
    400,
  );
  services && resizeServices(true);

  // texts.forEach(
  //   el =>
  //     (el.innerHTML = el.innerHTML
  //       .split(' ')
  //       .reduce(
  //         (acc, e, i) => (acc += `<tspan x="0" dy="${i * 20}">${e} </tspan>`),
  //         '',
  //       )),
  // );

  // texts.forEach(el => prepareSVGtext(el));
}

function fixSVG() {
  let y = 0;
  let Width = window.innerWidth;
  if (Width > 1280) y = 41;
  else if (Width > 768) y = 27;
  else y = 16.5;
  const texts = document.querySelectorAll('text');
  texts.forEach(el => {
    el.setAttribute('y', y);

    const { width, lineHeight } = window.getComputedStyle(el.closest('svg'));

    prepareSVGtext(
      el,
      Number(width.match(/\d+\,*\d*/g).join('.')),
      lineHeight.match(/\d+\,*\d*/g).join('.'),
    );
  });
}

function prepareSVGtext(el, Width, y) {
  const words = el
    .closest('svg')
    .previousElementSibling.innerHTML.replace(/<[^>]*>/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .split(' ');

  let results = '';
  let line = '';
  let b = 0;

  words.map((word, i) => {
    const test = `${line} ${word}`.trim();
    el.innerHTML = test;
    const width = el.getComputedTextLength();
    if (width >= Width && i !== 0) {
      results += `<tspan x="0" dy="${b++ * y}">${line}</tspan>`;
      console.log('longer', test, width, Width);
      line = word;
    } else {
      line = test;
      console.log('not longer', test, width, Width);
    }
  });

  results += `<tspan x="0" dy="${b * y}">${line}</tspan>`;

  el.innerHTML = results;
}

function startCircle(entries) {
  const circle = document.querySelector('#statistics');
  const speed = document.querySelector('#speed');
  let timer = null;
  entries.forEach(entry => {
    let count = 1;
    if (entry.isIntersecting) {
      circle.classList.add('hover');
      clearInterval(timer);
      timer = setInterval(() => {
        count += 5.5;
        if (count === 100) {
          count = 99.9;
          clearInterval(timer);
        }
        speed.textContent = count.toFixed(1) + ' %';
      }, 100);
    } else {
      circle.classList.remove('hover');
      speed.textContent = '0 %';
    }
  });
}

let timerOne;

function resizeServices(fix = false) {
  clearTimeout(timerOne);

  let acc = 1;
  const deviceWidth = window.innerWidth;
  if (deviceWidth >= 1280) {
    acc = 2;
  } else if (deviceWidth >= 768) {
    acc = 2;
  }

  const services = document.querySelector('.services__main');
  const active = document.querySelector('.services__tab-list.active');
  const table = document.querySelector('.services__table');
  const tabs = document.querySelector('.services__tabs');
  const child = active.children[0];
  const childrenAmount = active.children.length;
  table.style.width = '100%';

  Array.from(active.children).map(el => (el.style.width = ''));

  fix && fixSVG();

  timerOne = setTimeout(() => {
    services.style.minHeight = tabs.scrollHeight + 40 + 'px';
    services.style.height = active.scrollHeight + 'px';
    if (childrenAmount < acc) {
      Array.from(active.children).map(
        el => (el.style.width = el.scrollWidth + 'px'),
      );
      table.style.width =
        (child.scrollWidth + 10) * childrenAmount +
        tabs.scrollWidth +
        30 +
        'px';
    }
  }, 200);
}

export { resizeServices, fixSVG };
export default preload;
