import express, { Request, Response } from 'express';
import {
  connectRabbitMQ,
  sendMessage,
  consumeMessage,
} from '../../../libs/common/src/rmq/rabbitmq';

const app = express();
const port = process.env.PORT || 3000;
const QUEUE_NAME = 'auth_queue';

app.use(express.json());

// Connect to RabbitMQ
connectRabbitMQ().then(() => {
  console.log('Connected to RabbitMQ in auth-service');

  // Send a message
  app.post('/send', (req: Request, res: Response) => {
    const msg = req.body.message;
    sendMessage(QUEUE_NAME, msg);
    res.send(`Message sent: ${msg}`);
  });

  // Consume messages
  consumeMessage(QUEUE_NAME, (msg) => {
    if (msg !== null) {
      console.log(`Received: ${msg.content.toString()}`);
    }
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('api up: auth-service');
});

app.listen(port, () => {
  console.log(`auth-service running on port ${port}`);
});
