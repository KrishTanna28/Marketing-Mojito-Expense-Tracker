"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import SummaryPanel from "@/components/SummaryPanel";
import CategoryBreakdown from "@/components/CategoryBreakdown";
import CurrencyConverter from "@/components/CurrencyConverter";
import { loadExpenses, saveExpenses } from "@/utils/localStorage";
import {
  createExpenseId,
  getCategoryTotals,
  sumExpenses,
} from "@/utils/calculations";

const CATEGORIES = [
  "Food",
  "Travel",
  "Marketing",
  "Utilities",
  "Entertainment",
  "Other",
];

const SUPPORTED_CURRENCIES = [
  "AED", // UAE Dirham
  "ARS", // Argentine Peso
  "AUD", // Australian Dollar
  "BDT", // Bangladeshi Taka
  "BGN", // Bulgarian Lev
  "BHD", // Bahraini Dinar
  "BRL", // Brazilian Real
  "CAD", // Canadian Dollar
  "CHF", // Swiss Franc
  "CLP", // Chilean Peso
  "CNY", // Chinese Yuan
  "COP", // Colombian Peso
  "CZK", // Czech Koruna
  "DKK", // Danish Krone
  "EGP", // Egyptian Pound
  "EUR", // Euro
  "GBP", // British Pound Sterling
  "HKD", // Hong Kong Dollar
  "HUF", // Hungarian Forint
  "IDR", // Indonesian Rupiah
  "ILS", // Israeli New Shekel
  "INR", // Indian Rupee
  "JPY", // Japanese Yen
  "KRW", // South Korean Won
  "KWD", // Kuwaiti Dinar
  "LKR", // Sri Lankan Rupee
  "MAD", // Moroccan Dirham
  "MXN", // Mexican Peso
  "MYR", // Malaysian Ringgit
  "NGN", // Nigerian Naira
  "NOK", // Norwegian Krone
  "NPR", // Nepalese Rupee
  "NZD", // New Zealand Dollar
  "OMR", // Omani Rial
  "PHP", // Philippine Peso
  "PKR", // Pakistani Rupee
  "PLN", // Polish Złoty
  "QAR", // Qatari Riyal
  "RON", // Romanian Leu
  "RUB", // Russian Ruble
  "SAR", // Saudi Riyal
  "SEK", // Swedish Krona
  "SGD", // Singapore Dollar
  "THB", // Thai Baht
  "TRY", // Turkish Lira
  "TWD", // New Taiwan Dollar
  "UAH", // Ukrainian Hryvnia
  "USD", // United States Dollar
  "VND", // Vietnamese Dong
  "ZAR", // South African Rand
];

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [storageNotice, setStorageNotice] = useState("");

  useEffect(() => {
    const { data, error } = loadExpenses();
    setExpenses(data);
    if (error) {
      setStorageNotice(error);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    const result = saveExpenses(expenses);
    if (!result.ok && result.error) {
      setStorageNotice(result.error);
    }
  }, [expenses, isHydrated]);

  const handleAddExpense = (payload) => {
    const nextExpense = {
      ...payload,
      id: createExpenseId(),
      createdAt: new Date().toISOString(),
    };
    setExpenses((prev) => [nextExpense, ...prev]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const totalAmount = sumExpenses(expenses);
  const categoryTotals = getCategoryTotals(expenses, CATEGORIES);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 pb-12 pt-8 lg:pt-10">
        {storageNotice ? (
          <div
            className="mb-6 rounded-xl border border-alert-red/30 bg-alert-red/10 px-4 py-3 text-sm text-alert-red"
            role="status"
          >
            {storageNotice}
          </div>
        ) : null}
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.85fr] lg:gap-10">
          <section className="space-y-6">
            <ExpenseForm categories={CATEGORIES} onAddExpense={handleAddExpense} />
            <ExpenseList
              expenses={expenses}
              onDeleteExpense={handleDeleteExpense}
              isLoading={!isHydrated}
            />
            <CurrencyConverter
              baseCurrency="INR"
              currencies={SUPPORTED_CURRENCIES}
              totalAmount={totalAmount}
            />
          </section>
          <aside className="space-y-6 lg:pt-2">
            <SummaryPanel totalAmount={totalAmount} totalCount={expenses.length} />
            <CategoryBreakdown totals={categoryTotals} totalAmount={totalAmount} />
          </aside>
        </div>
      </main>
    </div>
  );
}
