const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const serverRoute = {
  GET_DATA: '/data',
  SEND_DATA: '/'
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

const getAllPhoto = async () => request(SERVER_URL + serverRoute.GET_DATA);

const sendPhoto = async (data) => request(SERVER_URL + serverRoute.SEND_DATA, httpMethod.POST, data);

export { getAllPhoto, sendPhoto };
