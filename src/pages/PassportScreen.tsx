import { useState } from 'react';
import { borrowers } from '../utils/mock';
import type { Screen } from '../utils/mock';
import type { PassportEvent } from '../App';
import { FileBadge, Check, X, Loader2, CheckCircle2, Shield, Lock } from 'lucide-react';

interface Props {
  onNavigate: (s: Screen) => void;
  passportEvents: PassportEvent[];
}

const passportMeta = [
  { label: 'Record Status', value: 'Verified', color: '#168568', bg: '#DCFCE7' },
  { label: 'Record Type', value: 'Prototype Only', color: '#168568', bg: '#DCFCE7' },
  { label: 'Privacy Status', value: 'Protected', color: '#3157D5', bg: '#EEF2FF' },
  { label: 'Participating Institution', value: 'MicroFinance Alliance', color: '#182230', bg: '#F8FAFC' },
  { label: 'Last Recorded Event', value: 'Sep 2026', color: '#182230', bg: '#F8FAFC' },
];

const crossLenderChecks = [
  { label: 'Verification Requested', status: true },
  { label: 'Conceptual Record — Prototype Only', status: true },
  { label: 'Raw Financial Data Exposed', status: false },
];

const outcomeColor: Record<string, string> = {
  Recovered: '#168568',
  Monitoring: '#D99A27',
  Active: '#D84C4C',
};

const outcomeBackground: Record<string, string> = {
  Recovered: '#DCFCE7',
  Monitoring: '#FEF3C7',
  Active: '#FEE2E2',
};

