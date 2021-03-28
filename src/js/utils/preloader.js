import preloader from '../../templates/preloader.hbs';
import { stars } from './stars';

const measureAndFixScroll = function () {
  const cont = document.getElementById('root');
  const bodyOverflow = getComputedStyle(cont).overflowY;
  if (bodyOverflow === 'hidden') return;
  const scrollDiv = document.createElement('div');
  scrollDiv.className = 'scrollbar-measure';
  cont.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  cont.removeChild(scrollDiv);
  const { newPad, contRightPadRaw } = fixPad(cont, scrollbarWidth);
  cont.style.paddingRight = newPad;
  // setTimeout(() => {
  //   document.body.style.marginRight = `-${newPad}`;
  // }, 2000);
  return { contRightPadRaw, newPad };
};

function addPreloader(parent, option) {
  if (option) {
    const markup = preloader();
    if (parent) {
      parent.insertAdjacentHTML('afterbegin', markup);
    }
    delPreloader(option);
  }
  const { newPad, contRightPadRaw: initialPad } = !option
    ? measureAndFixScroll()
    : option;
  const rootEl = document.getElementById('root');
  if (!option) {
    rootEl.style.overflowY = 'hidden';
    rootEl.style.paddingRight = initialPad;
  }
  stars.setup();
  return { newPad, initialPad };
}
function delPreloader(newPad, initialPad) {
  const preloader = document.getElementById('id_preloader_backdrop');
  preloader.classList.add('faiding');
  const rootEl = document.getElementById('root');
  setTimeout(() => {
    stars.clearStars();
  }, 500);
  setTimeout(() => {
    preloader.remove();
    document.body.style.marginRight = `-${newPad}`;
    rootEl.style.overflowY = 'auto';
    rootEl.style.paddingRight = initialPad;
  }, 1000);
}

function fixPad(el, width) {
  const contRightPadRaw = getComputedStyle(el).paddingRight;

  const contRightPad = contRightPadRaw
    .split('')
    .filter(el => !el.search(/[0-9]/))
    .join('');
  const newPad = `${-(-contRightPad - width)}px`;
  return { contRightPadRaw, newPad };
}

export { measureAndFixScroll, addPreloader, delPreloader };
