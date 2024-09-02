import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authenticateToken from './middleware/authenticateToken';
import checkRole from './middleware/checkRole';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API up: auth-service');
});

// Protect a route with RBAC
app.get(
  '/admin',
  authenticateToken,
  checkRole(['admin']),
  (req: Request, res: Response) => {
    res.send('Welcome, admin!');
  }
);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`auth-service running on port ${port}`);
});
