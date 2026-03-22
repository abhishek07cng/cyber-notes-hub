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
    "group relative flex items-center gap-3 rounded-lg border-l-2 border-transparent text-[0.8125rem] font-medium leading-snug tracking-wide outline-none transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[var(--cnh-accent-dim)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cnh-surface)]";
  const pad = collapsed ? "justify-center px-2 py-3" : "px-3 py-3";
  const active = isActive
    ? "border-[var(--cnh-accent)] bg-[color-mix(in_srgb,var(--cnh-accent)_18%,transparent)] text-[var(--cnh-accent)] shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--cnh-accent)_20%,transparent),0_0_24px_-8px_var(--cnh-accent)]"
    : "text-[var(--cnh-text-muted)] hover:-translate-x-px hover:border-[color-mix(in_srgb,var(--cnh-accent)_45%,transparent)] hover:bg-[var(--cnh-surface-elevated)] hover:text-[var(--cnh-accent)] hover:shadow-[0_0_18px_-10px_var(--cnh-glow)] motion-reduce:hover:translate-x-0";
  return `${base} ${pad} ${active}`;
}

function navIconClass(isActive) {
  const base =
    "h-5 w-5 shrink-0 transition-[color,transform,opacity] duration-200 ease-out motion-reduce:transition-none";
  return isActive
    ? `${base} text-[var(--cnh-accent)] opacity-100`
    : `${base} text-[var(--cnh-text-dim)] opacity-90 group-hover:scale-[1.04] group-hover:text-[var(--cnh-accent)] group-hover:opacity-100 motion-reduce:group-hover:scale-100`;
}

export default function AppSidebar({ collapsed }) {
  return (
    <div
      className={`flex h-full min-h-0 w-full flex-col border-[var(--cnh-border)] md:border-0 ${
        collapsed ? "px-2 py-5" : "px-4 py-5"
      }`}
    >
      <div className={`mb-8 shrink-0 ${collapsed ? "flex justify-center" : ""}`}>
        <Link
          to="/"
          title="Cyber Notes Hub — Home"
          className={`flex items-center gap-2.5 rounded-xl px-1 py-1.5 text-[var(--cnh-accent)] transition-[opacity,box-shadow] duration-200 ease-out motion-reduce:transition-none hover:opacity-95 hover:shadow-[0_0_20px_-12px_var(--cnh-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cnh-accent-dim)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cnh-surface)] ${
            collapsed ? "justify-center p-2" : ""
          }`}
        >
          <IconHub className="h-8 w-8 shrink-0 drop-shadow-[0_0_10px_var(--cnh-glow)]" />
          {!collapsed ? (
            <span className="text-base font-semibold leading-tight tracking-tight">
              Cyber Notes Hub
            </span>
          ) : (
            <span className="sr-only">Cyber Notes Hub</span>
          )}
        </Link>
      </div>

      <p
        className={`mb-4 px-0.5 text-[11px] font-semibold uppercase leading-none tracking-[0.18em] text-[var(--cnh-text-dim)] ${
          collapsed ? "sr-only" : ""
        }`}
      >
        Categories
      </p>

      <nav className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto pr-0.5" aria-label="Sidebar">
        <NavLink
          to="/"
          end
          title="Dashboard"
          className={({ isActive }) => navItemClass({ isActive, collapsed })}
        >
          {({ isActive }) => (
            <>
              <IconDashboard className={navIconClass(isActive)} />
              <span className={collapsed ? "sr-only" : ""}>Dashboard</span>
            </>
          )}
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
              {({ isActive }) => (
                <>
                  <Icon className={navIconClass(isActive)} />
                  <span className={collapsed ? "sr-only" : ""}>{c.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
