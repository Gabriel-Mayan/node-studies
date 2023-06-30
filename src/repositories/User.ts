import { FindOptionsWhere, UpdateResult } from "typeorm";

import { User } from "@entity/User";
import { AppDataSource } from "@services/typeorm";
import { IDatabaseUser, ICreateUser, IUpdatedUser } from "types/user";

const repository = AppDataSource.getRepository(User);

export const UserRepository = {
  getUsers(): Promise<IDatabaseUser[]> {
    return repository.find();
  },

  findUser(query: FindOptionsWhere<User>): Promise<IDatabaseUser | null> {
    return repository.findOneBy(query);
  },

  createUser(user: ICreateUser): Promise<IDatabaseUser> {
    return repository.save(user);
  },

  updateUser(userId: string, updatedData: IUpdatedUser): Promise<UpdateResult> {
    return repository.update(userId, updatedData);
  },
};
