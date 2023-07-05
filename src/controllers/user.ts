import { Request, Response } from "express";
import { RequestWithUserRole } from "types/express";
import { ICreateUser, IUpdatedUser } from "types/user";

import { UserRepository } from "@repositories/User";
import { UserTypeRepository } from "@repositories/UserType";

import { formatDatabaseUser } from "@helpers/utils";
import { encryptPassword } from "@helpers/handlePassword";

export const getUsers = async (request: Request, response: Response) => {
  try {
    const users = await UserRepository.getUsers();

    if (!users.length) {
      return response.status(404).json({ message: "Não há usuários cadastrados..." });
    }

    return response.status(200).json(users);
  } catch (error) {
    return response.status(400).json({ message: "Erro ao trazer informações de usuários..." });
  }
};

export const getUserById = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const user = await UserRepository.findUser({ id });

    if (!user) {
      return response.status(404).json("Não foi encontrado usuário com este id...");
    }

    const { password, ...userData } = user;

    return response.status(200).json(userData);
  } catch (error) {
    return response.status(400).json({ message: "Erro ao trazer informações de usuário..." });
  }
};

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

    return response.status(200).json({ message: "Cliente cadastrado com sucesso!", user: formattedUser });
  } catch (error) {
    return response.status(400).json({ message: "Erro ao criar novo usuário..." });
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
    return response.status(400).json({ message: "Erro ao atualizar usuário..." });
  }
};

export const deleteUser = async (request: RequestWithUserRole, response: Response) => {
  const { user } = request;

  if (!user || !!user.deletedAt) {
    return response.status(404).json("Usuário já deletado...");
  }

  const deletedUser = await UserRepository.deleteUser(user.id);

  if (!deletedUser) {
    return response.status(400).json("Não foi possível apagar os dados do usuário.");
  }

  return response.status(200).json("Usuário apagado com sucesso");
};

export const toggleUserStatus = async (request: Request, response: Response) => {
  const { id } = request.params;

  const user = await UserRepository.findUser({ id });

  if (!user) {
    return response.status(404).json("Não foi encontrado usuário com este id. Informe um id de usuário diferente.");
  }

  const updatedStatus = await UserRepository.updateUser(id, { isActive: !user.isActive });

  if (!updatedStatus) {
    return response.status(400).json("Não foi possível atualizar o status do usuário.");
  }

  return response.status(200).json("Status do usuário atualizado com sucesso");
};
