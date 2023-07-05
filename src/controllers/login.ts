import { Request, Response } from "express";
import { UserRepository } from "@repositories/User";

import { formatDatabaseUser } from "@helpers/utils";
import { generateUserToken } from "@helpers/handleToken";
import { comparePassword } from "@helpers/handlePassword";

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

    const { id, userType } = databaseUser;

    const token = generateUserToken({ id, email, userType: userType.name });
    const user = formatDatabaseUser(databaseUser);

    return response.status(200).json({ user, token });
  } catch (error) {
    return response.status(200).json("Falha ao fazer login");
  }
};
