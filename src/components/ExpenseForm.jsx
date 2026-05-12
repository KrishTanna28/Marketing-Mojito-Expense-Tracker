"use client";

import { useState } from "react";

const emptyForm = {
  name: "",
  amount: "",
  category: "",
};

const validateFields = (values) => {
  const nextErrors = {};

  if (!values.name.trim()) {
    nextErrors.name = "Enter an expense name.";
  }

  if (!values.amount) {
    nextErrors.amount = "Enter an amount.";
  } else {
    const amountNumber = Number(values.amount);
    if (Number.isNaN(amountNumber) || amountNumber <= 0) {
      nextErrors.amount = "Amount must be a positive number.";
    }
  }

  if (!values.category) {
    nextErrors.category = "Select a category.";
  }

  return nextErrors;
};

export default function ExpenseForm({ categories, onAddExpense }) {
  const [fields, setFields] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (event) => {
    const nextFields = { ...fields, [field]: event.target.value };
    setFields(nextFields);
    if (touched[field]) {
      setErrors(validateFields(nextFields));
    }
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validateFields(fields));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validateFields(fields);
    setErrors(nextErrors);
    setTouched({ name: true, amount: true, category: true });

    if (Object.keys(nextErrors).length > 0) return;

    const amountNumber = Number(fields.amount);

    setIsSubmitting(true);
    onAddExpense({
      name: fields.name.trim(),
      amount: amountNumber,
      category: fields.category,
    });
    setFields(emptyForm);
    setTouched({});
    setErrors({});
    setTimeout(() => {
      setIsSubmitting(false);
    }, 300);
  };

  const canSubmit =
    !isSubmitting && Object.keys(validateFields(fields)).length === 0;

  return (
    <section className="rounded-2xl border border-medium-gray bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-dark-gray">
            Add a new expense
          </h2>
        </div>
        <span className="text-xs text-soft-gray">Today</span>
      </div>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label className="text-sm font-medium text-dark-gray" htmlFor="name">
            Expense name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={fields.name}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            placeholder="Client lunch, SaaS renewal, cab fare"
            className="mt-2 w-full rounded-xl border border-medium-gray bg-light-gray px-3 py-2 text-sm text-dark-gray outline-none transition focus-visible:border-dark-green focus-visible:ring-2 focus-visible:ring-primary-green/40"
            aria-invalid={Boolean(touched.name && errors.name)}
            aria-describedby={
              touched.name && errors.name ? "name-error" : undefined
            }
          />
          {touched.name && errors.name ? (
            <p id="name-error" className="mt-1 text-xs text-alert-red">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              className="text-sm font-medium text-dark-gray"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={fields.amount}
              onChange={handleChange("amount")}
              onBlur={handleBlur("amount")}
              placeholder="0.00"
              className="mt-2 w-full rounded-xl border border-medium-gray bg-light-gray px-3 py-2 text-sm text-dark-gray outline-none transition focus-visible:border-dark-green focus-visible:ring-2 focus-visible:ring-primary-green/40"
              aria-invalid={Boolean(touched.amount && errors.amount)}
              aria-describedby={
                touched.amount && errors.amount ? "amount-error" : undefined
              }
            />
            {touched.amount && errors.amount ? (
              <p id="amount-error" className="mt-1 text-xs text-alert-red">
                {errors.amount}
              </p>
            ) : null}
          </div>
          <div>
            <label
              className="text-sm font-medium text-dark-gray"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={fields.category}
              onChange={handleChange("category")}
              onBlur={handleBlur("category")}
              className="cursor-pointer mt-2 w-full rounded-xl border border-medium-gray bg-light-gray px-3 py-2 text-sm text-dark-gray outline-none transition focus-visible:border-dark-green focus-visible:ring-2 focus-visible:ring-primary-green/40"
              aria-invalid={Boolean(touched.category && errors.category)}
              aria-describedby={
                touched.category && errors.category ? "category-error" : undefined
              }
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {touched.category && errors.category ? (
              <p id="category-error" className="mt-1 text-xs text-alert-red">
                {errors.category}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="submit"
            disabled={!canSubmit}
            className="cursor-pointer rounded-full bg-primary-green px-5 py-2 text-sm font-semibold text-white transition hover:bg-dark-green disabled:cursor-not-allowed disabled:bg-medium-gray"
          >
            Add expense
          </button>
        </div>
      </form>
    </section>
  );
}
