/**
 * @fileoverview 브레드크럼(Breadcrumb) 네비게이션 컴포넌트 모음.
 *
 * 현재 페이지의 계층 위치를 나타내는 경로 탐색 UI를 제공합니다.
 * 구분자와 생략 처리를 포함한 완전한 브레드크럼 컴포넌트 세트입니다.
 *
 * 구성 컴포넌트:
 * - Breadcrumb: 루트 nav 요소 (aria-label="breadcrumb")
 * - BreadcrumbList: ol 기반 항목 목록
 * - BreadcrumbItem: 개별 li 항목
 * - BreadcrumbLink: 클릭 가능한 경로 링크 (asChild 지원)
 * - BreadcrumbPage: 현재 페이지 (클릭 불가, aria-current="page")
 * - BreadcrumbSeparator: 경로 구분자 (기본: ChevronRight)
 * - BreadcrumbEllipsis: 중간 경로 생략 표시 (...)
 */

import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

/**
 * 브레드크럼 루트 nav 요소.
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">홈</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>현재 페이지</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )
}

/** 브레드크럼 항목 목록 — flex-wrap으로 긴 경로가 자동 줄바꿈됩니다. */
function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

/** 개별 브레드크럼 항목 — BreadcrumbLink나 BreadcrumbPage를 감쌉니다. */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

/**
 * 클릭 가능한 브레드크럼 경로 링크.
 *
 * @param asChild - true이면 Radix Slot으로 렌더링 (Next.js Link 등에 스타일 합성 가능)
 *
 * @example
 * ```tsx
 * // Next.js Link 컴포넌트에 브레드크럼 스타일 적용
 * <BreadcrumbLink asChild>
 *   <Link href="/products">제품</Link>
 * </BreadcrumbLink>
 * ```
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  /** true이면 Radix Slot으로 렌더링 — Link 등 자식 컴포넌트에 스타일 합성 */
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
}

/**
 * 현재 페이지를 나타내는 브레드크럼 항목.
 *
 * `aria-current="page"`로 스크린 리더에 현재 위치를 전달합니다.
 * 클릭 및 링크 기능이 없는 비활성 상태입니다.
 */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  )
}

/**
 * 브레드크럼 경로 구분자.
 *
 * children을 전달하지 않으면 기본값으로 ChevronRight 아이콘이 표시됩니다.
 * `aria-hidden="true"`로 스크린 리더에서 무시됩니다.
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? (
        <ChevronRightIcon />
      )}
    </li>
  )
}

/**
 * 중간 경로 생략 표시 컴포넌트.
 *
 * 경로가 길어 중간을 생략할 때 "..." 아이콘으로 표시합니다.
 * 클릭 시 생략된 경로를 펼치는 드롭다운과 함께 사용합니다.
 */
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-5 items-center justify-center [&>svg]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon
      />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
