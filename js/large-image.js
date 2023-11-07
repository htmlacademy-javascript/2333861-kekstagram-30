import { isKeyEscape } from './util.js';
import { createComments, addMoreComments } from './mini-photo.js';
const bigPicture = document.querySelector('.big-picture');
const allPicture = document.querySelector('.pictures');
const closePicture = document.querySelector('.big-picture__cancel');
const commentContainer = bigPicture.querySelector('.social__comments');//контейнер с комментами
const template = commentContainer.querySelector('#comment').content;
const commentsBigPic = template.querySelector('.social__comment');
const btnMoreComments = document.querySelector('.social__comments-loader');//кнопка загрузки
const prevComments = document.querySelector('.social__comment-shown-count');//кол-во показанных ком-риев

const onKeyEsc = (evt) => {
  if (isKeyEscape(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function uploadComments(comments) {
  if (comments < 5) {
    prevComments.textContent = comments;
  } else {
    prevComments.textContent = 5;
  }
}

function openModal() {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onKeyEsc);
}

function closeModal() {
  bigPicture.classList.add('hidden');

  commentContainer.innerHTML = '';
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeyEsc);
}

function moreComments(item, container) {
  btnMoreComments.addEventListener('click', () => {
    addMoreComments(item.comments, commentsBigPic, container);
    commentContainer.append(container);
  });
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

        uploadComments(item.comments.length);

        const containerComments = document.createDocumentFragment();
        createComments(item.comments, commentsBigPic, containerComments);
        commentContainer.append(containerComments);

        moreComments(item, containerComments);
      }
      openModal();
    }
  });
};

closePicture.addEventListener('click', () => {
  closeModal();
});

export { createBigPhoto };

