import { getRandomNumber, getRandomArrayElement, createIdGenerator } from './util.js';

const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const OBJECT_VALUE = 25;
const PHOTO_VALUE = 25;
const LIKES_VALUE__MIN = 15;
const LIKES_VALUE__MAX = 200;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Никита',
  'Рита',
  'Олег',
  'Анна',
  'Изабелла',
  'Илья',
  'Сема'
];

const DESC_PHOTO = [
  'шикарное фото',
  'замечательное фото',
  'свежее фото',
  'удивительное фото',
  'классное фото',
  'вау фото'
];

const getPhotoId = createIdGenerator(1, OBJECT_VALUE);
const getPhotoSrc = createIdGenerator(1, PHOTO_VALUE);
const getCommentId = createIdGenerator(1, 500);


const createComments = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomNumber(1, AVATAR_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});


const createPicture = () => ({
  id: getPhotoId(),
  url: `photos/${getPhotoSrc()}.jpg`,
  description: getRandomArrayElement(DESC_PHOTO),
  likes: getRandomNumber(LIKES_VALUE__MIN, LIKES_VALUE__MAX),
  comments: Array.from({ length: getRandomNumber(0, 30) }, createComments),
});


const getPicture = () => Array.from(
  { length: PICTURE_COUNT },
  createPicture
);

export { getPicture };
