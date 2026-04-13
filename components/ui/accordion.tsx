"use client"

/**
 * @fileoverview Radix UI Accordion 래퍼 컴포넌트 모음.
 *
 * 항목을 클릭하여 콘텐츠를 접고 펼치는 아코디언 UI를 제공합니다.
 * type="single" (단일 항목 오픈) 또는 type="multiple" (다중 항목 오픈)을 지원합니다.
 *
 * 구성 컴포넌트:
 * - Accordion: 루트 컨테이너
 * - AccordionItem: 개별 아코디언 항목
 * - AccordionTrigger: 클릭 시 콘텐츠를 여닫는 헤더 버튼
 * - AccordionContent: 펼쳐지는 콘텐츠 영역 (CSS 애니메이션 포함)
 */

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

/**
 * 아코디언 루트 컨테이너.
 *
 * @example
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>질문 1</AccordionTrigger>
 *     <AccordionContent>답변 내용</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

/**
 * 개별 아코디언 항목.
 *
 * `value` prop으로 고유 식별자를 지정합니다.
 * 마지막 항목을 제외한 각 항목 하단에 구분선이 표시됩니다.
 */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  )
}

/**
 * 아코디언 헤더 트리거 버튼.
 *
 * 열림 상태에서는 ChevronUp, 닫힘 상태에서는 ChevronDown 아이콘을 표시합니다.
 * aria-expanded 속성을 통해 스크린 리더에 상태가 전달됩니다.
 */
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon data-slot="accordion-trigger-icon" className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
        <ChevronUpIcon data-slot="accordion-trigger-icon" className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

/**
 * 아코디언 펼쳐지는 콘텐츠 영역.
 *
 * `data-open:animate-accordion-down`, `data-closed:animate-accordion-up`으로
 * CSS 애니메이션이 적용됩니다. 내부 링크와 단락 사이의 간격이 자동으로 처리됩니다.
 */
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--radix-accordion-content-height) pt-0 pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
