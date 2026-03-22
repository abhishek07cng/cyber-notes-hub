import { Link, NavLink } from "react-router-dom";
import { NAV_CATEGORIES, categoryPath } from "../../data/navigation";

function IconDashboard({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function IconWeb({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconNetwork({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <path d="M12 20h.01" />
    </svg>
  );
}

function IconExploit({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  );
}

function IconCode({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </svg>
  );
}

function IconHub({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="M12 8v4" />
      <path d="M8 12h8" />
    </svg>
  );
}

const CATEGORY_ICONS = {
  "web-security": IconWeb,
  "network-security": IconNetwork,
  "system-exploitation": IconExploit,
  "secure-coding": IconCode,
};

function navItemClass({ isActive, collapsed }) {
  const base =
    "flex items-center gap-3 rounded-lg text-sm font-medium transition-[color,background-color,box-shadow] duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-[var(--cnh-accent-dim)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cnh-surface)]";
  const pad = collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5";
  const active = isActive
    ? "bg-[color-mix(in_srgb,var(--cnh-accent)_14%,transparent)] text-[var(--cnh-accent)] shadow-[inset_3px_0_0_var(--cnh-accent)]"
    : "text-[var(--cnh-text-muted)] hover:bg-[var(--cnh-surface-elevated)] hover:text-[var(--cnh-accent)]";
  return `${base} ${pad} ${active}`;
}

export default function AppSidebar({ collapsed }) {
  return (
    <div
      className={`flex h-full min-h-0 w-full flex-col border-[var(--cnh-border)] md:border-0 ${
        collapsed ? "px-2 py-4" : "p-4"
      }`}
    >
      <div className={`mb-6 shrink-0 ${collapsed ? "flex justify-center" : ""}`}>
        <Link
          to="/"
          title="Cyber Notes Hub — Home"
          className={`flex items-center gap-2 rounded-lg px-1 py-1 text-[var(--cnh-accent)] transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cnh-accent-dim)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cnh-surface)] ${
            collapsed ? "justify-center p-2" : ""
          }`}
        >
          <IconHub className="h-8 w-8 shrink-0" />
          {!collapsed ? (
            <span className="font-semibold tracking-tight">Cyber Notes Hub</span>
          ) : (
            <span className="sr-only">Cyber Notes Hub</span>
          )}
        </Link>
      </div>

      <p
        className={`mb-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--cnh-text-dim)] ${
          collapsed ? "sr-only" : ""
        }`}
      >
        Categories
      </p>

      <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto" aria-label="Sidebar">
        <NavLink
          to="/"
          end
          title="Dashboard"
          className={({ isActive }) => navItemClass({ isActive, collapsed })}
        >
          <IconDashboard className="h-5 w-5 shrink-0 opacity-90" />
          <span className={collapsed ? "sr-only" : ""}>Dashboard</span>
        </NavLink>

        {NAV_CATEGORIES.map((c) => {
          const Icon = CATEGORY_ICONS[c.slug] ?? IconWeb;
          return (
            <NavLink
              key={c.slug}
              to={categoryPath(c.slug)}
              title={c.label}
              className={({ isActive }) => navItemClass({ isActive, collapsed })}
            >
              <Icon className="h-5 w-5 shrink-0 opacity-90" />
              <span className={collapsed ? "sr-only" : ""}>{c.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
