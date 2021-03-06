import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTransaction1601042592143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'transactions',
                columns: [{
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'value',
                    type: 'int',
                },
                {
                    name: 'type',
                    type: 'varchar',
                },
                {
                    name: 'category_id',
                    type: 'uuid',
                    isNullable: true,
                     
                }
            ],
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('transactions');
    }

}
