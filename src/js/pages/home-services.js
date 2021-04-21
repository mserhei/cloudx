const titles = document.querySelectorAll('.home-services__title-block');
const tabList = document.querySelectorAll('.home-services__tabs');

titles.forEach((title, i) => {
  title.addEventListener('click', function () {
    tabList.forEach(item => {
      item.classList.remove('active');
    })
    tabList[i].classList.add('active');
  })
})


