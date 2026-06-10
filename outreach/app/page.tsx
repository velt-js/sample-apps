import {
  LIBRARIES,
  MODEL_CASE,
  PROPOSE_A_PAGE,
  PR_STATUS_CHECKED,
  SUBMITTED_PRS,
  VERIFIED_DATE,
} from "@/data/outreach";
import CrossCutting from "@/components/CrossCutting";
import Drafts from "@/components/Drafts";
import LibraryTable from "@/components/LibraryTable";
import Playbook from "@/components/Playbook";
import SectionHeader from "@/components/SectionHeader";
import SubmittedPRs from "@/components/SubmittedPRs";

const NAV = [
  { href: "#listings", label: "01 Listings" },
  { href: "#playbook", label: "02 Playbook" },
  { href: "#prs", label: "03 PRs" },
  { href: "#platforms", label: "04 Platforms" },
  { href: "#drafts", label: "05 Drafts" },
];

export default function Page() {
  const listed = LIBRARIES.filter((l) => l.status === "listed").length;
  const prOpen = LIBRARIES.filter((l) => l.status === "pr-open").length;
  const topPicks = LIBRARIES.filter((l) => l.topPick).length;
  const actionable = LIBRARIES.filter((l) =>
    ["todo", "outreach", "bd", "paid", "gated"].includes(l.status),
  ).length;
  const notViable = LIBRARIES.filter((l) =>
    ["low-odds", "no-venue"].includes(l.status),
  ).length;

  const prsMerged = SUBMITTED_PRS.filter((pr) => pr.status === "merged").length;
  const prsOpen = SUBMITTED_PRS.filter((pr) => pr.status === "open").length;

  const stats = [
    { value: LIBRARIES.length, label: "Library targets" },
    { value: listed, label: "Already listed" },
    { value: prOpen, label: "Docs PR open" },
    { value: topPicks, label: "Top picks" },
    { value: actionable, label: "Actionable now" },
    { value: notViable, label: "Not viable" },
    { value: prsMerged, label: "PRs merged" },
    { value: prsOpen, label: "PRs open" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      {/* Masthead */}
      <header className="sticky top-0 z-40 -mx-5 border-b-2 border-rule-strong bg-paper px-5 py-3 sm:-mx-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.24em]">
            Velt <span className="text-signal">/</span> Distribution Dossier
          </span>
          <nav className="hidden gap-5 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-signal"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <span className="stamp hidden sm:inline-block">Internal</span>
        </div>
      </header>

      {/* Hero */}
      <section className="grid gap-10 border-b border-rule py-14 lg:grid-cols-[1.4fr_1fr] lg:py-20">
        <div>
          <p className="label-mono mb-5">Library listing &amp; outreach plan · verified {VERIFIED_DATE}</p>
          <h1 className="font-display text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Get listed where developers{" "}
            <em className="font-light italic text-signal">already read.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            The primary channel is the official documentation site of every library Velt
            integrates with — not directories, newsletters, or awesome-lists. One precedent
            proves the play works.
          </p>
        </div>

        {/* Model case */}
        <aside className="relative self-start border-2 border-rule-strong bg-paper-deep p-6">
          <span className="stamp absolute -top-3 right-5 bg-paper">Proof</span>
          <p className="label-mono mb-2">The model case</p>
          <h2 className="font-display text-2xl font-semibold">
            {MODEL_CASE.library} ·{" "}
            <a href={MODEL_CASE.pageUrl} target="_blank" rel="noreferrer" className="link-ext">
              multiplayer guide
            </a>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{MODEL_CASE.description}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{MODEL_CASE.how}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {MODEL_CASE.peers.map((p) => (
              <span
                key={p}
                className={`px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${
                  p === "Velt"
                    ? "bg-signal font-semibold text-paper"
                    : "border border-rule text-ink-soft"
                }`}
              >
                {p}
              </span>
            ))}
          </div>
        </aside>
      </section>

      {/* Stats band */}
      <section className="grid grid-cols-2 gap-px border-b border-rule bg-rule sm:grid-cols-4 lg:grid-cols-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-paper px-4 py-6 text-center">
            <div className="font-display text-4xl font-light">{s.value}</div>
            <div className="label-mono mt-1.5 !text-[10px]">{s.label}</div>
          </div>
        ))}
      </section>

      {/* 01 — Library listings */}
      <section id="listings" className="pt-16">
        <SectionHeader
          index="01"
          title="Library documentation listings"
          note={`All venues live-verified ${VERIFIED_DATE}`}
        />
        <LibraryTable />

        <div className="mt-10">
          <p className="label-mono mb-4">Propose-a-page — no slot yet, warm team</p>
          <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {PROPOSE_A_PAGE.map((p) => (
              <div key={p.title} className="bg-paper p-5">
                <h3 className="font-display text-base font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Playbook */}
      <section id="playbook" className="pt-16">
        <SectionHeader index="02" title="Outreach contacts &amp; playbook" note="Channels ranked: form / email → repo PR → community" />
        <Playbook />
      </section>

      {/* 03 — PRs in flight */}
      <section id="prs" className="pt-16">
        <SectionHeader
          index="03"
          title="Submitted PRs"
          note={`Every outreach PR ever sent · statuses checked ${PR_STATUS_CHECKED}`}
        />
        <SubmittedPRs />
      </section>

      {/* 04 — Cross-cutting platforms */}
      <section id="platforms" className="pt-16">
        <SectionHeader
          index="04"
          title="Cross-cutting platforms"
          note="One flagship demo, many galleries"
        />
        <CrossCutting />
      </section>

      {/* 05 — Outreach drafts */}
      <section id="drafts" className="pt-16">
        <SectionHeader
          index="05"
          title="Outreach drafts"
          note="First 10 targets · ready to send · verified 2026-06-10"
        />
        <Drafts />
      </section>

      <footer className="mt-20 border-t-2 border-rule-strong pt-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          Source of truth: velt-listing-plan.md (repo root) · internal — do not distribute
        </p>
      </footer>
    </main>
  );
}
