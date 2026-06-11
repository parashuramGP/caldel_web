import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[0-9\s\-()]{7,20}$/;

function classify(input: string): { type: "email" | "phone"; value: string } | null {
  const trimmed = input.trim();
  if (EMAIL_RE.test(trimmed)) return { type: "email", value: trimmed.toLowerCase() };
  const digits = trimmed.replace(/[\s\-()]/g, "");
  if (PHONE_RE.test(trimmed) && digits.replace(/^\+/, "").length >= 7) {
    return { type: "phone", value: digits };
  }
  return null;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const contactRaw = (body as { contact?: unknown })?.contact;
  if (typeof contactRaw !== "string" || contactRaw.trim().length === 0) {
    return NextResponse.json({ error: "Email or phone is required" }, { status: 400 });
  }

  const classified = classify(contactRaw);
  if (!classified) {
    return NextResponse.json(
      { error: "Please enter a valid email or phone number" },
      { status: 400 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    null;
  const userAgent = req.headers.get("user-agent") || null;

  const { error } = await supabaseAdmin
    .from("waitlist")
    .insert({
      contact: classified.value,
      contact_type: classified.type,
      source: "web",
      ip,
      user_agent: userAgent,
    });

  if (error) {
    // 23505 = unique_violation — they're already on the list
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, already: true });
    }
    console.error("[waitlist] insert error:", error);
    return NextResponse.json({ error: "Could not save. Try again in a moment." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
