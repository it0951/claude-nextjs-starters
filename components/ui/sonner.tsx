"use client"

/**
 * @fileoverview Sonner v2 토스트 알림 컴포넌트.
 *
 * next-themes와 연동하여 현재 테마(light/dark/system)를 자동 반영합니다.
 * ShadcnUI 디자인 시스템의 CSS 변수를 재정의하여 일관된 스타일을 적용합니다.
 */

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

/**
 * next-themes 연동 토스트 알림 컴포넌트.
 *
 * `useTheme()`로 현재 테마를 읽어 Sonner에 전달합니다.
 * 아이콘과 CSS 변수를 커스터마이징하여 프로젝트 디자인 시스템에 맞춥니다.
 * app/layout.tsx에 단 한 번만 배치합니다.
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * <Toaster richColors position="bottom-right" />
 *
 * // 사용 시 (sonner의 toast 함수 직접 호출)
 * import { toast } from "sonner"
 * toast.success("저장 완료")
 * toast.error("오류가 발생했습니다")
 * ```
 */
const Toaster = ({ ...props }: ToasterProps) => {
  // resolvedTheme 대신 theme을 사용: Sonner가 "system"을 자체 처리함
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        // lucide-react 아이콘으로 커스텀 — Sonner 기본 아이콘 대체
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          // ShadcnUI CSS 변수를 Sonner 내부 토큰에 매핑하여 테마 일관성 유지
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
