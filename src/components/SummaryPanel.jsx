import { formatCurrency } from "@/utils/calculations";

export default function SummaryPanel({ totalAmount, totalCount }) {
  return (
    <section className="rounded-2xl border border-medium-gray bg-light-mint p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-dark-gray">Summary</h2>
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-medium-gray/60 bg-white p-4">
          <p className="text-xs text-soft-gray">Total spent</p>
          <p className="mt-2 text-2xl font-semibold text-dark-gray">
            {formatCurrency(totalAmount, "INR")}
          </p>
        </div>
        <div className="rounded-xl border border-medium-gray/60 bg-white p-4">
          <p className="text-xs text-soft-gray">Entries</p>
          <p className="mt-2 text-2xl font-semibold text-dark-gray">
            {totalCount}
          </p>
        </div>
      </div>
    </section>
  );
}
