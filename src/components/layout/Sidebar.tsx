import type { Screen } from '../../utils/mock';
import {
  LayoutDashboard,
  Network,
  PieChart,
  History,
  ShieldAlert,
  FileBadge,
  Building2,
  Settings,
  LogOut,
  Zap,
} from 'lucide-react';
import type { ReactNode } from 'react';

interface NavItem {
  id: Screen;
  label: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={17} /> },
  { id: 'network', label: 'Investigation', icon: <Network size={17} /> },
  { id: 'attribution', label: 'Stress Attribution', icon: <PieChart size={17} /> },
  { id: 'immune-memory', label: 'History', icon: <History size={17} /> },
  { id: 'intervention', label: 'Intervention Center', icon: <ShieldAlert size={17} /> },
  { id: 'passport', label: 'Stress Passport', icon: <FileBadge size={17} /> },
];

interface Props {
  current: Screen;
  onNavigate: (s: Screen) => void;
  onSignOut: () => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
}

export default function Sidebar({ current, onNavigate, onSignOut, onOpenProfile, onOpenSettings }: Props) {
  const bottomItems = [
    { label: 'Institution Profile', icon: <Building2 size={17} />, action: onOpenProfile },
    { label: 'Settings', icon: <Settings size={17} />, action: onOpenSettings },
    { label: 'Sign Out', icon: <LogOut size={17} />, action: onSignOut },
  ];

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
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: '#3157D5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Zap size={18} color="#FFFFFF" fill="#FFFFFF" />
          </div>
          <div>
            <div style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}>StressNet</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Risk Intelligence
            </div>
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
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                }
              }}
            >
              {active && (
                <span
                  style={{
                    position: 'absolute',
                    left: 2,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 3,
                    height: 18,
                    borderRadius: 99,
                    background: '#3157D5',
                  }}
                />
              )}
              <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {item.icon}
              </span>
              <span style={{ fontSize: 13 }}>{item.label}</span>
              {item.id === 'network' && (
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: 10,
                    fontWeight: 600,
                    background: 'rgba(216,76,76,0.25)',
                    color: '#F87171',
                    padding: '2px 7px',
                    borderRadius: 99,
                  }}
                >
                  17
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom items */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {bottomItems.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 10px',
              borderRadius: 8,
              border: 'none',
              background: 'transparent',
              color: 'rgba(255,255,255,0.55)',
              fontSize: 13,
              cursor: 'pointer',
              textAlign: 'left',
              marginBottom: 2,
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
              (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)';
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
