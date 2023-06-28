import { FindOptionsWhere } from "typeorm";

import { AppDataSource } from "@services/typeorm";
import { User } from "@entity/User";
import { IUser } from "types/user";

const repository = AppDataSource.getRepository(User);

export const UserRepository = {
  getUsers(): Promise<IUser[]> {
    return repository.find();
  },

  findUser(query: FindOptionsWhere<User>): Promise<IUser | null> {
    return repository.findOneBy(query);
  },

  createUser(user: IUser): Promise<User> {
    return repository.save(user);
  },
};
