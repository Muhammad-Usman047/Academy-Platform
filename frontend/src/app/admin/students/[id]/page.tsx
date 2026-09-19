"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import StudentForm, { StudentFormValues } from "@/components/admin/StudentForm";

interface StudentDetail {
  id: number;
  fullName: string;
  email: string | null;
  phone: string | null;
  enrollments: {
    id: number;
    rollNumber: string;
    status: string;
    course: { title: string };
  }[];
}

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<StudentDetail>(`/students/${id}`)
      .then(setStudent)
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(values: StudentFormValues) {
    await apiFetch(`/students/${id}`, {
      method: "PATCH",
      body: JSON.stringify(values),
    });
    router.push("/admin/students");
  }

  if (loading) return <p className="text-text-muted">Loading...</p>;
  if (!student) return <p className="text-text-muted">Student not found.</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-ink mb-6">{student.fullName}</h1>

      <div className="bg-white border border-border rounded-xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-ink mb-4">Edit Details</h2>
        <StudentForm initial={student} onSubmit={handleSubmit} submitLabel="Save Changes" />
      </div>

      <div className="bg-white border border-border rounded-xl p-6">
        <h2 className="text-sm font-semibold text-ink mb-4">Enrollments</h2>
        {student.enrollments.length === 0 ? (
          <p className="text-text-muted text-sm">No enrollments yet.</p>
        ) : (
          <ul className="space-y-3">
            {student.enrollments.map((e) => (
              <li key={e.id} className="flex items-center justify-between border-b border-border last:border-0 pb-3 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-ink">{e.course.title}</p>
                  <p className="text-xs text-text-muted font-mono">{e.rollNumber}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    e.status === "completed" ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
                  }`}
                >
                  {e.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link href="/admin/students" className="text-sm text-accent hover:underline mt-4 inline-block">
        ← Back to students
      </Link>
    </div>
  );
}