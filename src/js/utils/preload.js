import slider from '../utils/slider';
const rootEl = document.getElementById('root');
const rootCont = document.getElementById('root-content');

const observer = new IntersectionObserver(startCircle, {
  threshold: 0.1,
});

const aboutObserver = new IntersectionObserver(entries =>
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('present'), 250);
    }
  }),
);

function preload({ path }, hash) {
  const container = document.querySelectorAll('section.container');
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
  setTimeout(() => container[0].classList.add('present'), 0);
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
  services && resizeServices();
  const serviceSvg = document.querySelector('text.services__svgtext');
  serviceSvg &&
    fixSVG(
      { phone: 16.5, tablet: 27, desktop: 41 },
      'text.services__svgtext',
      'start',
    );
  const statSvg = document.querySelector('text.statistics__svgtext');
  statSvg && fixSVG('text.statistics__svgtext', 'end');
}

function fixSVG({ phone, tablet, desktop }, selector, position) {
  let y = 0;
  const Width = window.innerWidth;
  if (Width > 1280) y = desktop;
  else if (Width > 768) y = tablet;
  else y = phone;
  const texts = document.querySelectorAll(selector);
  texts.forEach(el => {
    const { width, lineHeight } = window.getComputedStyle(el.closest('svg'));
    const textRef = el.innerHTML.replace(/<[^>]*>/g, ' ');
    el.setAttribute('y', y);
    el.setAttribute('x', width);

    prepareSVGtext(
      el,
      textRef,
      Number(width.match(/\d+\,*\d*/g).join('.')),
      lineHeight.match(/\d+\,*\d*/g).join('.'),
      position,
    );
  });
}

function prepareSVGtext(el, textRef, Width, y, textAnchor) {
  const words = textRef
    .replace(/\s{2,}/g, ' ')
    .trim()
    .split(' ');

  let results = '';
  let line = '';
  let b = 0;
  let x = textAnchor === 'end' ? Width : 0;

  words.map((word, i) => {
    const test = `${line} ${word}`.trim();
    el.innerHTML = test;
    const width = el.getComputedTextLength();
    if (width >= Width && i !== 0) {
      results += `<tspan x="${x}" dy="${
        b++ * y
      }" text-anchor="${textAnchor}">${line}</tspan>`;
      line = word;
    } else {
      line = test;
    }
  });

  results += `<tspan x="${x}" dy="${
    b * y
  }" text-anchor="${textAnchor}">${line}</tspan>`;

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

function resizeServices() {
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
  const spark = document.querySelector('.services__spark');
  const child = active.children[0];
  const childrenAmount = active.children.length;
  table.style.width = '100%';

  Array.from(active.children).map(el => (el.style.width = ''));

  timerOne = setTimeout(() => {
    services.style.minHeight = tabs.scrollHeight + 40 + 'px';
    services.style.height = spark.style.height = active.scrollHeight + 'px';
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
