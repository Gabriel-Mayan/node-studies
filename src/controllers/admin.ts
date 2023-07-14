import { Request, Response } from "express";
import { UserRepository } from "@repositories/User";

export const getAllUsers = async (request: Request, response: Response) => {
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
