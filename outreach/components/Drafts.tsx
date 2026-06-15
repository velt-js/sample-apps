import { DRAFTS, Draft } from "@/data/outreach";
import CopyButton from "./CopyButton";

const CHANNEL_CLASSES: Record<Draft["channel"], string> = {
  Email: "border-cobalt text-cobalt",
  "GitHub PR": "border-moss text-moss",
  Form: "border-plum text-plum",
  Slack: "border-brass text-brass",
  Discord: "border-brass text-brass",
};

export default function Drafts() {
  return (
    <div className="space-y-3">
      {DRAFTS.map((d, i) => (
        <details key={d.target} className="group border-2 border-rule bg-paper open:border-rule-strong">
          <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
            <span className="font-mono text-xs text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display text-lg font-semibold">{d.target}</span>
            <span
              className={`inline-block border px-1.5 py-px font-mono text-[10px] font-medium uppercase tracking-[0.14em] ${CHANNEL_CLASSES[d.channel]}`}
            >
              {d.channel}
            </span>
            {d.done ? (
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-moss sm:inline">
                ✅ {d.done}
              </span>
            ) : d.blocker ? (
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-signal sm:inline">
                ⚠ {d.blocker}
              </span>
            ) : (
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-moss sm:inline">
                Ready
              </span>
            )}
            <span className="ml-auto font-mono text-xs text-ink-faint transition-transform group-open:rotate-90">
              →
            </span>
          </summary>

          <div className="space-y-5 border-t border-rule px-5 py-5">
            <p className="text-sm text-ink-soft">
              <span className="label-mono mr-2">To</span>
              {d.toUrl ? (
                <a href={d.toUrl} target="_blank" rel="noreferrer" className="link-ext">
                  {d.to}
                </a>
              ) : (
                d.to
              )}
            </p>

            {d.fields && (
              <table className="w-full max-w-md border-collapse text-left text-sm">
                <tbody>
                  {d.fields.map((f) => (
                    <tr key={f.label} className="rule-row">
                      <td className="label-mono py-1.5 pr-6">{f.label}</td>
                      <td className="py-1.5 font-mono text-xs">{f.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {d.subject && (
              <p className="text-sm">
                <span className="label-mono mr-2">Subject</span>
                <span className="font-medium">{d.subject}</span>
              </p>
            )}

            <div className="border-l-4 border-rule bg-paper-deep">
              <div className="flex items-center justify-between border-b border-rule px-4 py-2">
                <span className="label-mono">Message</span>
                <CopyButton text={d.body} />
              </div>
              <pre className="whitespace-pre-wrap px-4 py-3 font-sans text-sm leading-relaxed">
                {d.body}
              </pre>
            </div>

            {d.code && (
              <div className="border border-rule-strong bg-ink text-paper">
                <div className="flex items-center justify-between border-b border-ink-soft px-4 py-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper-deep">
                    {d.code.label}
                  </span>
                  <CopyButton text={d.code.content} label="Copy code" />
                </div>
                <pre className="overflow-x-auto px-4 py-3 font-mono text-xs leading-relaxed">
                  {d.code.content}
                </pre>
              </div>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
