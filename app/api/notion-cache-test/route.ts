import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";
import { getNotionClient, NOTION_DB } from "@/lib/notion/client";

// 실제 Notion API 호출 횟수 추적
let notionCallCount = 0;

// unstable_cache로 래핑 — 60초 동안 캐시 유지
const fetchInvoices = unstable_cache(
  async () => {
    notionCallCount++;
    return getNotionClient().databases.query({
      database_id: NOTION_DB.invoice,
      page_size: 1,
    });
  },
  ["spike3-notion-cache-test"],
  { revalidate: 60 },
);

export async function GET(): Promise<NextResponse> {
  // 요청마다 카운터 초기화
  notionCallCount = 0;

  // 10회 순차 호출 — 캐시가 동작하면 실제 API는 1회만 호출됨
  for (let i = 0; i < 10; i++) {
    await fetchInvoices();
  }

  const requestCount = 10;
  const cacheHitRate = `${((requestCount - notionCallCount) / requestCount) * 100}%`;

  return NextResponse.json({
    callCount: notionCallCount,
    requestCount,
    cacheHitRate,
    passed: notionCallCount === 1,
  });
}
