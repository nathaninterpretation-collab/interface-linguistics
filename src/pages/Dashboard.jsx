import React from 'react'
import { useApp } from '../App.jsx'
import { MODULES } from '../data/curriculum.js'

export default function Dashboard() {
  const { navigate, progress } = useApp()
  const completed = progress.completedModules.length
  const total = MODULES.length
  const pct = Math.round((completed / total) * 100)

  const nextModule = MODULES.find(m => !progress.completedModules.includes(m.id))

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div style={{
        marginBottom: 48,
        padding: '48px 48px 44px',
        background: 'var(--bg-surface)',
        borderRadius: 20,
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,113,227,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="label mb-4" style={{ letterSpacing: '1px' }}>Interface Linguistics · BilinCo</div>
        <h1 className="display mb-4">
          Communicate with AI<br />
          <span style={{
            color: 'var(--accent)',
            background: 'linear-gradient(135deg, #0071E3 0%, #34AAF5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>at execution fidelity.</span>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--text-secondary)', maxWidth: 480, margin: 0 }}>
          Natural language was built for humans. This program teaches the new literacy
          required to direct AI agents with the precision your goals require.
        </p>
      </div>

      {/* Progress banner */}
      {completed > 0 && (
        <div className="card card-p mb-6 animate-fade-in" style={{ background: 'var(--accent-subtle)', border: '1px solid rgba(0,113,227,0.2)' }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="headline" style={{ color: 'var(--accent)' }}>Progress — {pct}% complete</div>
              <div className="caption mt-1">{completed} of {total} modules completed · {progress.labRuns} Lab analyses run</div>
            </div>
            {nextModule && (
              <button className="btn btn-primary btn-sm" onClick={() => navigate('module', nextModule.id)}>
                Continue →
              </button>
            )}
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      {/* Quick stats row */}
      <div className="grid-4 mb-8 stagger" style={{ gap: 16 }}>
        {[
          { label: 'Modules', value: `${completed}/${total}`, sub: 'completed', color: 'var(--accent)' },
          { label: 'Lab Runs', value: progress.labRuns, sub: 'directives analyzed', color: '#34C759' },
          { label: 'Key Concepts', value: 12, sub: 'in this program', color: '#BF5AF2' },
          { label: 'Time', value: '~67', sub: 'minutes total', color: '#FF9F0A' },
        ].map(s => (
          <div key={s.label} className="card animate-fade-in" style={{ textAlign: 'center', overflow: 'hidden' }}>
            <div style={{ height: 3, background: s.color, opacity: 0.85 }} />
            <div style={{ padding: '20px 16px' }}>
              <div style={{ fontSize: 34, fontWeight: 700, color: s.color, letterSpacing: '-1.5px', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginTop: 6 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Start CTA (if no progress) */}
      {completed === 0 && (
        <div className="card card-p-lg mb-8 animate-fade-in" style={{ border: '1px solid var(--border-medium)', textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🧠</div>
          <h2 className="title-2 mb-2">Start with Module 1</h2>
          <p className="body-sm mb-6" style={{ color: 'var(--text-secondary)', maxWidth: 420, margin: '0 auto 24px' }}>
            Understand the structural mismatch that causes AI miscommunication — and why better models won't fix it.
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('module', 'M1')}>
            Begin Module 1 →
          </button>
        </div>
      )}

      {/* Module grid */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="title-3">Curriculum</h2>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('learn')}>View all →</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MODULES.map((mod, i) => {
            const done = progress.completedModules.includes(mod.id)
            return (
              <button
                key={mod.id}
                className="card card-p card-hover"
                style={{ textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16 }}
                onClick={() => navigate('module', mod.id)}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: done ? 'var(--green-subtle)' : `${mod.color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0
                }}>
                  {done ? '✓' : mod.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="headline">{mod.title}</span>
                    {done && <span className="badge badge-green">Done</span>}
                    {!done && nextModule?.id === mod.id && <span className="badge badge-blue">Next</span>}
                  </div>
                  <div className="caption">{mod.subtitle}</div>
                </div>
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  <div className="caption">{mod.duration}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{mod.difficulty}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Key concepts grid */}
      <div>
        <h2 className="title-3 mb-4">Core Concepts</h2>
        <div className="grid-3" style={{ gap: 12 }}>
          {CONCEPTS.map(c => (
            <div key={c.title} className="card card-p-sm" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
              <div className="headline mb-1" style={{ color: c.color, fontSize: 14 }}>{c.title}</div>
              <div className="body-sm" style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const CONCEPTS = [
  { icon: '🎯', title: 'Agentic Execution Fidelity', desc: 'The new standard: did the output match the intended state? Replaces "felt understanding."', color: 'var(--accent)', bg: 'var(--accent-subtle)', border: 'rgba(0,113,227,0.2)' },
  { icon: '🔤', title: 'Tier 1 — Lexical', desc: 'Vague action verbs (fix, handle, update) that distribute across multiple execution paths.', color: 'var(--amber-text)', bg: 'var(--amber-subtle)', border: 'rgba(255,159,10,0.2)' },
  { icon: '📝', title: 'Tier 2 — Phrasal', desc: 'Evaluative phrases ("make it better") with no reference standard for the agent to use.', color: '#9A5700', bg: '#FFF4E0', border: 'rgba(230,119,0,0.2)' },
  { icon: '⚡', title: 'Tier 3 — Pragmatic', desc: 'Identical surface forms for different speech acts. Fixed by metalanguage markers.', color: 'var(--red-text)', bg: 'var(--red-subtle)', border: 'rgba(255,59,48,0.2)' },
  { icon: '🏷️', title: 'The Metalanguage', desc: '[EXECUTE] [DRAFT] [ANALYZE] [DISCUSS] — six markers that eliminate Tier 3 entirely.', color: 'var(--green-text)', bg: 'var(--green-subtle)', border: 'rgba(52,199,89,0.2)' },
  { icon: '💬', title: 'Spec Elicitation Act', desc: 'The new speech act type: maps the parameter space so you locate intent within it.', color: 'var(--purple-text)', bg: 'var(--purple-subtle)', border: 'rgba(191,90,242,0.2)' },
]
