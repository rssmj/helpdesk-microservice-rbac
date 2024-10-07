import { Request, Response, NextFunction } from 'express';
import Permissions from '../models/Permissions';
import User from '../models/User';

const checkPermission = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userRole = user.roles[0];
      const permissions = new Permissions().getPermissionsByRoleName(userRole);

      if (permissions.includes(permission)) {
        return next();
      } else {
        return res.status(403).json({ message: 'Access denied' });
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error('Permission Check Error:', err.message);
        return res.status(500).send('Server error');
      }
      console.error('Unexpected error', err);
      return res.status(500).send('Unexpected error');
    }
  };
};

export default checkPermission;
