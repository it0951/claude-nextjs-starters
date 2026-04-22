import { NextResponse } from "next/server";

import { auth } from "@/lib/auth/config";
import { listInvoices } from "@/lib/dal/invoices";

/**
 * GET /api/invoices
 * 관리자용 견적서 목록 조회 (Auth.js 세션 필수)
 */
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "인증이 필요합니다" }, { status: 401 });
  }

  try {
    const invoices = await listInvoices();
    return NextResponse.json(invoices);
  } catch (error) {
    console.error("[GET /api/invoices]", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다" },
      { status: 500 },
    );
  }
}
