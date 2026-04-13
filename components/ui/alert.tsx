/**
 * @fileoverview 알림 메시지 컴포넌트 모음.
 *
 * 사용자에게 정보, 경고, 오류 등의 상태 메시지를 전달합니다.
 * SVG 아이콘을 직접 자식으로 넣으면 자동으로 2열 그리드 레이아웃으로 전환됩니다.
 *
 * 구성 컴포넌트:
 * - Alert: 루트 컨테이너 (role="alert"으로 스크린 리더 접근성 제공)
 * - AlertTitle: 알림 제목
 * - AlertDescription: 알림 상세 설명
 * - AlertAction: 우측 상단 액션 버튼 영역 (절대 위치)
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * 알림 스타일 variant 정의.
 *
 * - default: 일반 정보 알림 (card 배경)
 * - destructive: 오류/위험 알림 (destructive 텍스트 색상)
 */
const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * 알림 메시지 루트 컨테이너.
 *
 * `role="alert"`로 스크린 리더에 즉시 알림을 전달합니다.
 * 자식에 SVG 아이콘이 있으면 2열 그리드로 자동 전환됩니다.
 *
 * @param variant - 알림 스타일 변형 (기본값: "default")
 *
 * @example
 * ```tsx
 * <Alert variant="destructive">
 *   <OctagonXIcon />
 *   <AlertTitle>오류 발생</AlertTitle>
 *   <AlertDescription>요청을 처리할 수 없습니다.</AlertDescription>
 * </Alert>
 * ```
 */
function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

/** 알림 제목 — SVG 아이콘이 있을 때 col-start-2로 자동 배치됩니다. */
function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-heading font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

/** 알림 상세 설명 — muted-foreground 색상으로 보조 텍스트를 표시합니다. */
function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * 알림 우측 상단에 절대 위치로 표시되는 액션 영역.
 *
 * 닫기 버튼이나 "자세히 보기" 링크 등을 배치하는 데 사용합니다.
 */
function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
