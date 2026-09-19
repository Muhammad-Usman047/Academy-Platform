export const metadata = {
  title: "Contact — Academy",
};

const contactMethods = [
  {
    label: "Email",
    value: "info@academy.com",
    href: "mailto:info@academy.com",
  },
  {
    label: "Phone",
    value: "+92 300 1234567",
    href: "tel:+923001234567",
  },
  {
    label: "Location",
    value: "Rawalpindi, Pakistan",
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-ink">Get in Touch</h1>
        <p className="text-text-muted mt-3">
          Have a question about a course or want to enroll? Reach out — we&apos;d love to help.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {contactMethods.map((method) => {
          const content = (
            <div className="bg-white border border-border rounded-xl p-6 text-center hover:border-accent hover:shadow-md transition-all h-full">
              <p className="text-sm text-text-muted">{method.label}</p>
              <p className="font-medium text-ink mt-2">{method.value}</p>
            </div>
          );

          return method.href ? (
            <a key={method.label} href={method.href}>
              {content}
            </a>
          ) : (
            <div key={method.label}>{content}</div>
          );
        })}
      </div>

      <div className="bg-surface border border-border rounded-xl p-8 mt-12 text-center">
        <h2 className="font-semibold text-ink">Already enrolled?</h2>
        <p className="text-text-muted text-sm mt-2">
          You can verify your certificate progress anytime using your roll number.
        </p>
        <a
          href="/verify"
          className="inline-block mt-4 bg-ink text-white text-sm font-medium px-6 py-2.5 rounded-md hover:bg-accent hover:text-ink transition-colors"
        >
          Verify Certificate
        </a>
      </div>
    </div>
  );
}