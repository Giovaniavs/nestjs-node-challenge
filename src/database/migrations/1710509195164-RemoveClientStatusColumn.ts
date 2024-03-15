import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveClientStatusColumn1710509195164
  implements MigrationInterface
{
  name = 'RemoveClientStatusColumn1710509195164';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."client_status_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."client_status_enum" AS ENUM('Ativo', 'Inativo')`,
    );
    await queryRunner.query(
      `ALTER TABLE "client" ADD "status" "public"."client_status_enum" NOT NULL`,
    );
  }
}
