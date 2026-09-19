import { VerificationResult } from "@/lib/types";

export default function StudentProgressCard({ result }: { result: VerificationResult }) {
  const isCompleted = result.status === "completed";

  return (
    <div className="bg-white border border-border rounded-xl p-6 md:p-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-text-muted">Roll Number</p>
          <p className="font-mono font-semibold text-ink text-lg">{result.rollNumber}</p>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
            isCompleted
              ? "bg-success/10 text-success"
              : "bg-accent/10 text-accent"
          }`}
        >
          {isCompleted ? "✓ Completed" : "In Progress"}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mt-6 pt-6 border-t border-border">
        <div>
          <p className="text-sm text-text-muted">Student Name</p>
          <p className="font-medium text-ink mt-1">{result.studentName}</p>
        </div>
        <div>
          <p className="text-sm text-text-muted">Course</p>
          <p className="font-medium text-ink mt-1">{result.courseTitle}</p>
        </div>
      </div>

      {/* Progress timeline */}
      <div className="mt-8">
        <div className="flex items-center">
          <TimelineDot filled label="Enrolled" date={result.startDate} align="left" />
          <div
            className={`flex-1 h-0.5 mx-2 ${
              isCompleted ? "bg-success" : "bg-border"
            }`}
          />
          <TimelineDot
            filled={isCompleted}
            label="Completed"
            date={result.completionDate}
            align="right"
          />
        </div>
      </div>
    </div>
  );
}

function TimelineDot({
  filled,
  label,
  date,
  align,
}: {
  filled: boolean;
  label: string;
  date: string | null;
  align: "left" | "right";
}) {
  return (
    <div className={`flex flex-col ${align === "right" ? "items-end" : "items-start"}`}>
      <div
        className={`w-4 h-4 rounded-full border-2 ${
          filled ? "bg-success border-success" : "bg-white border-border"
        }`}
      />
      <p className="text-sm font-medium text-ink mt-2">{label}</p>
      <p className="text-xs text-text-muted">
        {date ? new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "Pending"}
      </p>
    </div>
  );
}