import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getSchool } from "@/lib/data/schools";
import type { Course } from "@/lib/data/courses";
import { cn } from "@/lib/utils";

export function CourseCard({
  course,
  className,
}: {
  course: Course;
  className?: string;
}) {
  const school = getSchool(course.schoolId);

  return (
    <Link
      href={`/cursos/${course.slug}`}
      className={cn(
        "card-hover group flex h-full flex-col border-t border-border bg-transparent py-5",
        className,
      )}
    >
      <p className="text-xs text-muted-foreground">{course.degree} · {school?.short}</p>
      <h3 className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
        {course.name}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {course.description}
      </p>
      <p className="mt-3 text-xs text-muted-foreground">{course.duration} · {course.regime}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
        Ver curso
        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
