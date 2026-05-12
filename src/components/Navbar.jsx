export default function Navbar() {
  return (
    <header className="w-full border-b border-[#E7ECEF] bg-[#FCFCFB]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="mt-1 h-12 w-1 rounded-full bg-primary-green" />

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-soft-gray">
              Marketing Mojito
            </p>
            <h1 className="font-display text-[2rem] leading-none tracking-[-0.02em] text-dark-gray">
              Expense Tracker
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
