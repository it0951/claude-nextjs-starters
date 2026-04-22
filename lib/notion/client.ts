import "server-only";
import { Client } from "@notionhq/client";

/** 필수 환경변수 읽기. 누락 시 즉시 실패(fail-fast). */
export function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `환경변수 ${key}가 설정되지 않았습니다. .env.local 확인 필요.`,
    );
  }
  return value;
}

/** Notion 데이터베이스 ID 상수 */
export const NOTION_DB = {
  get invoice(): string {
    return requireEnv("NOTION_INVOICE_DB_ID");
  },
  get item(): string {
    return requireEnv("NOTION_ITEM_DB_ID");
  },
} as const;

// 지연 초기화 — 실제 호출 시점에 환경변수 검증
let _client: Client | null = null;

/** Notion API 클라이언트 인스턴스 반환 (싱글톤) */
export function getNotionClient(): Client {
  if (!_client) {
    _client = new Client({ auth: requireEnv("NOTION_API_KEY") });
  }
  return _client;
}
