const {verify} = require('jsonwebtoken');
const {secret} = require('../constants');

module.exports = async ({cookies: {authorization}}) => {
  let user = null;

  try {
    user = verify(authorization, secret);
  } catch (error) {}

  return user;
};
