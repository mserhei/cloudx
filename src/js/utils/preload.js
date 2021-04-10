import slider from '../utils/slider';
const rootEl = document.getElementById('root');
const rootCont = document.getElementById('root-content');

const refs = {
  get container() {
    return document.querySelectorAll('section.container');
  },
  get services() {
    return document.querySelector('.services__main');
  },
};
const logo = document.querySelectorAll('.logo__image');

let containerTimeout;
let logoTimeout;
let resizeServicesTimer;
let scrollTimeout;
let containerIntroIdle;

function idleHandler(callback, timeout) {
  const handler = window.requestIdleCallback(callback, { timeout });
  return handler;
}

function clearTimoutsOnPop() {
  clearTimeout(containerTimeout);
  clearTimeout(logoTimeout);
  clearTimeout(resizeServicesTimer);
  clearTimeout(scrollTimeout);
}

const observer = new IntersectionObserver(entries => {
  window.cancelIdleCallback(containerIntroIdle);
  entries.forEach(entry => {
    const statisticsRef = document.getElementById('statistics');
    if (entry.target === statisticsRef) {
      startCircle(entry);
    }
    if (entry.isIntersecting) {
      containerIntroIdle = idleHandler(() => {
        entry.target.classList.add('present');
        if (entry.target !== statisticsRef) observer.unobserve(entry.target);
      }, 250);
    }
  });
});

observer.restartAtPreload = function () {
  observer.disconnect();
  refs.container.forEach(el => {
    observer.observe(el);
  });
};

function preload({ path }, hash) {
  if (slider.timer) slider.end();

  clearTimoutsOnPop();
  scrollToAnchor(hash);

  containerTimeout = setTimeout(() => {
    observer.restartAtPreload();
  }, 0);

  logo.forEach(el => el.classList.remove('in'));

  logoTimeout = setTimeout(
    () => logo.length && logo.forEach(el => el.classList.add('in')),
    400,
  );

  refs.services && resizeServices();
  refs.services && fixHomeSVGs();
}

function scrollToAnchor(hash) {
  if (hash) {
    rootCont.style.opacity = '0';
    const target = document.querySelector(hash);
    scrollTimeout = setTimeout(() => {
      rootCont.style.opacity = '1';
      rootEl.scrollTo({
        top: Math.round(target.offsetTop),
      });
    }, 500);
  } else
    rootEl.scrollTo({
      top: 0,
      behavoir: 'smooth',
    });
}

function fixHomeSVGs() {
  const serviceSvg = document.querySelector('text.services__svgtext');
  serviceSvg &&
    fixSVG(
      { initial: 13, phone: 16.5, tablet: 27, desktop: 41 },
      'text.services__svgtext',
      'end',
    );
  const statSvg = document.querySelector('text.statistics__svgtext');
  statSvg &&
    fixSVG(
      { phone: 85, tablet: 96, desktop: 112 },
      'text.statistics__svgtext',
      'end',
    );
}

function fixSVG({ initial, phone, tablet, desktop }, selector, position) {
  let y = 0;
  const Width = window.innerWidth;
  if (Width >= 1280) y = desktop;
  else if (Width >= 768) y = tablet;
  else y = phone;
  if (initial && Width < 480) y = initial;
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

function startCircle(entry) {
  const circle = document.querySelector('#statistics');
  const speed = document.querySelector('#speed');
  let timer = null;
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
}

function resizeServices(withClick = false) {
  let acc = 1;
  let wd = -50;
  const deviceWidth = getDeviceWidth();
  if (deviceWidth >= 1280) {
    acc = 2;
    wd = -100;
  } else if (deviceWidth >= 768) {
    acc = 2;
  }

  const services = document.querySelector('.services__main');
  const active = document.querySelector('.services__tab-list.active');
  const table = document.querySelector('.services__table');
  const tabs = document.querySelector('.services__tabs');
  const spark = document.querySelector('.services__spark');
  // const child = active.children[0];
  // const childrenAmount = active.children.length;
  table.style.width = '100%';

  // Array.from(active.children).map(el => (el.style.width = ''));

  resizeServicesTimer = setTimeout(() => {
    services.style.minHeight = tabs.scrollHeight + 'px';
    services.style.height = spark.style.height = active.scrollHeight + 'px';
    // if (childrenAmount < acc) {
    //   Array.from(active.children).map(
    //     el => (el.style.width = el.scrollWidth + 'px'),
    //   );
    //   table.style.width =
    //     (child.scrollWidth + 10) * childrenAmount +
    //     tabs.scrollWidth +
    //     30 +
    //     'px';
    // }
  }, 200);

  const { y } = services.getBoundingClientRect();
  const { y: Y } = rootCont.getBoundingClientRect();
  const top = wd - (Y - y);
  withClick &&
    root.scrollTo({
      top,
      behavoir: 'smooth',
    });
}

function getDeviceWidth(max = true) {
  if (max)
    return Math.max(
      window.innerWidth,
      document.documentElement.clientWidth,
      document.body.clientWidth,
    );
  else
    return Math.min(
      window.innerWidth,
      document.documentElement.clientWidth,
      document.body.clientWidth,
    );
}

export { resizeServices, fixSVG, fixHomeSVGs, getDeviceWidth };
export default preload;
