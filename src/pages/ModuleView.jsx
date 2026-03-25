import React, { useState } from 'react'
import { useApp } from '../App.jsx'
import { MODULES, MODULE_MAP } from '../data/curriculum.js'

export default function ModuleView({ moduleId }) {
  const { navigate, completeModule, progress } = useApp()
  const mod = MODULE_MAP[moduleId]
  const [activeSection, setActiveSection] = useState(0)

  if (!mod) return <div className="body" style={{ color: 'var(--text-secondary)' }}>Module not found.</div>

  const section = mod.sections[activeSection]
  const isLast = activeSection === mod.sections.length - 1
  const isDone = progress.completedModules.includes(mod.id)
  const modIndex = MODULES.findIndex(m => m.id === mod.id)
  const nextMod = MODULES[modIndex + 1]

  const handleNext = () => {
    if (isLast) {
      completeModule(mod.id)
    } else {
      setActiveSection(s => s + 1)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Back + header */}
      <button className="btn btn-ghost btn-sm mb-6" style={{ marginLeft: -8 }} onClick={() => navigate('learn')}>
        ← Back to Learn
      </button>

      {/* Module header card */}
      <div className="card card-p-lg mb-8" style={{ background: `${mod.color}0F`, border: `1px solid ${mod.color}30` }}>
        <div className="flex items-center gap-3 mb-3">
          <span style={{ fontSize: 28 }}>{mod.icon}</span>
          <div>
            <div className="label" style={{ color: mod.color }}>Module {modIndex + 1} · {mod.difficulty}</div>
            <h1 className="title-1">{mod.title}</h1>
          </div>
        </div>
        <p className="body" style={{ color: 'var(--text-secondary)' }}>{mod.subtitle}</p>

        {/* Section tabs */}
        <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {mod.sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setActiveSection(i); window.scrollTo(0,0) }}
              style={{
                fontSize: 13, fontWeight: i === activeSection ? 600 : 400,
                padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                background: i === activeSection ? mod.color : 'var(--bg-surface)',
                color: i === activeSection ? '#fff' : 'var(--text-secondary)',
                transition: 'all 0.15s',
              }}
            >
              {i + 1}. {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Section content */}
      <div className="module-content animate-fade-in" key={section.id}>
        <h2 style={{ marginTop: 0, marginBottom: 20, paddingTop: 0, borderTop: 'none', fontSize: 24, fontWeight: 700 }}>
          {section.title}
        </h2>
        {section.blocks.map((block, bi) => (
          <Block key={bi} block={block} accentColor={mod.color} />
        ))}
      </div>

      {/* Navigation */}
      <div style={{ marginTop: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, borderTop: '1px solid var(--border-subtle)' }}>
        <button
          className="btn btn-secondary"
          onClick={() => { setActiveSection(s => Math.max(0, s - 1)); window.scrollTo(0,0) }}
          disabled={activeSection === 0}
          style={{ opacity: activeSection === 0 ? 0.4 : 1 }}
        >
          ← Previous
        </button>

        <span className="caption">{activeSection + 1} / {mod.sections.length}</span>

        {isLast ? (
          <div style={{ display: 'flex', gap: 12 }}>
            {isDone && nextMod && (
              <button className="btn btn-secondary" onClick={() => { navigate('module', nextMod.id); }}>
                Next Module →
              </button>
            )}
            <button
              className="btn btn-primary"
              onClick={handleNext}
              style={{ background: isDone ? 'var(--green)' : mod.color }}
            >
              {isDone ? '✓ Completed' : 'Mark Complete ✓'}
            </button>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={handleNext} style={{ background: mod.color }}>
            Next →
          </button>
        )}
      </div>
    </div>
  )
}

/* ---- Block Renderer ---- */
function Block({ block, accentColor }) {
  switch (block.type) {
    case 'text':
      return <p className="body" style={{ marginBottom: 20 }}>{block.content}</p>

    case 'list':
      return (
        <ul style={{ margin: '12px 0 24px', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: 12, fontSize: 15, lineHeight: 1.65 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: accentColor, flexShrink: 0, marginTop: 8 }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )

    case 'callout':
      return (
        <div className={`callout callout-${block.variant}`} style={{ margin: '20px 0' }}>
          <div className="callout-title">{block.title}</div>
          <div className="callout-body">{block.content}</div>
        </div>
      )

    case 'comparison':
      return (
        <div style={{ margin: '24px 0', overflowX: 'auto' }}>
          {block.title && <div className="label mb-3">{block.title}</div>}
          <table className="comparison-table">
            <thead>
              <tr>{block.headers.map(h => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'transform':
      return (
        <div className="transform-pair" style={{ margin: '20px 0' }}>
          <div className="transform-before">
            <div className="transform-label">{block.label_before || 'Ambiguous'}</div>
            <div className="transform-text" style={{ fontStyle: 'italic', color: 'var(--red-text)' }}>{block.before}</div>
          </div>
          <div className="transform-after">
            <div className="transform-label">{block.label_after || 'High Fidelity'}</div>
            <div className="transform-text" style={{ whiteSpace: 'pre-wrap' }}>{block.after}</div>
          </div>
        </div>
      )

    case 'markers':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '20px 0' }}>
          {block.items.map(m => <MarkerCard key={m.marker} item={m} />)}
        </div>
      )

    case 'stages':
      return (
        <div className="stage-list" style={{ margin: '20px 0' }}>
          {block.items.map(s => (
            <div key={s.num} className="stage-item">
              <div className="stage-num">{s.num}</div>
              <div className="stage-body">
                <div className="stage-title">{s.title}</div>
                <div className="stage-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )

    default:
      return null
  }
}

function MarkerCard({ item }) {
  return (
    <div className="card card-p-sm" style={{ border: '1px solid var(--border-medium)' }}>
      <div className="flex items-center gap-3 mb-3">
        <span className={`marker marker-${item.color}`}>{item.marker}</span>
        <span className="body-sm" style={{ fontWeight: 600 }}>{item.definition}</span>
      </div>
      <p className="body-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{item.usage}</p>
      <div className="directive-block" style={{ marginBottom: item.warning ? 12 : 0 }}>{item.example}</div>
      {item.warning && (
        <div style={{ fontSize: 13, color: 'var(--amber-text)', background: 'var(--amber-subtle)', borderRadius: 8, padding: '8px 12px', marginTop: 8 }}>
          ⚠ {item.warning}
        </div>
      )}
    </div>
  )
}
