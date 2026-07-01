"use client";

import { useMemo, useState } from "react";
import { LIBRARIES, LibraryStatus } from "@/data/outreach";
import StatusChip from "./StatusChip";

type Filter = "all" | "top-picks" | "actionable" | "in-flight" | "not-viable";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All targets" },
  { id: "top-picks", label: "Top picks" },
  { id: "actionable", label: "Actionable" },
  { id: "in-flight", label: "Listed / PR open" },
  { id: "not-viable", label: "Not viable" },
];

const ACTIONABLE: LibraryStatus[] = ["todo", "outreach", "bd", "paid", "gated"];
const IN_FLIGHT: LibraryStatus[] = ["listed", "pr-open"];
const NOT_VIABLE: LibraryStatus[] = ["low-odds", "no-venue"];

function Check({ on }: { on: boolean }) {
  return (
    <span className={`font-mono text-xs ${on ? "text-moss" : "text-ink-faint"}`}>
      {on ? "YES" : "—"}
    </span>
  );
}

export default function LibraryTable() {
  const [filter, setFilter] = useState<Filter>("all");

  const rows = useMemo(() => {
    switch (filter) {
      case "top-picks":
        return LIBRARIES.filter((l) => l.topPick || l.status === "listed");
      case "actionable":
        return LIBRARIES.filter((l) => ACTIONABLE.includes(l.status));
      case "in-flight":
        return LIBRARIES.filter((l) => IN_FLIGHT.includes(l.status));
      case "not-viable":
        return LIBRARIES.filter((l) => NOT_VIABLE.includes(l.status));
      default:
        return LIBRARIES;
    }
  }, [filter]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
              filter === f.id
                ? "border-rule-strong bg-ink text-paper"
                : "border-rule text-ink-soft hover:border-rule-strong hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="label-mono ml-auto">
          {rows.length} of {LIBRARIES.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b-2 border-rule-strong">
              {["#", "Library", "Demo", "Docs", "Docs-site venue", "Path", "Status"].map((h) => (
                <th key={h} className="label-mono py-2 pr-4 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((l) => (
              <tr key={l.rank} className="rule-row align-top">
                <td className="py-3 pr-4 font-mono text-xs text-ink-faint">
                  {String(l.rank).padStart(2, "0")}
                </td>
                <td className="py-3 pr-4">
                  <span className="font-display text-base font-semibold">{l.name}</span>
                  {l.topPick && (
                    <span className="ml-2 inline-block bg-signal px-1.5 py-px font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-paper">
                      Top pick
                    </span>
                  )}
                  {l.note && <p className="mt-1 max-w-xs text-xs text-ink-soft">{l.note}</p>}
                </td>
                <td className="py-3 pr-4">
                  <Check on={l.hasDemo} />
                </td>
                <td className="py-3 pr-4">
                  <Check on={l.hasDocs} />
                </td>
                <td className="py-3 pr-4">
                  {l.venue ? (
                    <>
                      <a
                        href={l.venue.url}
                        target="_blank"
                        rel="noreferrer"
                        className="link-ext font-medium"
                      >
                        {l.venue.label}
                      </a>
                      <p className="mt-0.5 text-xs text-ink-soft">{l.venue.section}</p>
                    </>
                  ) : (
                    <span className="text-ink-faint">None</span>
                  )}
                </td>
                <td className="max-w-[230px] py-3 pr-4 text-xs leading-relaxed text-ink-soft">
                  {l.path}
                </td>
                <td className="py-3">
                  <StatusChip status={l.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
