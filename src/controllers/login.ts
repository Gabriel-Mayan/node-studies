import { Request, Response } from "express";
import { UserRepository } from "@repositories/User";
import { comparePassword } from "@helpers/handlePassword";
import { formatDatabaseUser } from "@helpers/handleObject";
import { generateUserToken } from "@helpers/handleToken";

export const login = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const databaseUser = await UserRepository.findUser({ email });

    if (!databaseUser) {
      return response.status(400).json("Username or password is invalid");
    }

    const verifiedPassword = await comparePassword(password, databaseUser.password);

    if (!verifiedPassword) {
      return response.status(400).json("Username or password is invalid");
    }

    const token = generateUserToken({ id: databaseUser.id, email: databaseUser.email });
    const user = formatDatabaseUser(databaseUser);

    return response.status(200).json({ user, token });
  } catch (error) {
    return response.status(200).json("Falha ao fazer login");
  }
};
