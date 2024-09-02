import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    roles: string[];
  };
}

const checkRole = (roles: string[]) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user?.id;
    if (!userId) {
      console.log('No user ID found in request');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }

      const hasRole = roles.some((role) => user.roles.includes(role));
      if (!hasRole) {
        console.log('Access denied: insufficient role');
        return res.status(403).json({ message: 'Access denied' });
      }

      console.log('Role check passed for user:', user);
      next();
    } catch (err: any) {
      console.log('Role Check Error:', err.message);
      res.status(500).send('Server error');
    }
  };
};

export default checkRole;
