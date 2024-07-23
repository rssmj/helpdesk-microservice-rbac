import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('api up: reporting-service');
});

app.listen(port, () => {
  console.log(`reporting-service running on port ${port}`);
});
