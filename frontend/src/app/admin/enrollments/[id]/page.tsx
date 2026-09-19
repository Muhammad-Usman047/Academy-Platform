"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

interface EnrollmentDetail {
  id: number;
  rollNumber: string;
  status: string;
  startDate: string;
  completionDate: string | null;
  student: { fullName: string };
  course: { title: string };
}

export default function ManageEnrollmentPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [enrollment, setEnrollment] = useState<EnrollmentDetail | null>(null);
  const [completionDate, setCompletionDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<EnrollmentDetail>(`/enrollments/${id}`)
      .then(setEnrollment)
      .finally(() => setLoading(false));
  }, [id]);

  async function handleComplete(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const updated = await apiFetch<EnrollmentDetail>(`/enrollments/${id}/complete`, {
        method: "PATCH",
        body: JSON.stringify({ completionDate }),
      });
      setEnrollment(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-text-muted">Loading...</p>;
  if (!enrollment) return <p className="text-text-muted">Enrollment not found.</p>;

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-ink mb-1">{enrollment.student.fullName}</h1>
      <p className="text-text-muted mb-6">{enrollment.course.title}</p>

      <div className="bg-white border border-border rounded-xl p-6 space-y-4">
        <div>
          <p className="text-sm text-text-muted">Roll Number</p>
          <p className="font-mono font-semibold text-ink text-lg">{enrollment.rollNumber}</p>
        </div>
        <div className="flex gap-8">
          <div>
            <p className="text-sm text-text-muted">Start Date</p>
            <p className="text-ink font-medium">{enrollment.startDate}</p>
          </div>
          <div>
            <p className="text-sm text-text-muted">Status</p>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded ${
                enrollment.status === "completed" ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
              }`}
            >
              {enrollment.status}
            </span>
          </div>
        </div>

        {enrollment.status === "completed" ? (
          <p className="text-sm text-success pt-2 border-t border-border">
            ✓ Completed on {enrollment.completionDate}
          </p>
        ) : (
          <form onSubmit={handleComplete} className="pt-4 border-t border-border space-y-3">
            <label className="text-sm font-medium text-ink block">Mark as Completed</label>
            <input
              type="date"
              value={completionDate}
              onChange={(e) => setCompletionDate(e.target.value)}
              className="input"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={saving}
              className="bg-success text-white text-sm font-medium px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "Saving..." : "Mark Completed"}
            </button>
          </form>
        )}
      </div>

      <Link href="/admin/enrollments" className="text-sm text-accent hover:underline mt-4 inline-block">
        ← Back to enrollments
      </Link>
    </div>
  );
}