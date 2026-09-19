"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";

interface EnrollmentRow {
  id: number;
  rollNumber: string;
  status: string;
  startDate: string;
  completionDate: string | null;
  student: { fullName: string };
  course: { title: string };
}

export default function AdminEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<EnrollmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "enrolled" | "completed">("all");

  async function load() {
    setLoading(true);
    const data = await apiFetch<EnrollmentRow[]>("/enrollments").catch(() => []);
    setEnrollments(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Delete this enrollment? This cannot be undone.")) return;
    await apiFetch(`/enrollments/${id}`, { method: "DELETE" });
    load();
  }

  const filtered = enrollments.filter((e) => filter === "all" || e.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-ink">Enrollments</h1>
          <p className="text-text-muted mt-1">Manage enrollments and issue roll numbers.</p>
        </div>
        <Link
          href="/admin/enrollments/new"
          className="bg-ink text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-accent hover:text-ink transition-colors"
        >
          + New Enrollment
        </Link>
      </div>

      <div className="flex gap-2 mb-4">
        {(["all", "enrolled", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-sm font-medium px-3 py-1.5 rounded-md capitalize ${
              filter === f ? "bg-ink text-white" : "bg-surface text-text-muted hover:bg-border"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-text-muted">Loading...</p>
      ) : (
        <DataTable
          data={filtered}
          keyField={(e) => e.id}
          emptyMessage="No enrollments found."
          columns={[
            { header: "Roll Number", accessor: (e) => <span className="font-mono">{e.rollNumber}</span> },
            { header: "Student", accessor: (e) => e.student.fullName },
            { header: "Course", accessor: (e) => e.course.title },
            {
              header: "Status",
              accessor: (e) => (
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    e.status === "completed" ? "bg-success/10 text-success" : "bg-accent/10 text-accent"
                  }`}
                >
                  {e.status}
                </span>
              ),
            },
            {
              header: "Actions",
              accessor: (e) => (
                <div className="flex gap-3">
                  <Link href={`/admin/enrollments/${e.id}`} className="text-accent hover:underline">
                    Manage
                  </Link>
                  <button onClick={() => handleDelete(e.id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}
    </div>
  );
}