import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsers1648471292144 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "users",
      columns: [
        {
          name: "id",
          type: "string",
          isPrimary: true
        },
        {
          name: "email",
          type: "string",
          isNullable: false
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        }
      ]
    }
    ));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }

}
