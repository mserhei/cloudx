import { lang } from '../history/mainHistory';
import errorsLocal from '../localization/errors.json';

export default function listenSubmit(event) {
  event.preventDefault();

  const form = event.target.closest('form');
  const errors = Array.from(form.querySelectorAll('.modal__message'));
  const inputs = Array.from(form.querySelectorAll('.modal__input'));
  const requiredInputs = Array.from(
    form.querySelectorAll('.modal__input.required'),
  );

  inputs.map((el, i, arr) => {
    el.focus();
    if (i === arr.length - 1) {
      el.blur();
    }
  });

  const noErrors = errors.filter(el => !el.textContent.length);
  const valid = requiredInputs.filter(input =>
    input.classList.contains('valid'),
  );

  //temporary login abort imitation
  if (form.classList.contains('modal__form', ' active')) {
    if (valid.length === errors.length && noErrors.length === errors.length) {
      const message = errorsLocal[lang.name].submit;
      errors[0].classList.add('iserror');
      form.elements[0].classList.add('invalid');
      errors[0].textContent = message;
      return;
    }
  }

  if (valid.length < requiredInputs.length) {
    console.log('is invalid');
    return;
  }

  if (noErrors.length < errors.length) {
    console.log('is errors');
    return;
  }

  if (form.classList.contains('feedback__form')) {
    console.log('submited');
  }
}
