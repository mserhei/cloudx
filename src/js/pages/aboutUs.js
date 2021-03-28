import file1 from '../../files/terms-clouds.pdf';
import file2 from '../../files/terms-veeam.pdf';
import file3 from '../../files/terms-SPLA.pdf';

import img1 from '../../img/cloud1.png';
import img2 from '../../img/cloud2.png';
import img3 from '../../img/cloud3.png';

const imgs = [img1, img2, img3];
const links = [file1, file2, file3];

function drawAboutUsImages() {
  let fix = location.href.includes('github') ? 'NstdServers/' : '';

  const images = document.querySelectorAll('.about-us__goods-image');
  images.forEach((image, index) => {
    image.src = `${fix + imgs[index]}`;
  });
}

function makeLinks() {
  // const fileLinks = document.querySelectorAll('.about-us__file-link');
  // fileLinks.forEach((link, index) => {
  //   link.setAttribute('href', `${links[index]}`);
  // link.setAttribute('download', `${links[index]}`);
  // });
}
export default makeLinks;
export { drawAboutUsImages };
