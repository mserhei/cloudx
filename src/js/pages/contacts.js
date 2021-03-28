import img1 from '../../img/nebula2.png';
import img2 from '../../img/nebula3.png';
import img3 from '../../img/lights.png';
import svg1 from '../../img/contact1.svg';
import svg2 from '../../img/contact2.svg';
import svg3 from '../../img/contact3.svg';

const svgs = [svg1, svg2, svg3];

function drawContactsImages() {
  const image = document.querySelector('.contacts__image');
  const image1 = document.querySelector('.contacts__image.abs');
  const image2 = document.querySelector('.contacts__image.lights');
  let fix = location.href.includes('github') ? 'NstdServers/' : '';
  image.src = fix + img1;
  image1.src = fix + img2;
  image2.src = fix + img3;
  const images = document.querySelectorAll('.contacts__center-image');
  images.forEach((svg, i) => {
    svg.src = svgs[i];
  });
}

export { drawContactsImages };
