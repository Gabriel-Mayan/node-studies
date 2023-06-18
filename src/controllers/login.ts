import { Request, Response } from "express";
import { UserRepository } from "@repositiories/User";

export const login = async (request: Request, response: Response) => {
  const teste = await UserRepository.getUsers();
  return response.status(200).json(teste);
};

export const teste = "";
