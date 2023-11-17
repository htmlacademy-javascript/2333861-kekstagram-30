const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastGenerateId = 0;

  return function () {
    lastGenerateId += 1;
    return lastGenerateId;
  };
};

const isKeyEscape = (evt) => evt.key === 'Escape';

const showError = () => {
  const template = document.querySelector('#data-error').content;
  const error = template.querySelector('.data-error');
  document.body.append(error);

  setTimeout(() => {
    error.remove();
  }, 5000);
};

export { getRandomNumber, getRandomArrayElement, createIdGenerator, isKeyEscape, showError };