export default function PassportScreen({ onNavigate: _onNavigate, passportEvents }: Props) {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const borrower = borrowers.find(b => b.id === 'G07-A1')!;

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 2200);
  };

  return (
    <div style={{ padding: '28px 32px', overflowY: 'auto', flex: 1 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#182230', letterSpacing: '-0.02em', margin: 0 }}>
          Conceptual Stress Passport
        </h1>
        <p style={{ fontSize: 13, color: '#687588', margin: '3px 0 0' }}>
          Portable stress record for Group G-07. Tracks verified events, interventions, and recovery outcomes.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 20 }}>
        {/* Left: Passport card + metadata */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Passport card */}
          <div style={{ background: '#14243A', borderRadius: 14, padding: '24px', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
            {/* Decorative grid */}
            <svg style={{ position: 'absolute', inset: 0, opacity: 0.06 }} viewBox="0 0 340 200" aria-hidden>
              {Array.from({ length: 8 }, (_, i) => (
                <line key={`v${i}`} x1={i * 48} y1="0" x2={i * 48} y2="200" stroke="white" strokeWidth="1" />
              ))}
              {Array.from({ length: 5 }, (_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 50} x2="340" y2={i * 50} stroke="white" strokeWidth="1" />
              ))}
            </svg>

            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
                    Stress Passport
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>B04</div>
                </div>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: '#3157D5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock size={18} color="white" />
                </div>
              </div>

              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 16, letterSpacing: '0.04em' }}>
                SP-204-00821
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  ['Group', 'G-07'],
                  ['Stress Score', `${borrower.stressScore}/100`],
                  ['Current Status', 'Critical'],
                  ['Issued', 'Jan 2024'],
                ].map(([k, v]) => (
                  <div key={String(k)}>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{k}</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{String(v)}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16, padding: '8px 12px', background: 'rgba(255,255,255,0.07)', borderRadius: 7, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#168568', flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Tamper-evident record • Privacy-preserving</span>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E3E8EF', borderRadius: 12, padding: '20px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#182230', marginBottom: 14 }}>Passport Metadata</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {passportMeta.map(m => (
                <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #F8FAFC' }}>
                  <span style={{ fontSize: 12, color: '#687588' }}>{m.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: m.color, background: m.bg, padding: '2px 8px', borderRadius: 4 }}>
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cross-lender verification */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E3E8EF', borderRadius: 12, padding: '20px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#182230', marginBottom: 4 }}>Cross-Lender Verification</div>
            <div style={{ fontSize: 11, color: '#687588', marginBottom: 14 }}>Simulated verification state</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {crossLenderChecks.map(c => (
                <div key={c.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#687588' }}>{c.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%',
                      background: c.status ? '#DCFCE7' : '#FEE2E2',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: c.status ? '#168568' : '#D84C4C',
                    }}>
                      {c.status ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: c.status ? '#168568' : '#D84C4C' }}>
                      {c.status ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {verified ? (
              <div className="animate-fade-in" style={{ background: '#DCFCE7', border: '1px solid #BBF7D0', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#168568', marginBottom: 4 }}>
                  <CheckCircle2 size={15} /> Verification Complete
                </div>
                <div style={{ fontSize: 12, color: '#166534', lineHeight: 1.5 }}>
                  Simulated check complete. This is a conceptual prototype record — not a blockchain transaction, cryptographic signature, or real verification.
                </div>
              </div>
            ) : (
              <button
                onClick={handleVerify}
                disabled={verifying}
                style={{
                  width: '100%', padding: '9px 0', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: verifying ? 'not-allowed' : 'pointer', border: 'none',
                  background: verifying ? '#F1F5F9' : '#3157D5',
                  color: verifying ? '#687588' : '#FFFFFF',
                  transition: 'background 0.15s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {verifying && <Loader2 size={14} className="animate-spin" />}
                {verifying ? 'Verifying passport...' : 'Verify Passport'}
              </button>
            )}
          </div>
        </div>

        {/* Right: Event timeline + privacy panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Event timeline */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E3E8EF', borderRadius: 12, padding: '20px', flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#182230', marginBottom: 4 }}>Verified Event History</div>
            <div style={{ fontSize: 11, color: '#687588', marginBottom: 20 }}>
              Record of stress events and interventions
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {passportEvents.map((ev, i) => (
                <div key={ev.date} style={{ display: 'flex', gap: 16 }}>
                  {/* Timeline spine */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 48, flexShrink: 0 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: ev.outcome === 'Recovered' ? '#DCFCE7' : ev.outcome === 'Monitoring' ? '#FEF3C7' : '#FEE2E2',
                      border: `2px solid ${outcomeColor[ev.outcome]}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 800,
                      color: outcomeColor[ev.outcome],
                      flexShrink: 0,
                    }}>
                      {ev.year.slice(2)}
                    </div>
                    {i < passportEvents.length - 1 && (
                      <div style={{ width: 2, flex: 1, minHeight: 32, background: '#E3E8EF', margin: '6px 0' }} />
                    )}
                  </div>

                  {/* Event card */}
                  <div style={{ flex: 1, paddingBottom: i < passportEvents.length - 1 ? 24 : 0 }}>
                    <div style={{ background: '#F8FAFC', borderRadius: 10, padding: '16px', border: '1px solid #F1F5F9' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#182230' }}>{ev.type}</div>
                            {ev.isNew && (
                              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#3157D5', background: '#EEF2FF', padding: '2px 6px', borderRadius: 4, border: '1px solid #C7D2FE' }}>NEW</span>
                            )}
                          </div>
                          <div style={{ fontSize: 12, color: '#687588', marginTop: 1 }}>{ev.date}</div>
                        </div>
                        <span style={{
                          fontSize: 11, fontWeight: 600,
                          color: outcomeColor[ev.outcome],
                          background: outcomeBackground[ev.outcome],
                          padding: '3px 10px', borderRadius: 99,
                        }}>
                          {ev.outcome}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                        {[
                          ['Detail', ev.detail],
                          ['Verification', ev.status],
                          ['Intervention', ev.intervention],
                          ['Record ID', ev.hash],
                        ].map(([k, v]) => (
                          <div key={String(k)}>
                            <div style={{ fontSize: 10, fontWeight: 600, color: '#687588', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{k}</div>
                            <div style={{ fontSize: 12, color: '#182230', fontFamily: k === 'Record ID' ? 'JetBrains Mono, monospace' : 'inherit', fontWeight: k === 'Record ID' ? 400 : 500 }}>{String(v)}</div>
                          </div>
                        ))}
                      </div>

                      {/* Integrity indicator */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: '#FFFFFF', borderRadius: 6, border: '1px solid #E3E8EF' }}>
                        <CheckCircle2 size={13} color="#168568" />
                        <span style={{ fontSize: 11, color: '#168568', fontWeight: 600 }}>Record integrity verified</span>
                        <span style={{ fontSize: 11, color: '#687588', marginLeft: 'auto' }}>Simulated ledger entry</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy panel */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E3E8EF', borderRadius: 12, padding: '20px' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Shield size={18} color="#3157D5" />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#182230', marginBottom: 6 }}>Privacy Notice</div>
                <p style={{ fontSize: 13, color: '#687588', lineHeight: 1.6, margin: '0 0 10px' }}>
                  Raw financial data is not displayed in this passport. The prototype illustrates a tamper-evident record of verified events and interventions. In a production system, cryptographic commitments would enable cross-lender trust without exposing underlying financial details.
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#F1F5F9', padding: '4px 10px', borderRadius: 6 }}>
                  <FileBadge size={13} color="#3157D5" />
                  <span style={{ fontSize: 11, color: '#687588', fontWeight: 500 }}>
                    Conceptual prototype • Not a production blockchain system
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
