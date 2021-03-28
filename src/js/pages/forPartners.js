import img1 from '../../img/partners.png';

function drawPartnersImages() {
  const image = document.querySelector('.partners__image');
  let fix = location.href.includes('github') ? 'NstdServers/' : '';
  image.src = fix + img1;
}

export { drawPartnersImages };
