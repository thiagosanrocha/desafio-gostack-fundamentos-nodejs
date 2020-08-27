import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const allTransaction = this.transactions;

    return allTransaction;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acumulator, transaction) => {
        return {
          income:
            transaction.type === 'income'
              ? transaction.value + acumulator.income
              : acumulator.income,
          outcome:
            transaction.type === 'outcome'
              ? transaction.value + acumulator.outcome
              : acumulator.outcome,
          total:
            (transaction.type === 'income'
              ? transaction.value + acumulator.income
              : acumulator.income) -
            (transaction.type === 'outcome'
              ? transaction.value + acumulator.outcome
              : acumulator.outcome),
        };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
