"use client"

/**
 * @fileoverview Radix UI Separator 래퍼 컴포넌트.
 *
 * 수평/수직 구분선을 렌더링합니다.
 * decorative 기본값이 true이므로 시각적 장식 목적으로 스크린 리더는 무시합니다.
 */

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * 수평/수직 구분선 컴포넌트.
 *
 * @param orientation - 방향 (horizontal | vertical, 기본값: "horizontal")
 * @param decorative - 장식용 여부, true이면 스크린 리더가 무시 (기본값: true)
 *
 * @example
 * ```tsx
 * // 수평 구분선
 * <Separator />
 *
 * // 수직 구분선 (flex 컨테이너 내에서 사용)
 * <div className="flex h-8 items-center">
 *   <span>왼쪽</span>
 *   <Separator orientation="vertical" className="mx-2" />
 *   <span>오른쪽</span>
 * </div>
 * ```
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
