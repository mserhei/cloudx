import './sass/main.scss';
// import './js/utils/swiper';
import './js/main.js';
// import 'material-design-icons/iconfont/material-icons.css';
import './robots.txt';

import jsonFile from './my.json';
import hbsFile from './my.hbs';
import { divide } from 'lodash';
// import { render } from 'node-sass';

let lang = "en";

(draw)()

function draw () {
  const item = hbsFile(jsonFile[lang]);
  const root = document.getElementById('root');
  root.classList.add('hide');
  setTimeout(() => {
    root.innerHTML = item;
    root.classList.remove('hide')
  }, 200);

}







const button = document.querySelector('button');
button.addEventListener('click', () => {
  lang = lang === 'en' ? 'ru' : 'en';
  console.log(lang);
  draw();
})




window.onload = () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.remove('active')
  }, 1000)

}
