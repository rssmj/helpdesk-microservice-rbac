import express, { Request, Response } from 'express';
import {
  connectRabbitMQ,
  sendMessage,
  consumeMessage,
} from '../../../libs/common/src/rmq/rabbitmq';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;
const QUEUE_NAME = 'ticket_queue';

app.use(express.json());

// Connect to RabbitMQ
connectRabbitMQ()
  .then(() => {
    console.log('Connected to RabbitMQ in ticket-service');

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
  })
  .catch((err) => {
    console.error('Failed to connect to RabbitMQ', err);
  });

app.get('/', (req: Request, res: Response) => {
  res.send('api up: ticket-service');
});

app.listen(port, () => {
  console.log(`ticket-service running on port ${port}`);
});
