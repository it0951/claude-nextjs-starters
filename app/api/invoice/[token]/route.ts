import { NextResponse } from "next/server";

/**
 * GET /api/invoice/[token]
 *
 * 클라이언트 공개 견적서 조회 API (BFF).
 *
 * 인증: 필요 없음 (토큰 기반 접근 제어).
 *
 * 동작(예정):
 * 1) token → DAL `getInvoiceByToken(token)` 호출
 * 2) 토큰 상태 분기 (valid / expired / revoked / not_found / notion_error)
 * 3) valid: PublicInvoice DTO 반환 (민감 필드 제외)
 *    invalid: { status, message } 형태로 4xx 반환
 * 4) viewCount / lastViewedAt 업데이트 (async, 응답 블로킹 금지)
 *
 * Next.js 16: 동적 세그먼트의 `params`는 Promise로 전달됨.
 */
type RouteContext = {
  params: Promise<{ token: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { token } = await context.params;

  // TODO: DAL 연동
  // const result = await getInvoiceByToken(token)
  // return NextResponse.json(result, { status: result.status === "valid" ? 200 : 404 })

  return NextResponse.json(
    { message: "Not implemented", token },
    { status: 501 },
  );
}
