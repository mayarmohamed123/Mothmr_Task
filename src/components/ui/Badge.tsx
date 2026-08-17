import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
  variant?: 'solid' | 'soft';
}

export function Badge({ children, color = '#F97316', className = '', variant = 'soft' }: BadgeProps) {
  const style =
    variant === 'solid'
      ? { backgroundColor: color, color: '#fff' }
      : {
          backgroundColor: `${color}20`,
          color,
          borderColor: `${color}40`,
        };

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}
