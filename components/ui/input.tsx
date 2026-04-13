/**
 * @fileoverview HTML input 래퍼 컴포넌트.
 *
 * ShadcnUI 디자인 시스템 스타일을 적용한 기본 입력 필드입니다.
 * react-hook-form과 함께 사용 시 `aria-invalid` 속성으로 에러 스타일이 자동 적용됩니다.
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * 스타일이 적용된 HTML input 컴포넌트.
 *
 * 파일 선택(`type="file"`)을 포함한 모든 input 타입을 지원합니다.
 * `aria-invalid="true"` 설정 시 빨간 테두리 에러 스타일이 자동 적용됩니다.
 *
 * @param type - input 타입 (text, email, password, file 등)
 * @param className - 추가 Tailwind 클래스
 *
 * @example
 * ```tsx
 * <Input type="email" placeholder="이메일을 입력하세요" />
 *
 * // react-hook-form과 함께 사용
 * <Input {...register("email")} aria-invalid={!!errors.email} />
 * ```
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
