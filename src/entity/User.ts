import {
  Entity,
  BaseEntity,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Image } from "@entity/Image";
import { UserType } from "@entity/UserType";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
      id: string;

    @Column("varchar", { length: 100, nullable: false })
      name: string;

    @Column("varchar", { length: 255, nullable: false, unique: true })
      email: string;

    @Column("varchar", { length: 255, nullable: false })
      password: string;

    @Column("boolean", { nullable: false, default: false })
      isActive: boolean;

    @CreateDateColumn({ type: "timestamp" })
      createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
      updatedAt: Date;

    @DeleteDateColumn({ type: "timestamp", nullable: true })
      deletedAt: Date;

    @OneToOne(() => Image)
    @JoinColumn()
      image: Image;

    @ManyToOne(() => UserType, { nullable: false })
    @JoinColumn()
      userType: UserType;
}
