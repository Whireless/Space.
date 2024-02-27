const body = document.querySelector('body');

// Создание option с авторами и датами

const template = body.querySelector("#option").content;
const createOption = (elem, author) => {
  const clone = template.cloneNode(true);
  const option = clone.querySelector('option');

  if(author) {
    option.value = elem;
    option.textContent = elem;

    return option.outerHTML;
  } else {
    option.value = elem.publishedAt;
    option.textContent = elem.publishedAt;

    return option.outerHTML;
  }
};

// Создание постов

const templatePost = body.querySelector('#post').content;
const createPost = (elem) => {
  const post = templatePost.cloneNode(true);

  const li = post.querySelector('.posts__post-item');
  const postDate = li.querySelector('.posts__date');
  const postTitle = li.querySelector('.posts__title');
  const postDesc = li.querySelector('.posts__description');
  const postAuthor = li.querySelector('.posts__author');

  postDate.setAttribute('datetime', elem.publishedAt);
  postDate.textContent = elem.publishedAt;
  postTitle.textContent = elem.title;
  postDesc.textContent = elem.description;
  postAuthor.textContent = elem.author;

  return li.outerHTML;
};

// Очистка постов

const clearPost = (list) => {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  };
};

export { body, createOption, createPost, clearPost };