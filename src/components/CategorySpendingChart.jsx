import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { formatCurrency } from "../format";

// Spending is a single measure (dollars per category), and every column is
// directly labeled on the axis — so color doesn't need to carry identity.
// Instead it carries magnitude: one warm hue ramped from deep (most spent) to
// light (least), which reads as an ordered ledger rather than a rainbow.
const RAMP_DEEP = [122, 47, 31]; // #7A2F1F
const RAMP_LIGHT = [214, 160, 122]; // #D6A07A

const colorForRank = (rank, count) => {
  const t = count <= 1 ? 0 : rank / (count - 1);
  const channel = (i) => Math.round(RAMP_DEEP[i] + (RAMP_LIGHT[i] - RAMP_DEEP[i]) * t);
  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
};

const capitalize = (label) => label.charAt(0).toUpperCase() + label.slice(1);

const AXIS_TICK = {
  fill: "#4a554e",
  fontSize: 12,
  fontFamily: "Hanken Grotesk, system-ui, sans-serif",
};

const BAR_LABEL = {
  position: "top",
  formatter: formatCurrency,
  fill: "#8b9089",
  fontSize: 11,
  fontFamily: "IBM Plex Mono, monospace",
};

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-label">{capitalize(label)}</div>
      <div className="chart-tooltip-value">
        {formatCurrency(payload[0].value)}
      </div>
    </div>
  );
}

function CategorySpendingChart({ transactions }) {
  const totals = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="card">
      <div className="card-head">
        <h2 className="card-title">Spending by category</h2>
        <span className="card-hint">Expenses</span>
      </div>

      {data.length === 0 ? (
        <p className="chart-empty">
          No expenses yet — add one to see the breakdown.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={252}>
          <BarChart data={data} margin={{ top: 26, right: 8, bottom: 4, left: 8 }}>
            <XAxis
              dataKey="category"
              tickFormatter={capitalize}
              tickLine={false}
              axisLine={{ stroke: "#e4ded0" }}
              interval={0}
              tick={AXIS_TICK}
            />
            <YAxis type="number" hide />
            <Tooltip
              cursor={{ fill: "rgba(168, 129, 63, 0.08)" }}
              content={<ChartTooltip />}
            />
            <Bar dataKey="amount" radius={[5, 5, 0, 0]} maxBarSize={30} label={BAR_LABEL}>
              {data.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={colorForRank(index, data.length)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default CategorySpendingChart;
