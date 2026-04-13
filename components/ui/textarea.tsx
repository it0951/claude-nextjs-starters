/**
 * @fileoverview HTML textarea 래퍼 컴포넌트.
 *
 * `field-sizing-content` CSS 속성을 적용하여 입력 내용에 따라 높이가 자동으로 늘어납니다.
 * 최소 높이는 `min-h-16`으로 고정됩니다.
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * 자동 높이 조절 textarea 컴포넌트.
 *
 * `field-sizing-content`로 내용 길이에 맞게 높이가 동적으로 변경됩니다.
 * `aria-invalid="true"` 설정 시 에러 스타일이 자동 적용됩니다.
 *
 * @param className - 추가 Tailwind 클래스
 *
 * @example
 * ```tsx
 * <Textarea placeholder="내용을 입력하세요" />
 *
 * // react-hook-form과 함께 사용
 * <Textarea {...register("content")} aria-invalid={!!errors.content} />
 * ```
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
