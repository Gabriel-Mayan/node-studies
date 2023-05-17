import { Router } from 'express';

import { createUser } from '../controllers/users';
import { createUserSchema } from '../validations/userSchema';
import { validateBody } from '../middlewares/validateRequests';

const routes = Router();

routes.post('/user/create', validateBody(createUserSchema), createUser);

export default routes;