import { AppDataSource } from "@services/typeorm";
import { IUser } from "types/user";
import { FindOptionsWhere } from "typeorm";
import { User } from "@entity/User";

const repository = AppDataSource.getRepository(User);

export const UserRepository = {
  getUsers(): Promise<IUser[]> {
    return repository.find();
  },

  findUser(query: FindOptionsWhere<User>): Promise<IUser | null> {
    return repository.findOneBy(query);
  },
};
