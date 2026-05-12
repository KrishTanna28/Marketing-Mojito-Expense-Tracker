import { createExpenseId } from "./calculations";

const STORAGE_KEY = "expense-tracker:v1";

const sanitizeExpense = (expense) => {
  if (!expense || typeof expense !== "object") return null;

  const name = typeof expense.name === "string" ? expense.name.trim() : "";
  const amount = Number(expense.amount);

  if (!name || !Number.isFinite(amount) || amount <= 0) return null;

  return {
    id: typeof expense.id === "string" ? expense.id : createExpenseId(),
    name,
    amount,
    category:
      typeof expense.category === "string" && expense.category
        ? expense.category
        : "Other",
    createdAt:
      typeof expense.createdAt === "string"
        ? expense.createdAt
        : new Date().toISOString(),
  };
};

export function loadExpenses() {
  if (typeof window === "undefined") {
    return { data: [], error: "" };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { data: [], error: "" };
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      window.localStorage.removeItem(STORAGE_KEY);
      return {
        data: [],
        error: "Saved data was reset due to an invalid format.",
      };
    }

    const sanitized = parsed.map(sanitizeExpense).filter(Boolean);
    let error = "";

    if (sanitized.length !== parsed.length) {
      error = "Some saved entries were removed because they were invalid.";
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
    }

    return { data: sanitized, error };
  } catch (error) {
    window.localStorage.removeItem(STORAGE_KEY);
    return {
      data: [],
      error: "Saved data was reset because it was corrupted.",
    };
  }
}

export function saveExpenses(expenses) {
  if (typeof window === "undefined") {
    return { ok: false, error: "" };
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    return { ok: true };
  } catch (error) {
    return { ok: false, error: "Unable to save changes locally." };
  }
}
