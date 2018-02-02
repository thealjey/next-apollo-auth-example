const {compare} = require('bcrypt');
const {sign} = require('jsonwebtoken');
const {secret} = require('../../../constants');

module.exports = async (root, {email, password, rememberMe}, {Users, res}) => {
  const user = await Users.findOne({email});

  if (user && await compare(password, user.password)) {
    res.cookie('authorization', sign(user, secret), rememberMe ? {maxAge: 10 ** 10} : {});

    return user;
  }

  throw new Error('Incorrect username or password');
};
