"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm({ next, hadError }: { next: string; hadError: boolean }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(hadError ? "Invalid email or password." : "");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    const data = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: String(data.get("email") ?? ""),
      password: String(data.get("password") ?? ""),
      redirect: false,
    });
    setPending(false);
    if (!res || res.error) {
      setError("Invalid email or password.");
      return;
    }
    window.location.href = next.startsWith("/admin") ? next : "/admin";
  }

  const field = "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[15px] outline-none focus:border-green-700";
  const label = "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-surface p-6">
      <label className="block">
        <span className={label}>Email</span>
        <input name="email" type="email" autoComplete="username" required className={field} />
      </label>
      <label className="mt-4 block">
        <span className={label}>Password</span>
        <input name="password" type="password" autoComplete="current-password" required minLength={8} className={field} />
      </label>
      {error && <p role="alert" className="mt-4 text-[13px] text-wine-700">{error}</p>}
      <button type="submit" disabled={pending} className="btn btn-primary mt-6 w-full disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
