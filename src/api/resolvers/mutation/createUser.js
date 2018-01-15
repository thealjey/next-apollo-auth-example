const {hash} = require('bcrypt');

module.exports = async (root, {name, email, password}, {Users}) => {
  const user = {
    name,
    email,
    password: await hash(password, 10)
  };
  const {insertedIds: [_id]} = await Users.insert(user);

  return {_id, ...user};
};
