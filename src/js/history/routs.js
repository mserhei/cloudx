import {load, save, remove} from '../utils/storage';
import {homePage, contactsPage} from './pages';

let lang = load('Local') || 'ru';




function changeLang (langFromUrl) {
  lang = langFromUrl;
  save('Local', langFromUrl);
  updateRouts(langFromUrl);
}

function updateRouts (newLang) {
  routs.forEach(rout => {
    const oldRoutPath = rout.path.toString();
    const oldRoutPathWithoutLang = oldRoutPath.slice(0, -2);
    rout.path = oldRoutPathWithoutLang + newLang;
  })
}

let routs = [
  {
    title: 'Home',
    path: `/?lang=${lang}`,
    comp: homePage
  },
  {
    title: 'Contacts',
    path: `/contacts?lang=${lang}`,
    comp: contactsPage
  }
]

export {routs, lang, changeLang};
