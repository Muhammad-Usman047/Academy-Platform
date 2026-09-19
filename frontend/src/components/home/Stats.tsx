const stats = [
  { label: "Students Trained", value: "500+" },
  { label: "Courses Offered", value: "6+" },
  { label: "Completion Rate", value: "94%" },
  { label: "Verified Certificates", value: "450+" },
];

export default function Stats() {
  return (
    <section className="bg-ink text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-3xl font-bold text-accent-light">{stat.value}</div>
            <div className="text-sm text-white/60 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}