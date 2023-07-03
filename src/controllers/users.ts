import { Request, Response } from "express";

import { UserRepository } from "@repositories/User";
import { encryptPassword } from "@helpers/handlePassword";

import { IUpdatedUser } from "types/user";
import { RequestWithUserRole } from "types/express";
import { formatDatabaseUser } from "@helpers/handleObject";

export const createUser = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  try {
    const encryptedPassword = await encryptPassword(password);
    const newUser = await UserRepository.createUser({ name, email, password: encryptedPassword });
    const formattedUser = formatDatabaseUser(newUser);

    return response.status(200).json({ message: "Cliente cadastrado com sucesso", user: formattedUser });
  } catch (error) {
    return response.status(400).json({ message: "Erro ao criar novo usuário:", error });
  }
};

export const updateUser = async (request: RequestWithUserRole, response: Response) => {
  try {
    const { user } = request;
    const { name, email, password } = request.body;

    if (!user) {
      return response.status(400).json("Erro ao atualizar usuário:");
    }

    const updatedData: IUpdatedUser = {
      name: name !== user.name ? name : undefined,
      email: email !== user.email ? email : undefined,
      password: password ? await encryptPassword(password) : undefined,
    };

    await UserRepository.updateUser(user.id, updatedData);

    return response.status(200).json({ message: "Cliente atualizado com sucesso" });
  } catch (error) {
    return response.status(400).json({ message: "Erro ao atualizar usuário:", error });
  }
};
