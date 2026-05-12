import { formatCurrency } from "@/utils/calculations";

export default function CategoryBreakdown({ totals, totalAmount }) {
  return (
    <section className="rounded-2xl border border-medium-gray bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-dark-gray">
            Category breakdown
          </h2>
        </div>
      </div>
      <div className="mt-5 space-y-4">
        {totals.map(({ category, amount }) => {
          const percentage =
            totalAmount > 0 ? Math.round((amount / totalAmount) * 100) : 0;

          return (
            <div key={category} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-gray">{category}</span>
                <span className="text-soft-gray">
                  {formatCurrency(amount, "INR")}
                </span>
              </div>
              <div className="h-2 rounded-full bg-light-gray">
                <div
                  className="h-2 rounded-full bg-primary-green transition-[width] duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-soft-gray">
                <span>{percentage}%</span>
                <span>
                  {amount > 0 ? "Active this month" : "No spend yet"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
