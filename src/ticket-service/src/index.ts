import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('api up: ticket-service');
});

app.listen(port, () => {
  console.log(`ticket-service running on port ${port}`);
});
