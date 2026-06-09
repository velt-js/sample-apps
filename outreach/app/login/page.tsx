export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="relative w-full max-w-sm border-2 border-rule-strong bg-paper-deep p-8">
        <span className="stamp absolute -top-3 right-6 bg-paper">Restricted</span>

        <p className="label-mono mb-2">
          Velt <span className="text-signal">/</span> Distribution Dossier
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Internal eyes only.
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Enter the passphrase to open the dossier.
        </p>

        <form method="POST" action="/api/login" className="mt-6">
          <label htmlFor="password" className="label-mono mb-2 block">
            Passphrase
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoFocus
            required
            className="w-full border-2 border-rule-strong bg-paper px-3 py-2 font-mono text-sm tracking-widest outline-none placeholder:text-ink-faint focus:border-signal"
            placeholder="••••••••••••"
          />
          {error && (
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
              Incorrect passphrase — try again
            </p>
          )}
          <button
            type="submit"
            className="mt-4 w-full border-2 border-rule-strong bg-ink py-2 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-signal"
          >
            Unlock
          </button>
        </form>
      </div>
    </main>
  );
}
