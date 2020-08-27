import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

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
    const balance = new Balance({
      income: 0,
      outcome: 0,
      total: 0,
    });

    const balanceReduce = this.transactions.reduce(
      (acumulator, transaction) => {
        const income =
          transaction.type === 'income'
            ? transaction.value + acumulator.income
            : acumulator.income;

        const outcome =
          transaction.type === 'outcome'
            ? transaction.value + acumulator.outcome
            : acumulator.outcome;

        const total = income - outcome;

        return {
          income,
          outcome,
          total,
        };
      },
      balance,
    );

    return balanceReduce;
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
