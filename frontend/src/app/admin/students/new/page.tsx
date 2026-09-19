"use client";

import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import StudentForm, { StudentFormValues } from "@/components/admin/StudentForm";

export default function NewStudentPage() {
  const router = useRouter();

  async function handleSubmit(values: StudentFormValues) {
    await apiFetch("/students", {
      method: "POST",
      body: JSON.stringify(values),
    });
    router.push("/admin/students");
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-ink mb-6">Add Student</h1>
      <div className="bg-white border border-border rounded-xl p-6">
        <StudentForm onSubmit={handleSubmit} submitLabel="Create Student" />
      </div>
    </div>
  );
}