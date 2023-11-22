import { createPictures } from './mini-photo.js';
import { createBigPhoto } from './large-image.js';
import './form.js';
import { showLoadError } from './util.js';
import { getAllPhoto } from './api.js';
import { showFilter } from './filters.js';


const bootstrap = async () => {
  try {
    const pictures = await getAllPhoto();
    createPictures(pictures);
    createBigPhoto(pictures);
    showFilter(pictures);
  } catch (err) {
    showLoadError();
  }
};

bootstrap();
