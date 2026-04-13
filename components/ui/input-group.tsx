"use client"

/**
 * @fileoverview 복합 입력 필드 구성 컴포넌트 모음.
 *
 * InputGroup을 루트로 하여 아이콘, 텍스트, 버튼 등을 입력 필드 앞뒤에 결합합니다.
 * inline(좌우) 및 block(상하) 배치를 모두 지원합니다.
 *
 * 구성 컴포넌트:
 * - InputGroup: 컨테이너 (포커스 링, 에러 스타일 통합 관리)
 * - InputGroupAddon: 아이콘/텍스트/버튼을 담는 보조 영역
 * - InputGroupButton: InputGroupAddon 내부 버튼
 * - InputGroupText: InputGroupAddon 내부 텍스트/아이콘 표시 요소
 * - InputGroupInput: 그룹 내 input 필드
 * - InputGroupTextarea: 그룹 내 textarea 필드
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

/**
 * 복합 입력 필드 컨테이너.
 *
 * 내부 input/textarea의 포커스 상태와 에러 상태를 통합하여
 * 그룹 전체에 포커스 링과 에러 스타일을 적용합니다.
 *
 * @example
 * ```tsx
 * <InputGroup>
 *   <InputGroupAddon align="inline-start">
 *     <SearchIcon />
 *   </InputGroupAddon>
 *   <InputGroupInput placeholder="검색어 입력" />
 * </InputGroup>
 * ```
 */
function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-8 w-full min-w-0 items-center rounded-lg border border-input transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:bg-input/50 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        className
      )}
      {...props}
    />
  )
}

/**
 * Addon 배치 위치 variant 정의.
 *
 * - inline-start/end: 입력 필드 좌우에 배치
 * - block-start/end: 입력 필드 상하에 배치 (InputGroup이 flex-col로 전환됨)
 */
const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
        "inline-end":
          "order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
        "block-start":
          "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

/**
 * 입력 필드 앞뒤에 아이콘·텍스트·버튼을 배치하는 보조 영역.
 *
 * @param align - 배치 위치 (inline-start | inline-end | block-start | block-end, 기본값: "inline-start")
 *
 * @example
 * ```tsx
 * // 좌측 아이콘
 * <InputGroupAddon align="inline-start">
 *   <SearchIcon />
 * </InputGroupAddon>
 *
 * // 상단 레이블
 * <InputGroupAddon align="block-start">금액 (원)</InputGroupAddon>
 * ```
 */
function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        // Addon 영역 클릭 시 내부 button이 아닌 경우에만 input으로 포커스 이동
        // button 클릭은 자체 이벤트로 처리되어야 하므로 early return
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

/**
 * InputGroupAddon 내부 버튼 크기 variant 정의.
 * InputGroup의 높이에 맞도록 작은 크기를 기본값으로 사용합니다.
 */
const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

/**
 * InputGroupAddon 내부에서 사용하는 버튼 컴포넌트.
 *
 * InputGroup의 높이와 어울리도록 작은 기본 크기를 사용합니다.
 * type 기본값이 "button"이므로 폼 제출을 의도치 않게 트리거하지 않습니다.
 *
 * @example
 * ```tsx
 * <InputGroupAddon align="inline-end">
 *   <InputGroupButton onClick={handleClear}>
 *     <XIcon />
 *   </InputGroupButton>
 * </InputGroupAddon>
 * ```
 */
function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

/**
 * InputGroupAddon 내부에서 텍스트나 아이콘을 표시하는 인라인 요소.
 *
 * @example
 * ```tsx
 * <InputGroupAddon>
 *   <InputGroupText>
 *     <AtSignIcon />
 *   </InputGroupText>
 * </InputGroupAddon>
 * ```
 */
function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * InputGroup 내부에서 사용하는 input 필드.
 *
 * 그룹 컨테이너의 테두리를 활용하므로 자체 테두리와 배경을 제거합니다.
 * `data-slot="input-group-control"`로 포커스 스타일을 상위 InputGroup에 위임합니다.
 */
function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

/**
 * InputGroup 내부에서 사용하는 textarea 필드.
 *
 * resize를 비활성화하여 InputGroup 레이아웃을 유지합니다.
 * `data-slot="input-group-control"`로 포커스 스타일을 상위 InputGroup에 위임합니다.
 */
function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
