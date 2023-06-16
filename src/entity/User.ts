import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
  FindOptionsWhere,
} from "typeorm";
import AppDataSource from "@services/typeorm";
import { IUser } from "types/user";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
      id: string;

    @Column("uuid", { nullable: true })
      image_id: string;

    @Column("varchar", { length: 100, nullable: false })
      name: string;

    @Column("varchar", { length: 100, nullable: false })
      email: string;

    @Column("text", { nullable: false })
      password: string;
}

const repository = AppDataSource.getRepository(User);

export const UserRepository = {
  getUsers(): Promise<IUser[]> {
    return repository.find();
  },

  findUser(query: FindOptionsWhere<User>): Promise<IUser | null> {
    return repository.findOneBy(query);
  },
};
