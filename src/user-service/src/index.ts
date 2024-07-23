import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('api up: user-service');
});

app.listen(port, () => {
  console.log(`user-service running on port ${port}`);
});
