const isKeyEscape = (evt) => evt.key === 'Escape';

const showLoadError = () => {
  const template = document.querySelector('#data-error').content.querySelector('.data-error');
  const error = template.cloneNode(true);
  document.body.append(error);

  setTimeout(() => {
    error.remove();
  }, 5000);
};

//const showFormSend = () => {
//  const template = document.querySelector('#success').content;
//  const send = template.querySelector('.success');
//  const closeSendBtn = template.querySelector('.success__button');
//  document.body.append(send);

//  closeSendBtn.addEventListener('click', () => {
//    send.remove();
//  });
//};

const showFormError = () => {
  const template = document.querySelector('#error').content.querySelector('.error');
  const error = template.cloneNode(true);
  //const closeErrorBtn = template.querySelector('.error__button');
  document.body.append(error);

  //closeErrorBtn.addEventListener('click', () => {
  //  error.remove();
  //});
};


export { isKeyEscape, showLoadError, showFormError };
