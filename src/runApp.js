import i18next from 'i18next';
// eslint-disable-next-line import/extensions
import { app } from './app.js';
// eslint-disable-next-line import/extensions
import ru from '../locales/ru.js';

// eslint-disable-next-line import/prefer-default-export
export const runApp = async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
  });
  app(i18nextInstance.t);
};
