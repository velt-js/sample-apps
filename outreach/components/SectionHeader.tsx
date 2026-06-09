export default function SectionHeader({
  index,
  title,
  note,
}: {
  index: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="mb-8 flex items-baseline gap-5 border-b-2 border-rule-strong pb-3">
      <span className="font-mono text-sm font-semibold text-signal">{index}</span>
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {note && <span className="label-mono ml-auto hidden sm:block">{note}</span>}
    </div>
  );
}
