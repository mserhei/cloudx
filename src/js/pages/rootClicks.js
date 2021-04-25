const root = document.getElementById('root');

root.addEventListener('click', rootClicks);

function rootClicks (e) {

  if (e.target.classList.contains('home-services__title')) {

    const tabsList = document.querySelectorAll('.home-services__tabs');
    const titles = document.querySelectorAll('.home-services__title');

    const titleIdx = e.target.dataset.index;

    titles.forEach(item => item.classList.remove('active'));
    titles[titleIdx].classList.add('active');
    tabsList.forEach(item => item.classList.remove('active'));
    tabsList[titleIdx].classList.add('active');

      }
  }

