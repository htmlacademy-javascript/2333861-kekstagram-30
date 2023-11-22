import { createPictures } from './mini-photo.js';
import { debounce } from './util.js';

const formFl = document.querySelector('.img-filters');
const formFilter = document.querySelector('.img-filters__form');
const defaultBtn = formFilter.querySelector('#filter-default');
const randomBtn = formFilter.querySelector('#filter-random');
const discussedBtn = formFilter.querySelector('#filter-discussed');

const filterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};
const MAX_RANDOM_FILTER = 10;

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const filterHandlers = {
  [filterEnum.DEFAULT]: (data) => data,
  [filterEnum.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },
  [filterEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length)
};

let currentFilter = filterEnum.DEFAULT;

const repaint = (evt, filter, data) => {
  if (currentFilter !== filter) {
    const filterData = filterHandlers[filter](data);
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((item) => {
      item.remove();
    });
    createPictures(filterData);
    const currentActiveEl = formFilter.querySelector('.img-filters__button--active');
    currentActiveEl.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilter = filter;
  }
};

const debounceRepaint = debounce(repaint);

const showFilter = (data) => {
  formFl.classList.remove('img-filters--inactive');

  defaultBtn.addEventListener('click', (evt) => {
    debounceRepaint(evt, filterEnum.DEFAULT, data);
  });
  randomBtn.addEventListener('click', (evt) => {
    debounceRepaint(evt, filterEnum.RANDOM, data);
  });
  discussedBtn.addEventListener('click', (evt) => {
    debounceRepaint(evt, filterEnum.DISCUSSED, data);
  });
};

export { showFilter };
