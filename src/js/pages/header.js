import {lang, routs, changeLang} from '../history/routs';

const header = document.getElementById('header');

header.addEventListener('click', function (e) {

  if (e.target.getAttribute('href')) {
    e.preventDefault();
    const link = e.target.getAttribute('href');
    const nextPath = `${link}?lang=${lang}`;
    history.pushState(null, null, nextPath);
    routs.forEach(rout => {
      if (rout.path === nextPath) {
        rout.comp()
      }

    })
  }
  if (e.target.classList.contains('lang-btn')) {
    langBtnClick()
  }
  if (e.target.classList.contains('header__btn-mobile')) {
    const headerNav = document.querySelector('.header__nav');
    headerNav.classList.toggle('show-mobile');
  }







  const headerAuthModal = document.querySelector('.header__auth');

  if (e.target.classList.contains('header__buttons_modal-button')) {
    headerAuthModal.classList.toggle('active');
  }

  if (e.target.classList.contains('header__auth_close')) {
    headerAuthModal.classList.remove('active');
  }

})


function langBtnClick () {

  console.log('routs1' ,routs)

  console.log('langBtn click')
  let currentPathC = window.location.pathname;
  let currentSearchC = window.location.search;
  let currentHashC = window.location.hash;
  let currentAllPathC = currentPathC + currentSearchC + currentHashC;
  console.log('currentAllPathC', currentAllPathC)

  let routIdx = null;
  routs.forEach((rout, i) => {
    console.log('rout path:  ', rout.path)

    if (currentAllPathC === rout.path) {

      routIdx = i;
    }
  })

  console.log('routIdx:  ', routIdx);
  console.log('lang1', lang)
  const nextLang = lang === 'ru' ? 'en' : 'ru';
  changeLang(nextLang);
  console.log('lang2', lang)

  currentSearchC = `?lang=${lang}`;
  const newAllPathC = currentPathC + currentSearchC + currentHashC;
  history.replaceState(null, null, newAllPathC);

  routs[routIdx].comp();

  console.log('routs2' ,routs);
}
