import LoginForm from "@/components/admin/LoginForm";
import { Logo } from "@/components/Icons";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next, error } = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <Logo className="h-auto w-[280px] max-w-full" />
          <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-3">Content portal</p>
        </div>
        <LoginForm next={next ?? "/admin"} hadError={Boolean(error)} />
      </div>
    </div>
  );
}
