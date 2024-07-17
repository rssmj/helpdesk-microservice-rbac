import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
  res.send('api up: user-service');
});

// Start the server
app.listen(port, () => {
  console.log('user-service running on port ${port}');
});
