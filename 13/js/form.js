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
  hashPicture.addEventListener('keydown', stopPropagationOnFocus);
  commentPicture.addEventListener('keydown', stopPropagationOnFocus);
}

function closeModal() {
  formPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeyEsc);
  hashPicture.removeEventListener('keydown', stopPropagationOnFocus);
  commentPicture.removeEventListener('keydown', stopPropagationOnFocus);
  loadPicture.value = '';
}

loadPicture.addEventListener('change', openModal);
previewPictureClose.addEventListener('click', closeModal);


window.onload = function () {
  formAttr();

  const pristine = new Pristine(formUpload, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper__error-text'
  });

  function validateCommentLength(value) {
    return value.length <= 140;
  }

  function validateHashTag(value) {
    const arr = value.split(' ');
    const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

    if (arr.length - 1 > 5) {
      return false;
    }

    const obj = {};
    for (let i = 0; i < arr.length; i++) {
      if (obj[arr[i]]) {
        return false;
      } else {
        obj[arr[i]] = 1;
      }
    }

    for (let i = 0; i < arr.length; i++) {
      return hashtag.test(arr[i]);
    }
  }

  pristine.addValidator(hashPicture, validateHashTag, 'форма заполнена некорректно');
  pristine.addValidator(commentPicture, validateCommentLength, 'не более 140 символов');


  formUpload.addEventListener('submit', (evt) => {
    const isValide = pristine.validate();
    if (!isValide) {
      evt.preventDefault();
    }
  });
};

