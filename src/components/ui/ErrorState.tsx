import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  compact?: boolean;
}

export function ErrorState({
  title = 'حدث خطأ',
  description = 'تعذّر تحميل البيانات. يرجى المحاولة مرة أخرى.',
  onRetry,
  retryLabel = 'إعادة المحاولة',
  compact = false,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center text-center gap-3 ${
        compact ? 'py-8' : 'py-16'
      }`}
    >
      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
        <AlertCircle className="w-6 h-6 text-red-500" aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted max-w-xs">{description}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />} onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
