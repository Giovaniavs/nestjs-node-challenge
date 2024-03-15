import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSellingReportTable1710507031036
  implements MigrationInterface
{
  name = 'CreateSellingReportTable1710507031036';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "selling_report" ("id" SERIAL NOT NULL, "period" TIMESTAMP NOT NULL DEFAULT now(), "totalValue" numeric NOT NULL, "productAmount" integer NOT NULL, "reportFilePath" character varying NOT NULL, CONSTRAINT "PK_371feaa3c358ebd053a3ab0b5f9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "selling_report"`);
  }
}
