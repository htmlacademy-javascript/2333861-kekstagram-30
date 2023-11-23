import { drawAllPictures } from './mini-photo.js';
import { getRandomIndex, debounce } from './util.js';

const MAX_RANDOM_FILTER = 10;
const filterBtnsContainer = document.querySelector('.img-filters');
const formFilterBtns = document.querySelector('.img-filters__form');
let currentFilter = 'filter-default';


const filterHandlers = {
  'filter-default': (data) => data,
  'filter-random': (data) => {
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
  'filter-discussed': (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length)
};


const repaintPictures = (filter, data) => {
  if (currentFilter !== filter) {
    const filterData = filterHandlers[filter](data);
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((item) => {
      item.remove();
    });
    drawAllPictures(filterData);
    currentFilter = filter;
  }
};


const debouncerepaintPictures = debounce(repaintPictures);


const showFilterSwitch = (data) => {
  filterBtnsContainer.classList.remove('img-filters--inactive');

  formFilterBtns.addEventListener('click', (evt) => {
    const currentActiveEl = formFilterBtns.querySelector('.img-filters__button--active');
    if (evt.target.tagName === 'BUTTON') {
      currentActiveEl.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    }
    debouncerepaintPictures(evt.target.id, data);
  });
};


export { showFilterSwitch };
