import { addPreloader } from './utils/preloader.js';
import { load, save } from './utils/storage';
import routers from './history/routers';
import renderCard from '../templates/card.hbs';
import { render } from './pages/pages';
import listenClicks from './events/clickListener';

const historyStore = {
  get state() {
    return history.state;
  },
};

const root = document.getElementById('root');

document.addEventListener('click', listenClicks);
