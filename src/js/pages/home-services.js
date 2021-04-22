const homeServicesList = document.querySelector('.home-services__list');
const titles = document.querySelectorAll('.home-services__title');
const tabsList = document.querySelectorAll('.home-services__tabs');

homeServicesList.onclick = (e) => {
  e.preventDefault();

  const okk = document.querySelectorAll('.home-services__title');
  console.log(okk)

  if (e.target.classList.contains('home-services__title')) {

    titles.forEach(item => item.classList.remove('active'));
    tabsList.forEach(item => item.classList.remove('active'));
    e.target.classList.add('active');
    e.target.nextElementSibling.classList.add('active');

  }
}


