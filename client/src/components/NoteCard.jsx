import { Link } from "react-router-dom";

function difficultyClass(difficulty) {
  if (difficulty === "Beginner") {
    return "bg-emerald-950/70 text-emerald-300 border border-emerald-800/70";
  }
  if (difficulty === "Intermediate") {
    return "bg-amber-950/60 text-amber-300 border border-amber-800/60";
  }
  return "bg-rose-950/60 text-rose-300 border border-rose-800/60";
}

function estimateReadingTime(note) {
  const content = [
    note?.title,
    note?.summary,
    note?.concept,
    note?.explanation,
    note?.mitigation,
    note?.references,
  ]
    .filter(Boolean)
    .join(" ");
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
}

export default function NoteCard({
  note,
  showMeta = true,
  showTags = true,
  linkTags = false,
  showDate = true,
}) {
  const readingTime = estimateReadingTime(note);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[var(--cnh-border)] bg-[var(--cnh-surface)] p-5 transition-[border-color,transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:border-[var(--cnh-accent-dim)] hover:shadow-[0_22px_50px_-32px_var(--cnh-glow)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.14),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <Link to={`/notes/${note._id}`} className="relative block space-y-3.5">
        <h2 className="line-clamp-2 text-[1.08rem] font-semibold leading-snug tracking-tight text-[var(--cnh-accent)] transition-colors duration-300 group-hover:text-emerald-300">
          {note.title}
        </h2>
        <p className="line-clamp-3 text-sm leading-6 text-[var(--cnh-text-muted)]">
          {note.summary}
        </p>
      </Link>

      {showTags && note.tags?.length ? (
        <div className="relative mt-4 flex flex-wrap gap-2">
          {note.tags.map((tag, index) =>
            linkTags ? (
              <Link
                key={`${tag}-${index}`}
                to={`/tags/${tag}`}
                className="rounded-full border border-emerald-900/70 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-emerald-300 transition-[color,background-color,border-color,box-shadow] duration-300 hover:border-emerald-600/70 hover:bg-emerald-500/20 hover:text-emerald-200 hover:shadow-[0_0_18px_-10px_var(--cnh-glow)]"
              >
                {tag}
              </Link>
            ) : (
              <span
                key={`${tag}-${index}`}
                className="rounded-full border border-emerald-900/70 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-emerald-300"
              >
                {tag}
              </span>
            )
          )}
        </div>
      ) : null}

      {showMeta ? (
        <div className="relative mt-4 flex flex-wrap items-center gap-2.5 border-t border-zinc-800/80 pt-3 text-xs text-[var(--cnh-text-dim)]">
          {note.category ? (
            <span className="rounded-md border border-[var(--cnh-border-subtle)] px-2.5 py-1">
              {note.category}
            </span>
          ) : null}
          {note.difficulty ? (
            <span className={`rounded-md px-2.5 py-1 font-medium ${difficultyClass(note.difficulty)}`}>
              {note.difficulty}
            </span>
          ) : null}
          <span className="rounded-md border border-zinc-700/70 bg-zinc-900/80 px-2.5 py-1 text-[var(--cnh-text-muted)]">
            {readingTime}
          </span>
          {showDate && note.createdAt ? (
            <span className="ml-auto">{new Date(note.createdAt).toLocaleDateString()}</span>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
