import Link from "next/link";
import { notFound } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Course } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const course = await apiFetch<Course>(`/courses/slug/${slug}`).catch(() => null);

  if (!course) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href="/courses" className="text-sm text-accent hover:underline">
        ← Back to all courses
      </Link>

      <div className="mt-6">
        <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-2 py-1 rounded">
          {course.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-ink mt-4">{course.title}</h1>

        <div className="flex flex-wrap gap-6 mt-6 text-sm text-text-muted">
          <span>⏱ {course.duration || "Duration not specified"}</span>
          <span>🎓 Course Code: {course.courseCode}</span>
        </div>

        <div className="mt-8 prose prose-neutral max-w-none">
          <p className="text-text leading-relaxed whitespace-pre-line">
            {course.description || "Full course details coming soon."}
          </p>
        </div>

        <div className="mt-12 bg-surface border border-border rounded-xl p-6">
          <h3 className="font-semibold text-ink">Ready to get started?</h3>
          <p className="text-text-muted text-sm mt-1">
            Contact us to enroll in this course, or verify an existing certificate below.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link
              href="/contact"
              className="bg-accent text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-accent-dark transition-colors"
            >
              Contact to Enroll
            </Link>
            <Link
              href="/verify"
              className="border border-ink text-ink text-sm font-medium px-5 py-2.5 rounded-md hover:bg-ink hover:text-white transition-colors"
            >
              Verify a Certificate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}