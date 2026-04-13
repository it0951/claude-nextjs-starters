/**
 * @fileoverview animate-pulse 기반 로딩 스켈레톤 컴포넌트.
 *
 * 콘텐츠 로딩 중 레이아웃 이탈을 방지하고 사용자에게 로딩 상태를 시각적으로 전달합니다.
 */

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * 로딩 상태 스켈레톤 컴포넌트.
 *
 * `animate-pulse` 애니메이션으로 콘텐츠가 로딩 중임을 나타냅니다.
 * 실제 콘텐츠의 크기와 모양에 맞게 className으로 너비/높이를 지정해야 합니다.
 *
 * @example
 * ```tsx
 * // 텍스트 스켈레톤
 * <Skeleton className="h-4 w-48" />
 *
 * // 아바타 스켈레톤
 * <Skeleton className="size-10 rounded-full" />
 * ```
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
