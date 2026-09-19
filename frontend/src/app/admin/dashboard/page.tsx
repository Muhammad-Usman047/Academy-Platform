"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { StatsOverview } from "@/lib/types";
import StatCard from "@/components/admin/StatCard";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<StatsOverview>("/stats/overview")
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
      <p className="text-text-muted mt-2">Welcome back — here&apos;s your academy overview.</p>

      {loading ? (
        <p className="text-text-muted mt-8">Loading stats...</p>
      ) : !stats ? (
        <p className="text-text-muted mt-8">Couldn&apos;t load stats right now.</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <StatCard label="Total Courses" value={stats.totalCourses} />
            <StatCard label="Total Students" value={stats.totalStudents} />
            <StatCard label="Completed" value={stats.completedCount} accent />
            <StatCard label="In Progress" value={stats.inProgressCount} />
          </div>

          <div className="bg-white border border-border rounded-xl p-6 mt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-ink">Completion Rate</p>
              <p className="text-sm text-text-muted">{stats.completionRate}%</p>
            </div>
            <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}