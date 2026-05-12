const LOCALE_BY_CURRENCY = {
  INR: "en-IN",
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  AED: "en-AE",
  AUD: "en-AU",
  CAD: "en-CA",
  SGD: "en-SG",
  JPY: "ja-JP",
  ZAR: "en-ZA",
  CHF: "de-CH",
};

export function createExpenseId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `exp_${Date.now().toString(36)}_${Math.random()
    .toString(16)
    .slice(2, 10)}`;
}

export function sumExpenses(expenses) {
  return expenses.reduce((total, expense) => {
    const amount = Number(expense.amount);
    if (Number.isFinite(amount)) {
      return total + amount;
    }
    return total;
  }, 0);
}

export function getCategoryTotals(expenses, categories) {
  const totals = categories.reduce((acc, category) => {
    acc[category] = 0;
    return acc;
  }, {});

  expenses.forEach((expense) => {
    const amount = Number(expense.amount);
    if (!Number.isFinite(amount)) return;
    if (Object.prototype.hasOwnProperty.call(totals, expense.category)) {
      totals[expense.category] += amount;
    }
  });

  return categories.map((category) => ({
    category,
    amount: totals[category] || 0,
  }));
}

export function formatCurrency(amount, currency = "INR") {
  const locale = LOCALE_BY_CURRENCY[currency] || "en-US";
  const safeAmount = Number.isFinite(amount) ? amount : 0;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(safeAmount);
}

export function formatDateTime(value) {
  if (!value) return "Just now";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
