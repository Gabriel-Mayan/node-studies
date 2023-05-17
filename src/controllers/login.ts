import { Request, Response } from 'express';

export const login = (request: Request, response: Response) => {
  return response.status(401).json('Usuário inativo. Contacte um administrador');
};