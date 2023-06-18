import { Request, Response } from "express";
import { UserRepository } from "@repositiories/User";

export const getUser = async (request: Request, response: Response) => {
  try {
    const teste = await UserRepository.getUsers();
    return response.status(200).json(teste);
  } catch (error: any) {
    return response.status(200).json(error.message);
  }
};

export const updateUser = "";
