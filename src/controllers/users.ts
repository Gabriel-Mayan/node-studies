import { Request, Response } from "express";

import { UserRepository } from "@repositories/User";
import { encryptPassword } from "@helpers/handlePassword";

import { IUpdatedUser } from "types/user";
import { RequestWithUserRole } from "types/express";

export const createUser = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  try {
    const encryptedPassword = await encryptPassword(password);
    await UserRepository.createUser({ name, email, password: encryptedPassword });

    return response.status(200).json("Cliente cadastrado com sucesso");
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
    };

    if (password) {
      const encryptedPassword = await encryptPassword(password);
      updatedData.password = encryptedPassword;
    }

    await UserRepository.updateUser(user.id, updatedData);

    return response.status(200).json("Cliente atualizado com sucesso");
  } catch (error) {
    return response.status(400).json({ message: "Erro ao atualizar usuário:", error });
  }
};
