import { isKeyEscape } from './util.js';
const COMMENTS_COUNT = 5;
const pictureModal = document.querySelector('.big-picture');
const allPictures = document.querySelector('.pictures');
const closePictureModal = document.querySelector('.big-picture__cancel');

const commentsPictureModal = document.querySelector('#comment').content.querySelector('.social__comment');
const commentContainer = pictureModal.querySelector('.social__comments');
const commentsCount = pictureModal.querySelector('.social__comment-shown-count');
const commentsCountTotal = pictureModal.querySelector('.social__comment-total-count');
const btnMoreComments = pictureModal.querySelector('.social__comments-loader');

let commentsCountShown = 0;
let comments = [];

const drawComment = ({ avatar, message, name }) => {
  const newComment = commentsPictureModal.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};


const renderComments = () => {
  if (comments.length >= COMMENTS_COUNT) {
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
    const comment = drawComment(comments[i]);
    fragment.append(comment);
  }

  commentContainer.innerHTML = '';
  commentContainer.append(fragment);

  commentsCount.textContent = commentsCountShown;
  commentsCountTotal.textContent = comments.length;
};


const onCommentsLoaderClick = () => {
  renderComments();
};


const onKeyEscPress = (evt) => {
  if (isKeyEscape(evt)) {
    evt.preventDefault();
    hidePictureModal();
  }
};


function openPictureModal() {
  pictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onKeyEscPress);
}


function hidePictureModal() {
  commentsCountShown = 0;
  pictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeyEscPress);
}


const drawPictureModal = (arr) => {
  allPictures.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      const itemChild = evt.target.closest('.picture').querySelector('.picture__img');
      const itemId = Number(itemChild.dataset.id);
      const item = arr.find((el) => el.id === itemId);
      if (item) {
        pictureModal.querySelector('.big-picture__img img').src = item.url;
        pictureModal.querySelector('.likes-count').textContent = item.likes;
        pictureModal.querySelector('.social__comment-total-count').textContent = item.comments.length;
        pictureModal.querySelector('.social__caption').textContent = item.description;

        comments = item.comments;
        if (comments.length > 0) {
          renderComments();
        } else {
          commentContainer.innerHTML = '';
          btnMoreComments.classList.add('hidden');
          commentsCount.textContent = 0;

        }
      }
      openPictureModal();
    }
  });
};


closePictureModal.addEventListener('click', hidePictureModal);
btnMoreComments.addEventListener('click', onCommentsLoaderClick);


export { drawPictureModal };
