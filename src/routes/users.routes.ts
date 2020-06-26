import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
import User from '../models/User';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({
    email,
    password,
  });

  return response.json(user);
});

usersRouter.get('/', ensureAuthenticated, async (request, response) => {
  const { id } = request.user;
  
  const loggedUser = await User.findById(id).select('-password');

  if (!loggedUser) {
    return response.status(400).json({ error: 'User not found.' });
  }

  return response.json(loggedUser);
});

export default usersRouter;