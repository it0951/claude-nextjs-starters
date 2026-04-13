"use client"

/**
 * @fileoverview Radix UI 기반 아바타 컴포넌트 모음.
 *
 * Avatar를 루트로 하여 이미지, 폴백, 뱃지, 그룹 표시를 지원합니다.
 *
 * 구성 컴포넌트:
 * - Avatar: 루트 컨테이너 (크기: sm/default/lg)
 * - AvatarImage: 실제 프로필 이미지
 * - AvatarFallback: 이미지 로드 실패 시 표시할 텍스트/아이콘
 * - AvatarBadge: 아바타 우하단 상태 표시 뱃지
 * - AvatarGroup: 여러 아바타를 겹쳐 표시하는 그룹 컨테이너
 * - AvatarGroupCount: 그룹에서 초과 인원 수를 표시하는 요소
 */

import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * 아바타 루트 컨테이너.
 *
 * 원형 마스크와 테두리를 제공하며 내부 AvatarImage/AvatarFallback을 감쌉니다.
 *
 * @param size - 아바타 크기 (sm: 24px, default: 32px, lg: 40px)
 *
 * @example
 * ```tsx
 * <Avatar size="lg">
 *   <AvatarImage src="/profile.jpg" alt="홍길동" />
 *   <AvatarFallback>홍</AvatarFallback>
 * </Avatar>
 * ```
 */
function Avatar({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  /** 아바타 크기 (sm: 24px | default: 32px | lg: 40px) */
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
        className
      )}
      {...props}
    />
  )
}

/**
 * 아바타 이미지.
 *
 * 이미지 로드에 실패하거나 src가 없을 때 자동으로 AvatarFallback을 표시합니다.
 *
 * @param src - 이미지 URL
 * @param alt - 접근성을 위한 대체 텍스트 (필수)
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      {...props}
    />
  )
}

/**
 * 이미지 로드 실패 시 표시되는 폴백 요소.
 *
 * 사용자 이름의 첫 글자나 아이콘을 표시합니다.
 * Radix가 이미지 로드 성공 여부를 감지하여 표시 여부를 자동 제어합니다.
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className
      )}
      {...props}
    />
  )
}

/**
 * 아바타 우하단에 표시되는 상태 뱃지.
 *
 * 온라인/오프라인 상태, 알림 카운트 등을 표시하는 데 사용합니다.
 * Avatar의 size prop에 따라 뱃지 크기도 자동으로 조정됩니다.
 */
function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * 여러 아바타를 일부 겹쳐서 표시하는 그룹 컨테이너.
 *
 * 내부 Avatar에 자동으로 ring 테두리를 추가하여 겹침 효과를 만듭니다.
 *
 * @example
 * ```tsx
 * <AvatarGroup>
 *   <Avatar><AvatarImage src="/user1.jpg" alt="사용자1" /></Avatar>
 *   <Avatar><AvatarImage src="/user2.jpg" alt="사용자2" /></Avatar>
 *   <AvatarGroupCount>+3</AvatarGroupCount>
 * </AvatarGroup>
 * ```
 */
function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

/**
 * AvatarGroup에서 표시되지 않은 초과 인원 수를 나타내는 요소.
 *
 * AvatarGroup 내 Avatar의 size에 따라 크기가 자동으로 맞춰집니다.
 *
 * @example
 * ```tsx
 * <AvatarGroupCount>+5</AvatarGroupCount>
 * ```
 */
function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
