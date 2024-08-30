"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeMessage = exports.sendMessage = exports.connectRabbitMQ = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
let connection;
let channel;
const connectRabbitMQ = () => __awaiter(void 0, void 0, void 0, function* () {
    connection = yield amqplib_1.default.connect(process.env.RABBITMQ_URL);
    channel = yield connection.createChannel();
    console.log('Connected to RabbitMQ');
});
exports.connectRabbitMQ = connectRabbitMQ;
const sendMessage = (queue, message) => __awaiter(void 0, void 0, void 0, function* () {
    yield channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message));
});
exports.sendMessage = sendMessage;
const consumeMessage = (queue, callback) => __awaiter(void 0, void 0, void 0, function* () {
    yield channel.assertQueue(queue, { durable: true });
    channel.consume(queue, callback, { noAck: true });
});
exports.consumeMessage = consumeMessage;
// import amqplib from 'amqplib';
// const RABBITMQ_URL =
//   process.env.RABBITMQ_URL || 'amqp://user:password@localhost:5672';
// let channel: amqplib.Channel;
// export const connectRabbitMQ = async () => {
//   try {
//     const connection = await amqplib.connect(RABBITMQ_URL);
//     channel = await connection.createChannel();
//     console.log('Connected to RabbitMQ');
//   } catch (error) {
//     console.error('Failed to connect to RabbitMQ', error);
//   }
// };
// export const sendMessage = async (queue: string, message: string) => {
//   try {
//     await channel.assertQueue(queue, { durable: true });
//     channel.sendToQueue(queue, Buffer.from(message));
//     console.log(`Message sent to queue ${queue}`);
//   } catch (error) {
//     console.error('Failed to send message', error);
//   }
// };
// export const consumeMessage = async (
//   queue: string,
//   callback: (msg: amqplib.Message) => void
// ) => {
//   try {
//     await channel.assertQueue(queue, { durable: true });
//     channel.consume(queue, (msg) => {
//       if (msg !== null) {
//         callback(msg);
//         channel.ack(msg);
//       }
//     });
//     console.log(`Consuming messages from queue ${queue}`);
//   } catch (error) {
//     console.error('Failed to consume message', error);
//   }
// };
