import axios from 'axios';
import { body, createOption, createPost, clearPost } from './utils';

const form = body.querySelector('.posts__filter-form');
const select = form.querySelector('.posts__select-author');
const minDate = form.querySelector('.posts__date--min');
const maxDate = form.querySelector('.posts__date--max');
const postList = body.querySelector('.posts__post-list');

// Получение данных с сервера

const getData = async () => {
  const response = await axios.get('https://mocki.io/v1/a5814d24-4e22-49fc-96d1-0e9ae2952afc');
  const posts = response.data.articles;

  // Создаю массив со всеми авторами и всеми датами для будущей фильтрации

  const authors = [];
  const dates = [];

  for (const elem of posts) {
    authors.push(elem.author);
    dates.push(elem.publishedAt);

    const date = createOption(elem);
    minDate.insertAdjacentHTML('afterbegin', date);
    maxDate.insertAdjacentHTML('afterbegin', date);
  };

  // Проверка имени автора на дубликаты имён авторов и null, так как с сервера и такие тоже приходят

  const uniqueAuthors = authors.filter((author, i) => {
    return authors.indexOf(author) === i && author !== null;
  });

  // Заполняем select новыми option с уникальными авторами

  for(const author of uniqueAuthors) {
    const authorOption = createOption(author, true);
    select.insertAdjacentHTML('afterbegin', authorOption);
  };

  // Фильтр по авторам

  const authorOptions = select.querySelectorAll('option');
  authorOptions.forEach(option => {
    option.onclick = () => {
      const title = body.querySelector('.posts__info-title');
      title.style.display = 'none';

      clearPost(postList);

      // Фильтрация и вывод постов по автору

      const filtered = posts.filter(post => post.author === option.value);
      for(const elem of filtered) {
        const post = createPost(elem);
        postList.insertAdjacentHTML('afterbegin', post);
      };

      // Вариант фильтрации постов по автору без функции filter() =)

      // for (const elem of posts) {
      //   if(elem.author === option.value) {
      //     const post = createPost(elem);
      //     postList.insertAdjacentHTML('afterbegin', post);
      //   }
      // };
    };
  });

  // Фильтр по датам

  const minDateOptions = minDate.querySelectorAll('option');
  const maxDateOptions = maxDate.querySelectorAll('option');

  const minMaxDate = [];

  minDateOptions.forEach((option, i) => {
    option.onclick = () => {
      minMaxDate.push(option.value);
    };

    maxDateOptions[i].onclick = () => {
      minMaxDate.push(maxDateOptions[i].value);
      clearPost(postList);

      const filtered = dates.filter(item => (minMaxDate[0] <= item && item <= minMaxDate[1]));

      for(const elem of filtered) {
        for (const posted of posts) {
          if(elem === posted.publishedAt) {
            const post = createPost(posted);
            postList.insertAdjacentHTML('afterbegin', post);
          } 
        };
      };
    };
  });
};
getData();
