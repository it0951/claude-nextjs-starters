"use client";

import { useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Invoice } from "@/types/invoice";

interface RevokeDialogProps {
  invoice: Invoice;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 회수 성공 후 목록 갱신을 위한 콜백 */
  onSuccess: () => void;
}

/**
 * 공유 링크 회수 확인 다이얼로그
 * - alert-dialog 대신 dialog를 활용한 확인 UI
 * - 확인 후 DELETE /api/share 호출
 */
export function RevokeDialog({
  invoice,
  open,
  onOpenChange,
  onSuccess,
}: RevokeDialogProps) {
  /** 회수 요청 로딩 상태 */
  const [isLoading, setIsLoading] = useState(false);

  /** 공유 링크 회수 요청 */
  async function handleRevoke() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/share", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: invoice.id }),
      });

      if (!res.ok) {
        throw new Error("공유 링크 회수 실패");
      }

      toast.success("공유 링크가 회수되었습니다");
      onSuccess();
      onOpenChange(false);
    } catch {
      toast.error("공유 링크 회수에 실패했습니다");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            공유 링크 회수
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-2 pt-1">
              <p>
                <span className="font-medium text-foreground">
                  {invoice.title}
                </span>{" "}
                견적서의 공유 링크를 회수하시겠습니까?
              </p>
              <p className="text-sm text-destructive">
                회수 후에는 기존 링크로 더 이상 접근할 수 없습니다. 이 작업은
                되돌릴 수 없습니다.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            취소
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleRevoke}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                회수 중...
              </>
            ) : (
              "회수"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
