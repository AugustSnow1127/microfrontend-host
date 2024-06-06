import React, { useState, useEffect } from 'react';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import Summary from './Summary';
import BudgetForm from './BudgetForm';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
}

interface Budget {
  income: number;
  expenses: number;
}

const FinanceApp: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState<Budget>({ income: 0, expenses: 0 });

  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions');
    const storedBudget = localStorage.getItem('budget');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
    if (storedBudget) {
      setBudget(JSON.parse(storedBudget));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('budget', JSON.stringify(budget));
  }, [transactions, budget]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const setBudgetValues = (income: number, expenses: number) => {
    setBudget({ income, expenses });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Finance Tracker</h1>
      <div className='flex justify-between w-3/4'>
        <BudgetForm setBudgetValues={setBudgetValues} />
        <TransactionForm addTransaction={addTransaction} />
      </div>
      <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
      <Summary transactions={transactions} budget={budget} />
    </div>
  );
};

export default FinanceApp;
