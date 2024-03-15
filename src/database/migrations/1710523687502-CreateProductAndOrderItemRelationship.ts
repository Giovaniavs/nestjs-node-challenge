import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductAndOrderItemRelationship1710523687502
  implements MigrationInterface
{
  name = 'CreateProductAndOrderItemRelationship1710523687502';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order_item" ADD "productId" integer`);
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`,
    );
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "productId"`);
  }
}
