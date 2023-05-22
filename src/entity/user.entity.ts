import { AppDataSource } from "../services/typeorm";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    userName: string
}

export const userRepsitory = AppDataSource.getRepository(User)
