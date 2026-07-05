import { useState } from 'react'
import Summary from './components/Summary'
import CategorySpendingChart from './components/CategorySpendingChart'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import './App.css'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 5000, type: "income", category: "salary", date: "2025-01-01" },
    { id: 2, description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2025-01-02" },
    { id: 3, description: "Groceries", amount: 150, type: "expense", category: "food", date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: 800, type: "expense", category: "salary", date: "2025-01-05" },
    { id: 5, description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2025-01-06" },
    { id: 6, description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2025-01-07" },
    { id: 7, description: "Gas", amount: 45, type: "expense", category: "transport", date: "2025-01-08" },
    { id: 8, description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    const target = transactions.find((t) => t.id === id);
    if (!window.confirm(`Delete "${target.description}"?`)) return;
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const entryLabel = transactions.length === 1 ? "entry" : "entries";

  return (
    <div className="app">
      <header className="masthead">
        <div>
          <span className="masthead-eyebrow">Personal Ledger</span>
          <h1>Finance Tracker</h1>
          <p className="masthead-sub">Track your income and expenses.</p>
        </div>
        <div className="masthead-meta">
          <strong>
            {transactions.length} {entryLabel}
          </strong>
          logged
        </div>
      </header>

      <Summary transactions={transactions} />

      <div className="panel-grid">
        <CategorySpendingChart
          transactions={transactions}
          categories={categories}
        />
        <TransactionForm
          categories={categories}
          onAddTransaction={addTransaction}
        />
      </div>

      <TransactionList
        transactions={transactions}
        categories={categories}
        onDeleteTransaction={deleteTransaction}
      />
    </div>
  );
}

export default App
