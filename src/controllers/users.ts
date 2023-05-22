import { userRepsitory } from '../entity/user.entity';
import { Request, Response } from 'express';

export const createUser = async (request: Request, response: Response) => {
  try {
    const user = { userName: 'acebildes' };
    console.log(user);
    const teste = userRepsitory.create(user);

    return response.status(200).json(teste);
  } catch (error: any) {
    return response.status(200).json(error.message);
  }
};
