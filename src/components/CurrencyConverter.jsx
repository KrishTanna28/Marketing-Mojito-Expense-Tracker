"use client";

import { useEffect, useState } from "react";
import { getConvertedAmount } from "@/services/currencyApi";
import { formatCurrency } from "@/utils/calculations";

export default function CurrencyConverter({ totalAmount, baseCurrency, currencies }) {
  const defaultTarget =
    currencies.find((currency) => currency !== baseCurrency) || baseCurrency;

  const [targetCurrency, setTargetCurrency] = useState(defaultTarget);
  const [convertedAmount, setConvertedAmount] = useState(totalAmount);
  const [displayCurrency, setDisplayCurrency] = useState(baseCurrency);
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState(
    "Rates update automatically."
  );
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    let isActive = true;

    const runConversion = async () => {
      if (!Number.isFinite(totalAmount)) {
        setConvertedAmount(0);
        setDisplayCurrency(baseCurrency);
        return;
      }

      if (totalAmount === 0 || targetCurrency === baseCurrency) {
        setConvertedAmount(totalAmount);
        setDisplayCurrency(baseCurrency);
        setStatus("idle");
        setStatusMessage("No conversion needed yet.");
        return;
      }

      setStatus("loading");
      setStatusMessage("Fetching the latest rate...");

      const result = await getConvertedAmount({
        amount: totalAmount,
        from: baseCurrency,
        to: targetCurrency,
      });

      if (!isActive) return;

      if (result.ok) {
        setConvertedAmount(result.amount);
        setDisplayCurrency(targetCurrency);
        setLastUpdated(result.updatedAt || "");
        setStatus("idle");
        setStatusMessage("Rate updated.");
      } else {
        setConvertedAmount(totalAmount);
        setDisplayCurrency(baseCurrency);
        setStatus("error");
        setStatusMessage(result.error || "Live rates unavailable. Showing base total.");
      }
    };

    runConversion();

    return () => {
      isActive = false;
    };
  }, [totalAmount, baseCurrency, targetCurrency]);

  return (
    <section className="rounded-2xl border border-medium-gray bg-light-gray p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-dark-gray">
            Currency converter
          </h2>
        </div>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-xl border border-medium-gray/60 bg-white p-4">
          <p className="text-xs text-soft-gray">Total in {baseCurrency}</p>
          <p className="mt-2 text-lg font-semibold text-dark-gray">
            {formatCurrency(totalAmount, baseCurrency)}
          </p>
        </div>
        <div>
          <label
            className="text-xs font-medium uppercase tracking-[0.2em] text-soft-gray"
            htmlFor="currency"
          >
            Target currency
          </label>
          <select
            id="currency"
            value={targetCurrency}
            onChange={(event) => setTargetCurrency(event.target.value)}
            className="cursor-pointer mt-2 w-full rounded-xl border border-medium-gray bg-white px-3 py-2 text-sm text-dark-gray outline-none transition focus-visible:border-dark-green focus-visible:ring-2 focus-visible:ring-primary-green/40"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-medium-gray/60 bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-soft-gray">Converted total</p>
          {lastUpdated ? (
            <span className="text-xs text-soft-gray">Rate date: {lastUpdated}</span>
          ) : null}
        </div>
        <p className="mt-2 text-2xl font-semibold text-dark-gray">
          {formatCurrency(convertedAmount, displayCurrency)}
        </p>
        <p
          className={`mt-2 text-xs ${
            status === "error" ? "text-alert-red" : "text-soft-gray"
          }`}
          aria-live="polite"
        >
          {status === "loading" ? "Updating conversion..." : statusMessage}
        </p>
      </div>
    </section>
  );
}
