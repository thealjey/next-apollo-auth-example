const {makeExecutableSchema} = require('graphql-tools');
const {mergeFileGlob} = require('gql-merge');
const resolvers = require('./resolvers');

module.exports = async () => makeExecutableSchema({
  typeDefs: await mergeFileGlob(__dirname + '/typeDefs/**/*.gql'),
  resolvers
});
