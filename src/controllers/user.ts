import { Request, Response } from "express";
import { RequestWithUserRole } from "types/express";
import { ICreateUser, IUpdatedUser } from "types/user";

import { UserRepository } from "@repositories/User";
import { UserTypeRepository } from "@repositories/UserType";

import { formatDatabaseUser } from "@helpers/utils";
import { encryptPassword } from "@helpers/handlePassword";

export const createUser = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  try {
    const userType = await UserTypeRepository.findType({ name: "Regular" });

    if (!userType) {
      return response.status(400).json({ message: "Erro ao criar novo usuário:" });
    }

    const newUser: ICreateUser = {
      name,
      email,
      password: await encryptPassword(password),
      userType,
    };

    const insertedUser = await UserRepository.createUser(newUser);
    const formattedUser = formatDatabaseUser(insertedUser);

    return response.status(200).json({ message: "Cliente cadastrado", user: formattedUser });
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
