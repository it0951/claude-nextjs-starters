"use client"

/**
 * @fileoverview cmdk 기반 명령 팔레트 컴포넌트 모음.
 *
 * 검색 가능한 명령 목록 UI를 제공합니다.
 * CommandDialog로 모달 형태의 전역 명령 팔레트를 구현할 수 있습니다.
 *
 * 구성 컴포넌트:
 * - Command: 명령 팔레트 루트
 * - CommandDialog: 모달 형태의 명령 팔레트 래퍼
 * - CommandInput: 검색 입력 필드
 * - CommandList: 항목 목록 스크롤 영역
 * - CommandEmpty: 검색 결과 없음 표시
 * - CommandGroup: 항목 그룹
 * - CommandItem: 개별 명령 항목
 * - CommandShortcut: 단축키 힌트
 * - CommandSeparator: 그룹 구분선
 */

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  InputGroup,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { SearchIcon, CheckIcon } from "lucide-react"

/**
 * 명령 팔레트 루트 컨테이너.
 *
 * @example
 * ```tsx
 * // 인라인 명령 팔레트
 * <Command>
 *   <CommandInput placeholder="명령을 검색하세요..." />
 *   <CommandList>
 *     <CommandGroup heading="작업">
 *       <CommandItem>새 파일 생성</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 */
function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex size-full flex-col overflow-hidden rounded-xl! bg-popover p-1 text-popover-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * 모달 형태의 전역 명령 팔레트.
 *
 * Dialog 위에 Command를 렌더링합니다.
 * DialogHeader는 `sr-only`로 숨겨져 스크린 리더에만 전달됩니다.
 *
 * @param title - 스크린 리더용 다이얼로그 제목 (기본값: "Command Palette")
 * @param description - 스크린 리더용 설명 (기본값: "Search for a command to run...")
 * @param showCloseButton - 닫기 버튼 표시 여부 (기본값: false)
 *
 * @example
 * ```tsx
 * // Ctrl+K / Cmd+K 단축키로 열리는 전역 명령 팔레트
 * <CommandDialog open={open} onOpenChange={setOpen}>
 *   <CommandInput placeholder="명령을 검색하세요..." />
 *   <CommandList>
 *     <CommandItem>파일 열기</CommandItem>
 *   </CommandList>
 * </CommandDialog>
 * ```
 */
function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  /** 스크린 리더용 다이얼로그 제목 */
  title?: string
  /** 스크린 리더용 다이얼로그 설명 */
  description?: string
  className?: string
  /** 닫기 버튼 표시 여부 (기본값: false) */
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      {/* 접근성을 위해 title/description은 sr-only로 숨김 처리 — 시각적으로는 보이지 않음 */}
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0",
          className
        )}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

/**
 * 명령 팔레트 검색 입력 필드.
 *
 * InputGroup을 사용하여 검색 아이콘과 함께 표시합니다.
 * 입력값에 따라 CommandList의 항목이 자동으로 필터링됩니다.
 */
function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="p-1 pb-0">
      <InputGroup className="h-8! rounded-lg! border-input/30 bg-input/30 shadow-none! *:data-[slot=input-group-addon]:pl-2!">
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        <InputGroupAddon>
          <SearchIcon className="size-4 shrink-0 opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

/** 명령 항목 목록 스크롤 영역 — 최대 높이 72(288px)로 스크롤됩니다. */
function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none",
        className
      )}
      {...props}
    />
  )
}

/** 검색 결과가 없을 때 표시되는 빈 상태 메시지 */
function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-6 text-center text-sm", className)}
      {...props}
    />
  )
}

/** 관련 명령 항목을 묶는 그룹 컨테이너 — heading prop으로 그룹 레이블을 지정합니다. */
function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

/** 명령 그룹 사이 구분선 */
function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  )
}

/**
 * 개별 명령 항목.
 *
 * 선택 상태(`data-checked=true`)에서 우측에 체크 아이콘이 표시됩니다.
 * CommandShortcut이 있으면 체크 아이콘은 숨겨집니다.
 */
function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "group/command-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-muted data-selected:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-selected:*:[svg]:text-foreground",
        className
      )}
      {...props}
    >
      {children}
      <CheckIcon className="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
    </CommandPrimitive.Item>
  )
}

/** 명령 항목 우측에 표시되는 키보드 단축키 힌트 */
function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
