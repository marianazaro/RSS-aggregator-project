import onChange from 'on-change';

const renderFeed = (feeds) => {
  const feedContainer = document.querySelector('.feeds');
  feedContainer.innerHTML = '';
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.append(cardBody);
  const h2 = document.createElement('h2');
  h2.textContent = 'Фиды';
  h2.classList.add('card-title', 'h4');
  cardBody.append(h2);

  const ul = document.createElement('ul');
  ul.classList.add('list-group-item', 'border-0', 'rounded-0');

  feeds.forEach((feed) => {
    const { title, description } = feed;
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = title;
    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = description;
    h3.append(p);
    li.append(h3);
    ul.append(li);
  });
  card.append(ul);
  feedContainer.append(card);
};

// eslint-disable-next-line import/prefer-default-export
export const watchFeeds = (feeds) => onChange(feeds, () => {
  renderFeed(feeds);
});
