const measureAndFixScroll = function () {
  const bodyOverflow = getComputedStyle(document.body).overflowY;
  if (bodyOverflow === 'hidden') return;
  const scrollDiv = document.createElement('div');
  scrollDiv.className = 'scrollbar-measure';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  const cont = document.body;
  const contRightPadRaw = getComputedStyle(cont).paddingRight;
  const contRightPad = contRightPadRaw
    .split('')
    .filter(el => !el.search(/[0-9]/))
    .join('');
  cont.style.paddingRight = `${-(-contRightPad - scrollbarWidth)}px`;
  return contRightPadRaw;
};

const addPreloader = (parent, option) => {
  const markup =
    '<div class="preloader-backdrop" id="id_preloader-bacdrop"><div class="preloader"></div></div>';
  if (parent) {
    parent.insertAdjacentHTML('afterbegin', markup);
  }
  delPreloader(option);
};

const delPreloader = option => {
  const preloader = document.getElementById('id_preloader-bacdrop');
  preloader.classList.add('faiding');
  const initialPad = !option ? measureAndFixScroll() : option;
  if (!option) {
    document.body.style.overflow = 'hidden';
    preloader.style.position = 'absolute';
  }
  setTimeout(() => {
    preloader.remove();
    if (option) return;
    document.body.style.overflowY = 'auto';
    document.body.style.paddingRight = initialPad;
  }, 2000);
};

export { measureAndFixScroll, addPreloader, delPreloader };
