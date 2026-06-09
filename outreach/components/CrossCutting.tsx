import { PLATFORMS, SEQUENCING } from "@/data/outreach";

export default function CrossCutting() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b-2 border-rule-strong">
              {["Platform", "Type", "Submit via", "Notes", "Value"].map((h) => (
                <th key={h} className="label-mono py-2 pr-4 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PLATFORMS.map((p) => (
              <tr key={p.name} className="rule-row align-top">
                <td className="py-2.5 pr-4 font-display text-base font-semibold">{p.name}</td>
                <td className="py-2.5 pr-4 text-xs text-ink-soft">{p.type}</td>
                <td className="py-2.5 pr-4 text-xs">
                  {p.submitUrl ? (
                    <a href={p.submitUrl} target="_blank" rel="noreferrer" className="link-ext">
                      {p.submitVia}
                    </a>
                  ) : (
                    p.submitVia
                  )}
                </td>
                <td className="max-w-[260px] py-2.5 pr-4 text-xs text-ink-soft">{p.notes}</td>
                <td className="py-2.5 font-mono text-xs text-brass">{"★".repeat(p.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-l-2 border-rule pl-6">
        <h3 className="label-mono mb-4">Sequencing — cross-cutting first</h3>
        <ol className="space-y-3">
          {SEQUENCING.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
              <span className="font-mono text-xs font-semibold text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
