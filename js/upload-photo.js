import { openPictureModal } from './form.js';

const FILE_TYPES = ['.img', '.png', '.gif', '.jpg'];
const effectsImageFormModal = document.querySelectorAll('.effects__preview');
const photoUploadForm = document.querySelector('#upload-select-image');
const uploadedImage = photoUploadForm.querySelector('.img-upload__input');
const imageElementFormModal = photoUploadForm.querySelector('.img-upload__preview img');

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

uploadedImage.addEventListener('change', uploadingUserImage);

