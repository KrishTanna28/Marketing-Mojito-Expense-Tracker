import { formatCurrency, formatDateTime } from "@/utils/calculations";

export default function ExpenseCard({ expense, onDelete }) {
  const { id, name, amount, category, createdAt } = expense;

  return (
    <div className="group flex flex-wrap items-start justify-between gap-4 rounded-xl border border-medium-gray/70 bg-white p-4">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-semibold text-dark-gray">{name}</h3>
          <span className="rounded-full bg-light-mint px-2.5 py-1 text-xs font-medium text-dark-green">
            {category}
          </span>
        </div>
        <p className="mt-2 text-xs text-soft-gray">
          {formatDateTime(createdAt)}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-base font-semibold text-dark-gray">
          {formatCurrency(amount, "INR")}
        </span>
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="cursor-pointer rounded-full border border-alert-red/30 px-3 py-1 text-xs font-medium text-alert-red transition hover:border-alert-red hover:bg-alert-red/10"
          aria-label={`Delete ${name}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
