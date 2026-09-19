"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Course } from "@/lib/types";
import CourseForm, { CourseFormValues } from "@/components/admin/CourseForm";

export default function EditCoursePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<Course>(`/courses/${id}`)
      .then(setCourse)
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(values: CourseFormValues) {
    await apiFetch(`/courses/${id}`, {
      method: "PATCH",
      body: JSON.stringify(values),
    });
    router.push("/admin/courses");
  }

  if (loading) return <p className="text-text-muted">Loading...</p>;
  if (!course) return <p className="text-text-muted">Course not found.</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-ink mb-6">Edit Course</h1>
      <div className="bg-white border border-border rounded-xl p-6">
        <CourseForm initial={course} onSubmit={handleSubmit} submitLabel="Save Changes" />
      </div>
    </div>
  );
}