import { CONTACTS, NO_VENUE_NOTE, WAVES } from "@/data/outreach";
import PitchCard from "./PitchCard";

export default function Playbook() {
  return (
    <div className="space-y-12">
      {/* Wave ordering */}
      <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {WAVES.map((wave, i) => (
          <div key={wave.title} className="bg-paper p-5">
            <div className="mb-3 flex items-baseline gap-2">
              <span className="font-display text-4xl font-light text-signal">{i + 1}</span>
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]">
                {wave.title}
              </h3>
            </div>
            <ul className="space-y-1.5 text-sm text-ink-soft">
              {wave.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-ink-faint">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <PitchCard />

      {/* Contacts table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b-2 border-rule-strong">
              {["Library", "Primary contact", "Docs-repo PR (fallback)", "Community", "Owner"].map(
                (h) => (
                  <th key={h} className="label-mono py-2 pr-4 font-medium">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {CONTACTS.map((c) => (
              <tr key={c.library} className="rule-row align-top">
                <td className="py-3 pr-4 font-display text-base font-semibold">{c.library}</td>
                <td className="max-w-[280px] py-3 pr-4 text-xs leading-relaxed">
                  {c.primaryUrl ? (
                    <a href={c.primaryUrl} target="_blank" rel="noreferrer" className="link-ext">
                      {c.primary}
                    </a>
                  ) : (
                    c.primary
                  )}
                </td>
                <td className="max-w-[260px] py-3 pr-4 font-mono text-[11px] leading-relaxed text-ink-soft">
                  {c.repoPath}
                </td>
                <td className="py-3 pr-4 text-xs text-ink-soft">{c.community}</td>
                <td className="py-3 text-xs text-ink-soft">{c.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="border-l-4 border-signal bg-paper-deep px-4 py-3 text-sm text-ink-soft">
        {NO_VENUE_NOTE}
      </p>
    </div>
  );
}
