/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const graphQlSchema = require('./graphql/schema');
const graphQlResolver = require('./graphql/resolver');

const app = express();

// add header to all response
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // this prevents the options request from going to graphql and failing
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use('/graphql', graphqlHTTP({
  schema: graphQlSchema,
  rootValue: graphQlResolver,
  graphiql: true
}));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
