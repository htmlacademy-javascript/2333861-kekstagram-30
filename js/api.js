import { showError } from './util.js';


function getPhoto() {
  fetch('https://30.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showError();
      }
    })
    .catch(() => showError());
}

export { getPhoto };


