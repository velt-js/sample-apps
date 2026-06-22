import { PRStatus, SUBMITTED_PRS } from "@/data/outreach";

const PR_CHIP: Record<PRStatus, { label: string; classes: string }> = {
  merged: { label: "Merged", classes: "border-moss bg-moss text-paper" },
  open: { label: "Open", classes: "border-cobalt text-cobalt" },
  closed: { label: "Closed", classes: "border-signal text-signal" },
};

export default function SubmittedPRs() {
  return (
    <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
      {SUBMITTED_PRS.map((pr) => {
        const chip = PR_CHIP[pr.status];
        return (
          <a
            key={pr.prUrl}
            href={pr.prUrl}
            target="_blank"
            rel="noreferrer"
            className="group bg-paper p-5 transition-colors hover:bg-paper-deep"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-cobalt">{pr.pr}</span>
              <span
                className={`inline-block border px-1.5 py-px font-mono text-[10px] font-medium uppercase tracking-[0.14em] ${chip.classes}`}
              >
                {chip.label}
              </span>
            </div>
            <h3 className="font-display text-lg font-semibold group-hover:text-signal">
              {pr.library}
            </h3>
            <p className="mt-1 font-mono text-[11px] text-ink-soft">{pr.repo}</p>
            <p className="mt-1 text-xs text-ink-soft">{pr.section}</p>
            {pr.mergedAt && (
              <p className="mt-2 text-xs font-medium text-moss">Merged {pr.mergedAt}</p>
            )}
            {pr.closedAt && (
              <p className="mt-2 text-xs font-medium text-signal">Closed {pr.closedAt}</p>
            )}
            {pr.note && <p className="mt-2 text-xs italic text-signal">{pr.note}</p>}
          </a>
        );
      })}
    </div>
  );
}
