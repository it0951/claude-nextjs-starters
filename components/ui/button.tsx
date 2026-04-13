/**
 * @fileoverview CVA(class-variance-authority) 기반 Button 컴포넌트.
 *
 * variant(스타일)와 size(크기) 조합으로 다양한 버튼을 렌더링합니다.
 * asChild prop을 통해 Radix Slot으로 합성 컴포넌트 패턴을 지원합니다.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * 버튼 스타일 variant 및 size 조합 정의.
 *
 * variant:
 * - default: 주요 액션 (primary 색상)
 * - outline: 보조 액션 (테두리 스타일)
 * - secondary: 중간 강조 (secondary 색상)
 * - ghost: 최소한의 스타일 (hover 시에만 배경)
 * - destructive: 위험 액션 (빨간 계열)
 * - link: 링크처럼 보이는 버튼
 *
 * size:
 * - xs/sm/default/lg: 텍스트+아이콘 버튼 크기
 * - icon/icon-xs/icon-sm/icon-lg: 아이콘 전용 정사각형 버튼
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * 범용 버튼 컴포넌트.
 *
 * @param variant - 버튼 스타일 변형 (기본값: "default")
 * @param size - 버튼 크기 변형 (기본값: "default")
 * @param asChild - true이면 Radix Slot으로 렌더링하여 자식 요소에 스타일 합성
 * @param className - 추가 Tailwind 클래스
 *
 * @example
 * ```tsx
 * <Button variant="outline" size="sm">취소</Button>
 * <Button variant="destructive">삭제</Button>
 *
 * // Link 컴포넌트에 버튼 스타일 적용 (asChild 패턴)
 * <Button asChild>
 *   <Link href="/dashboard">대시보드</Link>
 * </Button>
 * ```
 */
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** true이면 Radix Slot으로 렌더링 — 자식 컴포넌트에 버튼 스타일을 합성 */
    asChild?: boolean
  }) {
  // asChild가 true이면 Slot.Root로 렌더링하여 자식 요소가 실제 DOM 요소가 됨
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
