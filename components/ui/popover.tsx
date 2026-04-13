"use client"

/**
 * @fileoverview Radix UI Popover 래퍼 컴포넌트 모음.
 *
 * 트리거 요소에 연결된 플로팅 패널을 렌더링합니다.
 * 모달과 달리 배경을 차단하지 않아 배경과 상호작용이 가능합니다.
 *
 * 구성 컴포넌트:
 * - Popover: 루트 (상태 관리)
 * - PopoverTrigger: 팝오버를 여닫는 트리거
 * - PopoverContent: 실제 표시되는 플로팅 패널
 * - PopoverAnchor: 팝오버가 연결될 기준 앵커 요소
 * - PopoverHeader: 팝오버 헤더 영역
 * - PopoverTitle: 팝오버 제목
 * - PopoverDescription: 팝오버 설명
 */

import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * 팝오버 루트 — 열림/닫힘 상태를 관리합니다.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button>필터</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverHeader>
 *       <PopoverTitle>필터 옵션</PopoverTitle>
 *     </PopoverHeader>
 *     {/* 필터 UI *\/}
 *   </PopoverContent>
 * </Popover>
 * ```
 */
function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

/** 팝오버를 여닫는 트리거 요소 */
function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

/**
 * 실제 표시되는 팝오버 플로팅 패널.
 *
 * Radix Portal을 통해 DOM 트리 최상단에 렌더링됩니다.
 *
 * @param align - 트리거 기준 정렬 방향 (start | center | end, 기본값: "center")
 * @param sideOffset - 트리거와의 간격 (픽셀, 기본값: 4)
 */
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 flex w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

/**
 * 팝오버가 연결될 기준 앵커 요소.
 *
 * PopoverTrigger와 별도로 팝오버의 위치 기준점을 지정할 때 사용합니다.
 */
function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

/** 팝오버 상단 헤더 영역 — 제목과 설명을 수직 배치합니다. */
function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      {...props}
    />
  )
}

/** 팝오버 제목 — font-heading 폰트를 적용합니다. */
function PopoverTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <div
      data-slot="popover-title"
      className={cn("font-heading font-medium", className)}
      {...props}
    />
  )
}

/** 팝오버 설명 — muted-foreground 색상으로 보조 텍스트를 표시합니다. */
function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
