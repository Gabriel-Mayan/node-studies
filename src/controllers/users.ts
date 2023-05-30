import { getUsers } from '../repositories/UserRepository';
import { Request, Response } from 'express';

export const getUser = async (request: Request, response: Response) => {
  try {
    const teste = await getUsers();
    console.log(teste)
    return response.status(200).json(teste);
  } catch (error: any) {
    return response.status(200).json(error.message);
  }
};
