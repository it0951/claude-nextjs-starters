"use client"

/**
 * @fileoverview Radix UI Checkbox 래퍼 컴포넌트.
 *
 * 체크/미체크 상태를 토글하는 체크박스입니다.
 * react-hook-form과 함께 사용 시 `aria-invalid` 속성으로 에러 스타일이 자동 적용됩니다.
 */

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

/**
 * 체크박스 컴포넌트.
 *
 * `data-checked` 상태에서 primary 색상으로 배경이 채워집니다.
 * `-inset-x-3 -inset-y-2` 가상 요소로 클릭 영역이 시각적 크기보다 넓게 확장됩니다.
 *
 * @example
 * ```tsx
 * <Checkbox id="terms" />
 * <Label htmlFor="terms">이용약관에 동의합니다</Label>
 *
 * // react-hook-form과 함께 사용
 * // Radix onCheckedChange는 boolean | "indeterminate"를 반환하므로
 * // "indeterminate" 케이스를 명시적으로 처리해야 합니다
 * <Checkbox
 *   checked={field.value}
 *   onCheckedChange={(checked) => {
 *     if (checked !== "indeterminate") field.onChange(checked)
 *   }}
 * />
 * ```
 */
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
