interface Props {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
  onClick?: () => void;
}

export default function KPICard({ label, value, sub, accent, trend, trendLabel, onClick }: Props) {
  const trendColor = trend === 'up' ? '#D84C4C' : trend === 'down' ? '#168568' : '#687588';
  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';

  return (
    <div
      onClick={onClick}
      style={{
        background: '#FFFFFF',
        border: '1px solid #E3E8EF',
        borderRadius: 12,
        padding: '20px 24px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.15s, border-color 0.15s',
      }}
      className={onClick ? 'hover:shadow-sm' : ''}
      onMouseEnter={e => {
        if (onClick) {
          (e.currentTarget as HTMLElement).style.borderColor = '#3157D5';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 3px rgba(49,87,213,0.08)';
        }
      }}
      onMouseLeave={e => {
        if (onClick) {
          (e.currentTarget as HTMLElement).style.borderColor = '#E3E8EF';
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 600, color: '#687588', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: sub ? 6 : 0 }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: accent ?? '#182230', lineHeight: 1, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
          {value}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
        {sub && <span style={{ fontSize: 12, color: '#687588' }}>{sub}</span>}
        {trendLabel && (
          <span style={{ fontSize: 12, color: trendColor, fontWeight: 600 }}>
            {trendIcon} {trendLabel}
          </span>
        )}
      </div>
    </div>
  );
}
