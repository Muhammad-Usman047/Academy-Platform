"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearToken } from "@/lib/auth";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/courses", label: "Courses" },
  { href: "/admin/students", label: "Students" },
  { href: "/admin/enrollments", label: "Enrollments" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearToken();
    router.push("/admin/login");
  }

  return (
    <aside className="w-64 bg-ink text-white min-h-screen p-6 flex flex-col">
      <h2 className="text-lg font-bold mb-8">
        Academy<span className="text-accent">.</span> Admin
      </h2>

      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const active = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                active ? "bg-accent text-ink" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="text-sm text-white/60 hover:text-white text-left px-4 py-2.5"
      >
        Log Out
      </button>
    </aside>
  );
}