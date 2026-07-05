// Whole-dollar currency, with a real minus glyph for negatives so the
// tabular figures line up cleanly in the ledger.
export const formatCurrency = (value) => {
  const rounded = Math.round(Math.abs(value));
  const body = `$${rounded.toLocaleString("en-US")}`;
  return value < 0 ? `−${body}` : body;
};

// Compact date for the ledger, e.g. "Jan 3, 2025". Falls back to the raw
// string if it can't be parsed.
export const formatDate = (iso) => {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
