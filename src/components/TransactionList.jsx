import { useState } from "react";
import { formatCurrency, formatDate } from "../format";

function TransactionList({ transactions, categories, onDeleteTransaction }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (t) => t.type === filterType
    );
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(
      (t) => t.category === filterCategory
    );
  }

  const count = filteredTransactions.length;

  return (
    <div className="card ledger">
      <div className="card-head">
        <h2 className="card-title">Transactions</h2>
        <div className="filters">
          <select
            className="select select-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            aria-label="Filter by type"
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            className="select select-sm"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {count === 0 ? (
        <p className="ledger-empty">
          No transactions match these filters yet.
        </p>
      ) : (
        <div className="table-scroll">
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th className="num">Amount</th>
                <th aria-label="Actions"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t) => (
                <tr key={t.id}>
                  <td className="cell-date">{formatDate(t.date)}</td>
                  <td className="cell-desc">{t.description}</td>
                  <td>
                    <span className="chip">{t.category}</span>
                  </td>
                  <td
                    className={`cell-amount ${
                      t.type === "income" ? "income" : "expense"
                    }`}
                  >
                    {t.type === "income" ? "+" : "−"}
                    {formatCurrency(t.amount)}
                  </td>
                  <td className="cell-action">
                    <button
                      className="row-delete"
                      onClick={() => onDeleteTransaction(t.id)}
                      aria-label={`Delete ${t.description}`}
                      title="Delete"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
