import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateConnections1648770519545 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "connections",
      columns: [
        {
          name: 'id',
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
          name: "socket_id",
          type: "string"
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        },
        {
          name: "updated_at",
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
    await queryRunner.dropTable("connections");
  }

}
