# ROADMAP 완료 항목 업데이트

`docs/ROADMAP.md`를 읽고, 현재 코드베이스 상태를 분석하여 완료된 태스크를 체크하고 상태를 기록한다.

## 실행 절차

### 1단계: 현재 상태 파악

아래 항목들을 병렬로 확인한다.

**파일 존재 여부 확인 (Glob/Bash)**
- `middleware.ts` — 라우트 보호 미들웨어
- `app/api/auth/[...nextauth]/route.ts` — NextAuth 라우트 핸들러
- `lib/auth/config.ts` — Auth.js 설정
- `lib/auth/verify.ts` — bcrypt 비교 로직
- `lib/auth/actions.ts` — 로그아웃 Server Action
- `types/next-auth.d.ts` — 세션 타입 확장
- `lib/notion/client.ts` — Notion 클라이언트
- `lib/notion/mappers.ts` — DTO 변환 헬퍼
- `lib/notion/cache.ts` — 토큰 캐시
- `lib/notion/retry.ts` — 지수 백오프 재시도
- `lib/dal/invoices.ts` — DAL 구현체
- `lib/pdf/fonts.ts` — 폰트 등록 유틸
- `lib/pdf/invoice-pdf.tsx` — PDF 레이아웃 컴포넌트
- `app/(admin)/dashboard/_components/invoice-table.tsx`
- `app/(admin)/dashboard/_components/share-dialog.tsx`
- `app/(admin)/dashboard/_components/revoke-dialog.tsx`
- `app/(admin)/dashboard/page.tsx`
- `app/(client)/invoice/[token]/page.tsx`
- `app/(client)/invoice/[token]/_components/invoice-header.tsx`
- `app/(client)/invoice/[token]/_components/invoice-items-table.tsx`
- `app/(client)/invoice/[token]/_components/invoice-footer.tsx`
- `app/(client)/invoice/[token]/_components/download-button.tsx`
- `app/api/invoices/route.ts`
- `app/api/share/route.ts`
- `app/api/invoice/[token]/route.ts`
- `app/api/invoice/[token]/pdf/route.ts`
- `app/error.tsx`
- `app/not-found.tsx`
- `public/fonts/NotoSansKR-Regular.ttf`
- `docs/spikes/react-pdf-react19.md`
- `docs/spikes/notion-cache.md`
- `docs/notion-schema.md`
- `.env.local`

**패키지 설치 여부 확인 (package.json)**
- `next-auth`
- `@notionhq/client`
- `@react-pdf/renderer`
- `bcrypt`
- `uuid`

**구현 완료 여부 확인 (파일 내용 검사)**
- `lib/notion/client.ts`: `throw` 없이 실제 `Client(` 인스턴스 생성 여부
- `lib/dal/invoices.ts`: 함수별로 `throw new Error("not implemented")` 제거 여부
- `app/login/page.tsx`: Mock `setTimeout` 제거 후 `signIn("credentials"` 호출 여부
- `app/(admin)/dashboard/page.tsx`: "구현 예정" 문구 제거 여부
- `app/(client)/invoice/[token]/page.tsx`: "구현 예정" 문구 제거 여부
- `app/api/invoices/route.ts`: 501 반환 제거 여부
- `app/api/share/route.ts`: 501 반환 제거 여부
- `app/api/invoice/[token]/route.ts`: 501 반환 제거 여부
- `components/layout/navbar.tsx`: `signOut` 또는 로그아웃 버튼 포함 여부

### 2단계: ROADMAP.md 업데이트 규칙

확인 결과를 바탕으로 `docs/ROADMAP.md`를 수정한다.

**체크박스 업데이트**
- 완료 확인된 항목: `- [ ]` → `- [x]`
- 미완료 항목: 변경 없음
- 이미 `[x]`인 항목: 변경 없음

**스프린트 상태 업데이트** (각 스프린트 헤더의 `**상태**:` 필드)
- 해당 스프린트 태스크가 **모두 완료**: `미착수` 또는 `진행중` → `완료`
- 해당 스프린트 태스크가 **일부 완료**: `미착수` → `진행중`, `완료` → `완료` (그대로)
- 해당 스프린트 태스크가 **하나도 완료 안 됨**: 변경 없음

**마일스톤 테이블 상태 업데이트** (상태 컬럼)
- 해당 마일스톤의 모든 스프린트가 완료: `미착수` → `완료`
- 일부만 완료: `미착수` → `진행중`

**"현재 프로젝트 상태" 섹션 업데이트**
- `## 현재 프로젝트 상태` 섹션의 날짜를 오늘 날짜로 갱신
- 새로 완료된 항목을 `### 완료된 항목` 아래 `[x]`로 이동
- 아직 미완료인 항목은 `### 미구현 항목`에 그대로 유지

**문서 헤더 갱신**
- `> 최종 업데이트:` 날짜를 오늘 날짜(YYYY-MM-DD)로 업데이트

### 3단계: 변경 요약 출력

업데이트 완료 후 다음 형식으로 변경 내용을 한국어로 보고한다.

```
## ROADMAP 업데이트 완료

**날짜**: YYYY-MM-DD

### 새로 완료된 항목 (N개)
- [Sprint X] 태스크명
- ...

### 스프린트 상태 변경
- Sprint X: 미착수 → 진행중
- ...

### 남은 미완료 항목 (N개)
- [Sprint X] 태스크명
- ...
```

## 주의사항

- 파일이 존재하더라도 내용이 스켈레톤(throw, 501, "구현 예정")이면 미완료로 판단한다.
- `.env.local` 파일은 존재 여부만 확인하며 내용은 읽지 않는다(보안).
- 완료 여부가 불분명한 항목은 미완료로 보수적으로 처리하고 보고 시 언급한다.
- `docs/ROADMAP.md`에 이미 `[x]`로 표시된 항목은 되돌리지 않는다.
