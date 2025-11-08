import { NextResponse } from "next/server";

const PASSWORD = process.env.SITE_PASSWORD?.trim() ?? "";

export async function GET() {
  return NextResponse.json({ enabled: Boolean(PASSWORD) });
}

export async function POST(request: Request) {
  if (!PASSWORD) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  try {
    const { password } = (await request.json()) as { password?: string };
    if (typeof password !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    if (password.trim() === PASSWORD) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    return NextResponse.json({ ok: false }, { status: 401 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
