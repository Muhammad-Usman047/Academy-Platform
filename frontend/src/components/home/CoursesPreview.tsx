import Link from "next/link";
import { Course } from "@/lib/types";

export default function CoursesPreview({ courses }: { courses: Course[] }) {
  return (
    <section className="bg-surface border-y border-border">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-ink">What You Can Learn</h2>
            <p className="text-text-muted mt-2">Hands-on courses designed for real-world skills.</p>
          </div>
          <Link href="/courses" className="text-accent font-medium hover:underline hidden md:block">
            View all courses →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.slice(0, 3).map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="bg-white rounded-xl border border-border p-6 hover:border-accent hover:shadow-md transition-all"
            >
              <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-2 py-1 rounded">
                {course.category}
              </span>
              <h3 className="text-lg font-semibold text-ink mt-4">{course.title}</h3>
              <p className="text-text-muted text-sm mt-2 line-clamp-2">{course.description}</p>
              <p className="text-sm text-text-muted mt-4">{course.duration}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}