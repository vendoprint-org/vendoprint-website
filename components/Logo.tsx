'use client';

interface LogoProps {
  variant?: 'default' | 'reversed' | 'mono';
  showWordmark?: boolean;
  className?: string;
  iconSize?: number;
}

export function Logo({
  variant = 'default',
  showWordmark = true,
  className = '',
  iconSize = 40,
}: LogoProps) {
  const isDark = variant === 'reversed';
  const isMono = variant === 'mono';

  const strokeColor = isDark ? '#F8F9FA' : '#0D0F14';
  const fillColor = isDark ? '#F8F9FA' : '#0D0F14';
  const accent = isMono ? '#0D0F14' : '#F57C20';
  const bgFill = isDark ? '#0D0F14' : '#F8F9FA';
  const textLines = isDark ? '#0D0F14' : '#F8F9FA';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Kiosk Emblem */}
      <svg
        width={iconSize}
        height={iconSize * (124 / 132)}
        viewBox="0 0 132 124"
        style={{ overflow: 'visible', display: 'block' }}
        aria-hidden="true"
      >
        <rect
          x="6" y="6" width="120" height="112" rx="26"
          fill="none" stroke={strokeColor} strokeWidth="11"
        />
        <rect x="30" y="32" width="46" height="9" rx="4.5" fill={fillColor} />
        <circle cx="96" cy="36" r="8" fill={accent} />
        <rect x="30" y="66" width="72" height="11" rx="5.5" fill={fillColor} />
        <path
          d="M48 77 H84 V138 L73 149 H48 Z"
          fill={bgFill} stroke={bgFill} strokeWidth="10"
        />
        <path d="M48 77 H84 V138 L73 149 H48 Z" fill={accent} />
        <path d="M84 138 L73 138 L73 149 Z" fill="#B35A00" />
        <rect x="56" y="94" width="18" height="5" rx="2.5" fill={textLines} />
        <rect x="56" y="105" width="11" height="5" rx="2.5" fill={textLines} />
      </svg>

      {/* Wordmark */}
      {showWordmark && (
        <span className="font-sora font-extrabold text-xl md:text-2xl tracking-tight leading-none">
          <span className={isDark ? 'text-brand-cream' : 'text-brand-black'}>
            VENDO
          </span>
          <span className={isMono ? 'text-brand-black' : 'text-brand-orange'}>
            PRINT
          </span>
        </span>
      )}
    </div>
  );
}

export function LogoIcon({ size = 46, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`bg-brand-orange rounded-[20px] flex items-center justify-center ${className}`}
      style={{ width: size * 1.83, height: size * 1.83 }}
    >
      <svg
        width={size}
        height={size * (124 / 132)}
        viewBox="0 0 132 124"
        style={{ display: 'block' }}
      >
        <rect
          x="6" y="6" width="120" height="112" rx="26"
          fill="none" stroke="#FFFFFF" strokeWidth="11"
        />
        <rect x="30" y="32" width="46" height="9" rx="4.5" fill="#FFFFFF" />
        <circle cx="96" cy="36" r="8" fill="#FFFFFF" />
        <rect x="30" y="66" width="72" height="11" rx="5.5" fill="#FFFFFF" />
        <path d="M48 77 H84 V112 L73 123 H48 Z" fill="#FFFFFF" />
      </svg>
    </div>
  );
}
