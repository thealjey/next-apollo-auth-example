const {verify} = require('jsonwebtoken');
const {secret} = require('../constants');

module.exports = ({cookies: {authorization}}) => {
  let user = null;

  try {
    user = verify(authorization, secret);
  } catch (error) {}

  return user;
};
