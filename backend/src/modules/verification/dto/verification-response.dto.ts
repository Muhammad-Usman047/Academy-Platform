export class VerificationResponseDto {
  rollNumber!: string;
  studentName!: string;
  courseTitle!: string;
  status!: 'enrolled' | 'completed';
  startDate!: string;
  completionDate!: string | null;
}