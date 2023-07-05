import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
} from "typeorm";

import { User } from "@entity/User";

@Entity()
export class RecoveryPassword extends BaseEntity {
    @PrimaryColumn("uuid")
      id: string;

    @Column({ type: "timestamp" })
      expiresIn: Date;

    @CreateDateColumn({ type: "timestamp" })
      createdAt: Date;

    @ManyToOne(() => User, { nullable: false, eager: true })
    @JoinColumn()
      user: User;
}
