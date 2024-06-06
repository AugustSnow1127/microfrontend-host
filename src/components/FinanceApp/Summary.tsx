import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

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

interface SummaryProps {
  transactions: Transaction[];
  budget: Budget;
}

const Summary: React.FC<SummaryProps> = ({ transactions, budget }) => {
  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expenses;

  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Actual',
        data: [income, expenses],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
      {
        label: 'Budget',
        data: [budget.income, budget.expenses],
        backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      }
    ],
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Summary</h2>
      <div className="my-4">
        <Bar data={data} />
      </div>
      <div className="text-lg">
        <p>Total Income: ${income}</p>
        <p>Total Expenses: ${expenses}</p>
        <p>Balance: ${balance}</p>
        <p>Income Budget: ${budget.income}</p>
        <p>Expenses Budget: ${budget.expenses}</p>
      </div>
    </div>
  );
};

export default Summary;
