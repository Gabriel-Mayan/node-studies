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
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
      id: string;

    @Column("varchar", { length: 255, nullable: false })
      url: string;

    @CreateDateColumn({ type: "timestamp" })
      createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
      updatedAt: Date;

    @DeleteDateColumn({ type: "timestamp", nullable: true })
      deletedAt: Date;
}
