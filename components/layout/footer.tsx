/**
 * @fileoverview 사이트 하단 푸터 컴포넌트.
 *
 * 프로젝트에서 사용하는 기술 스택 배지와 저작권 정보를 표시합니다.
 * Server Component로 동작합니다.
 */

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/** 기술 스택 목록 — 배지 레이블과 공식 문서 링크로 구성 */
const techStack = [
  { label: "Next.js 16", href: "https://nextjs.org" },
  { label: "React 19", href: "https://react.dev" },
  { label: "TypeScript", href: "https://www.typescriptlang.org" },
  { label: "TailwindCSS v4", href: "https://tailwindcss.com" },
  { label: "ShadcnUI", href: "https://ui.shadcn.com" },
];

/**
 * 사이트 하단 푸터.
 *
 * 기술 스택 배지와 저작권 연도를 표시합니다.
 * 연도는 빌드 시점이 아닌 렌더링 시점의 현재 연도를 사용합니다.
 *
 * @example
 * ```tsx
 * // app/layout.tsx 에서 사용
 * <Footer />
 * ```
 */
export function Footer() {
  // 빌드 캐시 없이 렌더링 시마다 현재 연도를 반환
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4">
          {/* 기술 스택 배지 */}
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <a
                key={tech.label}
                href={tech.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/70 transition-colors"
                >
                  {tech.label}
                </Badge>
              </a>
            ))}
          </div>
          <Separator className="max-w-xs" />
          <p className="text-center text-xs text-muted-foreground">
            © {currentYear} Next Starter Kit. 모던 웹 개발을 위한 스타터킷.
          </p>
        </div>
      </div>
    </footer>
  );
}
