const header = document.getElementById('header');

header.addEventListener('click', function (e) {

  if (e.target.getAttribute('href')) {
    const link = e.target.getAttribute('href');
    const nextPath = `${link}?lang=${lang}`;
    history.pushState(null, null, nextPath);
    routs.forEach(rout => {
      if (rout.path === nextPath) {
        rout.comp()
      }
      e.preventDefault();
    })
  }

})
