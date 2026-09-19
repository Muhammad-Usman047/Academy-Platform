export function generateRollNumber(courseCode: string, sequence: number): string {
  const year = new Date().getFullYear();
  const paddedSeq = String(sequence).padStart(4, '0');
  return `ACD-${courseCode.toUpperCase()}-${year}-${paddedSeq}`;
}