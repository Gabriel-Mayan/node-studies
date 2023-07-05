import { FindOptionsWhere } from "typeorm";
import { ICreateRecovery, IDatabaseRecovery } from "types/recoveryPassword";

import { AppDataSource } from "@services/typeorm";
import { RecoveryPassword } from "@entity/RecoveryPassword";

const repository = AppDataSource.getRepository(RecoveryPassword);

export const RecoveryPasswordRepository = {
  findRecovery(query: FindOptionsWhere<RecoveryPassword>): Promise<IDatabaseRecovery | null> {
    return repository.findOneBy(query);
  },

  createRecovery(user: ICreateRecovery): Promise<IDatabaseRecovery> {
    return repository.save(user);
  },
};
