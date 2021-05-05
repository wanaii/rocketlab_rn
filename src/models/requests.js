import {remoteUrl} from './settings';

const postRequest = async function (url, params) {
  const res = await fetch(remoteUrl + url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: params,
  })
    .then(resp => {
      return resp.json();
    })
    .then(json => {
      return json;
    })
    .catch(e => {
      console.log(e);
      return {
        code: '500',
        data: 'Network Error',
      };
    });
  return res;
};

export const signupRequest = async function (payload) {
  const param = JSON.stringify({
    username: payload.username,
    password: payload.password,
  });
  return await postRequest('/signup', param);
};

export const loginRequest = async function (payload) {
  const param = JSON.stringify({
    username: payload.username,
    password: payload.password,
  });
  return await postRequest('/login', param);
};

export const saveRequest = async function (payload) {
  const param = JSON.stringify({
    username: payload.username,
    userdata: JSON.stringify(payload.userdata),
  });
  return await postRequest('/save', param);
};

export const restoreRequest = async function (payload) {
  const param = JSON.stringify({
    username: payload.username,
  });
  return await postRequest('/restore', param);
};
