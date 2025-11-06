import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { text } = (await request.json()) as { text?: string };
  const input = (text || "").toLowerCase();

  const containsStruggle = /\b(skip|tired)\b/.test(input);

  const message = containsStruggle
    ? "Consistency beats intensity. A tiny step today keeps your loop alive. You’ve got this."
    : "Nice work showing up. Notice what helped today and repeat it tomorrow. Momentum is building.";

  return NextResponse.json({ message });
}


