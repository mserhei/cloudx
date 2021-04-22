import {homePage} from './pages';
import {routs} from './routs';
import {lang} from './routs';
import {changeLang} from './routs';


const root = document.getElementById('root');


const currentPath = window.location.pathname;
const currentSearch = window.location.search;
const currentHash = window.location.hash;
const currentAllPath = currentPath + currentSearch + currentHash;
// console.log('currentPath: ', currentPath);
// console.log('currentSearch: ', currentSearch);
// console.log('currentHash: ', currentHash);
// console.log('currentAllPath:  ', currentAllPath);

const currentUrl = new URL(location);
const currentUrlLang = currentUrl.searchParams.get('lang');
console.log('currentUrlLang:  ', currentUrlLang);

if (currentUrlLang === lang) {
  console.log('no need to change language')
} else {
  console.log('need to change language')
  changeLang(currentUrlLang || 'ru');
}

let routIdx = -1;

if (currentPath === '/') {
  routIdx = 0;
  history.replaceState(null, null, `/?lang=${lang}`);
  homePage();
}

routs.forEach((rout, i) => {
  if (rout.path === currentAllPath) {
    console.log('ok path')
    routIdx = i;
    console.log('routIdx:  ', routIdx);
    rout.comp();
  }
})

if (routIdx === -1) {
  history.replaceState(null, null, `/?lang=${lang}`);
  homePage();
}








// window.onpopstate = function(event) {
//   const currentPath = window.location.pathname;
//   let currentSearch = window.location.search;
//   const currentHash = window.location.hash;

//   console.log('currentPath: ', currentPath);
//   console.log('currentSearch: ', currentSearch);
//   console.log('currentHash: ', currentHash);


//   currentSearch = `?lang=${lang}`
//   const currentAllPath = currentPath + currentSearch + currentHash;
//   console.log('currentAllPath:  ', currentAllPath);
//   history.replaceState(null, null, currentAllPath);
// };
