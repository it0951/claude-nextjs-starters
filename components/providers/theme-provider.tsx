"use client"

/**
 * @fileoverview next-themes ThemeProvider 래퍼 컴포넌트.
 *
 * next-themes의 ThemeProvider를 그대로 위임하며,
 * Provider 계층에서 다크모드 전환 컨텍스트를 제공합니다.
 * layout.tsx의 Provider 중첩 최상단에 위치해야 합니다.
 */

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ComponentProps } from "react"

/**
 * next-themes ThemeProvider 래퍼.
 *
 * `attribute="class"` prop을 전달하면 Tailwind의 dark 클래스 전략과 연동됩니다.
 * 모든 props를 next-themes ThemeProvider에 그대로 전달합니다.
 *
 * @param children - 테마 컨텍스트를 공유할 하위 컴포넌트 트리
 * @param props - next-themes ThemeProvider에 전달할 추가 props
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
 *   {children}
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
