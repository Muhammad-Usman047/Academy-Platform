export default function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className="bg-white border border-border rounded-xl p-6">
      <p className="text-sm text-text-muted">{label}</p>
      <p className={`text-3xl font-bold mt-2 ${accent ? "text-accent" : "text-ink"}`}>
        {value}
      </p>
    </div>
  );
}