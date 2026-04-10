# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 명령어

```bash
npm run dev      # 개발 서버 (0.0.0.0:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint 검사
```

개발 서버가 이미 실행 중이면 포트 3001, 3002 순으로 자동 증가. 충돌 시 `.next/dev/lock` 삭제.  
캐시 오류(Turbopack panic)가 발생하면 `.next/` 디렉터리 전체 삭제 후 재시작.

## 기술 스택

| 항목 | 버전 / 패키지 |
|------|--------------|
| Next.js | 16.2.3 (Turbopack, App Router) |
| React | 19.2.4 |
| TailwindCSS | v4 (CSS-first 설정, `@import "tailwindcss"`) |
| UI 컴포넌트 | ShadcnUI (`radix-ui` 기반) |
| 폼 | react-hook-form + `@hookform/resolvers` + Zod v4 |
| 서버 상태 | TanStack React Query v5 |
| 토스트 | Sonner v2 |
| 다크모드 | next-themes |

## 아키텍처

```
app/
  layout.tsx      # 루트 레이아웃: ThemeProvider → QueryProvider → TooltipProvider → Navbar/main/Footer/Toaster
  page.tsx        # 클라이언트 컴포넌트("use client"), 전체 UI 쇼케이스
  globals.css     # TailwindCSS v4 진입점 + ShadcnUI 디자인 토큰 CSS 변수

components/
  layout/         # Navbar, Footer
  providers/      # ThemeProvider(next-themes), QueryProvider(React Query)
  ui/             # ShadcnUI 컴포넌트 (30개+)
```

**Provider 중첩 순서** (layout.tsx): `ThemeProvider > QueryProvider > TooltipProvider`

**스타일**: TailwindCSS v4는 `tailwind.config.ts` 없이 `globals.css`의 `@theme inline { ... }` 블록으로 토큰 정의.  
다크모드 variant: `@custom-variant dark (&:is(.dark *))` (class 전략).

## 주요 주의사항

- **`allowedDevOrigins`**: `next.config.ts`에 IP 고정 (`192.168.41.157`). 네트워크 환경 변경 시 수정 필요.
- **ShadcnUI import**: `radix-ui` 단일 패키지(`@radix-ui/*` 개별 패키지 아님).
- **Zod**: v4 API 사용 (`z.string().min()` 등 동일하나 일부 유틸 변경됨 — 공식 마이그레이션 가이드 확인).
- **`any` 타입 사용 금지**.
