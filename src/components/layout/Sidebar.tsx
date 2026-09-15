import type { Screen } from '../../utils/mock';

interface NavItem {
  id: Screen;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'network', label: 'Investigation', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: 'attribution', label: 'Stress Attribution', icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z' },
  { id: 'immune-memory', label: 'History', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { id: 'intervention', label: 'Intervention Center', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'passport', label: 'Stress Passport', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
];

const bottomItems = [
  { label: 'Institution Profile', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { label: 'Sign Out', icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' },
];

interface Props {
  current: Screen;
  onNavigate: (s: Screen) => void;
  onSignOut: () => void;
}

export default function Sidebar({ current, onNavigate, onSignOut }: Props) {
  return (
    <aside
      style={{
        width: 232,
        minWidth: 232,
        background: '#14243A',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: '#3157D5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}>StressNet</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Risk Intelligence</div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ padding: '12px 10px', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.07em', textTransform: 'uppercase', padding: '8px 10px 6px' }}>
          Platform
        </div>
        {navItems.map((item) => {
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 10px',
                borderRadius: 8,
                border: 'none',
                background: active ? 'rgba(49,87,213,0.25)' : 'transparent',
                color: active ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                cursor: 'pointer',
                textAlign: 'left',
                marginBottom: 2,
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                }
              }}
            >
              {active && (
                <span style={{ position: 'absolute', left: 10, width: 3, height: 20, borderRadius: 99, background: '#3157D5' }} />
              )}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d={item.icon} />
              </svg>
              <span style={{ fontSize: 13 }}>{item.label}</span>
              {item.id === 'network' && (
                <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 600, background: 'rgba(216,76,76,0.25)', color: '#F87171', padding: '2px 7px', borderRadius: 99 }}>
                  17
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom items */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {bottomItems.map((item, i) => (
          <button
            key={item.label}
            onClick={i === 2 ? onSignOut : undefined}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 10px',
              borderRadius: 8,
              border: 'none',
              background: 'transparent',
              color: 'rgba(255,255,255,0.5)',
              fontSize: 13,
              cursor: 'pointer',
              textAlign: 'left',
              marginBottom: 2,
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
              (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              {item.icon.split(' M').map((d, idx) => (
                <path key={idx} d={idx === 0 ? d : 'M' + d} />
              ))}
            </svg>
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
