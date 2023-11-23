import { drawAllPictures } from './mini-photo.js';
import { drawPictureModal } from './large-image.js';
import './form.js';
import { showLoadError } from './util.js';
import { getAllPhoto } from './api.js';
import { showFilterSwitch } from './filters.js';

const bootstrap = async () => {
  try {
    const pictures = await getAllPhoto();
    drawAllPictures(pictures);
    drawPictureModal(pictures);
    showFilterSwitch(pictures);
  } catch (err) {
    showLoadError();
  }
};

bootstrap();
