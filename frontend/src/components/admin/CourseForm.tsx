"use client";

import { useState } from "react";
import { Course } from "@/lib/types";

export interface CourseFormValues {
  slug: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  courseCode: string;
  isActive: boolean;
}

export default function CourseForm({
  initial,
  onSubmit,
  submitLabel = "Save",
}: {
  initial?: Partial<Course>;
  onSubmit: (values: CourseFormValues) => Promise<void>;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<CourseFormValues>({
    slug: initial?.slug || "",
    title: initial?.title || "",
    description: initial?.description || "",
    duration: initial?.duration || "",
    category: initial?.category || "",
    courseCode: initial?.courseCode || "",
    isActive: initial?.isActive ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof CourseFormValues>(key: K, value: CourseFormValues[K]) {
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
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title">
          <input
            value={values.title}
            onChange={(e) => update("title", e.target.value)}
            required
            className="input"
          />
        </Field>
        <Field label="Slug (URL-friendly)">
          <input
            value={values.slug}
            onChange={(e) => update("slug", e.target.value)}
            required
            placeholder="e.g. web-development"
            className="input"
          />
        </Field>
        <Field label="Course Code">
          <input
            value={values.courseCode}
            onChange={(e) => update("courseCode", e.target.value.toUpperCase())}
            required
            placeholder="e.g. WD"
            maxLength={10}
            className="input"
          />
        </Field>
        <Field label="Category">
          <input
            value={values.category}
            onChange={(e) => update("category", e.target.value)}
            placeholder="e.g. Development"
            className="input"
          />
        </Field>
        <Field label="Duration">
          <input
            value={values.duration}
            onChange={(e) => update("duration", e.target.value)}
            placeholder="e.g. 3 months"
            className="input"
          />
        </Field>
        <Field label="Status">
          <select
            value={values.isActive ? "active" : "inactive"}
            onChange={(e) => update("isActive", e.target.value === "active")}
            className="input"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </Field>
      </div>

      <Field label="Description">
        <textarea
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          rows={4}
          className="input"
        />
      </Field>

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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium text-ink block mb-1">{label}</label>
      {children}
    </div>
  );
}