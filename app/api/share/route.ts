import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth/config";
import { createShareToken, revokeShareToken } from "@/lib/dal/invoices";

const createSchema = z.object({
  invoiceId: z.string().min(1),
  expiresInDays: z.number().int().min(1).max(90).default(30),
});

const revokeSchema = z.object({
  invoiceId: z.string().min(1),
});

/**
 * POST /api/share — 공유 링크 생성 (shareToken 발급)
 */
export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "인증이 필요합니다" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "요청 본문이 잘못되었습니다" },
      { status: 400 },
    );
  }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "입력값이 올바르지 않습니다", errors: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { invoiceId, expiresInDays } = parsed.data;

  try {
    const { token, expiresAt } = await createShareToken(
      invoiceId,
      expiresInDays,
    );
    const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
    const url = `${baseUrl}/invoice/${token}`;
    return NextResponse.json({ token, expiresAt, url });
  } catch (error) {
    console.error("[POST /api/share]", error);
    return NextResponse.json(
      { message: "공유 링크 생성에 실패했습니다" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/share — 공유 링크 회수 (tokenRevokedAt 설정)
 */
export async function DELETE(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "인증이 필요합니다" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "요청 본문이 잘못되었습니다" },
      { status: 400 },
    );
  }

  const parsed = revokeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "입력값이 올바르지 않습니다", errors: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    await revokeShareToken(parsed.data.invoiceId);
    return NextResponse.json({ message: "공유 링크가 회수되었습니다" });
  } catch (error) {
    console.error("[DELETE /api/share]", error);
    return NextResponse.json(
      { message: "공유 링크 회수에 실패했습니다" },
      { status: 500 },
    );
  }
}
