"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Course } from "@/lib/types";
import DataTable from "@/components/admin/DataTable";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadCourses() {
    setLoading(true);
    const data = await apiFetch<Course[]>("/courses/admin/all").catch(() => []);
    setCourses(data);
    setLoading(false);
  }

  useEffect(() => {
    loadCourses();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Delete this course? This cannot be undone.")) return;
    await apiFetch(`/courses/${id}`, { method: "DELETE" });
    loadCourses();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-ink">Courses</h1>
          <p className="text-text-muted mt-1">Manage your course catalog.</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="bg-ink text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-accent hover:text-ink transition-colors"
        >
          + Add Course
        </Link>
      </div>

      {loading ? (
        <p className="text-text-muted">Loading...</p>
      ) : (
        <DataTable
          data={courses}
          keyField={(c) => c.id}
          emptyMessage="No courses yet — add your first one."
          columns={[
            { header: "Title", accessor: (c) => c.title },
            { header: "Code", accessor: (c) => c.courseCode },
            { header: "Category", accessor: (c) => c.category || "—" },
            {
              header: "Status",
              accessor: (c) => (
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    c.isActive ? "bg-success/10 text-success" : "bg-text-muted/10 text-text-muted"
                  }`}
                >
                  {c.isActive ? "Active" : "Inactive"}
                </span>
              ),
            },
            {
              header: "Actions",
              accessor: (c) => (
                <div className="flex gap-3">
                  <Link href={`/admin/courses/${c.id}`} className="text-accent hover:underline">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(c.id)}
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