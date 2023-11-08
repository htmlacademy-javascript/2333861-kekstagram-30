import { createPictures } from './mini-photo.js';
import { getPicture } from './data.js';
import { createBigPhoto } from './large-image.js';

const arrayPhoto = getPicture();

createPictures(arrayPhoto);

createBigPhoto(arrayPhoto);


