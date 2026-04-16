import { Sidebar } from "@/components/admin/sidebar";

export const dynamic = "force-dynamic";

export default function AdminSectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 pl-64">
        <div className="mx-auto max-w-5xl px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
