const dev = 'production' !== process.env.NODE_ENV;

const {createServer} = require('http');
const express = require('express');
const next = require('next')({dev});
const handler = require('./routes').getRequestHandler(next);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');

const createSchema = require('./api/createSchema');
const connectMongo = require('./api/connectMongo');
const authenticate = require('./api/authenticate');

const {port} = require('./constants');

async function start() {
  const schema = await createSchema();
  const mongo = await connectMongo();
  const app = express();
  const server = createServer(app);

  await next.prepare();

  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use('/graphql', graphqlExpress((req, res) => ({
    schema,
    context: {
      res,
      user: authenticate(req),
      ...mongo,
      ...buildDataloaders(mongo)
    }
  })));

  if (dev) {
    app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
  }

  app.use(handler);

  server.listen(port, () => {
    console.log(`Server running on port ${port}.`);
  });
}

start();
