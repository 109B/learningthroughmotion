import { redirect } from "next/navigation";
import { hasValidAdminSession } from "@/lib/adminSession";
import AdminProgrammeCardsEditorClient from "@/components/admin/AdminProgrammeCardsEditorClient";

export default async function AdminProgrammesPage() {
  if (!(await hasValidAdminSession())) {
    redirect("/admin/login");
  }

  return <AdminProgrammeCardsEditorClient />;
}
