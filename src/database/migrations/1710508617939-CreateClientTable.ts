import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientTable1710508617939 implements MigrationInterface {
  name = 'CreateClientTable1710508617939';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."client_status_enum" AS ENUM('Ativo', 'Inativo')`,
    );
    await queryRunner.query(
      `CREATE TABLE "client" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "contact" character varying NOT NULL, "address" text NOT NULL, "status" "public"."client_status_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "client"`);
    await queryRunner.query(`DROP TYPE "public"."client_status_enum"`);
  }
}
