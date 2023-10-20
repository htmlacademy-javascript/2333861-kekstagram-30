const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


const createRandomValue = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

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


const createComments = () => ({
  id: createRandomValue(1, 500)(),
  avatar: `img/avatar-${createRandomValue(1, 6)()}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});


const photoCard = () => ({
  id: createRandomValue(1, 25)(),
  url: `photos/${createRandomValue(1, 25)()}.jpg`,
  description: getRandomArrayElement(DESC_PHOTO),
  likes: getRandomNumber(15, 200),
  comments: Array.from({ length: getRandomNumber(0, 30) }, createComments),
});

const allCards = Array.from({ length: 25 }, photoCard);


