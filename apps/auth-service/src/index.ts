import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import {
  connectRabbitMQ,
  sendMessage,
  consumeMessage,
} from '../../../libs/common/src/rmq/rabbitmq';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/auth-service-db';

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Use auth routes
app.use('/api/auth', authRoutes);

// Connect to RabbitMQ
connectRabbitMQ()
  .then(() => {
    console.log('Connected to RabbitMQ in auth-service');

    // Send a message
    app.post('/send', (req: Request, res: Response) => {
      const msg = req.body.message;
      sendMessage('auth_queue', msg);
      res.send(`Message sent: ${msg}`);
    });

    // Consume messages
    consumeMessage('auth_queue', (msg) => {
      if (msg !== null) {
        console.log(`Received: ${msg.content.toString()}`);
      }
    });
  })
  .catch((err) => {
    console.error('Failed to connect to RabbitMQ', err);
  });

app.get('/', (req: Request, res: Response) => {
  res.send('api up: auth-service');
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`auth-service running on port ${port}`);
});
