import React, { useState, useCallback } from 'react'
import { useApp } from '../App.jsx'
import { analyzeDirective, buildHighlightSegments, scoreColor } from '../utils/ambiguityAnalyzer.js'

const EXAMPLES = [
  { label: 'Vague action', text: 'Fix the document before sending it.' },
  { label: 'No marker', text: 'I was thinking we should archive the old client files.' },
  { label: 'Tier 2 heavy', text: 'Make the proposal more professional and engaging.' },
  { label: 'Well-formed', text: '[DRAFT] A formal response to the Johnson complaint. Tone: formal register. Length: under 200 words. No admission of liability. Close with a specific next step.' },
  { label: 'All tiers', text: 'Handle the email from Johnson — respond appropriately and be professional.' },
  { label: 'Thinking aloud', text: 'Maybe we should update the pricing page and clean up the old products.' },
]

export default function DirectiveLab() {
  const { incrementLabRuns, apiKey } = useApp()
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeIssue, setActiveIssue] = useState(null)

  const run = useCallback(() => {
    if (!input.trim()) return
    setLoading(true)
    setActiveIssue(null)
    setTimeout(() => {
      const r = analyzeDirective(input)
      setResult(r)
      incrementLabRuns()
      setLoading(false)
    }, 400)
  }, [input, incrementLabRuns])

  const loadExample = (ex) => {
    setInput(ex.text)
    setResult(null)
    setActiveIssue(null)
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="label mb-2">Interactive Tool</div>
        <h1 className="title-1 mb-2">Directive Lab</h1>
        <p className="body" style={{ color: 'var(--text-secondary)', maxWidth: 560 }}>
          Paste any directive you've written for an AI agent. The analyzer scores it against the three-tier ambiguity taxonomy and shows exactly what to fix.
        </p>
      </div>

      <div className="lab-grid" style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: 28, alignItems: 'start' }}>
        {/* Input panel */}
        <div>
          {/* Example pills */}
          <div className="flex items-center gap-2 mb-3 lab-examples" style={{ flexWrap: 'wrap' }}>
            <span className="caption" style={{ fontWeight: 600 }}>Try an example:</span>
            {EXAMPLES.map(ex => (
              <button
                key={ex.label}
                className="btn btn-secondary btn-sm"
                onClick={() => loadExample(ex)}
                style={{ fontSize: 12 }}
              >
                {ex.label}
              </button>
            ))}
          </div>

          {/* Textarea */}
          <div className="form-field mb-3">
            <label className="form-label">Your directive</label>
            <textarea
              className="form-input form-textarea"
              style={{ minHeight: 160, fontSize: 15, lineHeight: 1.7, resize: 'vertical' }}
              placeholder={'Enter any directive you\'d send to an AI agent.\n\ne.g. "Handle the Johnson correspondence and make sure it sounds professional."'}
              value={input}
              onChange={e => { setInput(e.target.value); setResult(null) }}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              className="btn btn-primary"
              onClick={run}
              disabled={!input.trim() || loading}
              style={{ minWidth: 140 }}
            >
              {loading ? 'Analyzing…' : '⚡ Analyze Directive'}
            </button>
            {input && (
              <button className="btn btn-ghost btn-sm" onClick={() => { setInput(''); setResult(null) }}>Clear</button>
            )}
            {apiKey && (
              <span className="badge badge-green" style={{ fontSize: 11 }}>AI-enhanced</span>
            )}
          </div>

          {/* Annotated directive (shown below input when result exists on mobile) */}
          {result && (
            <div style={{ marginTop: 24 }}>
              <div className="label mb-2">Annotated Directive</div>
              <AnnotatedDirective text={input} issues={result.issues} onHover={setActiveIssue} activeIssue={activeIssue} />
              <div className="flex gap-3 mt-3" style={{ flexWrap: 'wrap' }}>
                <LegendPill tier={1} label="Tier 1 — Lexical" />
                <LegendPill tier={2} label="Tier 2 — Phrasal" />
                <LegendPill tier={3} label="Tier 3 — Pragmatic" />
              </div>
            </div>
          )}
        </div>

        {/* Results panel */}
        {result && (
          <div className="animate-fade-in">
            {/* Score card */}
            <div className="card card-p mb-4" style={{ overflow: 'hidden', position: 'relative' }}>
              {/* Grade-coloured top stripe */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: scoreColor(result.score) }} />
              <div className="flex items-center gap-5 mb-5" style={{ marginTop: 8 }}>
                <ScoreRing score={result.score} />
                <div>
                  <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px', color: scoreColor(result.score), lineHeight: 1.2 }}>{result.grade.label}</div>
                  <div className="caption mt-2">{result.wordCount} words · {result.issues.length} issue{result.issues.length !== 1 ? 's' : ''} found</div>
                  <div style={{ marginTop: 8 }}>
                    {result.hasMarker
                      ? <span className="badge badge-green">✓ Speech act marker present</span>
                      : <span className="badge badge-red">✗ No speech act marker</span>}
                  </div>
                </div>
              </div>

              {/* Issue count bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[1,2,3].map(tier => {
                  const count = result.issues.filter(i => i.tier === tier).length
                  const max = 6
                  const colors = { 1: 'var(--amber)', 2: '#E67700', 3: 'var(--red)' }
                  const labels = { 1: 'Tier 1 Lexical', 2: 'Tier 2 Phrasal', 3: 'Tier 3 Pragmatic' }
                  return (
                    <div key={tier}>
                      <div className="flex items-center justify-between mb-1">
                        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{labels[tier]}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: count > 0 ? colors[tier] : 'var(--text-tertiary)' }}>{count} issue{count !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${Math.min(100, (count/max)*100)}%`, background: count > 0 ? colors[tier] : 'var(--border-medium)' }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Issues list */}
            {result.issues.length > 0 && (
              <div className="card mb-4" style={{ overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div className="headline">Issues Found</div>
                </div>
                {result.issues.map((issue, i) => (
                  <IssueRow key={i} issue={issue} active={activeIssue === i} onHover={() => setActiveIssue(i)} onLeave={() => setActiveIssue(null)} />
                ))}
              </div>
            )}

            {/* Suggested rewrite */}
            <div className="card card-p">
              <div className="headline mb-3">Suggested Rewrite</div>
              <div className="directive-block mb-3" style={{ background: 'var(--green-subtle)', border: '1px solid rgba(52,199,89,0.25)', color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>
                {result.rewrite}
              </div>
              <p className="caption">
                This is a structural rewrite suggestion — apply your specific context, names, and deadlines. The key changes: speech act marker added, vague verbs replaced, evaluative phrases converted to measurable criteria.
              </p>
              <button
                className="btn btn-secondary btn-sm mt-3"
                onClick={() => { setInput(result.rewrite); setResult(null) }}
              >
                Load rewrite into editor →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Empty state */}
      {!result && !input && (
        <div className="empty-state" style={{ marginTop: 40 }}>
          <div className="empty-icon" style={{ fontSize: 48 }}>⚡</div>
          <div className="empty-title">Paste a directive to analyze it</div>
          <div className="empty-sub">The analyzer checks for all three tiers of ambiguity and gives you a specification score with specific fixes.</div>
        </div>
      )}

      {/* How it works */}
      <div style={{ marginTop: 48 }}>
        <div className="label mb-3">How the Analyzer Works</div>
        <div className="grid-3" style={{ gap: 12 }}>
          {[
            { tier: '1', color: 'var(--amber)', bg: 'var(--amber-subtle)', title: 'Tier 1 — Lexical', desc: 'Scans for action verbs (fix, handle, update, clean, review, etc.) that distribute across multiple execution paths in the agent\'s semantic space.' },
            { tier: '2', color: '#E67700', bg: '#FFF4E0', title: 'Tier 2 — Phrasal', desc: 'Detects evaluative phrases (respond appropriately, make it better, be professional) that require an unstated reference standard.' },
            { tier: '3', color: 'var(--red)', bg: 'var(--red-subtle)', title: 'Tier 3 — Pragmatic', desc: 'Checks for a metalanguage marker ([EXECUTE], [DRAFT], [ANALYZE], [DISCUSS]). Absent marker = unspecified speech act type.' },
          ].map(c => (
            <div key={c.tier} className="card card-p-sm" style={{ background: c.bg, border: `1px solid ${c.color}30` }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: c.color, marginBottom: 6 }}>{c.title}</div>
              <div className="body-sm" style={{ color: 'var(--text-primary)', fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---- Annotated Directive ---- */
function AnnotatedDirective({ text, issues, onHover, activeIssue }) {
  const segments = buildHighlightSegments(text, issues)

  return (
    <div style={{
      background: 'var(--bg-subtle)', border: '1px solid var(--border-medium)', borderRadius: 12,
      padding: '16px 18px', fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.8,
      whiteSpace: 'pre-wrap', wordBreak: 'break-word'
    }}>
      {segments.map((seg, i) => {
        if (!seg.tier) return <span key={i}>{seg.text}</span>
        const cls = seg.tier === 1 ? 'highlight-t1' : seg.tier === 2 ? 'highlight-t2' : 'highlight-t3'
        return (
          <span
            key={i}
            className={cls}
            title={seg.issue?.issue}
            onMouseEnter={() => onHover && onHover(i)}
            onMouseLeave={() => onHover && onHover(null)}
          >
            {seg.text}
          </span>
        )
      })}
    </div>
  )
}

/* ---- Issue Row ---- */
function IssueRow({ issue, active, onHover, onLeave }) {
  const colors = { 1: 'var(--amber-text)', 2: '#9A5700', 3: 'var(--red-text)' }
  const bgs = { 1: 'var(--amber-subtle)', 2: '#FFF4E0', 3: 'var(--red-subtle)' }
  const labels = { 1: 'T1', 2: 'T2', 3: 'T3' }

  return (
    <div
      className="issue-item"
      style={{ background: active ? 'var(--bg-subtle)' : undefined }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={`issue-tier-badge issue-tier-${issue.tier}`}>{labels[issue.tier]}</div>
      <div style={{ flex: 1 }}>
        {issue.matchText && (
          <div className="issue-word">"{issue.word}"</div>
        )}
        {!issue.matchText && (
          <div className="issue-word" style={{ fontFamily: 'var(--font-sans)', fontSize: 13 }}>{issue.word}</div>
        )}
        <div className="issue-desc">{issue.issue}</div>
        {(issue.fix || (issue.suggestions && issue.suggestions.length > 0)) && (
          <div className="issue-fix">
            {issue.fix
              ? `→ ${issue.fix}`
              : `→ Try: ${issue.suggestions.slice(0,2).join(' / ')}`}
          </div>
        )}
      </div>
    </div>
  )
}

/* ---- Score Ring ---- */
function ScoreRing({ score }) {
  const color = scoreColor(score)
  const r = 42
  const circ = 2 * Math.PI * r
  const fill = (score / 100) * circ

  return (
    <div className="score-ring">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--border-medium)" strokeWidth="7" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={`${fill} ${circ - fill}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.7s cubic-bezier(0.34,1.56,0.64,1)' }}
        />
      </svg>
      <div className="score-ring-value">
        <div className="score-ring-number" style={{ color }}>{score}</div>
        <div className="score-ring-label">Score</div>
      </div>
    </div>
  )
}

/* ---- Legend Pill ---- */
function LegendPill({ tier, label }) {
  const cls = `highlight-t${tier}`
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
      <span className={cls} style={{ padding: '1px 6px', borderRadius: 3 }}>sample</span>
      <span>{label}</span>
    </div>
  )
}
