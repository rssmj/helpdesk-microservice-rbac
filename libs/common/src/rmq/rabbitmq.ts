import amqplib from 'amqplib';

const RABBITMQ_URL =
  process.env.RABBITMQ_URL || 'amqp://user:password@localhost:5672';

let channel: amqplib.Channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqplib.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Failed to connect to RabbitMQ', error);
  }
};

export const sendMessage = async (queue: string, message: string) => {
  try {
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Message sent to queue ${queue}`);
  } catch (error) {
    console.error('Failed to send message', error);
  }
};

export const consumeMessage = async (
  queue: string,
  callback: (msg: amqplib.Message) => void
) => {
  try {
    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        callback(msg);
        channel.ack(msg);
      }
    });
    console.log(`Consuming messages from queue ${queue}`);
  } catch (error) {
    console.error('Failed to consume message', error);
  }
};
