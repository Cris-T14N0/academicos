import Link from "next/link";
import {
  ArrowUpRight,
  Cpu,
  GraduationCap,
  HeartPulse,
  Sprout,
  Trophy,
} from "lucide-react";

import type { School } from "@/lib/data/schools";

const icons = {
  sprout: Sprout,
  graduation: GraduationCap,
  cpu: Cpu,
  trophy: Trophy,
  heart: HeartPulse,
};

export function SchoolCard({ school }: { school: School }) {
  const Icon = icons[school.icon as keyof typeof icons] ?? GraduationCap;

  return (
    <Link
      href={`/ensino?escola=${school.id}`}
      className="card-hover group flex h-full flex-col border-t border-border py-5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-display text-sm font-semibold text-muted-foreground">{school.short}</span>
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold leading-snug">
        {school.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {school.description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
        Ver cursos
        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
