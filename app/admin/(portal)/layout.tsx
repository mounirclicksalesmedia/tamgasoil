import { requireUser } from "@/lib/server/auth";
import AdminNav from "@/components/admin/AdminNav";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  return (
    <div className="flex min-h-screen">
      <AdminNav userName={user.name ?? user.email ?? ""} />
      <main className="min-w-0 flex-1 px-6 py-8 md:px-10">{children}</main>
    </div>
  );
}
