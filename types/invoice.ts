/**
 * Invoice 도메인 타입 정의
 *
 * PRD 데이터 모델 기준:
 * - Invoice: 노션 견적서 DB 레코드
 * - InvoiceItem: 노션 견적서 항목 DB 레코드 (Relation via invoiceId)
 *
 * 주의: 노션 원본 응답이 아니라 DAL에서 변환된 DTO 형태로 사용합니다.
 * (DAL: `lib/dal/invoices.ts`에서 DTO 변환 책임)
 */

/** 견적서 상태 */
export type InvoiceStatus = "초안" | "발송" | "확정";

/** 공유 토큰 검증 결과 */
export type TokenStatus =
  | "valid" // 정상 (유효한 토큰)
  | "expired" // 만료됨 (tokenExpiresAt 경과)
  | "revoked" // 회수됨 (tokenRevokedAt 설정됨)
  | "not_found" // 존재하지 않는 토큰
  | "notion_error"; // Notion API 오류

/** 견적서 */
export interface Invoice {
  /** Notion page id */
  id: string;
  /** 견적서 제목 */
  title: string;
  /** 고객명 */
  clientName: string;
  /** 고객 이메일 */
  clientEmail: string;
  /** 발행일 (ISO 8601) */
  issueDate: string;
  /** 견적서 상태 */
  status: InvoiceStatus;
  /** 총 금액 (원) */
  totalAmount: number;
  /** 공유 토큰 (UUID 등) — 발급되지 않은 경우 null */
  shareToken: string | null;
  /** 토큰 만료 시각 (ISO 8601) — 설정되지 않은 경우 null */
  tokenExpiresAt: string | null;
  /** 토큰 회수 시각 (ISO 8601) — 회수되지 않은 경우 null */
  tokenRevokedAt: string | null;
  /** 조회수 누적 */
  viewCount: number;
  /** 마지막 조회 시각 (ISO 8601) — 조회 이력 없으면 null */
  lastViewedAt: string | null;
}

/** 견적서 항목 (라인 아이템) */
export interface InvoiceItem {
  /** Notion page id */
  id: string;
  /** 상위 견적서 id (Relation) */
  invoiceId: string;
  /** 항목 설명 */
  description: string;
  /** 수량 */
  quantity: number;
  /** 단가 (원) */
  unitPrice: number;
  /** 소계 (quantity * unitPrice) */
  subtotal: number;
}

/** 공개(클라이언트) 뷰용 견적서 — 민감 필드 제거된 DTO */
export interface PublicInvoice {
  id: string;
  title: string;
  clientName: string;
  issueDate: string;
  status: InvoiceStatus;
  totalAmount: number;
  items: InvoiceItem[];
}

/** 토큰 검증 결과 유니온 */
export type TokenVerifyResult =
  | { status: "valid"; invoice: PublicInvoice }
  | { status: Exclude<TokenStatus, "valid">; message: string };
