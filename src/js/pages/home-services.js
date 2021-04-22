// const homeServicesList = document.querySelector('.home-services__list');
const titles = document.querySelectorAll('.home-services__item');
const tabsList = document.querySelectorAll('.home-services__tabs');

titles.forEach((title, i) => {
  title.addEventListener('click', () => {
    titles.forEach(item => item.classList.remove('active'));
    tabsList.forEach(item => item.classList.remove('active'));
    title.classList.add('active');
    tabsList[i].classList.add('active');
  })

})

// homeServicesList.onclick = (e) => {
//   e.preventDefault();

//   const okk = document.querySelectorAll('.home-services__title');
//   console.log(okk)

//   if (e.target.classList.contains('home-services__title')) {

//     titles.forEach(item => item.classList.remove('active'));
//     tabsList.forEach(item => item.classList.remove('active'));
//     e.target.classList.add('active');
//     e.target.nextElementSibling.classList.add('active');

//   }
// }


