import React, { useState } from 'react'
import { useApp } from '../App.jsx'

export default function Settings() {
  const { theme, toggleTheme, apiKey, setApiKey, progress, resetProgress } = useApp()
  const [keyVisible, setKeyVisible] = useState(false)
  const [keyDraft, setKeyDraft] = useState(apiKey)
  const [keySaved, setKeySaved] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  const saveKey = () => {
    setApiKey(keyDraft.trim())
    setKeySaved(true)
    setTimeout(() => setKeySaved(false), 2000)
  }

  const handleReset = () => {
    if (confirmReset) {
      resetProgress()
      setConfirmReset(false)
    } else {
      setConfirmReset(true)
      setTimeout(() => setConfirmReset(false), 4000)
    }
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: 600 }}>
      <div className="mb-8">
        <div className="label mb-2">Preferences</div>
        <h1 className="title-1 mb-2">Settings</h1>
        <p className="body" style={{ color: 'var(--text-secondary)' }}>
          Configure your Interface Linguistics experience.
        </p>
      </div>

      {/* Appearance */}
      <Section title="Appearance" icon="🎨">
        <div className="flex items-center justify-between">
          <div>
            <div className="headline">Theme</div>
            <div className="caption mt-1">Currently: {theme === 'light' ? 'Light' : 'Dark'} mode</div>
          </div>
          <button className="btn btn-secondary" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Switch to Dark' : '☀️ Switch to Light'}
          </button>
        </div>
      </Section>

      {/* AI Integration */}
      <Section title="AI Integration" icon="🤖">
        <p className="body-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          Optionally connect to Claude (Anthropic API) to enable live directive analysis and AI-assisted rewriting in the Directive Lab. The app works fully offline without a key.
        </p>
        <div className="form-field mb-4">
          <label className="form-label">Anthropic API Key</label>
          <div className="flex gap-2">
            <input
              type={keyVisible ? 'text' : 'password'}
              className="form-input flex-1"
              placeholder="sk-ant-..."
              value={keyDraft}
              onChange={e => setKeyDraft(e.target.value)}
            />
            <button className="btn btn-secondary btn-sm" onClick={() => setKeyVisible(v => !v)}>
              {keyVisible ? 'Hide' : 'Show'}
            </button>
          </div>
          <span className="form-hint">Stored locally in your browser. Never transmitted except to Anthropic's API.</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-primary btn-sm" onClick={saveKey} disabled={keyDraft === apiKey}>
            {keySaved ? '✓ Saved' : 'Save Key'}
          </button>
          {apiKey && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
              <span className="caption" style={{ color: 'var(--green-text)' }}>API key active</span>
            </div>
          )}
          {!apiKey && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--text-tertiary)', display: 'inline-block' }} />
              <span className="caption">Offline mode</span>
            </div>
          )}
        </div>
      </Section>

      {/* Progress */}
      <Section title="Progress" icon="📊">
        <div className="grid-2 mb-4" style={{ gap: 12 }}>
          {[
            { label: 'Modules Completed', value: `${progress.completedModules.length} / 5` },
            { label: 'Lab Analyses Run', value: progress.labRuns },
          ].map(s => (
            <div key={s.label} className="card card-p-sm" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.5px' }}>{s.value}</div>
              <div className="caption mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        {progress.completedModules.length > 0 && (
          <div className="mb-4">
            <div className="label mb-2">Completed Modules</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {progress.completedModules.map(id => (
                <span key={id} className="badge badge-green">{id}</span>
              ))}
            </div>
          </div>
        )}
        <button
          className={`btn btn-sm ${confirmReset ? 'btn-primary' : 'btn-secondary'}`}
          onClick={handleReset}
          style={{ background: confirmReset ? 'var(--red)' : undefined, color: confirmReset ? '#fff' : undefined, borderColor: confirmReset ? 'var(--red)' : undefined }}
        >
          {confirmReset ? '⚠ Click again to confirm reset' : 'Reset All Progress'}
        </button>
      </Section>

      {/* About */}
      <Section title="About" icon="ℹ️">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'var(--text-secondary)' }}>
          <div className="flex justify-between"><span>Version</span><span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>1.0.0 — Round 1</span></div>
          <div className="flex justify-between"><span>Based on</span><span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Interface Linguistics v0.1</span></div>
          <div className="flex justify-between"><span>Author</span><span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Mintao Huang, BilinCo</span></div>
          <div className="flex justify-between"><span>Published</span><span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>March 2026</span></div>
          <div style={{ marginTop: 4, padding: '12px', background: 'var(--bg-subtle)', borderRadius: 8, fontStyle: 'italic', lineHeight: 1.6 }}>
            "The theory of Interface Linguistics is not proprietary IP. It is a structural account of communication across a substrate boundary that exists independently of any particular model, platform, or product."
          </div>
        </div>
      </Section>
    </div>
  )
}

function Section({ title, icon, children }) {
  return (
    <div className="card card-p mb-4">
      <div className="flex items-center gap-2 mb-5" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: 16 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span className="headline">{title}</span>
      </div>
      {children}
    </div>
  )
}
