import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Role from '../models/Role';

const router = Router();

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  const roleInstance = new Role();
  const assignedRole = roleInstance.getRoleByName(role);

  if (!assignedRole) {
    return res.status(400).json({ msg: 'Invalid role specified' });
  }

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ username, password, roles: [assignedRole.name] });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ msg: `User registered as ${assignedRole.name}` });
  } catch (err) {
    if (err instanceof Error) {
      console.error('Registration Error:', err.message);
      return res.status(500).send('Server error');
    }
    console.error('Unexpected error', err);
    return res.status(500).send('Unexpected error');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({ msg: 'JWT_SECRET is not defined' });
    }

    const payload = { user: { id: user.id } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          if (err instanceof Error) {
            console.error('JWT Sign Error:', err.message);
            return res.status(500).send('Server error');
          }
          console.error('Unexpected error', err);
          return res.status(500).send('Unexpected error');
        }
        res.json({ token });
      }
    );
  } catch (err) {
    if (err instanceof Error) {
      console.error('Login Error:', err.message);
      return res.status(500).send('Server error');
    }
    console.error('Unexpected error', err);
    return res.status(500).send('Unexpected error');
  }
});

export default router;
