import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientAndOrderRelationship1710510401477
  implements MigrationInterface
{
  name = 'CreateClientAndOrderRelationship1710510401477';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" ADD "clientId" integer`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3"`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "clientId"`);
  }
}
