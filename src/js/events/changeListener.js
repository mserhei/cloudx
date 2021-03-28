import { decideRout } from '../history/mainHistory';
import myModal from '../utils/modalClass';
import slider from '../utils/slider';
import openMenu from '../pages/burger';
import { lang } from '../history/mainHistory';
import { load, save, remove } from '../utils/storage';

export default function listenChange(event) {
  if (event.target && event.target.getAttribute('id') === 'id_language') {
    const previousLang = lang.name;
    save('Lang', event.target.value);
    const newLang = load('Lang') || 'ru';
    const path = changeLangPath(previousLang, newLang);
    decideRout(path, true);
  }
}

function changeLangPath(previousLang, newLang) {
  const url = new URL(location.href);
  if (newLang !== previousLang) {
    url.searchParams.set('lang', newLang);
  }
  return url.pathname + url.search + url.hash;
}

export { changeLangPath };
