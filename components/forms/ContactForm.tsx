"use client";

import { FormEvent, useState } from "react";
import { CONTACT_DETAILS } from "@/content/siteContent";

type ContactFormProps = {
  showNextSteps?: boolean;
};

export function ContactForm({ showNextSteps = false }: ContactFormProps) {
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
    <>
      {status === "idle" ? (
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
        </form>
      ) : (
        <div className="form-success">
          <div className="form-success__icon">✓</div>
          <h3>Thank you for your enquiry!</h3>
          <p>
            We've opened your email client so you can send the message directly to us.
            If your email client didn't open, please email us at{" "}
            <a href={`mailto:${CONTACT_DETAILS.email}`}>{CONTACT_DETAILS.email}</a>.
          </p>

          {showNextSteps && (
            <div className="next-steps">
              <h4>What happens next?</h4>
              <ol className="process-list">
                <li>We'll review your enquiry and respond within 24 hours</li>
                <li>Schedule a free discovery call to discuss your needs</li>
                <li>Receive a tailored proposal for your school</li>
                <li>Start transforming learning through motion</li>
              </ol>
            </div>
          )}

          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setStatus("idle")}
          >
            Send another enquiry
          </button>
        </div>
      )}
    </>
  );
}
