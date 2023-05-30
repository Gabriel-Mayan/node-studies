import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserTable1684792693433 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable( new Table({
        name: 'users',
        columns: [{
          name: 'id',
          type: 'varchar',
          length: '32',
          isPrimary: true,
          generationStrategy: 'uuid'
        }, {
          name: 'name',
          type: 'varchar',
          length: '100',
          isNullable: false
        }]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.dropTable('users');
    }
}
