import { User } from "../entity/User";
import { IUser } from "../types/user";
import { AppDataSource } from "../services/typeorm";

const userRepository = AppDataSource.getRepository(User);

export const getUsers = (): Promise<IUser[]> => {
    return userRepository.find();
};
