"use client"

/**
 * @fileoverview TanStack React Query v5 Provider 래퍼 컴포넌트.
 *
 * QueryClient를 생성하고 QueryClientProvider로 하위 트리에 컨텍스트를 제공합니다.
 * staleTime 기본값을 60초로 설정하여 불필요한 리페치를 줄입니다.
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

/**
 * TanStack React Query 전역 Provider.
 *
 * 기본 staleTime을 60초로 설정합니다.
 * 개별 쿼리에서 `staleTime`을 override할 수 있습니다.
 *
 * @param children - React Query 컨텍스트를 사용할 하위 컴포넌트 트리
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * <QueryProvider>
 *   {children}
 * </QueryProvider>
 * ```
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // 컴포넌트 인스턴스별로 QueryClient 생성 (SSR 데이터 공유 방지)
  // useState 팩토리 함수로 감싸야 매 렌더링마다 새 인스턴스가 생성되지 않음
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1분: 동일 키 요청 시 캐시 재사용 기간
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
