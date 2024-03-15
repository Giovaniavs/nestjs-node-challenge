import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderItemTable1710462238224 implements MigrationInterface {
  name = 'CreateOrderItemTable1710462238224';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."order_item_orderstatus_enum" AS ENUM('Recebido', 'Em preparação', 'Despachado', 'Entregue')`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "orderStatus" "public"."order_item_orderstatus_enum", "orderCreateDate" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "priceByUnity" numeric NOT NULL, "totalPrice" numeric, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "order_item"`);
    await queryRunner.query(`DROP TYPE "public"."order_item_orderstatus_enum"`);
  }
}
