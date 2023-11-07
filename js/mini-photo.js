const photoContainer = document.querySelector('.pictures');
const template = document.querySelector('#picture').content;
const photoCard = template.querySelector('.picture');

const createPictures = (arr) => {
  const containerCards = document.createDocumentFragment();

  arr.forEach(({ id, url, description, comments, likes }) => {
    const card = photoCard.cloneNode(true);
    const cardImage = card.querySelector('.picture__img');
    cardImage.setAttribute('data-id', id);
    cardImage.src = url;
    cardImage.alt = description;
    card.querySelector('.picture__comments').textContent = comments.length;
    card.querySelector('.picture__likes').textContent = likes;
    containerCards.appendChild(card);
  });

  photoContainer.appendChild(containerCards);
};

const createComments = (arr, parent, container) => {
  const firstFiveComments = arr.slice(0, 5);
  firstFiveComments.forEach(({ avatar, message }) => {
    const commentBigPic = parent.cloneNode(true);
    commentBigPic.querySelector('.social__picture').src = avatar;
    commentBigPic.querySelector('.social__picture').alt = 'Аватар комментатора фотографии';
    commentBigPic.querySelector('.social__text').textContent = message;
    container.append(commentBigPic);
  });
};

let commentIndex = 5;
const addMoreComments = (arr, parent, container) => {
  const nextFiveComments = arr.slice(commentIndex, commentIndex + 5);
  nextFiveComments.forEach(({ avatar, message }) => {
    const commentBigPic = parent.cloneNode(true);
    commentBigPic.querySelector('.social__picture').src = avatar;
    commentBigPic.querySelector('.social__picture').alt = 'Аватар комментатора фотографии';
    commentBigPic.querySelector('.social__text').textContent = message;
    container.append(commentBigPic);
  });
  commentIndex += 5;
};


export { createPictures, createComments, addMoreComments };


