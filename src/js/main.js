// import listenClicks from './events/clickListener';
// import listenChange from './events/changeListener';
// import listenResize from './events/resizeListener';
// import listenFocusout from './events/focusoutListener';
// import listenFocusin from './events/focusinListener';
// import listenSubmit from './events/submitListener';
// import listenKeyDown from './events/keyDownListener';
// const { debounce, throttle } = require('lodash');

// import myAgent from './utils/checkAgent';

// const scrollEvents = () => import('./events/scrollListener');
// const mouseEvents = () => import('./events/mouseListener');
// const swipeAdd = () => import('./utils/swiper');
// const swipeEvents = () => import('./events/swipeListener');

// const rootRel = document.getElementById('root');

// decideToDispatchIfMobile();

// document.addEventListener('click', listenClicks);
// document.addEventListener('change', listenChange);
// document.addEventListener('focusout', listenFocusout);
// document.addEventListener('focusin', listenFocusin);
// document.addEventListener('submit', listenSubmit);
// window.addEventListener('keydown', listenKeyDown);
// window.addEventListener('resize', listenResize);
// document.oncontextmenu = function (e) {
//   return false;
// };

// async function decideToDispatchIfMobile() {
//   if (!myAgent) {
//     const movePad = await scrollEvents();
//     const listenMouse = await mouseEvents();

//     rootRel.addEventListener('scroll', throttle(movePad.default), 100);
//     document.addEventListener('mousemove', throttle(listenMouse.default), 20);
//     document.addEventListener('dblclick', listenMouse.changeMouse);
//   } else {
//     const addSwipeEvent = await swipeAdd();
//     addSwipeEvent.default(window, document);

//     const listenSwipes = await swipeEvents();
//     document.addEventListener('swiped', listenSwipes.default);
//   }
// }
