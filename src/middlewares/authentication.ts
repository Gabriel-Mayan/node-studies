import { Request, Response, NextFunction } from "express";
import { UserRepository } from "@entity/User";
import { validateToken } from "@helpers/handleToken";

// eslint-disable-next-line max-len, consistent-return
const authentication = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      return response.status(401).json("Você não possui autorização para prosseguir.");
    }

    const token = authorization.replace("Bearer", "").trim();
    // TODO Tipar isso aqui
    const { id, name }: any = validateToken(token);

    const user = await UserRepository.findUser({ id, name });

    if (!user) {
      return response.status(404).json("Token inválido");
    }

    delete user.password;
    request.user = user;

    next();
  } catch (error) {
    return response.status(400).json("Auth Error");
  }
};

export default authentication;
