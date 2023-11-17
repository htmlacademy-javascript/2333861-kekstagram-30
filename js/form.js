import { isKeyEscape } from './util.js';
import { onClickScale } from './scale.js';
import {
  init as initEffect,
  reset as resetEffect
} from './effects.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const errorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштэгов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег'
};
const formUpload = document.querySelector('#upload-select-image');
const loadPicture = formUpload.querySelector('.img-upload__input');
const formPicture = formUpload.querySelector('.img-upload__overlay');
const hashPicture = formUpload.querySelector('.text__hashtags');
const commentPicture = formUpload.querySelector('.text__description');
const previewPictureClose = formUpload.querySelector('.img-upload__cancel');
const scaleControl = formUpload.querySelector('.img-upload__scale');
const imageElement = formUpload.querySelector('.img-upload__preview img');

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

const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text'
});

const normalizeTag = (str) => {
  const strfix = str.trim().split(' ').filter((tag) => Boolean(tag.length));
  return strfix;
};

const hasValidTags = (value) => normalizeTag(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) => normalizeTag(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTag(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size; //set обьект для сравнения
};

function validateCommentLength(value) {
  return value.length <= 140;
}

pristine.addValidator(
  hashPicture,
  hasValidCount,
  errorText.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashPicture,
  hasUniqueTags,
  errorText.NOT_UNIQUE,
  2,
  true
);

pristine.addValidator(
  hashPicture,
  hasValidTags,
  errorText.INVALID_PATTERN,
  1,
  true
);

pristine.addValidator(commentPicture, validateCommentLength, 'не более 140 символов');

function openModal() {
  formPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onKeyEsc);
  hashPicture.addEventListener('keydown', stopPropagationOnFocus);
  commentPicture.addEventListener('keydown', stopPropagationOnFocus);
  scaleControl.addEventListener('click', onClickScale);
}

function closeModal() {
  formUpload.reset();
  pristine.reset();
  resetEffect();
  formPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeyEsc);
  hashPicture.removeEventListener('keydown', stopPropagationOnFocus);
  commentPicture.removeEventListener('keydown', stopPropagationOnFocus);
  imageElement.style.transform = 'scale(1)';
  scaleControl.removeEventListener('click', onClickScale);
}


loadPicture.addEventListener('change', openModal);

previewPictureClose.addEventListener('click', closeModal);

formUpload.addEventListener('submit', (evt) => {
  const isValide = pristine.validate();
  if (!isValide) {
    evt.preventDefault();
  }
});
initEffect();
