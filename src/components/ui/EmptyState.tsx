import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  compact?: boolean;
}

export function EmptyState({
  title = 'لا توجد نتائج',
  description = 'لم يتم العثور على أي بيانات.',
  icon,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center gap-3 ${
        compact ? 'py-8' : 'py-16'
      }`}
    >
      <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center">
        {icon ?? <SearchX className="w-6 h-6 text-muted" aria-hidden="true" />}
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted max-w-xs">{description}</p>
      </div>
    </div>
  );
}
