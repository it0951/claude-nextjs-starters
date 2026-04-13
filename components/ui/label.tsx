"use client"

/**
 * @fileoverview Radix UI Label 래퍼 컴포넌트.
 *
 * 폼 요소와 연동되는 접근성 Label을 제공합니다.
 * 연결된 입력 필드가 비활성화되면 Label도 자동으로 반투명 처리됩니다.
 */

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * 접근성 폼 레이블 컴포넌트.
 *
 * Radix UI Label.Root 기반으로 `htmlFor`로 입력 필드와 연결합니다.
 * `peer` 클래스 패턴을 통해 연결된 입력 필드의 disabled 상태를 감지하여 스타일을 변경합니다.
 *
 * @param className - 추가 Tailwind 클래스
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">이메일</Label>
 * <Input id="email" type="email" />
 * ```
 */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
