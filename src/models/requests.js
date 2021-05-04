export const login = async function (payload) {
  const param = JSON.stringify({
    mobile: payload.mobile,
    name: payload.name,
  });
  return await postAuthRequest(aws_sign, token, param);
};
