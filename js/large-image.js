import { isKeyEscape } from './util.js';
const bigPicture = document.querySelector('.big-picture');
const allPicture = document.querySelector('.pictures');
const closePicture = document.querySelector('.big-picture__cancel');

const onKeyEsc = (evt) => {
  if (isKeyEscape(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function openModal() {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.addEventListener('keydown', onKeyEsc);
}

function closeModal() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeyEsc);
}


allPicture.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    openModal();
  }
  const parent = evt.target.closest('.picture');
  bigPicture.querySelector('.big-picture__img img').src = evt.target.src;
  bigPicture.querySelector('.likes-count').textContent = parent.querySelector('.picture__likes').textContent;
});

closePicture.addEventListener('click', () => {
  closeModal();
});
