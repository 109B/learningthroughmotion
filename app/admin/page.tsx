import Link from "next/link";
import { redirect } from "next/navigation";
import roadmap from "@/content/admin/roadmap.json";
import { formatHorizonLabel, type AdoWorkItem, type WorkItemHorizon, type WorkItemType } from "@/lib/adminRoadmap";
import { getCloudinaryBudgetStatus } from "@/lib/cloudinaryBudget";
import { hasValidAdminSession } from "@/lib/adminSession";

const sections = [
  {
    id: "overview",
    title: "Site Overview",
    body: "Learning Through Motion is a content-led platform for SEND-focused education services. It presents programmes, testimonials, booking pathways, and media-rich proof points for schools and families.",
  },
  {
    id: "approach",
    title: "Delivery Approach",
    body: "The implementation follows a pragmatic, iterative model: keep public UX calm and accessible, centralise content/media management, and reduce operational complexity through clear conventions and lightweight admin tooling.",
  },
  {
    id: "changes",
    title: "Key Changes Delivered",
    body: "Core media flows moved to Cloudinary-backed retrieval, gallery experiences were redesigned with folder/type separation, admin access was tightened, and dead code/assets not used in live journeys were removed.",
  },
  {
    id: "evolution",
    title: "Evolution and Enhancements",
    body: "The platform evolved from static/local media and mixed tooling into a cleaner cloud-managed media architecture, with dedicated folder mapping, reusable gallery patterns, and simplified navigation for maintainability.",
  },
];

const typeOrder: WorkItemType[] = ["epic", "feature", "story", "task"];
const horizons: WorkItemHorizon[] = ["3m", "6m", "12m"];

function typeLabel(type: WorkItemType) {
  return type.toUpperCase();
}

function getItems(horizon: WorkItemHorizon, type: WorkItemType) {
  return (roadmap.workItems as AdoWorkItem[]).filter((item) => item.horizon === horizon && item.type === type);
}

export default async function AdminDocsPortalPage() {
  if (!(await hasValidAdminSession())) {
    redirect("/admin/login");
  }

  const budgetStatus = await getCloudinaryBudgetStatus();

  return (
    <main style={{ padding: "32px 24px", maxWidth: "1280px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        <div>
          <p style={{ margin: 0, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#1e3a5f", fontWeight: 700 }}>
            Admin Docs
          </p>
          <h1 style={{ margin: "8px 0 0 0", fontSize: "2rem" }}>Learning Through Motion Delivery Handbook</h1>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Link href="/admin/sessions" style={{ padding: "8px 14px", border: "1px solid #1e3a5f", borderRadius: "8px", background: "#1e3a5f", color: "#fff", fontWeight: 600 }}>
            Edit Weekend Session Blocks
          </Link>
          <Link href="/admin/login" style={{ padding: "8px 14px", border: "1px solid #d7d7d7", borderRadius: "8px" }}>
            Back to Login
          </Link>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "20px" }}>
        <aside style={{ position: "sticky", top: "110px", alignSelf: "start", border: "1px solid #e6e6e6", borderRadius: "12px", background: "#fff", padding: "14px" }}>
          <p style={{ margin: "0 0 10px 0", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#666" }}>
            Navigation
          </p>
          <ul style={{ margin: 0, paddingLeft: "18px", display: "grid", gap: "8px" }}>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
            <li>
              <a href="#roadmap">ADO Board Snapshot</a>
            </li>
            <li>
              <Link href="/admin/roadmap">Edit ADO Board</Link>
            </li>
            <li>
              <Link href="/admin/sessions">Edit Session Dates</Link>
            </li>
          </ul>
        </aside>

        <section style={{ display: "grid", gap: "16px" }}>
          <article
            style={{
              border: "1px solid #e6e6e6",
              borderRadius: "12px",
              background: "#fff",
              padding: "18px 20px",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: "8px", fontSize: "1.35rem" }}>
              Cloudinary Credit Guard
            </h2>
            <p style={{ marginTop: 0, marginBottom: "8px", color: "#444" }}>
              Mode:{" "}
              <strong style={{ color: budgetStatus.exceeded ? "#9a3412" : "#166534" }}>
                {budgetStatus.exceeded ? "Low-media mode active" : "Normal mode"}
              </strong>
            </p>
            <p style={{ margin: 0, color: "#666" }}>{budgetStatus.reason}</p>
          </article>

          {sections.map((section) => (
            <article id={section.id} key={section.id} style={{ border: "1px solid #e6e6e6", borderRadius: "12px", background: "#fff", padding: "18px 20px" }}>
              <h2 style={{ marginTop: 0, marginBottom: "8px", fontSize: "1.35rem" }}>{section.title}</h2>
              <p style={{ margin: 0, lineHeight: 1.65 }}>{section.body}</p>
            </article>
          ))}

          <article id="roadmap" style={{ border: "1px solid #e6e6e6", borderRadius: "12px", background: "#fff", padding: "18px 20px" }}>
            <h2 style={{ marginTop: 0, marginBottom: "8px", fontSize: "1.35rem" }}>ADO Board Snapshot (3 / 6 / 12 Months)</h2>
            <p style={{ marginTop: 0, color: "#444" }}>
              Structure: <strong>Epic</strong> - <strong>Feature</strong> - <strong>Story</strong> - <strong>Task</strong>.
            </p>
            <p style={{ marginTop: 0, color: "#666" }}>Last updated: {new Date(roadmap.updatedAt).toLocaleString("en-GB")}</p>
            <div style={{ display: "grid", gap: "12px" }}>
              {horizons.map((horizon) => (
                <section key={horizon} style={{ border: "1px solid #ececec", borderRadius: "10px", padding: "12px 14px", background: "#fafafa" }}>
                  <h3 style={{ margin: "0 0 8px 0" }}>{formatHorizonLabel(horizon)}</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "8px" }}>
                    {typeOrder.map((type) => {
                      const items = getItems(horizon, type);
                      return (
                        <div key={type} style={{ border: "1px solid #e7e7e7", borderRadius: "8px", padding: "10px", background: "#fff" }}>
                          <p style={{ margin: 0, fontSize: "12px", letterSpacing: "0.06em", color: "#1e3a5f", fontWeight: 700 }}>{typeLabel(type)}</p>
                          <p style={{ margin: "6px 0 0 0", fontSize: "1.4rem", fontWeight: 700 }}>{items.length}</p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
