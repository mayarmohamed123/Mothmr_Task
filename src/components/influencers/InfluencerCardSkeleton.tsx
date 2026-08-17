import { Skeleton } from '@/components/ui/Skeleton';

export function InfluencerCardSkeleton() {
  return (
    <div
      className="rounded-2xl border border-border overflow-hidden flex flex-col"
      style={{ background: 'var(--card)' }}
      aria-hidden="true"
    >
      <Skeleton className="h-24 rounded-none" />
      <div className="px-4 pt-0 pb-4">
        <div className="-mt-8 mb-3">
          <Skeleton className="w-16 h-16 rounded-2xl" />
        </div>
        <Skeleton className="h-5 w-32 mb-1" />
        <Skeleton className="h-3 w-24 mb-3" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-4/5 mb-4" />
        <div className="grid grid-cols-3 gap-2 mb-4">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
        <div className="flex gap-1 mb-3">
          {Array.from({ length: 5 }, (_, i) => <Skeleton key={i} className="w-3.5 h-3.5 rounded" />)}
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-border">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
