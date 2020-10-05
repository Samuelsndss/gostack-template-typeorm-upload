import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterTableTransanction1601068514549 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('transactions', new TableColumn({
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',            
        },
        ))

        await queryRunner.addColumn('transactions', new TableColumn({
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',            
        },
        ))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('transactions', 'create_at');
        await queryRunner.dropColumn('transactions', 'update_at');
    }

}
