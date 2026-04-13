"use client"

/**
 * @fileoverview Radix UI Progress 래퍼 컴포넌트.
 *
 * 0~100 범위의 value로 진행 상태를 시각화합니다.
 * translateX 변환으로 progress indicator 너비를 부드럽게 변경합니다.
 */

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * 진행률 표시 바 컴포넌트.
 *
 * @param value - 진행률 (0~100, undefined이면 0으로 처리)
 *
 * @example
 * ```tsx
 * <Progress value={65} />
 * ```
 */
function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      {/* translateX로 너비 대신 위치를 변경 — GPU 가속 애니메이션 활용 */}
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="size-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
