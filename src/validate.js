import { object, string, setLocale } from 'yup';

const validate = (url, state, i18nextInstance) => {
  setLocale({
    mixed: {
      notOneOf: 'Rss already exists',
    },
    string: {
      matches: i18nextInstance('errors.errorUrl'),
    },
  });

  const schema = object({
    url: string()
      .notOneOf(state.urls)
      .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/),
  });
  return schema.validate({ url });
};

export default validate;
