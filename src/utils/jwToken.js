import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// import { config } from 'dotenv';
const {config} = pkg;
import pkg from 'dotenv';

config();
export const jwtToken = {
  createToken({
    id, role, first_name, last_name
  }) {
    return jwt.sign({
      id, role, first_name, last_name
    },
    process.env.SECRET_OR_KEY, { expiresIn: '24h' });
  },
};
export function verifyingToken(token) {
  const verifiedToken = jwt.verify(token, process.env.SECRET_OR_KEY);
  return verifiedToken;
}

export const hashPassword = (password) => bcrypt.hashSync(password, 10);
export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);