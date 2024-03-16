import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveNameFromClient1710547432697 implements MigrationInterface {
  name = 'RemoveNameFromClient1710547432697';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "name"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client" ADD "name" character varying NOT NULL`,
    );
  }
}
