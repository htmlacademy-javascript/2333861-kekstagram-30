const ERROR_TIMEOUT = 5000;

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const isKeyEscape = (evt) => evt.key === 'Escape';

const showLoadError = () => {
  const template = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorLoad = template.cloneNode(true);
  document.body.append(errorLoad);

  setTimeout(() => {
    errorLoad.remove();
  }, ERROR_TIMEOUT);
};

const hideMessage = () => {
  const existsElement = document.querySelector('.success') || document.querySelector('.error');
  existsElement.remove();
  document.removeEventListener('keydown', onKeyEscPress);
  document.body.removeEventListener('click', onBodyClick);
};

function onKeyEscPress(evt) {
  if (isKeyEscape(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onCloseButtonClick() {
  hideMessage();
}

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

const formSubmitHandler = (template, className) => {
  const templateElement = template.cloneNode(true);
  const closeBtn = templateElement.querySelector(`.${className}__button`);
  document.addEventListener('keydown', onKeyEscPress);
  document.body.addEventListener('click', onBodyClick);
  document.body.append(templateElement);
  closeBtn.addEventListener('click', onCloseButtonClick);
};


const showFormSend = () => {
  const template = document.querySelector('#success').content.querySelector('.success');
  formSubmitHandler(template, template.className);
};


const showFormError = () => {
  const template = document.querySelector('#error').content.querySelector('.error');
  formSubmitHandler(template, template.className);
};


const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export { getRandomIndex, isKeyEscape, showLoadError, showFormSend, showFormError, debounce };
