/**
 * @fileoverview 페이지네이션 컴포넌트 모음.
 *
 * 다중 페이지 콘텐츠를 탐색하기 위한 페이지네이션 UI를 제공합니다.
 * PaginationLink를 통해 현재 페이지 스타일과 링크 동작을 제어합니다.
 *
 * 구성 컴포넌트:
 * - Pagination: 루트 nav 요소
 * - PaginationContent: ul 기반 항목 목록
 * - PaginationItem: 개별 페이지 항목
 * - PaginationLink: 페이지 번호 링크 (isActive로 현재 페이지 표시)
 * - PaginationPrevious: 이전 페이지 버튼
 * - PaginationNext: 다음 페이지 버튼
 * - PaginationEllipsis: 생략 표시 (...)
 */

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

/**
 * 페이지네이션 루트 nav 요소.
 *
 * @example
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious href="?page=1" />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="?page=2" isActive>2</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationNext href="?page=3" />
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

/** 페이지네이션 항목 목록 컨테이너 */
function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  )
}

/** 개별 페이지네이션 항목 래퍼 li 요소 */
function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  /** 현재 활성 페이지 여부 — outline 스타일과 aria-current="page" 적용 */
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

/**
 * 페이지 번호 링크.
 *
 * @param isActive - 현재 페이지 여부 (outline 스타일로 강조, aria-current="page" 설정)
 * @param size - 버튼 크기 (기본값: "icon")
 */
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      asChild
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(className)}
    >
      <a
        aria-current={isActive ? "page" : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        {...props}
      />
    </Button>
  )
}

/**
 * 이전 페이지 버튼.
 *
 * sm 이상에서만 텍스트가 표시되고, 모바일에서는 아이콘만 표시됩니다.
 *
 * @param text - 버튼 텍스트 (기본값: "Previous")
 */
function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  /** 버튼에 표시할 텍스트 (sm 이상에서만 표시, 기본값: "Previous") */
  text?: string
}) {
  return (
    <PaginationLink
      aria-label="이전 페이지로 이동"
      size="default"
      className={cn("pl-1.5!", className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  )
}

/**
 * 다음 페이지 버튼.
 *
 * sm 이상에서만 텍스트가 표시되고, 모바일에서는 아이콘만 표시됩니다.
 *
 * @param text - 버튼 텍스트 (기본값: "Next")
 */
function PaginationNext({
  className,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  /** 버튼에 표시할 텍스트 (sm 이상에서만 표시, 기본값: "Next") */
  text?: string
}) {
  return (
    <PaginationLink
      aria-label="다음 페이지로 이동"
      size="default"
      className={cn("pr-1.5!", className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  )
}

/**
 * 페이지 목록 생략 표시.
 *
 * 페이지 범위가 넓어 중간 페이지를 생략할 때 사용합니다.
 * "더 보기" 텍스트는 sr-only로 스크린 리더에만 전달됩니다.
 */
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon
      />
      <span className="sr-only">더 보기</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
