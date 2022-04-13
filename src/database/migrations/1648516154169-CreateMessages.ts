import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMessages1648516154169 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "messages",
      columns: [
        {
          name: "id",
          type: "string",
          isPrimary: true
        },
        {
          name: "user_id",
          type: "string"
        },
        {
          name: "admin_id",
          type: "string",
          isNullable: true
        },
        {
          name: "text",
          type: "string",
          isNullable: false
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        }
      ],
      foreignKeys: [
        {
          name: "FKUser",
          referencedTableName: "users",
          referencedColumnNames: ["id"],
          columnNames: ["user_id"],
          onDelete: "SET NULL",
          onUpdate: "SET NULL",
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("messages");
  }

}
