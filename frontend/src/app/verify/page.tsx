import RollNumberForm from "@/components/verify/RollNumberForm";

export const metadata = {
  title: "Verify Certificate — Academy",
};

export default function VerifyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-ink">Verify a Certificate</h1>
        <p className="text-text-muted mt-3">
          Enter the roll number printed on the certificate to see the student&apos;s
          enrollment status and progress.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 md:p-8">
        <RollNumberForm />
      </div>
    </div>
  );
}