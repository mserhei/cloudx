import indicators from '../../templates/swipe-indicators.hbs';

import CountdownTimer from '../utils/timer';

import img1 from '../../img/advantage1.svg';
import img2 from '../../img/advantage2.svg';
import img3 from '../../img/advantage3.svg';
import img4 from '../../img/advantage4.svg';
import img5 from '../../img/advantage5.svg';
import img6 from '../../img/advantage6.svg';
import img7 from '../../img/advantage7.svg';
import img8 from '../../img/advantage8.svg';

import svg1 from '../../img/service1.svg';
import svg2 from '../../img/service2.svg';
import svg3 from '../../img/service3.svg';
import svg4 from '../../img/service4.svg';
import svg5 from '../../img/service5.svg';
import svg6 from '../../img/service6.svg';
import svg7 from '../../img/service7.svg';
import svg8 from '../../img/service8.svg';

const imgs = [img1, img2, img3, img4, img5, img6, img7, img8];

const svgs = [
  [svg1, svg2, svg3, svg4, svg5, svg6, svg7, svg8],
  [svg1],
  [svg1, svg2, svg3, svg4, svg5, svg6, svg7, svg8, svg1],
  [svg1, svg2, svg3, svg4, svg5, svg6, svg7],
  [svg1],
  [svg1, svg2, svg3, svg4, svg5, svg6],
  [svg1],
  [svg1],
];

function drawImages() {
  let images = document.querySelectorAll('#advantages .cardset__image');
  images.forEach((image, index) => {
    image.src = `${imgs[index]}`;
  });
  const services = document.querySelectorAll('.services__tab-list');
  services.forEach((service, index) => {
    const srcs = svgs[index];
    const img = service.querySelectorAll('.services__image');
    img.forEach((image, index) => {
      image.src = `${srcs[index]}`;
    });
  });
  const superTimer2 = new CountdownTimer({
    selector: '#timer2',
    targetDate: new Date('Jun 1, 2021'),
  });
}

function renderIndicators() {
  const slide1 = document.getElementById('slider');
  const slide2 = document.getElementById('advantages');
  let arr = Array.from(slide1.querySelectorAll('.hero-slider__slide'));
  let markup = indicators(arr);
  slide1.insertAdjacentHTML('beforeend', markup);
  arr = Array.from(slide2.querySelectorAll('.cardset__list-item')).map(el => {
    return { class: 'advantage' };
  });
  arr.length = Math.ceil(arr.length / 2);
  markup = indicators(arr);
  slide2.insertAdjacentHTML('beforeend', markup);
}

export { drawImages, renderIndicators };
