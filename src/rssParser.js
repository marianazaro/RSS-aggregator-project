import _ from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export const rssParser = (content) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(content, 'text/html');
  const document = html.documentElement;
  const channel = document.querySelector('channel');
  const itemsList = channel.querySelectorAll('item');
  const items = Array.from(itemsList);
  const feed = {
    title: channel.querySelector('title').textContent,
    description: channel.querySelector('description').textContent,
  };
  const posts = [];
  items.forEach((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.textContent.match(/(http|https):\/\/[^\s]+/i)[0];

    posts.push({
      title,
      description,
      link,
      id: _.uniqueId(),
    });
  });
  return { feed, posts };
};
