import { User } from "../entity/User";
import { IUser } from "../types/user";
import { AppDataSource } from "../services/typeorm";
import { FindOptionsWhere } from "typeorm";

const userRepository = AppDataSource.getRepository(User);

export const getUsers = (): Promise<IUser[]> => {
    return userRepository.find();
};

export const findUser = (query: FindOptionsWhere<User>): Promise<IUser | null> => {
  return userRepository.findOneBy(query);
};
