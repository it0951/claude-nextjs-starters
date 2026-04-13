/**
 * @fileoverview 카드 레이아웃 컴포넌트 모음.
 *
 * Card를 루트로 하여 헤더·콘텐츠·푸터 영역을 구조적으로 구성합니다.
 *
 * 구성 컴포넌트:
 * - Card: 루트 컨테이너 (크기: sm/default)
 * - CardHeader: 제목·설명·액션 버튼을 담는 상단 영역
 * - CardTitle: 카드 제목
 * - CardDescription: 카드 부제목/설명
 * - CardAction: 헤더 우측 액션 영역 (그리드 레이아웃으로 자동 배치)
 * - CardContent: 주요 콘텐츠 영역
 * - CardFooter: 카드 하단 액션 영역 (배경색 강조)
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * 카드 루트 컨테이너.
 *
 * @param size - 카드 크기 (default: 여유 있는 간격 | sm: 압축 간격)
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>제목</CardTitle>
 *     <CardDescription>설명</CardDescription>
 *   </CardHeader>
 *   <CardContent>본문 내용</CardContent>
 *   <CardFooter>
 *     <Button>확인</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & {
  /** 카드 여백 크기 (default: 16px | sm: 12px) */
  size?: "default" | "sm"
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

/**
 * 카드 상단 헤더 영역.
 *
 * CardAction이 있을 때 자동으로 2열 그리드로 전환됩니다.
 * CardDescription이 있을 때 2행 그리드로 전환됩니다.
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...props}
    />
  )
}

/** 카드 제목 — font-heading 폰트를 적용합니다. */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

/** 카드 부제목/설명 — muted-foreground 색상으로 보조 텍스트를 표시합니다. */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

/**
 * 카드 헤더 우측에 배치되는 액션 영역.
 *
 * CardHeader의 그리드 레이아웃에서 col-start-2로 자동 배치됩니다.
 * 버튼, 드롭다운 메뉴 등 헤더 액션을 배치할 때 사용합니다.
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/** 카드 주요 콘텐츠 영역 — 좌우 패딩만 적용됩니다. */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  )
}

/**
 * 카드 하단 푸터 영역.
 *
 * 상단 테두리와 muted 배경으로 메인 콘텐츠와 시각적으로 구분됩니다.
 * 확인/취소 버튼 등 폼 액션 배치에 적합합니다.
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
