import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-surface border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-ink leading-tight">
            Learn skills that
            <span className="text-accent"> actually count.</span>
          </h1>
          <p className="mt-6 text-lg text-text-muted">
            Practical, career-focused courses in Web Development, Graphic Designing, and more —
            with a verifiable roll number every student can trust.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/courses"
              className="bg-accent text-white font-medium px-6 py-3 rounded-md hover:bg-accent-dark transition-colors"
            >
              Explore Courses
            </Link>
            <Link
              href="/verify"
              className="border border-ink text-ink font-medium px-6 py-3 rounded-md hover:bg-ink hover:text-white transition-colors"
            >
              Verify a Certificate
            </Link>
          </div>
        </div>

        <div className="relative max-w-[440px] mx-auto md:mx-0 md:ml-auto">
  <div className="absolute inset-0 bg-accent/10 rounded-2xl rotate-3" />
  <div className="relative aspect-[5/5] bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
    <img
      src="/images/director.jpeg"
      alt="Academy Director"
      className="w-full h-full object-cover"
    />
  </div>
</div>
      </div>
    </section>
  );
}