import { redirect } from "next/navigation";
import { hasValidAdminSession } from "@/lib/adminSession";
import AdminSiteImagesEditorClient from "@/components/admin/AdminSiteImagesEditorClient";

export default async function AdminSiteImagesPage() {
  if (!(await hasValidAdminSession())) {
    redirect("/admin/login");
  }

  return <AdminSiteImagesEditorClient />;
}
