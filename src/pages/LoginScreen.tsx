import { useState } from 'react';
import type { Screen } from '../utils/mock';

interface Props {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: Props) {
  const [institution, setInstitution] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#F5F7FA' }}>
      {/* Left panel — network illustration */}
      <div style={{
        width: '42%',
        background: '#14243A',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: '48px',
      }}>
        {/* Abstract network SVG */}
        <svg
          viewBox="0 0 500 600"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.22 }}
          aria-hidden
        >
          {/* Stable nodes */}
          {[
            [120, 90], [240, 140], [360, 80], [80, 220], [200, 280],
            [340, 220], [440, 160], [140, 380], [300, 350], [420, 320],
            [80, 490], [200, 460], [360, 480], [460, 440],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 18 : 12} fill={i % 4 === 0 ? '#D84C4C' : i % 3 === 0 ? '#D99A27' : '#168568'} opacity={0.8} />
          ))}
          {/* Edges */}
          {[
            [120, 90, 240, 140], [240, 140, 360, 80], [240, 140, 200, 280],
            [80, 220, 200, 280], [200, 280, 340, 220], [340, 220, 440, 160],
            [360, 80, 440, 160], [200, 280, 300, 350], [300, 350, 420, 320],
            [140, 380, 300, 350], [80, 490, 200, 460], [200, 460, 360, 480],
            [360, 480, 460, 440], [140, 380, 80, 490], [420, 320, 460, 440],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#CBD5E1" strokeWidth="1.5" opacity={0.5} />
          ))}
        </svg>

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, #14243A 40%, rgba(20,36,58,0.4) 100%)',
        }} />

        {/* Bottom text */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}>
            Network Financial Intelligence
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.25, letterSpacing: '-0.02em', maxWidth: 320 }}>
            Detect stress before it becomes a crisis.
          </div>
          <div style={{ marginTop: 16, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 340 }}>
            Group-based early-warning intelligence for microfinance institutions.
          </div>

          <div style={{ marginTop: 40, display: 'flex', gap: 24 }}>
            {[['1,248', 'Borrowers monitored'], ['91%', 'Group resilience'], ['17', 'Active alerts']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{v}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
      }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: '#3157D5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#182230', letterSpacing: '-0.01em' }}>StressNet</div>
              <div style={{ fontSize: 10, color: '#687588', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Institutional Platform</div>
            </div>
          </div>

          <div style={{ marginBottom: 8, fontSize: 24, fontWeight: 700, color: '#182230', letterSpacing: '-0.02em' }}>
            Sign in to continue
          </div>
          <div style={{ marginBottom: 32, fontSize: 14, color: '#687588' }}>
            Institutional access to network financial intelligence.
          </div>

          {/* Fields */}
          {[
            { label: 'Institution ID', value: institution, set: setInstitution, placeholder: 'MFA-2024-001', type: 'text' },
            { label: 'Email or Username', value: username, set: setUsername, placeholder: 'analyst@institution.org', type: 'email' },
            { label: 'Password', value: password, set: setPassword, placeholder: '••••••••••', type: 'password' },
          ].map(({ label, value, set, placeholder, type }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#182230', marginBottom: 6 }}>{label}</label>
              <input
                type={type}
                value={value}
                onChange={e => set(e.target.value)}
                placeholder={placeholder}
                style={{
                  width: '100%',
                  height: 40,
                  padding: '0 12px',
                  border: '1px solid #E3E8EF',
                  borderRadius: 8,
                  fontSize: 14,
                  color: '#182230',
                  background: '#FFFFFF',
                  outline: 'none',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = '#3157D5')}
                onBlur={e => (e.target.style.borderColor = '#E3E8EF')}
              />
            </div>
          ))}

          <button
            onClick={onLogin}
            style={{
              width: '100%',
              height: 42,
              background: '#3157D5',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: 8,
              letterSpacing: '0.01em',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#2448C0')}
            onMouseLeave={e => (e.currentTarget.style.background = '#3157D5')}
          >
            Sign In
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, justifyContent: 'center' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#687588" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <span style={{ fontSize: 12, color: '#687588' }}>Secure institutional access • ISO 27001 compliant</span>
          </div>

          <div style={{ marginTop: 32, padding: '12px 16px', background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#92400E', marginBottom: 4 }}>SYSTEM ACCESS</div>
            <div style={{ fontSize: 12, color: '#B45309' }}>Sign In with any credentials to enter the simulation. All data is illustrative.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
