import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderTable1710460635509 implements MigrationInterface {
  name = 'CreateOrderTable1710460635509';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."order_orderstatus_enum" AS ENUM('Recebido', 'Em preparação', 'Despachado', 'Entregue')`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "orderStatus" "public"."order_orderstatus_enum" NOT NULL, "orderCreateDate" TIMESTAMP NOT NULL DEFAULT now(), "totalOrderPrice" numeric NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TYPE "public"."order_orderstatus_enum"`);
  }
}
