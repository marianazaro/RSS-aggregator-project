import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const parser = (url) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`);
