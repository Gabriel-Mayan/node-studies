import { FindOptionsWhere } from "typeorm";
import { UserType } from "@entity/UserType";
import { AppDataSource } from "@services/typeorm";
import { IDatabaseUserType } from "types/userType";

const repository = AppDataSource.getRepository(UserType);

export const UserTypeRepository = {
  findType(query: FindOptionsWhere<UserType>): Promise<IDatabaseUserType | null> {
    return repository.findOneBy(query);
  },

  // TODO ajustar isso aqui
  createType(type: any): Promise<IDatabaseUserType | IDatabaseUserType[]> {
    return repository.save(type);
  },
};
