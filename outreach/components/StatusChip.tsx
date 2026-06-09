import { LibraryStatus, STATUS_META } from "@/data/outreach";

const TONE_CLASSES: Record<string, string> = {
  moss: "border-moss text-moss",
  cobalt: "border-cobalt text-cobalt",
  ink: "border-ink text-ink",
  plum: "border-plum text-plum",
  brass: "border-brass text-brass",
  signal: "border-signal text-signal",
  faint: "border-ink-faint text-ink-faint",
};

export default function StatusChip({ status }: { status: LibraryStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-block whitespace-nowrap border px-1.5 py-px font-mono text-[10px] font-medium uppercase tracking-[0.14em] ${TONE_CLASSES[meta.tone]}`}
    >
      {meta.label}
    </span>
  );
}
