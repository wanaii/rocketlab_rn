// export const remoteUrl = '54.206.69.36';
export const remoteUrl = '127.0.0.1:5000';

export const postRequest = async function (url, param) {
  return await fetch(remoteUrl + url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: param,
  })
    .then(resp => {
      return resp.json();
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};
