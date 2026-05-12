import ExpenseCard from "@/components/ExpenseCard";
import EmptyState from "@/components/EmptyState";

export default function ExpenseList({ expenses, onDeleteExpense, isLoading }) {
  return (
    <section className="rounded-2xl border border-medium-gray bg-light-gray p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-dark-gray">
            Recent expenses
          </h2>
        </div>
        <span className="text-xs text-soft-gray">{expenses.length} entries</span>
      </div>
      <div className="mt-5 space-y-3">
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-16 rounded-xl bg-white/70 animate-pulse" />
            <div className="h-16 rounded-xl bg-white/70 animate-pulse" />
            <div className="h-16 rounded-xl bg-white/70 animate-pulse" />
          </div>
        ) : expenses.length === 0 ? (
          <EmptyState />
        ) : (
          expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onDelete={onDeleteExpense}
            />
          ))
        )}
      </div>
    </section>
  );
}
