"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Student } from "@/lib/types";
import DataTable from "@/components/admin/DataTable";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadStudents() {
    setLoading(true);
    const data = await apiFetch<Student[]>("/students").catch(() => []);
    setStudents(data);
    setLoading(false);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Delete this student? This will also remove their enrollments.")) return;
    await apiFetch(`/students/${id}`, { method: "DELETE" });
    loadStudents();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-ink">Students</h1>
          <p className="text-text-muted mt-1">All registered students.</p>
        </div>
        <Link
          href="/admin/students/new"
          className="bg-ink text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-accent hover:text-ink transition-colors"
        >
          + Add Student
        </Link>
      </div>

      {loading ? (
        <p className="text-text-muted">Loading...</p>
      ) : (
        <DataTable
          data={students}
          keyField={(s) => s.id}
          emptyMessage="No students yet — add your first one."
          columns={[
            { header: "Name", accessor: (s) => s.fullName },
            { header: "Email", accessor: (s) => s.email || "—" },
            { header: "Phone", accessor: (s) => s.phone || "—" },
            {
              header: "Actions",
              accessor: (s) => (
                <div className="flex gap-3">
                  <Link href={`/admin/students/${s.id}`} className="text-accent hover:underline">
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-600 hover:underline"
                  >
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