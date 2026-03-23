function SkeletonBlock({ className }) {
  return <div className={`animate-pulse rounded-md bg-zinc-800/80 ${className}`} />;
}

export function NoteCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--cnh-border)] bg-[var(--cnh-surface)] p-5">
      <SkeletonBlock className="mb-3 h-6 w-3/4" />
      <SkeletonBlock className="mb-2 h-4 w-full" />
      <SkeletonBlock className="mb-4 h-4 w-5/6" />
      <div className="mb-4 flex flex-wrap gap-2">
        <SkeletonBlock className="h-6 w-16 rounded-full" />
        <SkeletonBlock className="h-6 w-20 rounded-full" />
      </div>
      <div className="flex gap-2">
        <SkeletonBlock className="h-6 w-20" />
        <SkeletonBlock className="h-6 w-24" />
      </div>
    </div>
  );
}

export function NoteCardSkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <NoteCardSkeleton key={index} />
      ))}
    </div>
  );
}
