const bigPicture = document.querySelector('.big-picture');
const allPicture = document.querySelector('.pictures');


allPicture.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    bigPicture.classList.remove('hidden');
  }
  const parent = evt.target.closest('.picture');
  bigPicture.querySelector('.big-picture__img img').src = evt.target.src;
  bigPicture.querySelector('.likes-count').textContent = parent.querySelector('.picture__likes').textContent;
});






