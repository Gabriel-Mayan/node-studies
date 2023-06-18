import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from "typeorm";

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
