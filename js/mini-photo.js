const photoContainer = document.querySelector('.pictures');
const photoCard = document.querySelector('#picture').content.querySelector('.picture');

const drawAllPictures = (arr) => {
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


export { drawAllPictures };


