import { NextResponse } from "next/server"

const CONTACT_TO = process.env.CONTACT_EMAIL?.trim() || "admin@encogsys.com"

type ContactPayload = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

function isActivationMessage(message: string) {
  const lower = message.toLowerCase()
  return lower.includes("activation") || lower.includes("activate form") || lower.includes("activate")
}

function jsonError(status: number, code: string, message: string) {
  return NextResponse.json(
    {
      success: false,
      status,
      error: {
        code,
        message,
      },
    },
    {
      status,
      headers: { "Content-Type": "application/json" },
    },
  )
}

export async function POST(request: Request) {
  try {
    let body: ContactPayload

    try {
      body = (await request.json()) as ContactPayload
    } catch {
      return jsonError(400, "INVALID_JSON", "Request body must be valid JSON.")
    }

    const name = typeof body.name === "string" ? body.name.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const subject = typeof body.subject === "string" ? body.subject.trim() : ""
    const message = typeof body.message === "string" ? body.message.trim() : ""

    if (!name || !email || !message) {
      return jsonError(400, "VALIDATION_ERROR", "Name, email, and message are required.")
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonError(400, "VALIDATION_ERROR", "Please enter a valid email address.")
    }

    // Prefer browser Origin; fall back to configured site URL so FormSubmit accepts server posts
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
      request.headers.get("origin") ||
      "http://localhost:3000"
    const origin = request.headers.get("origin") || siteUrl

    const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_TO}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: `${origin}/`,
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
        _honey: "",
      }),
    })

    const provider = (await response.json().catch(() => null)) as {
      success?: string | boolean
      message?: string
    } | null

    const providerMessage = provider?.message || ""

    if (isActivationMessage(providerMessage)) {
      return NextResponse.json(
        {
          success: false,
          pending: true,
          status: 200,
          message: `One-time setup: open the inbox for ${CONTACT_TO}, find the FormSubmit email, and click “Activate Form”. Then try again.`,
        },
        { status: 200, headers: { "Content-Type": "application/json" } },
      )
    }

    const providerOk =
      response.ok &&
      (provider?.success === true ||
        provider?.success === "true" ||
        providerMessage.toLowerCase().includes("success"))

    if (!providerOk) {
      return jsonError(
        502,
        "DELIVERY_FAILED",
        providerMessage ||
          `Unable to send your message right now. Please email ${CONTACT_TO} directly.`,
      )
    }

    return NextResponse.json(
      {
        success: true,
        status: 201,
        message: `Message sent successfully. We received your details at ${CONTACT_TO}.`,
      },
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch {
    return jsonError(
      500,
      "INTERNAL_ERROR",
      `Something went wrong. Please try again or email ${CONTACT_TO}.`,
    )
  }
}
