import { redirect } from "next/navigation";
import { hasValidAdminSession } from "@/lib/adminSession";
import AdminSessionsEditorClient from "@/components/admin/AdminSessionsEditorClient";

export default async function AdminSessionsPage() {
  if (!(await hasValidAdminSession())) {
    redirect("/admin/login");
  }

  return <AdminSessionsEditorClient />;
}
