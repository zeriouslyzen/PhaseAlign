import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const siteOrSocial = typeof body?.siteOrSocial === "string" ? body.siteOrSocial.trim() : "";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }
    // TODO: persist (e.g. DB, email, CRM). For now accept and return success.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
