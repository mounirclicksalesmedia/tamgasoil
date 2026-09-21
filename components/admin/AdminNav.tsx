"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Logo } from "@/components/Icons";

const items = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/solutions", label: "Solutions" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminNav({ userName }: { userName: string }) {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-e border-line bg-surface">
      <div className="flex items-center gap-3 border-b border-line px-5 py-5">
        <Logo className="h-8 w-8" />
        <div className="leading-none">
          <p className="text-[15px] font-semibold tracking-[-0.01em]">TAM</p>
          <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-3">Portal</p>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4">
        {items.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "block rounded-lg px-3 py-2 text-[14px] transition-colors",
                active ? "bg-green-50 font-medium text-green-800" : "text-ink-2 hover:bg-paper hover:text-ink",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-line px-5 py-4">
        <p className="truncate text-[13px] text-ink-2">{userName}</p>
        <div className="mt-2 flex gap-3">
          <Link href="/en" target="_blank" className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-green-700 hover:underline">
            View site
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3 hover:text-wine-700"
          >
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
