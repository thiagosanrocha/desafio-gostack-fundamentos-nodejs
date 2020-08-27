import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionAndBalance {
  transactions: Transaction[];
  balance: {
    income: number;
    outcome: number;
    total: number;
  };
}

class ListTransactions {
  transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): TransactionAndBalance {
    const transactions = this.transactionsRepository.all();

    const balance = this.transactionsRepository.getBalance();

    const transactionsAndBalance = {
      transactions,
      balance,
    };

    return transactionsAndBalance;
  }
}

export default ListTransactions;
