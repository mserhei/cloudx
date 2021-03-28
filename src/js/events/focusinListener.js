import errorsLocal from '../localization/errors.json';
import { lang } from '../history/mainHistory';

export default function listenFocusin(event) {
  if (event.target.classList.contains('modal__input')) {
    event.target.classList.remove('invalid');
    const error = event.target.nextElementSibling.children[0];
    error.classList.remove('iserror');
    error.textContent = '';
  }
  if (event.target.classList.contains('range__result-input')) {
    event.target.value = '';
  }
}
