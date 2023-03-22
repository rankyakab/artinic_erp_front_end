import axios from 'axios';

export const BASE_URL = 'https://artinic-app.herokuapp.com';

export const MAP_API_KEY = 'unknown';

// const token =
//   // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhbmt5YWthYnpAZ21haWwuY29tIiwiX2lkIjoiNjNiOTYyNDM0NDU2ZDFkNjUzZjcwNzNjIiwiaWF0IjoxNjczMDkzOTIwfQ.bY4UZTx-Xcz6YUb8FYVaP3SIPd_auyb0QcPg7Jk0OEs';
const token = JSON.parse(localStorage.getItem('token'));

export const httpRequest = async (params) => {
  try {
    const { method, data, url, needToken = true, isFormData = false, header = false } = params;
    // const { method, body, url, needToken = true, isFormData = false, token } = params;

    if (!url) throw new Error('Url not set');

    if (typeof url !== 'string') throw new Error('Url must be a string');

    const headers = getHeaders(token && token, needToken);

    const options = {
      method: method || 'GET',
      redirect: 'follow',
      headers: header
        ? {
            Authorization: headers?.Authorization,
            ...header,
          }
        : headers,
    };

    if (data) options.data = isFormData ? data : JSON.stringify(data);

    // if (body) options.body = isFormData ? body : JSON.stringify(body);
     console.log(options);
    const res = await axios(`${BASE_URL}${url}`, options);
    // const res = await fetch(`${BASE_URL}${url}`, options);
    if (res?.status === 401 || res?.status === 400 || res?.status === 406) {
     console.log(res.message)
      return Promise.reject(res?.message);
    }

    // const response = await res.text();

    // const result = JSON.parse(response);

    // console.log(result);
    return Promise?.resolve(res);
    // return result;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.response);
  }
};

const getHeaders = (token, needToken) => {
  const headers = needToken ? { Authorization: `Bearer ${token}` } : null;

  return {
    ...headers,
    'Access-Control-Allow-Origin': '*',
    mode: 'no-cors',
    'Content-Type': 'application/json',

  };
};
