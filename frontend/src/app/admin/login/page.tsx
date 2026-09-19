import LoginForm from "@/components/auth/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-ink">Admin Login</h1>
          <p className="text-text-muted text-sm mt-2">Sign in to manage the academy</p>
        </div>
        <div className="bg-white border border-border rounded-xl p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}