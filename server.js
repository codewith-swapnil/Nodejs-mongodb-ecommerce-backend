const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./routes');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema'); // <- Your GraphQL schema file

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ REST API routes (still works)
app.use('/api', routes);

// ✅ GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true // Enables GraphiQL UI for testing
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
