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
      <div
        style={{
          marginBottom: "20px",
          borderRadius: "16px",
          padding: "20px",
          background: "linear-gradient(135deg, #1e3a5f 0%, #2b578f 100%)",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
          boxShadow: "0 10px 24px rgba(30, 58, 95, 0.25)",
        }}
      >
        <div>
          <p style={{ margin: 0, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", fontWeight: 700 }}>
            Admin Docs
          </p>
          <h1 style={{ margin: "8px 0 0 0", fontSize: "2rem", color: "#fff" }}>Learning Through Motion Delivery Handbook</h1>
          <p style={{ margin: "8px 0 0 0", color: "rgba(255,255,255,0.9)" }}>
            Choose a task below to update live content quickly.
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Link href="/admin/sessions" style={{ padding: "10px 14px", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "10px", background: "#fff", color: "#1e3a5f", fontWeight: 700 }}>
            Edit Weekend Session Blocks
          </Link>
          <Link href="/admin/login" style={{ padding: "10px 14px", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "10px", color: "#fff" }}>
            Back to Login
          </Link>
        </div>
      </div>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginBottom: "20px" }}>
        <Link
          href="/admin/sessions"
          style={{
            border: "1px solid #c7d6ea",
            borderRadius: "12px",
            background: "#eef4fc",
            padding: "14px",
            display: "grid",
            gap: "4px",
          }}
        >
          <strong style={{ color: "#1e3a5f" }}>Update Session Dates</strong>
          <span style={{ color: "#466384", fontSize: "0.92rem" }}>Change blocks, dates, and status for /shop/sessions</span>
        </Link>
        <Link
          href="/admin/roadmap"
          style={{
            border: "1px solid #c8e4d8",
            borderRadius: "12px",
            background: "#edf9f3",
            padding: "14px",
            display: "grid",
            gap: "4px",
          }}
        >
          <strong style={{ color: "#14532d" }}>Edit Roadmap</strong>
          <span style={{ color: "#2c6e46", fontSize: "0.92rem" }}>Maintain the 3 / 6 / 12 month delivery view</span>
        </Link>
        <a
          href="#cloudinary-guard"
          style={{
            border: "1px solid #e7d3b2",
            borderRadius: "12px",
            background: "#fff6eb",
            padding: "14px",
            display: "grid",
            gap: "4px",
          }}
        >
          <strong style={{ color: "#7a4c10" }}>Check Credit Guard</strong>
          <span style={{ color: "#8f6530", fontSize: "0.92rem" }}>Review Cloudinary low-media mode status</span>
        </a>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "20px" }}>
        <aside style={{ position: "sticky", top: "110px", alignSelf: "start", border: "1px solid #d7e2ee", borderRadius: "12px", background: "#f7fbff", padding: "14px" }}>
          <p style={{ margin: "0 0 10px 0", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#666" }}>
            Navigation
          </p>
          <ul style={{ margin: 0, paddingLeft: "18px", display: "grid", gap: "10px" }}>
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
            id="cloudinary-guard"
            style={{
              border: "1px solid #e6e6e6",
              borderRadius: "12px",
              background: budgetStatus.exceeded ? "#fff6eb" : "#effaf4",
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
