import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderAndOrderItemRelationship1710523495166
  implements MigrationInterface
{
  name = 'CreateOrderAndOrderItemRelationship1710523495166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order_item" ADD "orderId" integer`);
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`,
    );
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "orderId"`);
  }
}
