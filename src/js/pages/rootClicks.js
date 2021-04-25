const root = document.getElementById('root');

root.addEventListener('click', rootClicks);

function rootClicks (e) {

  if (e.target.classList.contains('home-services__title')) {
    console.log('item click')
    const tabsList = document.querySelectorAll('.home-services__tabs');
    const titles = document.querySelectorAll('.home-services__title');

    console.log(titles)
    console.log(e.target)
    // console.log(titles.indexOf(e.target))

    titles.forEach((item, i) => {
      if (item == e.target) {
        console.log('i', i)
      }
    })


    titles.forEach(item => item.classList.remove('active'));
    tabsList.forEach(item => item.classList.remove('active'));

      }
  }

