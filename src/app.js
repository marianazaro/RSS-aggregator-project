// eslint-disable-next-line import/extensions
import { rssParser } from './rssParser.js';
// eslint-disable-next-line import/extensions
import validate from './validate.js';
// eslint-disable-next-line import/extensions
import { updateRss } from './updateRss.js';
// eslint-disable-next-line import/extensions
import { watchFeeds } from './views/watchFeeds.js';
// eslint-disable-next-line import/extensions
import { watchForm } from './views/watchForm.js';
// eslint-disable-next-line import/extensions
import { watchPosts } from './views/watchPosts.js';
// eslint-disable-next-line import/extensions
import { parser } from './parser.js';
// eslint-disable-next-line import/extensions

const state = {
  urls: [],
  rssFormValid: '',

  feeds: [],
  posts: [],
  openedLinks: [],
};

// eslint-disable-next-line import/prefer-default-export
export const app = (i18nextInstance) => {
  const form = document.querySelector('#form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { target } = e;
    const formData = new FormData(target);
    const newUrl = formData.get('url');
    const watchedStateForm = watchForm(state, i18nextInstance);
    const watchedStatePosts = watchPosts(state.posts, state.openedLinks, i18nextInstance);
    const watchedStateFeeds = watchFeeds(state.feeds);
    if (state.urls.length === 0) {
      updateRss(state, watchedStateFeeds, watchedStatePosts, parser, rssParser);
    }

    validate(newUrl, state, i18nextInstance)
      .then(() => parser(newUrl))
      .then((response) => {
        const { contents } = response.data;
        if (!contents.includes('</rss>')) {
          throw new Error('String is not RSS');
        }
        state.urls.push(newUrl);
        if (response.status < 300 && response.status >= 200) {
          const { feed, posts } = rssParser(contents);
          watchedStateForm.rssFormValid = true;
          watchedStatePosts.push(...posts);
          watchedStateFeeds.push(feed);
        } else {
          throw new Error('Network Error');
        }
      })
      .catch((error) => {
        state.rssFormValid = '';
        switch (error.message) {
          case 'Rss already exists':
            watchedStateForm.rssFormValid = 'recurringFeed';
            break;
          case 'Network Error':
            watchedStateForm.rssFormValid = 'networkError';
            break;
          case 'String is not RSS':
            watchedStateForm.rssFormValid = 'notRssUrl';
            break;
          default:
            watchedStateForm.rssFormValid = false;
        }
      });
  });
};
