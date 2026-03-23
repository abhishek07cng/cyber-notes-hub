import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function IconMenu({ open }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      {open ? (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      ) : (
        <>
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </>
      )}
    </svg>
  );
}

function IconPanelCollapse() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M15 6h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2" />
      <path d="M9 12h6" />
      <path d="m12 9-3 3 3 3" />
    </svg>
  );
}

function IconPanelExpand() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M9 6H7a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2" />
      <path d="M15 12H9" />
      <path d="m12 15 3-3-3-3" />
    </svg>
  );
}

export default function AppNavbar({
  onMobileMenuToggle,
  mobileMenuOpen,
  onSidebarCollapseToggle,
  sidebarCollapsed,
  searchQuery,
  onSearchQueryChange,
  onClearSearch,
}) {
  const desktopSearchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      const targetTag = event.target?.tagName?.toLowerCase();
      if (targetTag === "input" || targetTag === "textarea") return;
      if (event.key === "/") {
        event.preventDefault();
        const targetRef =
          window.innerWidth >= 768 ? desktopSearchInputRef : mobileSearchInputRef;
        targetRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 w-full shrink-0 border-b border-[var(--cnh-border)] bg-[color-mix(in_srgb,var(--cnh-surface)_92%,transparent)] backdrop-blur-md"
    >
      <div className="flex h-14 items-center justify-between gap-3 px-4 md:px-5">
        <Link
          to="/"
          className="font-semibold tracking-tight text-[var(--cnh-accent)] transition-opacity hover:opacity-90"
        >
          Cyber Notes Hub
        </Link>

        <div className="flex min-w-0 items-center gap-2">
          <div className="relative hidden w-72 max-w-[42vw] md:block">
            <input
              ref={desktopSearchInputRef}
              type="text"
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
              placeholder="Search notes..."
              className="h-9 w-full rounded-md border border-[var(--cnh-border-subtle)] bg-zinc-900/90 px-3 pr-8 text-sm text-zinc-200 outline-none transition focus:border-[var(--cnh-accent-dim)] focus:ring-2 focus:ring-emerald-500/20"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={onClearSearch}
                aria-label="Clear search"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-1 text-zinc-400 transition hover:text-emerald-300"
              >
                ×
              </button>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onSidebarCollapseToggle}
            aria-pressed={sidebarCollapsed}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden h-9 w-9 items-center justify-center rounded-md border border-[var(--cnh-border-subtle)] text-[var(--cnh-text-muted)] transition-colors hover:border-[var(--cnh-accent-dim)] hover:text-[var(--cnh-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cnh-accent-dim)] md:inline-flex"
          >
            {sidebarCollapsed ? <IconPanelExpand /> : <IconPanelCollapse />}
          </button>

          <button
            type="button"
            onClick={onMobileMenuToggle}
            aria-expanded={mobileMenuOpen}
            aria-controls="app-mobile-nav"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--cnh-border-subtle)] text-[var(--cnh-text-muted)] transition-colors hover:border-[var(--cnh-accent-dim)] hover:text-[var(--cnh-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cnh-accent-dim)] md:hidden"
          >
            <IconMenu open={mobileMenuOpen} />
          </button>
        </div>
      </div>

      <div className="border-t border-zinc-800/80 px-4 py-2 md:hidden">
        <div className="relative">
          <input
            ref={mobileSearchInputRef}
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder="Search notes..."
            className="h-9 w-full rounded-md border border-[var(--cnh-border-subtle)] bg-zinc-900/90 px-3 pr-8 text-sm text-zinc-200 outline-none transition focus:border-[var(--cnh-accent-dim)] focus:ring-2 focus:ring-emerald-500/20"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={onClearSearch}
              aria-label="Clear search"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-1 text-zinc-400 transition hover:text-emerald-300"
            >
              ×
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
