"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  contactSchema,
  flattenErrors,
  HONEYPOT_FIELD,
  type ContactErrors,
  type ContactField,
} from "@/lib/contactSchema";
import { GradientButton } from "../GradientButton";

type Status = "idle" | "sending" | "success" | "error";

const fields: {
  name: Exclude<ContactField, "privacidad" | "mensaje">;
  label: string;
  type: string;
  autoComplete: string;
}[] = [
  { name: "nombre", label: "Nombre", type: "text", autoComplete: "name" },
  { name: "local", label: "Local", type: "text", autoComplete: "organization" },
  { name: "ciudad", label: "Ciudad", type: "text", autoComplete: "address-level2" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "telefono", label: "Teléfono", type: "tel", autoComplete: "tel" },
];

const inputClass =
  "mt-2 block w-full rounded-xl bg-nv-surface-strong px-4 py-3 text-base text-white ring-1 ring-white/15 ring-inset placeholder:text-nv-dim focus:ring-2 focus:ring-nv-cyan focus:outline-none aria-[invalid=true]:ring-nv-magenta";

export function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      nombre: String(formData.get("nombre") ?? ""),
      local: String(formData.get("local") ?? ""),
      ciudad: String(formData.get("ciudad") ?? ""),
      email: String(formData.get("email") ?? ""),
      telefono: String(formData.get("telefono") ?? ""),
      mensaje: String(formData.get("mensaje") ?? ""),
      privacidad: formData.get("privacidad") === "on",
      [HONEYPOT_FIELD]: String(formData.get(HONEYPOT_FIELD) ?? ""),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const next = flattenErrors(parsed.error);
      setErrors(next);
      setStatus("idle");
      const first = Object.keys(next)[0];
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { errors?: ContactErrors; error?: string };
      if (res.ok) {
        form.reset();
        setStatus("success");
        setMessage("Mensaje enviado. Te respondemos en breve.");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setStatus("error");
      setMessage(data.error ?? "Revisa los campos marcados.");
    } catch {
      setStatus("error");
      setMessage("No hemos podido enviar tu mensaje. Revisa tu conexión e inténtalo de nuevo.");
    }
  }

  const describedBy = (name: ContactField) => (errors[name] ? `${name}-error` : undefined);

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {fields.map((f) => (
        <div key={f.name} className={f.name === "telefono" ? "sm:col-span-2 lg:col-span-1" : ""}>
          <label htmlFor={f.name} className="text-sm font-semibold text-white">
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            required
            aria-invalid={errors[f.name] ? true : undefined}
            aria-describedby={describedBy(f.name)}
            className={inputClass}
          />
          {errors[f.name] && (
            <p id={`${f.name}-error`} className="mt-1.5 text-sm text-nv-magenta">
              {errors[f.name]}
            </p>
          )}
        </div>
      ))}

      <div className="sm:col-span-2">
        <label htmlFor="mensaje" className="text-sm font-semibold text-white">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          required
          aria-invalid={errors.mensaje ? true : undefined}
          aria-describedby={describedBy("mensaje")}
          className={inputClass}
          placeholder="Tipo de local, aforo, qué te gustaría hacer con NightVibe…"
        />
        {errors.mensaje && (
          <p id="mensaje-error" className="mt-1.5 text-sm text-nv-magenta">
            {errors.mensaje}
          </p>
        )}
      </div>

      {/* Honeypot: oculto para personas y lectores de pantalla */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>No rellenes este campo</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <div className="flex items-start gap-3">
          <input
            id="privacidad"
            name="privacidad"
            type="checkbox"
            required
            aria-invalid={errors.privacidad ? true : undefined}
            aria-describedby={describedBy("privacidad")}
            className="mt-0.5 size-5 shrink-0 accent-nv-violet"
          />
          <label htmlFor="privacidad" className="text-sm leading-relaxed text-nv-muted">
            He leído y acepto la{" "}
            <Link href="/privacidad" className="font-semibold text-white underline underline-offset-2">
              política de privacidad
            </Link>
            .
          </label>
        </div>
        {errors.privacidad && (
          <p id="privacidad-error" className="mt-1.5 text-sm text-nv-magenta">
            {errors.privacidad}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <GradientButton type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Enviando…" : "Enviar"}
        </GradientButton>
        <p
          role="status"
          aria-live="polite"
          className={`text-sm ${status === "success" ? "text-nv-cyan" : status === "error" ? "text-nv-magenta" : ""}`}
        >
          {status === "success" || status === "error" ? message : ""}
        </p>
      </div>
    </form>
  );
}
