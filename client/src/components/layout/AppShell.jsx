import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import AppSidebar from "./AppSidebar";
import { NAV_CATEGORIES, categoryPath } from "../../data/navigation";
import { NoteSearchProvider } from "../../context/NoteSearchContext";

/**
 * Root application layout: desktop sidebar column, sticky navbar, mobile nav drawer.
 */
export default function AppShell({ children }) {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery.trim());
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <NoteSearchProvider
      value={{
        searchQuery,
        debouncedSearchQuery,
        setSearchQuery,
      }}
    >
      <div className="flex min-h-dvh flex-col bg-[var(--cnh-bg-deep)] font-sans text-zinc-50 md:flex-row">
      <aside
        className={`hidden shrink-0 flex-col overflow-hidden border-r border-[var(--cnh-border)] bg-[var(--cnh-surface)] transition-[width] duration-200 ease-out md:sticky md:top-0 md:flex md:h-screen ${
          sidebarCollapsed ? "md:w-16" : "md:w-64"
        }`}
      >
        <AppSidebar collapsed={sidebarCollapsed} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <AppNavbar
          mobileMenuOpen={mobileNavOpen}
          onMobileMenuToggle={() => setMobileNavOpen((o) => !o)}
          sidebarCollapsed={sidebarCollapsed}
          onSidebarCollapseToggle={() => setSidebarCollapsed((c) => !c)}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onClearSearch={() => setSearchQuery("")}
        />

        <nav
          id="app-mobile-nav"
          className={`border-b border-[var(--cnh-border)] bg-[var(--cnh-surface)] px-4 py-3 md:hidden ${mobileNavOpen ? "block" : "hidden"}`}
          aria-label="Mobile"
          aria-hidden={!mobileNavOpen}
        >
          <div className="flex flex-col gap-1 text-sm">
            <Link
              to="/"
              className="rounded-md px-2 py-2 text-[var(--cnh-text-muted)] transition-colors hover:bg-[var(--cnh-surface-elevated)] hover:text-[var(--cnh-accent)]"
            >
              Dashboard
            </Link>
            {NAV_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to={categoryPath(c.slug)}
                className="rounded-md px-2 py-2 text-[var(--cnh-text-muted)] transition-colors hover:bg-[var(--cnh-surface-elevated)] hover:text-[var(--cnh-accent)]"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex-1 p-6">{children}</div>
      </div>
      </div>
    </NoteSearchProvider>
  );
}
