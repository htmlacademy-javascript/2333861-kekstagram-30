import { isKeyEscape } from './util.js';
const formUpload = document.querySelector('#upload-select-image');
const loadPicture = formUpload.querySelector('.img-upload__input');
const formPicture = formUpload.querySelector('.img-upload__overlay'); //форма с редактированием изображения
const hashPicture = formUpload.querySelector('.text__hashtags'); //поле для хэштегов
const commentPicture = formUpload.querySelector('.text__description'); //поле для комментов
const previewPictureClose = formUpload.querySelector('.img-upload__cancel'); //крестик


const formAttr = () => {
  formUpload.setAttribute('method', 'POST');
  formUpload.setAttribute('enctype', 'multipart/form-data');
  formUpload.setAttribute('action', 'https://30.javascript.pages.academy/kekstagram');
};

const stopPropagationOnFocus = (evt) => {
  if (isKeyEscape(evt)) {
    evt.stopPropagation();
  }
};

const onKeyEsc = (evt) => {
  if (isKeyEscape(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function openModal() {
  formPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onKeyEsc);
}

function closeModal() {
  formPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeyEsc);
  loadPicture.value = '';
}

loadPicture.addEventListener('change', openModal);
previewPictureClose.addEventListener('click', closeModal);
hashPicture.addEventListener('keydown', stopPropagationOnFocus);
commentPicture.addEventListener('keydown', stopPropagationOnFocus);

window.onload = function () {
  formAttr();

  const pristine = new Pristine(formUpload, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper__error-text'
  });

  function validateHashLength(value) {
    return value.length >= 2 && value.length <= 20;
  }

  function validateFirstSymbol(value) {
    return value[0] === '#' && value !== '#';
  }

  function validateCommentLength(value) {
    return value.length <= 140;
  }

  pristine.addValidator(hashPicture, validateHashLength, 'от 2 до 20 символов');
  pristine.addValidator(hashPicture, validateFirstSymbol, 'хэш-тэги начинаются с символа # и не могут состоять только из #');
  pristine.addValidator(commentPicture, validateCommentLength, 'не более 140 символов');


  formUpload.addEventListener('submit', (evt) => {
    const isValide = pristine.validate();
    if (!isValide) {
      evt.preventDefault();
    }
  });
};

