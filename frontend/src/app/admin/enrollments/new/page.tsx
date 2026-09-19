"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Student, Course } from "@/lib/types";

export default function NewEnrollmentPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<{ rollNumber: string } | null>(null);

  useEffect(() => {
    apiFetch<Student[]>("/students").then(setStudents).catch(() => setStudents([]));
    apiFetch<Course[]>("/courses/admin/all").then(setCourses).catch(() => setCourses([]));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!studentId || !courseId) {
      setError("Please select both a student and a course.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const result = await apiFetch<{ rollNumber: string }>("/enrollments", {
        method: "POST",
        body: JSON.stringify({
          studentId: Number(studentId),
          courseId: Number(courseId),
          startDate,
        }),
      });
      setCreated(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (created) {
    return (
      <div className="max-w-lg">
        <div className="bg-success/10 border border-success/30 rounded-xl p-6 text-center">
          <p className="text-sm text-success font-medium">Enrollment created</p>
          <p className="text-2xl font-bold text-ink font-mono mt-2">{created.rollNumber}</p>
          <p className="text-text-muted text-sm mt-2">
            Give this roll number to the student — it&apos;s what they&apos;ll use to verify their progress.
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => router.push("/admin/enrollments")}
              className="bg-ink text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-accent hover:text-ink transition-colors"
            >
              View All Enrollments
            </button>
            <button
              onClick={() => {
                setCreated(null);
                setStudentId("");
                setCourseId("");
              }}
              className="border border-ink text-ink text-sm font-medium px-5 py-2.5 rounded-md hover:bg-ink hover:text-white transition-colors"
            >
              Create Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-ink mb-6">New Enrollment</h1>
      <div className="bg-white border border-border rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-ink block mb-1">Student</label>
            <select value={studentId} onChange={(e) => setStudentId(e.target.value)} className="input">
              <option value="">Select a student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>{s.fullName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-ink block mb-1">Course</label>
            <select value={courseId} onChange={(e) => setCourseId(e.target.value)} className="input">
              <option value="">Select a course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-ink block mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="input"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-ink text-white font-medium px-6 py-2.5 rounded-md hover:bg-accent hover:text-ink transition-colors disabled:opacity-50"
          >
            {saving ? "Creating..." : "Create Enrollment"}
          </button>
        </form>
      </div>
    </div>
  );
}