import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

const checkRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        console.error('User not found');
        return res.status(404).json({ message: 'User not found' });
      }

      const hasRole = roles.some((role) => user.roles.includes(role));
      if (!hasRole) {
        console.error('Access denied: insufficient role');
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (err: any) {
      console.error('Role Check Error:', err.message);
      res.status(500).send('Server error');
    }
  };
};

export default checkRole;
