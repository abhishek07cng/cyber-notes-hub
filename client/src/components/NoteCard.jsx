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

export default function NoteCard({
  note,
  showMeta = true,
  showTags = true,
  linkTags = false,
  showDate = true,
}) {
  return (
    <article className="group rounded-2xl border border-[var(--cnh-border)] bg-[var(--cnh-surface)] p-5 transition-[border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--cnh-accent-dim)] hover:shadow-[0_18px_35px_-30px_var(--cnh-glow)]">
      <Link to={`/notes/${note._id}`} className="block space-y-3">
        <h2 className="line-clamp-2 text-lg font-semibold leading-snug text-[var(--cnh-accent)] transition-colors duration-200 group-hover:text-emerald-300">
          {note.title}
        </h2>
        <p className="line-clamp-3 text-sm leading-relaxed text-[var(--cnh-text-muted)]">
          {note.summary}
        </p>
      </Link>

      {showTags && note.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {note.tags.map((tag, index) =>
            linkTags ? (
              <Link
                key={`${tag}-${index}`}
                to={`/tags/${tag}`}
                className="rounded-md border border-[var(--cnh-border-subtle)] bg-zinc-900/80 px-2.5 py-1 text-xs font-medium text-emerald-300 transition-colors duration-200 hover:border-emerald-700/70 hover:text-emerald-200"
              >
                {tag}
              </Link>
            ) : (
              <span
                key={`${tag}-${index}`}
                className="rounded-md border border-[var(--cnh-border-subtle)] bg-zinc-900/80 px-2.5 py-1 text-xs font-medium text-emerald-300"
              >
                {tag}
              </span>
            )
          )}
        </div>
      ) : null}

      {showMeta ? (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--cnh-text-dim)]">
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
          {showDate && note.createdAt ? (
            <span className="ml-auto">{new Date(note.createdAt).toLocaleDateString()}</span>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
