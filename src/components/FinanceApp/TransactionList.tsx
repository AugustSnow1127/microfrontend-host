import React from 'react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  deleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, deleteTransaction }) => {
  return (
    <div>
      {transactions.map(transaction => (
        <div key={transaction.id} className="p-2 border-b border-gray-200">
          <span className={`${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
            {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
          </span>
          <span className="ml-2">{transaction.description}</span>
          <button onClick={() => deleteTransaction(transaction.id)} className="bg-red-500 text-white p-1 ml-2">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
