import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUniqueIDTypesToUUID1710529326345
  implements MigrationInterface
{
  name = 'ChangeUniqueIDTypesToUUID1710529326345';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "selling_report" DROP CONSTRAINT "PK_371feaa3c358ebd053a3ab0b5f9"`,
    );
    await queryRunner.query(`ALTER TABLE "selling_report" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "selling_report" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "selling_report" ADD CONSTRAINT "PK_371feaa3c358ebd053a3ab0b5f9" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_56f28841fe433cf13f8685f9bc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "client" DROP CONSTRAINT "PK_96da49381769303a6515a8785c7"`,
    );
    await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "client" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "client" ADD CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "clientId"`);
    await queryRunner.query(`ALTER TABLE "order" ADD "clientId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_56f28841fe433cf13f8685f9bc1"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "clientId"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "clientId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_56f28841fe433cf13f8685f9bc1" UNIQUE ("clientId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90"`,
    );
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "orderId"`);
    await queryRunner.query(`ALTER TABLE "order_item" ADD "orderId" uuid`);
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "order_item" ADD "productId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_56f28841fe433cf13f8685f9bc1" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_56f28841fe433cf13f8685f9bc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3"`,
    );
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "order_item" ADD "productId" integer`);
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "orderId"`);
    await queryRunner.query(`ALTER TABLE "order_item" ADD "orderId" integer`);
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90"`,
    );
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "product" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_56f28841fe433cf13f8685f9bc1"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "clientId"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "clientId" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_56f28841fe433cf13f8685f9bc1" UNIQUE ("clientId")`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "clientId"`);
    await queryRunner.query(`ALTER TABLE "order" ADD "clientId" integer`);
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "order" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "client" DROP CONSTRAINT "PK_96da49381769303a6515a8785c7"`,
    );
    await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "client" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "client" ADD CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_56f28841fe433cf13f8685f9bc1" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "selling_report" DROP CONSTRAINT "PK_371feaa3c358ebd053a3ab0b5f9"`,
    );
    await queryRunner.query(`ALTER TABLE "selling_report" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "selling_report" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "selling_report" ADD CONSTRAINT "PK_371feaa3c358ebd053a3ab0b5f9" PRIMARY KEY ("id")`,
    );
  }
}
