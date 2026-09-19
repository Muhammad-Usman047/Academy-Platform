import Link from "next/link";

export const metadata = {
  title: "About — Academy",
};

const values = [
  {
    title: "Practical First",
    description: "Every course is built around real projects, not just theory — you leave with a portfolio, not just notes.",
  },
  {
    title: "Verified Progress",
    description: "Every certificate comes with a roll number that anyone can check — no fake credentials, no guesswork.",
  },
  {
    title: "Small Class Sizes",
    description: "We keep batches focused so every student gets real feedback and attention, not lost in a crowd.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Intro */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-ink">About the Academy</h1>
        <p className="text-text-muted mt-4 max-w-2xl mx-auto">
          We started this academy with one goal: teach skills people can actually use,
          and prove it with something more solid than a piece of paper.
        </p>
      </section>

      {/* Director section */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden border border-border max-w-[280px] mx-auto aspect-[4/5]">
            <img
              src="/images/director.jpeg"
              alt="Academy Director"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide">
              Our Director
            </p>
            <h2 className="text-2xl font-bold text-ink mt-2">A Note on Why We Started</h2>
            <p className="text-text-muted mt-4 leading-relaxed">
              Too many training programs hand out certificates that mean nothing the moment
              a student walks out the door — no proof, no accountability, nothing an employer
              can actually check. We built this academy to be different: real instruction,
              real projects, and a verification system so every certificate we issue can
              be checked by anyone, instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold text-ink text-center mb-12">
          What We Stand For
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-white border border-border rounded-xl p-6">
              <h3 className="font-semibold text-ink">{v.title}</h3>
              <p className="text-text-muted text-sm mt-2">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Ready to start learning?</h2>
          <p className="text-white/60 mt-3">Browse our courses or get in touch to enroll.</p>
          <div className="flex justify-center gap-4 mt-6">
            <Link
              href="/courses"
              className="bg-accent text-ink font-medium px-6 py-3 rounded-md hover:bg-accent-light transition-colors"
            >
              View Courses
            </Link>
            <Link
              href="/contact"
              className="border border-white/30 text-white font-medium px-6 py-3 rounded-md hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}