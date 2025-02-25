import { TransactionType } from 'src/modules/transaction/transaction.entity';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTransactionTable1740481270533 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transaction',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'accountId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'targetAccountId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'enum',
            enum: [
              TransactionType.DEPOSIT,
              TransactionType.WITHDRAW,
              TransactionType.TRANSFER,
            ],
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'transaction',
      new TableForeignKey({
        columnNames: ['accountId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'account',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transaction',
      new TableForeignKey({
        columnNames: ['targetAccountId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'account',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transaction', 'account');
    await queryRunner.dropTable('transaction');
  }
}
