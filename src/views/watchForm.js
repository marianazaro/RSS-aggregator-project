import onChange from 'on-change';
// eslint-disable-next-line import/extensions
import { changeClass } from './changeClass.js';

const renderForm = (state, i18nextInstance) => {
  const input = document.querySelector('#url-input');
  const p = document.querySelector('.feedback');
  const form = document.querySelector('#form');
  const { rssFormValid } = state;
  if (rssFormValid === true) {
    changeClass(p, 'text-success', 'text-danger');
    changeClass(input, 'falseClass', 'is-invalid');
    p.textContent = i18nextInstance('correcrUrl');
    form.reset();
    input.focus();
  } else if (rssFormValid === 'recurringFeed') {
    changeClass(p, 'text-danger', 'text-success');
    changeClass(input, 'is-invalid', 'falseClass');
    p.textContent = i18nextInstance('existingUrl');
  } else if (rssFormValid === 'notRssUrl') {
    changeClass(p, 'text-danger', 'text-success');
    changeClass(input, 'is-invalid', 'falseClass');
    p.textContent = i18nextInstance('notRssUrl');
  } else if (rssFormValid === 'networkError') {
    changeClass(p, 'text-danger', 'text-success');
    changeClass(input, 'is-invalid', 'falseClass');
    p.textContent = i18nextInstance('networkError');
  } else {
    changeClass(p, 'text-danger', 'text-success');
    changeClass(input, 'is-invalid', 'falseClass');
    p.textContent = i18nextInstance('errorUrl');
  }
};

// eslint-disable-next-line import/prefer-default-export
export const watchForm = (state, i18nextInstance) => onChange(state, () => {
  renderForm(state, i18nextInstance);
});
