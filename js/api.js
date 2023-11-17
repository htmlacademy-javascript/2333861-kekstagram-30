import { showLoadError } from './util.js';

const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const serverRoute = {
  GET_DATA: '/data',
};

const httpMethod = {
  GET: 'GET',
  POST: 'POST'
};

const request = async (url, method = httpMethod.GET, body = null) => {
  const response = await fetch(url, { method, body });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('не удалось загрузить данные');
  }
};

const getAllPhoto = async () => {
  return request(SERVER_URL + serverRoute.GET_DATA);
};

const sendPhoto = async (data) => {
  return request(
    SERVER_URL,
    httpMethod.POST,
    data
  )
};


export { getAllPhoto, sendPhoto };
