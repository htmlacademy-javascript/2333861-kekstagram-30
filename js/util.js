const isKeyEscape = (evt) => evt.key === 'Escape';

const showLoadError = () => {
  const template = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorLoad = template.cloneNode(true);
  document.body.append(errorLoad);

  setTimeout(() => {
    errorLoad.remove();
  }, 5000);
};

const hideMessage = () => {
  const existsElement = document.querySelector('.success') || document.querySelector('.error');
  existsElement.remove();
  document.removeEventListener('keydown', onKeyEsc);
  document.body.removeEventListener('click', onBodyClick);
};

function onKeyEsc(evt) {
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

const showFormSend = () => {
  const template = document.querySelector('#success').content.querySelector('.success');
  const sucsessSend = template.cloneNode(true);
  const closeSendBtn = sucsessSend.querySelector('.success__button');
  document.addEventListener('keydown', onKeyEsc);
  document.body.addEventListener('click', onBodyClick);
  document.body.append(sucsessSend);

  closeSendBtn.addEventListener('click', onCloseButtonClick);
};

const showFormError = () => {
  const template = document.querySelector('#error').content.querySelector('.error');
  const errorSend = template.cloneNode(true);
  const closeErrorBtn = errorSend.querySelector('.error__button');
  document.addEventListener('keydown', onKeyEsc);
  document.body.addEventListener('click', onBodyClick);
  document.body.append(errorSend);

  closeErrorBtn.addEventListener('click', onCloseButtonClick);
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


export { isKeyEscape, showLoadError, showFormSend, showFormError, debounce };
