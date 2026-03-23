export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--cnh-border-subtle)] bg-[var(--cnh-surface)] p-8 text-center">
      <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300">
        <span className="text-lg">i</span>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-[var(--cnh-accent)]">{title}</h3>
      <p className="mx-auto max-w-lg text-sm text-[var(--cnh-text-muted)]">{description}</p>
    </div>
  );
}
