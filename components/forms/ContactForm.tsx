"use client";

import { FormEvent, useState } from "react";
import { CONTACT_DETAILS } from "@/content/siteContent";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = data.get("name")?.toString().trim() ?? "";
    const email = data.get("email")?.toString().trim() ?? "";
    const school = data.get("school")?.toString().trim() ?? "";
    const message = data.get("message")?.toString().trim() ?? "";

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `School / Setting: ${school}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("%0D%0A");

    window.location.href = `mailto:${CONTACT_DETAILS.email}?subject=New enquiry from ${encodeURIComponent(
      name || "Learning Through Motion site"
    )}&body=${body}`;
    form.reset();
    setStatus("sent");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" name="name" required />
      </label>
      <label>
        Email
        <input type="email" name="email" required />
      </label>
      <label>
        School or setting
        <input type="text" name="school" />
      </label>
      <label>
        Message
        <textarea name="message" rows={5} required />
      </label>
      <button type="submit" className="btn">
        Send enquiry
      </button>
      {status === "sent" && (
        <p className="form-status">
          Thank you - we have opened your email client so you can send the
          message directly to us.
        </p>
      )}
    </form>
  );
}
