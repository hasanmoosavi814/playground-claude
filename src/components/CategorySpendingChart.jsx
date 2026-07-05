import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

// Upright columns, sorted high-to-low, one color per category. The categorical
// palette is the validated data-viz reference set, assigned in fixed slot order;
// each category keeps its color by *identity* (its index in `categories`), never
// by its rank, so the ordering can shift without the colors reshuffling. Each
// column is directly labeled (value on the cap, category on the axis), which is
// the secondary encoding the palette's floor-band CVD / sub-3:1 hues require.
const PALETTE = [
  '#2a78d6', // blue
  '#1baf7a', // aqua
  '#eda100', // yellow
  '#008300', // green
  '#4a3aa7', // violet
  '#e34948', // red
  '#e87ba4', // magenta
  '#eb6834', // orange
]

const formatCurrency = (value) =>
  `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`

const capitalize = (label) => label.charAt(0).toUpperCase() + label.slice(1)

function CategorySpendingChart({ transactions, categories = [] }) {
  const colorFor = (category) => {
    const index = categories.indexOf(category)
    return PALETTE[(index === -1 ? 0 : index) % PALETTE.length]
  }

  const totals = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

  const data = Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)

  return (
    <div className="chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="chart-empty">No expenses yet — add one to see the breakdown.</p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 24, right: 8, bottom: 4, left: 8 }}>
            <XAxis
              dataKey="category"
              tickFormatter={capitalize}
              tickLine={false}
              interval={0}
              tick={{ fill: '#555', fontSize: 12 }}
              stroke="#ccc"
            />
            <YAxis type="number" hide />
            <Tooltip
              cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
              formatter={(value) => [formatCurrency(value), 'Spent']}
              labelFormatter={capitalize}
            />
            <Bar
              dataKey="amount"
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
              label={{
                position: 'top',
                formatter: formatCurrency,
                fill: '#555',
                fontSize: 12,
              }}
            >
              {data.map((entry) => (
                <Cell key={entry.category} fill={colorFor(entry.category)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default CategorySpendingChart
