import User from '../models/User';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

class AuthenticateService {
  public async execute({ email, password }: Request) {

    const getUser = await User.findOne()
    .where('email')
    .equals(email);

    if (!getUser) {
      throw new Error('Incorrect e-mail/password combination.');
    }

    if (getUser.password !== password) {
      throw new Error('Incorrect e-mail/password combination.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: JSON.stringify(getUser._id),
      expiresIn,
    });


    const user = getUser.toObject();

    delete user.password;

    return {
      user,
      token
    };
  }
}

export default AuthenticateService;