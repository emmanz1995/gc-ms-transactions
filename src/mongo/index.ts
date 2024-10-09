import { TransactionBulkOps as BulkOps } from './repository';
import { transactions } from './transaction.model';

const TransactionBulkOps = BulkOps(transactions);

export const transactionModel = {
  TransactionBulkOps,
};
