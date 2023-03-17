import onChange from 'on-change';

const renderPost = (posts, openedLinks, i18nextInstance) => {
  const postContainer = document.querySelector('.posts');
  postContainer.innerHTML = '';
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.append(cardBody);
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = 'Посты';
  cardBody.append(h2);

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const modalLink = document.querySelector('.full-article');

  posts.forEach((post) => {
    const {
      title, description, link, id,
    } = post;
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-o');
    const a = document.createElement('a');
    a.setAttribute('href', link);
    a.setAttribute('target', '_blank');
    a.setAttribute('id', id);
    if (openedLinks.includes(a.id)) {
      a.classList.add('fw-normal', 'link-secondary');
    } else {
      a.classList.add('fw-bold');
    }
    a.textContent = title;
    const button = document.createElement('button');
    // data-id="${post.id}"
    button.setAttribute('data-id', id);
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.textContent = i18nextInstance('button');
    li.append(a, button);
    ul.append(li);

    a.addEventListener('click', () => {
      a.classList.remove('fw-bold');
      a.classList.add('fw-normal', 'link-secondary');
      openedLinks.push(a.id);
    });

    button.addEventListener('click', () => {
      modalTitle.textContent = title;
      modalBody.textContent = description;
      modalLink.setAttribute('href', link);

      a.classList.remove('fw-bold');
      a.classList.add('fw-normal', 'link-secondary');
    });
  });
  card.append(ul);
  postContainer.append(card);
};

// eslint-disable-next-line import/prefer-default-export
export const watchPosts = (posts, openedLinks, i18nextInstance) => onChange(posts, () => {
  renderPost(posts, openedLinks, i18nextInstance);
});
