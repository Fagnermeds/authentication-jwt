import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ email, password }: Request) {
    const checkUserExists = await User.findOne().where('email').equals(email);
    
    if (checkUserExists) {
      throw new Error('E-mail address is already used.');
    }

    const user = await User.create({
      email,
      password,
    });

    return user;
  }
}

export default CreateUserService;