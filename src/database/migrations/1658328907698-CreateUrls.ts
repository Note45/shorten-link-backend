import {
  MigrationInterface, 
  QueryRunner, 
  Table
} from "typeorm";

export class CreateUrls1658328907698 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'urls',
        columns: [
          {
            name: 'id',
            type: "uuid", 
            isPrimary: true
          },
          {
            name: "originalUrl",
            type: "varchar",
          },
          {
            name: "shortenUrl",
            type: "varchar",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
            onUpdate: "now()"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('urls');
  }
}
