import renderCard from '../../templates/card.hbs';
import pages from '../pages/pages';

const nav = {
  get navRefs() {
    return document.querySelectorAll('.navigation__rout--hover');
  },
};

function fun1() {
  root.innerHTML = renderCard(pages[1]);
}

function fun2() {
  root.innerHTML = renderCard(pages[2]);
}

function fun3() {
  root.innerHTML = renderCard(pages[3]);
}

function fun4() {
  root.innerHTML = renderCard(pages[4]);
}

function fun5() {
  root.innerHTML = renderCard(pages[5]);
}

function fun6() {
  root.innerHTML = renderCard(pages[1]);
}

export { fun1, fun2, fun3, fun4, fun5, fun6 };
