import React, { useState } from 'react';

interface BudgetFormProps {
  setBudgetValues: (income: number, expenses: number) => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ setBudgetValues }) => {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBudgetValues(income, expenses);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="mr-2">Income Budget:</label>
        <input type="number" value={income} onChange={(e) => setIncome(parseFloat(e.target.value))} className="border p-2" />
      </div>
      <div className="mb-2">
        <label className="mr-2">Expenses Budget:</label>
        <input type="number" value={expenses} onChange={(e) => setExpenses(parseFloat(e.target.value))} className="border p-2" />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2">Set Budget</button>
    </form>
  );
};

export default BudgetForm;
