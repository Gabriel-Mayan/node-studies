import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
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

    @CreateDateColumn({ type: "timestamp" })
      createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
      updatedAt: Date;

    @DeleteDateColumn({ type: "timestamp", nullable: true })
      deletedAt: Date;
}
