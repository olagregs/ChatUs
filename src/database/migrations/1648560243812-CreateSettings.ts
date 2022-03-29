import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSettings1648560243812 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "settings",
      columns: [
        {
          name: "id",
          type: "string",
          isPrimary: true
        },
        {
          name: "user",
          type: "string"
        },
        {
          name: "chat",
          type: "boolean",
          default: true
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("settings");
  }

}
