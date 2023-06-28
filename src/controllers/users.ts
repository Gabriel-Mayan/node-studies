import { Request, Response } from "express";
import { UserRepository } from "@repositiories/User";
import { encryptPassword } from "@helpers/handlePassword";

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
