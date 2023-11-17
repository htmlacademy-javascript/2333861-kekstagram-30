import { createPictures } from './mini-photo.js';
import { createBigPhoto } from './large-image.js';
import './form.js';
import { showError } from './util.js';


fetch('https://30.javascript.pages.academy/kekstagram/dat')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      showError();
    }
  })
  .then((photos) => {
    createPictures(photos);
    createBigPhoto(photos);
  })
  .catch(() => showError());
