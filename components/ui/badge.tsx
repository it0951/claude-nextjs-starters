/**
 * @fileoverview CVA 기반 Badge 컴포넌트.
 *
 * 상태 표시, 카테고리 레이블, 카운트 등을 나타내는 작은 인라인 배지입니다.
 * asChild prop으로 링크나 다른 요소에 배지 스타일을 합성할 수 있습니다.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * 배지 스타일 variant 정의.
 *
 * variant:
 * - default: 강조 배지 (primary 색상)
 * - secondary: 보조 배지 (secondary 색상)
 * - destructive: 위험/에러 배지 (빨간 계열)
 * - outline: 테두리만 있는 배지
 * - ghost: 배경 없는 배지 (hover 시 배경 표시)
 * - link: 링크처럼 보이는 배지
 */
const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * 인라인 배지 컴포넌트.
 *
 * @param variant - 배지 스타일 변형 (기본값: "default")
 * @param asChild - true이면 Radix Slot으로 렌더링하여 자식 요소에 배지 스타일 합성
 *
 * @example
 * ```tsx
 * <Badge>신규</Badge>
 * <Badge variant="destructive">오류</Badge>
 * <Badge variant="outline">베타</Badge>
 *
 * // Link에 배지 스타일 적용
 * <Badge asChild variant="secondary">
 *   <a href="/changelog">변경 내역</a>
 * </Badge>
 * ```
 */
function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    /** true이면 Radix Slot으로 렌더링 — 자식 컴포넌트에 배지 스타일을 합성 */
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
