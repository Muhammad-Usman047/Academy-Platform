import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Course } from "@/lib/types";

export const metadata = {
  title: "Courses — Academy",
};

export default async function CoursesPage() {
  const courses = await apiFetch<Course[]>("/courses").catch(() => []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-ink">All Courses</h1>
        <p className="text-text-muted mt-3">
          Practical, hands-on training designed to get you job-ready.
        </p>
      </div>

      {courses.length === 0 ? (
        <p className="text-text-muted">No courses available right now — check back soon.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="bg-white rounded-xl border border-border p-6 hover:border-accent hover:shadow-md transition-all flex flex-col"
            >
              <span className="inline-block w-fit bg-accent/10 text-accent text-xs font-semibold px-2 py-1 rounded">
                {course.category}
              </span>
              <h3 className="text-lg font-semibold text-ink mt-4">{course.title}</h3>
              <p className="text-text-muted text-sm mt-2 line-clamp-3 flex-1">
                {course.description || "No description available yet."}
              </p>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <span className="text-sm text-text-muted">{course.duration}</span>
                <span className="text-sm font-medium text-accent">View details →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}