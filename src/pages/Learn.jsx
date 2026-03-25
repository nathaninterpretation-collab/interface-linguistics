import React from 'react'
import { useApp } from '../App.jsx'
import { MODULES } from '../data/curriculum.js'

export default function Learn() {
  const { navigate, progress } = useApp()

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="label mb-2">5 Modules · ~67 Minutes Total</div>
        <h1 className="title-1 mb-2">Learn Interface Linguistics</h1>
        <p className="body" style={{ color: 'var(--text-secondary)', maxWidth: 560 }}>
          A structured curriculum built directly on Mintao Huang's foundational theory. Each module builds on the last — work through them in order for the first pass.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {MODULES.map((mod, i) => {
          const done = progress.completedModules.includes(mod.id)
          const isNext = !done && MODULES.slice(0, i).every(m => progress.completedModules.includes(m.id))
          return (
            <ModuleCard
              key={mod.id}
              mod={mod}
              index={i}
              done={done}
              isNext={isNext}
              onOpen={() => navigate('module', mod.id)}
            />
          )
        })}
      </div>
    </div>
  )
}

function ModuleCard({ mod, index, done, isNext, onOpen }) {
  return (
    <button
      className="card card-hover"
      style={{
        textAlign: 'left', cursor: 'pointer', overflow: 'hidden', padding: 0,
        border: isNext ? `1.5px solid ${mod.color}55` : undefined,
        boxShadow: isNext ? `0 0 0 3px ${mod.color}12` : undefined,
      }}
      onClick={onOpen}
    >
      {/* Top accent bar — thicker for "next" */}
      <div style={{ height: isNext ? 5 : 3, background: done ? 'var(--green)' : mod.color }} />

      <div style={{ padding: '24px 28px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        {/* Icon badge */}
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: done ? 'var(--green-subtle)' : `${mod.color}14`,
          border: `1px solid ${done ? 'rgba(52,199,89,0.25)' : `${mod.color}30`}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: done ? 24 : 28, flexShrink: 0,
        }}>
          {done ? '✓' : mod.icon}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="flex items-center gap-2 mb-2" style={{ flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: mod.color, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Module {index + 1}</span>
            {done && <span className="badge badge-green">✓ Completed</span>}
            {isNext && <span className="badge badge-blue">Up Next</span>}
            <span className="badge badge-gray">{mod.difficulty}</span>
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.3px', marginBottom: 4 }}>{mod.title}</h2>
          <p className="body-sm mb-3" style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>{mod.subtitle}</p>
          <p className="body-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>{mod.summary}</p>

          {/* Section chips */}
          <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {mod.sections.map((s) => (
              <div key={s.id} style={{
                fontSize: 11, color: 'var(--text-tertiary)', background: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)', borderRadius: 20, padding: '3px 10px',
                fontWeight: 500,
              }}>
                {s.title}
              </div>
            ))}
          </div>
        </div>

        {/* Meta */}
        <div style={{ flexShrink: 0, textAlign: 'right', paddingTop: 2 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: mod.color, letterSpacing: '-0.5px' }}>{mod.duration}</div>
          <div className="caption">read time</div>
          <div className="btn btn-primary btn-sm" style={{ marginTop: 12, pointerEvents: 'none' }}>
            {done ? 'Review' : isNext ? 'Start →' : 'Open'}
          </div>
        </div>
      </div>
    </button>
  )
}
