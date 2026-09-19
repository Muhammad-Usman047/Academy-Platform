"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { VerificationResult } from "@/lib/types";
import StudentProgressCard from "./StudentProgressCard";

export default function RollNumberForm() {
  const [rollNumber, setRollNumber] = useState("");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rollNumber.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await apiFetch<VerificationResult>(
        `/verification/${encodeURIComponent(rollNumber.trim())}`
      );
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="e.g. ACD-WD-2026-0001"
          className="flex-1 border border-border rounded-md px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-ink text-white font-medium px-6 py-3 rounded-md hover:bg-accent hover:text-ink transition-colors disabled:opacity-50"
        >
          {loading ? "Checking..." : "Verify"}
        </button>
      </form>

      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3">
          {error === "No record found for this roll number"
            ? "We couldn't find a record for that roll number. Double-check it and try again."
            : error}
        </div>
      )}

      {result && (
        <div className="mt-8">
          <StudentProgressCard result={result} />
        </div>
      )}
    </div>
  );
}