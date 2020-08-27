import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface TransactionAndBalance {
  transactions: Transaction[];
  balance: Balance;
}

class ListTransactions {
  private transactionsRepository: TransactionsRepository;

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
