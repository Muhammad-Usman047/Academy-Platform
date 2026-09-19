import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-white mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-full overflow-hidden border border-white/20 flex-shrink-0">
              <img
                src="/images/logoa.jpg"
                alt="Friends Vision Academy"
                className="w-full h-full object-cover"
              />
            </span>
            <h3 className="text-lg font-bold">Friends Vision Academy</h3>
          </div>
          <p className="text-sm text-white/60">
            Practical, career-focused courses with verifiable proof of
            completion.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 text-white/80">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>
              <Link
                href="/courses"
                className="hover:text-accent transition-colors"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-accent transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/verify"
                className="hover:text-accent transition-colors"
              >
                Verify Certificate
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-accent transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 text-white/80">Contact</h4>
          <p className="text-sm text-white/60">Rawalpindi, Pakistan</p>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 flex items-center justify-center gap-4 text-xs text-white/40">
        <span>
          © {new Date().getFullYear()} Academy Platform. All rights reserved.
        </span>
        <span>·</span>
        <Link
          href="/admin/login"
          className="hover:text-accent transition-colors"
        >
          Admin
        </Link>
      </div>
    </footer>
  );
}
