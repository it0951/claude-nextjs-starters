"use client"

/**
 * @fileoverview Radix UI Tooltip 래퍼 컴포넌트 모음.
 *
 * 요소에 마우스를 올렸을 때 추가 정보를 표시하는 툴팁을 제공합니다.
 * app/layout.tsx에서 TooltipProvider를 루트에 배치해야 합니다.
 *
 * 구성 컴포넌트:
 * - TooltipProvider: 툴팁 지연 시간 설정 컨텍스트
 * - Tooltip: 툴팁 루트 (상태 관리)
 * - TooltipTrigger: 툴팁을 트리거하는 요소
 * - TooltipContent: 실제 표시되는 툴팁 콘텐츠
 */

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * 툴팁 전역 Provider.
 *
 * 하위 모든 Tooltip의 표시 지연 시간을 설정합니다.
 * app/layout.tsx에 단 한 번만 배치합니다.
 *
 * @param delayDuration - 툴팁 표시 지연 시간 (밀리초, 기본값: 0)
 */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

/**
 * 툴팁 루트 — hover/focus 상태를 관리합니다.
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger asChild>
 *     <Button variant="ghost" size="icon"><InfoIcon /></Button>
 *   </TooltipTrigger>
 *   <TooltipContent>자세한 정보</TooltipContent>
 * </Tooltip>
 * ```
 */
function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

/** 툴팁을 트리거하는 요소 — asChild로 커스텀 요소에 툴팁 기능을 부여할 수 있습니다. */
function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

/**
 * 실제 표시되는 툴팁 콘텐츠.
 *
 * Radix Portal을 통해 DOM 트리 최상단에 렌더링되어 z-index 문제를 방지합니다.
 * 화살표(Arrow)가 자동으로 추가됩니다.
 *
 * @param sideOffset - 트리거와의 간격 (픽셀, 기본값: 0)
 */
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
