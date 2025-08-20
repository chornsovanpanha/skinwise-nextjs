"use client";
import ErrorPlaceHolder from "@/components/custom/layout/ErrorPlaceholder";
import FullWidthLayout from "@/components/custom/layout/FullWidthLayout";
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const handleRetry = () => {
    startTransition(() => {
      reset();
      router.refresh();
    });
  };
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <FullWidthLayout>
      <ErrorPlaceHolder onClick={handleRetry} message={error.message} />
    </FullWidthLayout>
  );
}
