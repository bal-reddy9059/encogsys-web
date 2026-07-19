"use client"

import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react"
import { useState, type FormEvent } from "react"

type Status = "idle" | "loading" | "success" | "pending" | "error"

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "admin@encogsys.com"

function isActivationMessage(message: string) {
  const lower = message.toLowerCase()
  return (
    lower.includes("activation") ||
    lower.includes("activate form") ||
    lower.includes("activate") ||
    lower.includes("confirm your email") ||
    lower.includes("confirmation")
  )
}

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle")
  const [feedback, setFeedback] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const subject = String(data.get("subject") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()

    if (!name || !email || !message) {
      setStatus("error")
      setFeedback("Please fill in your name, email, and message.")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error")
      setFeedback("Please enter a valid email address.")
      return
    }

    setStatus("loading")
    setFeedback("")

    try {
      // FormSubmit requires a real browser Origin — post from the client, not the server.
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          _replyto: email,
          subject: subject || "Website inquiry",
          message,
          "Full Name": name,
          "Email Address": email,
          Subject: subject || "Website inquiry",
          Message: message,
          _subject: `ENCOGSYS Contact — ${subject || "New inquiry"} from ${name}`,
          _template: "table",
          _captcha: "false",
        }),
      })

      const result = (await response.json().catch(() => null)) as {
        success?: string | boolean
        message?: string
      } | null

      const providerMessage = result?.message || ""

      if (isActivationMessage(providerMessage)) {
        setStatus("pending")
        setFeedback(
          `One-time setup required: open the inbox for ${CONTACT_EMAIL} (check Spam too), find the FormSubmit email, and click “Activate Form”. Then submit again — it will work permanently.`,
        )
        return
      }

      const ok =
        response.ok &&
        (result?.success === true ||
          result?.success === "true" ||
          providerMessage.toLowerCase().includes("success"))

      if (!ok) {
        setStatus("error")
        setFeedback(
          providerMessage ||
            `Unable to send. If this is the first time, check ${CONTACT_EMAIL} for a FormSubmit activation email. Or email us directly.`,
        )
        return
      }

      setStatus("success")
      setFeedback(`Message sent successfully to ${CONTACT_EMAIL}.`)
      form.reset()
    } catch {
      setStatus("error")
      setFeedback(`Network error. Please try again or email ${CONTACT_EMAIL}.`)
    }
  }

  return (
    <section id="contact" className="py-8 sm:py-10">
      <div className="mx-auto grid max-w-5xl gap-6 px-5 text-left lg:grid-cols-2 lg:items-start lg:gap-8 lg:px-8">
        <div className="min-w-0 text-left">
          <h2 className="font-display text-left text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get in touch
          </h2>
          <p className="mt-2 max-w-xl text-left font-display text-base font-semibold text-foreground/90 text-pretty sm:text-lg">
            Ready to engineer your next success?
          </p>
          <p className="mt-2 max-w-xl text-left text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
            We&apos;re here to help you navigate your digital transformation. Whether you have a project in mind or just
            want to explore possibilities, let&apos;s start the conversation.
          </p>

          <div className="mt-5 space-y-3">
            <div className="flex items-start gap-3 text-left">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                <Mail className="size-4 text-accent" />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-sm font-bold text-foreground">Email Us</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-primary hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                <Phone className="size-4 text-accent" />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-sm font-bold text-foreground">Call Us</p>
                <a href="tel:+917013853007" className="text-sm text-primary hover:underline">
                  +91 70138 53007
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                <MapPin className="size-4 text-accent" />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-sm font-bold text-foreground">Office</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">ENCOGSYS PVT LTD</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  2nd Floor, 475 Croissance Hub, RBI Layout, J P Nagar, Bangalore – 560078
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 text-left">
            <p className="text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Connect with us</p>
            <div className="mt-2 flex justify-start gap-2">
              <a
                href="https://www.linkedin.com/company/encogsys/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://x.com/encogsys"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/en_cog_sys/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-5 text-left sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Full Name" htmlFor="name">
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="John Doe"
                className="encogsys-field encogsys-field-compact"
              />
            </Field>
            <Field label="Email Address" htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="john@company.com"
                className="encogsys-field encogsys-field-compact"
              />
            </Field>
          </div>

          <div className="mt-3">
            <Field label="Subject" htmlFor="subject">
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Project Inquiry"
                className="encogsys-field encogsys-field-compact"
              />
            </Field>
          </div>

          <div className="mt-3">
            <Field label="Message" htmlFor="message">
              <textarea
                id="message"
                name="message"
                rows={3}
                required
                placeholder="Tell us about your requirements..."
                className="encogsys-field encogsys-field-area encogsys-field-compact"
              />
            </Field>
          </div>

          {feedback && (
            <p
              className={`mt-3 flex items-start gap-2 text-sm ${
                status === "success"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : status === "pending"
                    ? "text-amber-700 dark:text-amber-400"
                    : status === "error"
                      ? "text-red-500"
                      : "text-muted-foreground"
              }`}
              role="status"
            >
              {status === "success" && <CheckCircle2 className="mt-0.5 size-4 shrink-0" />}
              {status === "pending" && <Mail className="mt-0.5 size-4 shrink-0" />}
              {feedback}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 sm:text-sm"
          >
            {status === "loading" ? (
              <>
                Sending…
                <Loader2 className="size-4 animate-spin" />
              </>
            ) : (
              <>
                Send Message
                <Send className="size-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  )
}
