import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 flex flex-col items-center justify-center text-center gap-6">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ background: '#F97316' + '20' }}
      >
        <AlertTriangle className="w-10 h-10" style={{ color: '#F97316' }} aria-hidden="true" />
      </div>
      <div>
        <h1 className="text-4xl font-extrabold mb-2" style={{ color: 'var(--foreground)' }}>
          404
        </h1>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
          الصفحة غير موجودة
        </h2>
        <p style={{ color: 'var(--muted)' }} className="text-sm max-w-xs">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
      </div>
      <Link
        href="/ads"
        className="px-6 py-3 rounded-xl text-white font-semibold text-sm
          transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
        style={{ background: '#F97316' }}
      >
        العودة للإعلانات
      </Link>
    </div>
  );
}
