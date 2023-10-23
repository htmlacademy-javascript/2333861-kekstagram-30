import { OBJECT_VALUE, PHOTO_VALUE, LIKES_VALUE__MIN, LIKES_VALUE__MAX, MESSAGES, NAMES, DESC_PHOTO } from './data';
import { getRandomNumber, createRandomValue } from './util';

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];
const getPhotoId = createRandomValue(1, OBJECT_VALUE);
const getPhotoSrc = createRandomValue(1, PHOTO_VALUE);
const getCommentId = createRandomValue(1, 500);

const createComments = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${createRandomValue(1, 6)()}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});


const photoCard = () => ({
  id: getPhotoId(),
  url: `photos/${getPhotoSrc()}.jpg`,
  description: getRandomArrayElement(DESC_PHOTO),
  likes: getRandomNumber(LIKES_VALUE__MIN, LIKES_VALUE__MAX),
  comments: Array.from({ length: getRandomNumber(0, 30) }, createComments),
});

export { photoCard };
