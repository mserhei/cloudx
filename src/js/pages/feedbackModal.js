import feedbackModal from '../../templates/feedback-modal.hbs';
import localFeedbackModal from '../localization/localFeedbackModal.json';
import { lang } from '../history/mainHistory';

function renderFeedback(e) {
  const markupRaw = JSON.parse(JSON.stringify(localFeedbackModal[lang.name]));
  if (e.target.dataset.select) {
    const i = e.target.dataset.select;
    markupRaw.fields[0].field[0].options[i].selected = 'selected';
  }
  const markup = feedbackModal(markupRaw);
  return markup;
}

export { renderFeedback };
