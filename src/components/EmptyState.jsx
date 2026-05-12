export default function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-medium-gray bg-white px-4 py-6 text-center">
      <p className="text-sm font-medium text-dark-gray">
        Nothing logged yet
      </p>

      <p className="mt-1 text-sm leading-relaxed text-soft-gray">
        Your recent expenses will appear here once you add a transaction.
      </p>      <p className="mt-1 text-xs text-soft-gray">
        Add your first entry to see it appear here.
      </p>
    </div>
  );
}
