type Platform = 'web' | 'ios' | 'android';

interface PlatformBadgeProps {
  platforms: readonly Platform[];
}

const PLATFORM_CONFIG: Record<Platform, { label: string; color: string; bg: string }> = {
  web:     { label: 'Web',     color: '#00425F', bg: 'rgba(0,66,95,0.08)' },
  ios:     { label: 'iOS',     color: '#6d28d9', bg: 'rgba(109,40,217,0.08)' },
  android: { label: 'Android', color: '#15803d', bg: 'rgba(21,128,61,0.08)' },
};

export function PlatformBadge({ platforms }: PlatformBadgeProps) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {platforms.map((platform) => {
        const cfg = PLATFORM_CONFIG[platform];
        return (
          <span
            key={platform}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '3px 10px',
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'var(--switch-typography-font-family-sans)',
              color: cfg.color,
              background: cfg.bg,
            }}
          >
            {platform === 'web' && '🌐'}
            {platform === 'ios' && ''}
            {platform === 'android' && '🤖'}
            {cfg.label}
          </span>
        );
      })}
    </div>
  );
}
