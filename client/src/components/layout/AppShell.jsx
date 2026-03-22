/**
 * Root application layout. Navbar and Sidebar will be composed here in a later step.
 */
export default function AppShell({ sidebar, children }) {
  return (
    <div className="flex min-h-dvh flex-col bg-[var(--cnh-bg-deep)] font-sans text-zinc-50 md:flex-row">
      {sidebar}
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
