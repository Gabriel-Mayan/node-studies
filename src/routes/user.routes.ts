import { Router } from 'express';

import { getUser } from '../controllers/users';
import { createUserSchema } from '../validations/userSchema';
import { validateBody } from '../middlewares/validateRequests';

const routes = Router();

routes.get('/user', /*validateBody(createUserSchema),*/ getUser);

export default routes;
