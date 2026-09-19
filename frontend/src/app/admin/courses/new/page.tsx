"use client";

import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import CourseForm, { CourseFormValues } from "@/components/admin/CourseForm";

export default function NewCoursePage() {
  const router = useRouter();

  async function handleSubmit(values: CourseFormValues) {
    await apiFetch("/courses", {
      method: "POST",
      body: JSON.stringify(values),
    });
    router.push("/admin/courses");
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-ink mb-6">Add Course</h1>
      <div className="bg-white border border-border rounded-xl p-6">
        <CourseForm onSubmit={handleSubmit} submitLabel="Create Course" />
      </div>
    </div>
  );
}