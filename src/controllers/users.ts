import { Request, Response } from 'express';

export const createUser = (request: Request, response: Response) => {
  return response.status(200).json('passou aqui');
};