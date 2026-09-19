"use client";

import { useState } from "react";
import { Student } from "@/lib/types";

export interface StudentFormValues {
  fullName: string;
  email: string;
  phone: string;
}

export default function StudentForm({
  initial,
  onSubmit,
  submitLabel = "Save",
}: {
  initial?: Partial<Student>;
  onSubmit: (values: StudentFormValues) => Promise<void>;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<StudentFormValues>({
    fullName: initial?.fullName || "",
    email: initial?.email || "",
    phone: initial?.phone || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof StudentFormValues>(key: K, value: StudentFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSubmit(values);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-ink block mb-1">Full Name</label>
        <input
          value={values.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          required
          className="input"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-ink block mb-1">Email</label>
        <input
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          className="input"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-ink block mb-1">Phone</label>
        <input
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          className="input"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="bg-ink text-white font-medium px-6 py-2.5 rounded-md hover:bg-accent hover:text-ink transition-colors disabled:opacity-50"
      >
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}