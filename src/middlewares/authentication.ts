import { Request, Response, NextFunction } from 'express';

import { validateToken } from '../helpers/handleToken';

export const authentication = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      return response.status(401).json('Você não possui autorização para prosseguir.');
    }

    const token = authorization.replace('Bearer', '').trim();
    //TODO ajustar depois
    const result: any = validateToken(token);

    const { id, userName } = result;

    //TODO ajustar depois a conexão com o banco de dados
    const user = { password: '' }//await userRepository.findOneBy({ id, userName });

    if (!user) {
      return response.status(404).json('Token inválido');
    }

    delete user.password;
    request.user = user;

    next();
  } catch (error) {
    return response.status(400).json('Auth Error');
  }
};

 authentication;