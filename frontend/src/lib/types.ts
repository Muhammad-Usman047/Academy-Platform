export interface Course {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  duration: string | null;
  category: string | null;
  courseCode: string;
  thumbnailUrl: string | null;
  isActive: boolean;
}

export interface VerificationResult {
  rollNumber: string;
  studentName: string;
  courseTitle: string;
  status: "enrolled" | "completed";
  startDate: string;
  completionDate: string | null;
}

export interface StatsOverview {
  totalCourses: number;
  totalStudents: number;
  totalEnrollments: number;
  completedCount: number;
  inProgressCount: number;
  completionRate: number;
}