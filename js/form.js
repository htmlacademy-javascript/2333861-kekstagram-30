import { isKeyEscape, showFormSend, showFormError } from './util.js';
import { onClickScaleSwitch } from './scale.js';
import {
  init as initEffect,
  reset as resetEffect
} from './effects.js';
import { sendPhoto } from './api.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const errorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштэгов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
  INVALID_COUNT_TEXT: 'Не более 140 символов'
};
const photoUploadForm = document.querySelector('#upload-select-image');
const uploadedImage = photoUploadForm.querySelector('.img-upload__input');
const formModal = photoUploadForm.querySelector('.img-upload__overlay');
const hashtagFormModal = photoUploadForm.querySelector('.text__hashtags');
const descriptionFormModal = photoUploadForm.querySelector('.text__description');
const closeBtnFormModal = photoUploadForm.querySelector('.img-upload__cancel');
const scaleControlFormModal = photoUploadForm.querySelector('.img-upload__scale');
const imageElementFormModal = photoUploadForm.querySelector('.img-upload__preview img');
const buttonSubmitFormModal = photoUploadForm.querySelector('.img-upload__submit');
const submitButtonCaption = {
  SUBMITTING: 'Отправляю..',
  IDLE: 'Опубликовать'
};
const FILE_TYPES = ['.img', '.png', '.gif', '.jpg'];
const effectsImageFormModal = document.querySelectorAll('.effects__preview');


const toggleSubmitButton = (isDisabled) => {
  buttonSubmitFormModal.disabled = isDisabled;
  buttonSubmitFormModal.textContent = isDisabled ? submitButtonCaption.SUBMITTING : submitButtonCaption.IDLE;
};


const stopPropagationOnFocus = (evt) => {
  if (isKeyEscape(evt)) {
    evt.stopPropagation();
  }
};


const onKeyEscPress = (evt) => {
  const isErrorMessageExist = document.querySelector('.error');
  if (isKeyEscape(evt) && !isErrorMessageExist) {
    evt.preventDefault();
    hidePictureModal();
  }
};


const uploadingUserImage = () => {
  const file = uploadedImage.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matches) {
    imageElementFormModal.src = URL.createObjectURL(file);
  }
  effectsImageFormModal.forEach((item) => {
    item.style.backgroundImage = `url("${URL.createObjectURL(file)}")`;
  });

  openPictureModal();
};


const pristine = new Pristine(photoUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text'
});


const normalizeTag = (str) => {
  const strfix = str.trim().split(' ').filter((tag) => tag.length);
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
  hashtagFormModal,
  hasValidCount,
  errorText.INVALID_COUNT,
  3,
  true
);


pristine.addValidator(
  hashtagFormModal,
  hasUniqueTags,
  errorText.NOT_UNIQUE,
  2,
  true
);


pristine.addValidator(
  hashtagFormModal,
  hasValidTags,
  errorText.INVALID_PATTERN,
  1,
  true
);


pristine.addValidator(descriptionFormModal, validateCommentLength, errorText.INVALID_COUNT_TEXT);


function openPictureModal() {
  formModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onKeyEscPress);
  hashtagFormModal.addEventListener('keydown', stopPropagationOnFocus);
  descriptionFormModal.addEventListener('keydown', stopPropagationOnFocus);
  scaleControlFormModal.addEventListener('click', onClickScaleSwitch);
}


function hidePictureModal() {
  photoUploadForm.reset();
  pristine.reset();
  resetEffect();
  formModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeyEscPress);
  hashtagFormModal.removeEventListener('keydown', stopPropagationOnFocus);
  descriptionFormModal.removeEventListener('keydown', stopPropagationOnFocus);
  imageElementFormModal.style.transform = 'scale(1)';
  scaleControlFormModal.removeEventListener('click', onClickScaleSwitch);
}


const sendForm = async (formElement) => {
  const isValide = pristine.validate();
  if (!isValide) {
    return;
  }
  try {
    toggleSubmitButton(true);
    await sendPhoto(new FormData(formElement));
    hidePictureModal();
    showFormSend();
  } catch {
    showFormError();
  } finally {
    toggleSubmitButton(false);
  }
};


const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};

uploadedImage.addEventListener('change', uploadingUserImage);

closeBtnFormModal.addEventListener('click', hidePictureModal);

photoUploadForm.addEventListener('submit', onFormSubmit);

initEffect();

