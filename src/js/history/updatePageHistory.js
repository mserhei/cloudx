import localDataHeader from '../localization/localHeader.json';
import localDataHome from '../localization/localHome.json';
import localDataAboutUs from '../localization/localAboutUs.json';
import localDataPartners from '../localization/localPartners.json';
import localDataContacts from '../localization/localContacts.json';
import localDataCalc from '../localization/localCalc.json';

import { lang } from './mainHistory';

import renderHeader from '../../templates/header.hbs';
import renderHeaderOpts from '../../templates/header-opts.hbs';
import renderHome from '../../templates/Home.hbs';
import renderAboutUs from '../../templates/about-us.hbs';
import renderPartners from '../../templates/for-partners.hbs';
import renderContacts from '../../templates/contacts.hbs';
import renderCalc from '../../templates/calc.hbs';

import { slider } from '../utils/slider';
import { swiper } from '../utils/swiper';

// import { drawImages, renderIndicators } from '../pages/home';
// import { drawPartnersImages } from '../pages/forPartners';
// import { drawContactsImages } from '../pages/contacts';
// import { renderCalculator } from '../pages/calc';

const drawHome = () => import('../pages/home');
const drawContacts = () => import('../pages/contacts');
const renderCalculator = () => import('../pages/calc');

const makeLinks = () => import('../pages/aboutUs');

function updateHeader() {
  document.getElementById('id_nav_list').innerHTML = renderHeader(
    localDataHeader[lang.name],
  );
  document.getElementById('id_nav_opts').innerHTML = renderHeaderOpts(
    localDataHeader[lang.name],
  );
}

const rootRef = document.getElementById('root-content');

async function fun1() {
  updateHeader();
  rootRef.innerHTML = renderHome(localDataHome[lang.name]);

  const module = await drawHome();
  //slider , .hero-slider__slide   //advantages, .cardset__list-item
  module.renderIndicators('slider', '.hero-slider__slide');
  module.renderIndicators('advantages', '.cardset__list-item', 'advantage', 2);
  module.drawImages();
  slider.start();
  swiper.start();
}

async function fun2() {
  updateHeader();
  rootRef.innerHTML = renderAboutUs(localDataAboutUs[lang.name]);
  const module = await makeLinks();
  module.default();
  module.drawAboutUsImages();
}

async function fun3() {
  updateHeader();
  rootRef.innerHTML = renderCalc(localDataCalc[lang.name]);
  const module = await renderCalculator();
  module.renderCalculator();
}

function fun4() {
  updateHeader();
  rootRef.innerHTML = renderPartners(localDataPartners[lang.name]);
}

async function fun5() {
  updateHeader();
  rootRef.innerHTML = renderContacts(localDataContacts[lang.name]);
  const module = await drawContacts();
  module.drawContactsImages();
}

function fun6() {
  updateHeader();
  rootRef.innerHTML = '<h1> HELLO WORLD </h1>';
}

function fun7() {
  updateHeader();
  rootRef.innerHTML = '';
}

export { fun1, fun2, fun3, fun4, fun5, fun6, fun7 };
