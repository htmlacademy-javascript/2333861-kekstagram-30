import { isKeyEscape } from './util.js';
const bigPicture = document.querySelector('.big-picture');
const allPicture = document.querySelector('.pictures');
const closePicture = document.querySelector('.big-picture__cancel');
const commentContainer = bigPicture.querySelector('.social__comments');
const template = commentContainer.querySelector('#comment').content;
const commentsBigPic = template.querySelector('.social__comment');

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

  commentContainer.innerHTML = '';
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeyEsc);
}


const createBigPhoto = (arr) => {
  allPicture.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      const idItem = Number(evt.target.dataset.id);
      const item = arr.find((el) => el.id === idItem);
      if (item) {
        bigPicture.querySelector('.big-picture__img img').src = item.url;
        bigPicture.querySelector('.likes-count').textContent = item.likes;
        bigPicture.querySelector('.social__comment-total-count').textContent = item.comments.length;
        bigPicture.querySelector('.social__caption').textContent = item.description;

        const containerComments = document.createDocumentFragment();
        item.comments.forEach(({ avatar, message }) => {
          const commentBigPic = commentsBigPic.cloneNode(true);
          commentBigPic.querySelector('.social__picture').src = avatar;
          commentBigPic.querySelector('.social__picture').alt = 'Аватар комментатора фотографии';
          commentBigPic.querySelector('.social__text').textContent = message;
          containerComments.append(commentBigPic);
        });

        commentContainer.append(containerComments);
      }
      openModal();
    }
  });
};


closePicture.addEventListener('click', () => {
  closeModal();
});

export { createBigPhoto };
