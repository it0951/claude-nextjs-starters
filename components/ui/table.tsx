/**
 * @fileoverview HTML 테이블 래퍼 컴포넌트 모음.
 *
 * 반응형 스크롤과 ShadcnUI 스타일을 적용한 테이블 컴포넌트 세트입니다.
 * 외부 div 래퍼가 overflow-x-auto를 처리하므로 모바일에서 가로 스크롤이 지원됩니다.
 *
 * 구성 컴포넌트:
 * - Table: 루트 (overflow-x-auto 래퍼 포함)
 * - TableHeader: thead 요소
 * - TableBody: tbody 요소
 * - TableFooter: tfoot 요소
 * - TableRow: tr 요소 (hover 및 선택 상태 스타일)
 * - TableHead: th 요소 (헤더 셀)
 * - TableCell: td 요소 (데이터 셀)
 * - TableCaption: caption 요소
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * 반응형 테이블 컴포넌트.
 *
 * 외부 div가 `overflow-x-auto`를 처리하여 모바일에서 가로 스크롤을 지원합니다.
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>이름</TableHead>
 *       <TableHead>역할</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>홍길동</TableCell>
 *       <TableCell>개발자</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

/** 테이블 헤더 영역 — 내부 TableRow 하단에 구분선이 자동으로 적용됩니다. */
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

/** 테이블 본문 — 마지막 행의 하단 구분선은 자동으로 제거됩니다. */
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

/** 테이블 푸터 — 합계·요약 정보 표시에 사용합니다. muted 배경으로 강조됩니다. */
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * 테이블 행.
 *
 * hover 시 muted 배경이 적용됩니다.
 * `data-[state=selected]`로 선택 상태 스타일을 제어할 수 있습니다.
 */
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

/** 테이블 헤더 셀 (th) — whitespace-nowrap으로 헤더 텍스트가 줄바꿈되지 않습니다. */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

/** 테이블 데이터 셀 (td) — whitespace-nowrap으로 셀 내용이 줄바꿈되지 않습니다. */
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

/** 테이블 캡션 — 테이블 하단에 표시되는 설명 텍스트 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
