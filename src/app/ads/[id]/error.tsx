'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center justify-center text-center gap-6">
      <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-orange-500" aria-hidden="true" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-foreground mb-2">حدث خطأ</h1>
        <p className="text-muted max-w-sm">
          تعذّر تحميل الإعلان. يرجى المحاولة مرة أخرى أو العودة لاحقًا.
        </p>
      </div>
      <Button
        onClick={reset}
        variant="primary"
        leftIcon={<RefreshCw className="w-4 h-4" />}
      >
        إعادة المحاولة
      </Button>
    </div>
  );
}
