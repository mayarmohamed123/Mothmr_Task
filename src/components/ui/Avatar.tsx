import Image from 'next/image';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = { sm: 32, md: 40, lg: 48, xl: 64 };

export function Avatar({ src, alt, size = 'md', className = '' }: AvatarProps) {
  const px = sizeMap[size];
  return (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 border-2 border-border ${className}`}
      style={{ width: px, height: px }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${px}px`}
        className="object-cover"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    </div>
  );
}
