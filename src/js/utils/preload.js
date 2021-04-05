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
  services && resizeServices();
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

  fixSVG();

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
  if (Width > 1280) y = 39;
  else if (Width > 768) y = 31;
  else y = 24;
  const texts = document.querySelectorAll('text');
  texts.forEach(el => {
    el.setAttribute('y', y);

    const { width, lineHeight } = window.getComputedStyle(
      el.closest('svg').previousElementSibling,
    );

    prepareSVGtext(
      el,
      Number(width.match(/\d+\,*\d*/g).join('.')),
      lineHeight.match(/\d+\,*\d*/g).join('.'),
    );
  });
}

function prepareSVGtext(el, width, y) {
  var element = el;
  var text = element.innerHTML;

  /* split the words into array */
  var words = text.split(' ');
  var line = '';
  let b = 0;

  /* Make a tspan for testing */
  element.innerHTML = '<tspan id="PROCESSING">busy</tspan >';

  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var testElem = document.getElementById('PROCESSING');
    /*  Add line in testElement */
    testElem.textContent = testLine;
    /* Messure textElement */
    var metrics = testElem.getBoundingClientRect();
    var testWidth = metrics.width;
    console.log(width, testWidth);

    if (testWidth > width && n > 0) {
      element.innerHTML +=
        '<tspan x="0" dy="' + ++b * y + '">' + line + '</tspan>';
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }

  element.innerHTML += '<tspan x="0" dy="' + b * y + '">' + line + '</tspan>';
  document.getElementById('PROCESSING').remove();
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
    acc = 3;
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

  timerOne = setTimeout(() => {
    services.style.height =
      active.scrollHeight <= 350
        ? Number(active.scrollHeight) + 40 + 'px'
        : Number(active.scrollHeight) + 'px';
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
