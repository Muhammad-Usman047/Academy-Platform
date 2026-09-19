export default function DirectorMessage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-12 items-center">
      <div className="md:col-span-1">
        <div className="rounded-2xl overflow-hidden border border-border max-w-[260px] mx-auto aspect-[4/5]">
          <img
            src="/images/director-formal.jpeg"
            alt="Director"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="md:col-span-2">
        <p className="text-sm font-semibold text-accent uppercase tracking-wide">
          A Message from the Director
        </p>
        <blockquote className="mt-4 text-2xl font-medium text-ink leading-snug">
          &ldquo;Every student who walks through our doors deserves skills they
          can prove, not just a certificate that sits in a drawer.&rdquo;
        </blockquote>
        <p className="mt-6 text-text-muted">
          That&apos;s why we built a verification system into everything we
          teach — so employers, parents, and students themselves can confirm
          real progress, not just a claim.
        </p>
      </div>
    </section>
  );
}
