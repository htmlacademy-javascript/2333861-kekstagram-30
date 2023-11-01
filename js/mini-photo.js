import { getPicture } from './data.js';

const cards = getPicture();
const photoContainer = document.querySelector('.pictures');
const template = document.querySelector('#picture').content;
const photoCard = template.querySelector('.picture');

const createPictures = () => {
  const containerCards = document.createDocumentFragment();

  cards.forEach(({ url, description, comments, likes }) => {
    const card = photoCard.cloneNode(true);
    card.querySelector('.picture__img').src = url;
    card.querySelector('.picture__img').alt = description;
    card.querySelector('.picture__comments').textContent = comments.length;
    card.querySelector('.picture__likes').textContent = likes;
    containerCards.appendChild(card);
  });

  photoContainer.appendChild(containerCards);
};

export { createPictures };


