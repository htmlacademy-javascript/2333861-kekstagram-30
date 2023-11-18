import { isKeyEscape } from './util.js';
const bigPicture = document.querySelector('.big-picture');
const allPicture = document.querySelector('.pictures');
const closePicture = document.querySelector('.big-picture__cancel');

const COMMENTS_COUNT = 5;

const template = document.querySelector('#comment').content;
const commentsBigPic = template.querySelector('.social__comment');
const commentContainer = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsCountTotal = bigPicture.querySelector('.social__comment-total-count');
const btnMoreComments = bigPicture.querySelector('.social__comments-loader');

let commentsCountShown = 0;
let comments = [];

const createComment = ({ avatar, message, name }) => {
  const newComment = commentsBigPic.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};


const renderComments = () => {
  if (comments.length >= 5) {
    commentsCountShown += COMMENTS_COUNT;
    if (commentsCountShown > comments.length) {
      commentsCountShown = comments.length;
    }
  } else {
    commentsCountShown = comments.length;
  }

  if (commentsCountShown >= comments.length) {
    btnMoreComments.classList.add('hidden');
    commentsCount.textContent = comments.length;
  } else {
    btnMoreComments.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsCountShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentContainer.innerHTML = '';
  commentContainer.append(fragment);

  commentsCount.textContent = commentsCountShown;
  commentsCountTotal.textContent = comments.length;
};


const onCommentsloaderClick = () => {
  renderComments();
};


const onKeyEsc = (evt) => {
  if (isKeyEscape(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function openModal() {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onKeyEsc);
}

function closeModal() {
  commentsCountShown = 0;
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeyEsc);
}

const createBigPhoto = (arr) => {
  allPicture.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      const idItem = Number(evt.target.dataset.id);
      const item = arr.find((el) => el.id === idItem);
      if (item) {
        bigPicture.querySelector('.big-picture__img img').src = item.url;
        bigPicture.querySelector('.likes-count').textContent = item.likes;
        bigPicture.querySelector('.social__comment-total-count').textContent = item.comments.length;
        bigPicture.querySelector('.social__caption').textContent = item.description;

        comments = item.comments;
        if (comments.length > 0) {
          renderComments();
        } else {
          commentContainer.innerHTML = '';
          btnMoreComments.classList.add('hidden');
          commentsCount.textContent = 0;

        }
      }
      openModal();
    }
  });
};

closePicture.addEventListener('click', closeModal);
btnMoreComments.addEventListener('click', onCommentsloaderClick);

export { createBigPhoto };
