const jwt = require('jsonwebtoken');

export const generateToken = (payload: any) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET no está definido en las variables de entorno');
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};
