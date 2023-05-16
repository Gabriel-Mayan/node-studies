import { Router, Request, Response } from 'express';

import { login } from '../controllers/login';
import { loginSchema } from '../validations/loginSchema';
import { validateBody } from '../middlewares/validateRequests';

const routes = Router();

routes.post('/login', validateBody(loginSchema), (req: Request, res: Response) => login(req, res));

export default routes;