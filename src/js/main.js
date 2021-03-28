import { addPreloader, delPreloader } from './utils/preloader.js';
import listenClicks from './events/clickListener';
import listenSwipes from './events/swipeListener';
import listenChange from './events/changeListener';
import listenResize from './events/resizeListener';
import listenFocusout from './events/focusoutListener';
import listenFocusin from './events/focusinListener';
import listenSubmit from './events/submitListener';
import listenKeyDown from './events/keyDownListener';
import { movePad } from './events/scrollListener';

var debounce = require('debounce');

const rootRel = document.getElementById('root');

rootRel.addEventListener('scroll', debounce(movePad, 10));

document.addEventListener('click', listenClicks);
document.addEventListener('swiped', listenSwipes);
document.addEventListener('change', listenChange);
document.addEventListener('focusout', listenFocusout);
document.addEventListener('focusin', listenFocusin);
document.addEventListener('submit', listenSubmit);
window.addEventListener('keydown', listenKeyDown);
window.addEventListener('resize', listenResize);
document.oncontextmenu = function (e) {
  return false;
};
