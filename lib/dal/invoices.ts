import "server-only";

import { cache } from "react";
import { revalidateTag, unstable_cache } from "next/cache";
import { isFullPage } from "@notionhq/client";

import { getNotionClient, NOTION_DB } from "@/lib/notion/client";
import { toInvoice, toInvoiceItem } from "@/lib/notion/mappers";
import type { Invoice, InvoiceItem, TokenVerifyResult } from "@/types/invoice";

/**
 * 관리자용: 전체 견적서 목록 조회 (발행일 내림차순)
 * unstable_cache: 60초 TTL, "invoices:list" 태그로 무효화 가능
 */
export const listInvoices = unstable_cache(
  async (): Promise<Invoice[]> => {
    const notion = getNotionClient();
    const response = await notion.databases.query({
      database_id: NOTION_DB.invoice,
      sorts: [{ property: "issueDate", direction: "descending" }],
    });
    return response.results.filter(isFullPage).map(toInvoice);
  },
  ["invoices:list"],
  { revalidate: 60, tags: ["invoices:list"] },
);

/**
 * 관리자용: ID로 견적서 단건 조회
 */
export const getInvoiceById = cache(
  async (id: string): Promise<Invoice | null> => {
    const notion = getNotionClient();
    const page = await notion.pages.retrieve({ page_id: id });
    if (!isFullPage(page)) return null;
    return toInvoice(page);
  },
);

/**
 * 관리자/클라이언트용: 견적서의 라인 아이템 목록 조회
 * Sprint 3에서 사용. 현재 스텁.
 */
export const getInvoiceItems = cache(
  async (_invoiceId: string): Promise<InvoiceItem[]> => {
    throw new Error("getInvoiceItems: not implemented");
  },
);

/**
 * 클라이언트용: 공유 토큰으로 견적서 조회 + 검증
 * Sprint 3에서 구현.
 */
export const getInvoiceByToken = cache(
  async (_token: string): Promise<TokenVerifyResult> => {
    throw new Error("getInvoiceByToken: not implemented");
  },
);

/**
 * 관리자용: 공유 토큰 발급
 * - crypto.randomUUID()로 토큰 생성
 * - Notion에 shareToken, tokenExpiresAt 기록, tokenRevokedAt 초기화
 * - "invoices:list" 캐시 무효화
 */
export async function createShareToken(
  invoiceId: string,
  expiresInDays: number,
): Promise<{ token: string; expiresAt: string }> {
  const token = crypto.randomUUID();
  const expiresAt = new Date(
    Date.now() + expiresInDays * 86_400_000,
  ).toISOString();

  const notion = getNotionClient();
  await notion.pages.update({
    page_id: invoiceId,
    properties: {
      shareToken: { rich_text: [{ text: { content: token } }] },
      tokenExpiresAt: { date: { start: expiresAt } },
      tokenRevokedAt: { date: null },
    },
  });

  revalidateTag("invoices:list", "max");
  return { token, expiresAt };
}

/**
 * 관리자용: 공유 토큰 회수
 * - Notion에 tokenRevokedAt = now 기록
 * - "invoices:list" 캐시 무효화
 */
export async function revokeShareToken(invoiceId: string): Promise<void> {
  const notion = getNotionClient();
  await notion.pages.update({
    page_id: invoiceId,
    properties: {
      tokenRevokedAt: { date: { start: new Date().toISOString() } },
    },
  });

  revalidateTag("invoices:list", "max");
}

/** Notion Item DB에서 invoiceId Relation으로 라인 아이템 목록 조회 (내부용) */
export async function fetchInvoiceItems(
  invoiceId: string,
): Promise<InvoiceItem[]> {
  const notion = getNotionClient();
  const response = await notion.databases.query({
    database_id: NOTION_DB.item,
    filter: {
      property: "invoiceId",
      relation: { contains: invoiceId },
    },
  });
  return response.results.filter(isFullPage).map(toInvoiceItem);
}
