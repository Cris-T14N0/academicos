import type { ReactNode } from "react";

export function StatCard({
  label,
  value,
  hint,
  progress,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  progress?: number;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium text-muted-foreground">
          {label}
        </p>
      </div>
        <p className="font-display mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      {hint ? <div className="mt-1 text-xs text-muted-foreground">{hint}</div> : null}
      {typeof progress === "number" ? (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-sm bg-brand-600"
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}
