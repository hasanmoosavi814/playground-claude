import { useEffect, useRef, useState } from "react";
import { formatCurrency } from "../format";

// Count a value up from 0 (first mount) and animate between values on change,
// so the figures settle into place like a statement being tallied. Honors the
// user's reduced-motion preference by snapping straight to the final value.
function useCountUp(value, duration = 900) {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);
  const frameRef = useRef();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const from = fromRef.current;
    const to = value;

    if (prefersReduced || from === to) {
      fromRef.current = to;
      setDisplay(to);
      return;
    }

    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (to - from) * eased);
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value, duration]);

  return display;
}

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const animatedBalance = useCountUp(balance);
  const animatedIncome = useCountUp(totalIncome);
  const animatedExpenses = useCountUp(totalExpenses);

  return (
    <section className="statement" aria-label="Account summary">
      <p className="statement-label">Net balance</p>
      <p
        className={`statement-balance${balance < 0 ? " is-negative" : ""}`}
        aria-label={`Net balance ${formatCurrency(balance)}`}
      >
        {formatCurrency(animatedBalance)}
      </p>

      <div className="statement-breakdown">
        <div className="stat">
          <span className="stat-label">
            <span className="stat-caret up" aria-hidden="true">
              ▲
            </span>
            Income
          </span>
          <span className="stat-value income">
            {formatCurrency(animatedIncome)}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">
            <span className="stat-caret down" aria-hidden="true">
              ▼
            </span>
            Expenses
          </span>
          <span className="stat-value expense">
            {formatCurrency(animatedExpenses)}
          </span>
        </div>
      </div>
    </section>
  );
}

export default Summary;
