import { useState } from "react";

function TransactionForm({ categories, onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newTransaction = {
      id: Date.now(),
      description,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split("T")[0],
    };

    onAddTransaction(newTransaction);
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="card">
      <div className="card-head">
        <h2 className="card-title">Add transaction</h2>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="field-label" htmlFor="tx-description">
            Description
          </label>
          <input
            id="tx-description"
            className="input"
            type="text"
            placeholder="e.g. Groceries"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="tx-amount">
            Amount
          </label>
          <div className="affix">
            <span className="affix-sign" aria-hidden="true">
              $
            </span>
            <input
              id="tx-amount"
              className="input"
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <span className="field-label">Type</span>
          <div className="segmented" role="group" aria-label="Transaction type">
            <button
              type="button"
              className="income"
              aria-pressed={type === "income"}
              onClick={() => setType("income")}
            >
              Income
            </button>
            <button
              type="button"
              className="expense"
              aria-pressed={type === "expense"}
              onClick={() => setType("expense")}
            >
              Expense
            </button>
          </div>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="tx-category">
            Category
          </label>
          <select
            id="tx-category"
            className="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-primary">
          Add transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
