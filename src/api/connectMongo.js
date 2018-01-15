const {ObjectId, MongoClient} = require('mongodb');

module.exports = async function () {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  const db = client.db('example');
  const Users = db.collection('users');

  Users.createIndex({email: 1}, {unique: true});

  return {
    ObjectId,
    Users
  };
};
