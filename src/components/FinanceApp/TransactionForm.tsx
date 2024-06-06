import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface TransactionFormProps {
  addTransaction: (transaction: { id: string, type: 'income' | 'expense', amount: number, description: string }) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ addTransaction }) => {
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction = {
      id: uuidv4(),
      type,
      amount,
      description
    };
    addTransaction(newTransaction);
    setAmount(0);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="mr-2">Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')} className="border p-2">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="mr-2">Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} className="border p-2" />
      </div>
      <div className="mb-2">
        <label className="mr-2">Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2" />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
