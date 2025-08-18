const jwt = require('jsonwebtoken');

 export const generateToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
};
