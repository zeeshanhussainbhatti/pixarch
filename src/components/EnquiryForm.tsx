"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const serviceOptions = [
  "3D Exterior Rendering",
  "3D Interior Rendering",
  "3D Walkthrough",
  "360 Virtual Tour",
  "Branding & Design",
  "Digital Marketing",
  "Full launch package",
];

type Props = { dark?: boolean; context?: string };

/**
 * Enquiry form. It composes the visitor's details into a ready-to-send
 * WhatsApp message or email, so no third-party form backend is required.
 */
export default function EnquiryForm({ dark = false, context }: Props) {
  const [error, setError] = useState("");

  const field = `w-full border bg-transparent px-4 py-3.5 text-base outline-none transition-colors placeholder:text-current/40 focus:border-bronze ${
    dark ? "border-white/25 text-white" : "border-line text-ink"
  }`;
  const label = `mb-2 block text-xs font-semibold uppercase tracking-[0.16em] ${dark ? "text-white/70" : "text-muted"}`;

  function compose(form: HTMLFormElement) {
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    if (!get("name") || !get("phone")) {
      setError("Please add your name and a contact number so we can reply.");
      return null;
    }
    setError("");
    const lines = [
      "Hello Pixarch, I would like to discuss a project.",
      "",
      `Name: ${get("name")}`,
      get("company") && `Company: ${get("company")}`,
      `Phone: ${get("phone")}`,
      get("email") && `Email: ${get("email")}`,
      get("service") && `Service: ${get("service")}`,
      context && `Page: ${context}`,
      get("message") && `\n${get("message")}`,
    ].filter(Boolean);
    return lines.join("\n");
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const text = compose(e.currentTarget);
    if (!text) return;
    if (submitter?.value === "email") {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        "Project enquiry",
      )}&body=${encodeURIComponent(text)}`;
    } else {
      window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="enq-name" className={label}>
          Full name *
        </label>
        <input id="enq-name" name="name" autoComplete="name" required className={field} />
      </div>
      <div>
        <label htmlFor="enq-company" className={label}>
          Company
        </label>
        <input id="enq-company" name="company" autoComplete="organization" className={field} />
      </div>
      <div>
        <label htmlFor="enq-phone" className={label}>
          Contact number *
        </label>
        <input id="enq-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required className={field} />
      </div>
      <div>
        <label htmlFor="enq-email" className={label}>
          Email
        </label>
        <input id="enq-email" name="email" type="email" autoComplete="email" className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="enq-service" className={label}>
          Service
        </label>
        <select id="enq-service" name="service" defaultValue="" className={`${field} appearance-none`}>
          <option value="" className="text-ink">
            Select a service
          </option>
          {serviceOptions.map((s) => (
            <option key={s} value={s} className="text-ink">
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="enq-message" className={label}>
          Tell us about the project
        </label>
        <textarea id="enq-message" name="message" rows={4} className={`${field} resize-y`} />
      </div>
      {error && (
        <p role="alert" className="text-sm font-semibold text-red-500 sm:col-span-2">
          {error}
        </p>
      )}
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
        <button type="submit" value="whatsapp" className={`btn ${dark ? "btn-light" : "btn-dark"} flex-1`}>
          Send on WhatsApp
        </button>
        <button type="submit" value="email" className="btn btn-outline flex-1">
          Send by email
        </button>
      </div>
      <p className={`text-xs sm:col-span-2 ${dark ? "text-white/50" : "text-muted"}`}>
        Your details open in WhatsApp or your email app, ready to send to our team.
      </p>
    </form>
  );
}
