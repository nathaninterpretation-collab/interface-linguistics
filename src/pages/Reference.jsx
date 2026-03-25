import React, { useState } from 'react'

const TABS = ['Markers', 'Tier 1 Words', 'Tier 2 Phrases', 'DTP Stages', 'SEA Structure', 'Quick Transforms']

export default function Reference() {
  const [tab, setTab] = useState(0)

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="label mb-2">Quick Reference</div>
        <h1 className="title-1 mb-2">Reference Cards</h1>
        <p className="body" style={{ color: 'var(--text-secondary)' }}>
          Condensed reference for every core concept. Bookmark this page for use during active AI sessions.
        </p>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 28, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 0 }}>
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            style={{
              fontSize: 14, fontWeight: i === tab ? 600 : 400,
              padding: '8px 16px', borderRadius: '8px 8px 0 0', border: 'none', cursor: 'pointer',
              background: i === tab ? 'var(--bg-surface)' : 'transparent',
              color: i === tab ? 'var(--accent)' : 'var(--text-secondary)',
              borderBottom: i === tab ? '2px solid var(--accent)' : '2px solid transparent',
              marginBottom: -1,
              transition: 'all 0.15s',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="animate-fade-in" key={tab}>
        {tab === 0 && <MarkersRef />}
        {tab === 1 && <Tier1Ref />}
        {tab === 2 && <Tier2Ref />}
        {tab === 3 && <DTPRef />}
        {tab === 4 && <SEARef />}
        {tab === 5 && <TransformRef />}
      </div>
    </div>
  )
}

function MarkersRef() {
  const markers = [
    { m: '[EXECUTE]', cls: 'execute', def: 'Perform this action autonomously. Report when complete.', when: 'Task is precisely specified; output is reversible or pre-reviewed.' },
    { m: '[DRAFT]',   cls: 'draft',   def: 'Produce candidate output for my review. Take no action until confirmed.', when: 'Any output that reaches others or becomes a permanent record.' },
    { m: '[ANALYZE]', cls: 'analyze', def: 'Assess and report findings. Do not act on findings unless separately directed.', when: 'You need intelligence without triggering downstream execution.' },
    { m: '[DISCUSS]', cls: 'discuss', def: 'This is exploratory. Respond with analysis. Execute nothing.', when: 'Thinking out loud, brainstorming, hypotheticals, strategy.' },
    { m: '[PLAN]',    cls: 'plan',    def: 'Produce an execution architecture for my review before any action begins.', when: 'Complex multi-step tasks; irreversible actions.' },
    { m: '[MONITOR]', cls: 'monitor', def: 'Observe this domain and report changes meeting specified criteria. Do not act.', when: 'Ongoing surveillance; you want intelligence not autonomous action.' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div className="callout callout-blue mb-2">
        <div className="callout-title">Usage Rule</div>
        <div className="callout-body">Start every agent interaction by choosing a marker. Ask: execute, draft, analyze, or discuss? Answer that before writing the rest of your directive.</div>
      </div>
      {markers.map(m => (
        <div key={m.m} className="card card-p-sm flex" style={{ gap: 16, alignItems: 'flex-start' }}>
          <span className={`marker marker-${m.cls}`} style={{ marginTop: 2, flexShrink: 0 }}>{m.m}</span>
          <div>
            <div className="body-sm" style={{ fontWeight: 600, marginBottom: 4 }}>{m.def}</div>
            <div className="caption">Use when: {m.when}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Tier1Ref() {
  const words = [
    { w: 'fix', dist: 'repair formatting / correct grammar / rewrite / restructure', fix: 'correct [specific error type] in [specific location]' },
    { w: 'handle', dist: 'manage / process / forward / delegate / resolve', fix: 'respond to / forward to [name] / archive / escalate' },
    { w: 'update', dist: 'change content / notify stakeholders / upgrade version / refresh display', fix: 'change [field] to [value] / send update to [recipients]' },
    { w: 'clean', dist: 'delete / archive / rename / reorganize / simplify', fix: 'delete items where [criteria] / archive emails older than [date]' },
    { w: 'review', dist: 'read / evaluate / approve / edit / audit', fix: 'read and flag errors / evaluate [criteria] of / approve or reject' },
    { w: 'improve', dist: 'edit for clarity / expand / condense / restructure / reformat', fix: 'improve [dimension]; preserve [what to keep]; target [standard]' },
    { w: 'check', dist: 'verify / proofread / test / validate / look over', fix: 'verify that [condition] / proofread for [error type] / test that [function] produces [output]' },
    { w: 'organize', dist: 'sort / categorize / restructure / prioritize / group', fix: 'sort by [field] in [order] / group by [category]' },
    { w: 'send', dist: 'may be capability question or execution directive', fix: '[EXECUTE] send [file] to [recipient] / or [DISCUSS] if asking about capability' },
  ]
  return (
    <div>
      <div className="callout callout-amber mb-4">
        <div className="callout-title">Tier 1 Test</div>
        <div className="callout-body">Can you draw a complete flowchart of exactly what the agent will do — no branches? If not, the verb is Tier 1 ambiguous. Replace with a single-execution-path verb.</div>
      </div>
      <table className="comparison-table" style={{ width: '100%' }}>
        <thead><tr><th>Vague Verb</th><th>Agent Parse Distribution</th><th>Resolution Pattern</th></tr></thead>
        <tbody>
          {words.map(w => (
            <tr key={w.w}>
              <td><span className="code-inline">{w.w}</span></td>
              <td className="caption">{w.dist}</td>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--green-text)' }}>{w.fix}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Tier2Ref() {
  const phrases = [
    { p: 'respond appropriately', prob: 'Appropriate by what standard?', fix: 'respond in [register], under [N] words, no contractions' },
    { p: 'make it better', prob: 'Better on which dimension?', fix: 'improve [clarity/structure]; preserve [what to keep]' },
    { p: 'keep it simple', prob: 'Simple relative to what audience?', fix: 'vocabulary accessible to [audience]; define terms not in [standard]' },
    { p: 'be professional', prob: 'Professional by which convention?', fix: 'formal register, title + last name salutation, no humor' },
    { p: 'as soon as possible / asap', prob: 'No deadline specified', fix: 'by [specific date/time]' },
    { p: 'take care of it', prob: 'No action type specified', fix: 'draft response, flag for review, do not send' },
    { p: 'make it more engaging', prob: 'No engagement dimension', fix: 'add [examples/questions]; shorten paragraphs to under [N] sentences' },
    { p: 'be concise', prob: 'No length target', fix: 'under [N] words / [N] sentences per paragraph' },
    { p: 'it\'s not quite right', prob: 'No dimension or target', fix: 'it does not meet [criterion]; the gap is [description]' },
  ]
  return (
    <div>
      <div className="callout callout-amber mb-4">
        <div className="callout-title">Tier 2 Rule</div>
        <div className="callout-body">Replace every evaluative or relational phrase with a concrete measurable criterion. If the criterion requires a reference point, state the reference point explicitly.</div>
      </div>
      <table className="comparison-table">
        <thead><tr><th>Ambiguous Phrase</th><th>The Problem</th><th>Resolution</th></tr></thead>
        <tbody>
          {phrases.map(p => (
            <tr key={p.p}>
              <td><span className="code-inline" style={{ fontStyle: 'italic' }}>{p.p}</span></td>
              <td className="caption" style={{ color: 'var(--red-text)' }}>{p.prob}</td>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--green-text)' }}>{p.fix}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function DTPRef() {
  const stages = [
    { n: 1, name: 'Intent Reconstruction', action: 'Ask: what problem is this person actually trying to solve? State it one level above the directive.', prompt: '"Before you start, tell me in one sentence what you understand the actual goal to be."' },
    { n: 2, name: 'Problem Formulation', action: 'Specify: current state, desired state, constraints, success criteria, failure conditions.', prompt: '"State the problem as: current state → desired state under constraints. Confirm with me before proceeding."' },
    { n: 3, name: 'Execution Architecture', action: 'List tools/steps, intermediate outputs, reversibility of each action, rollback plan. Get approval before executing.', prompt: '"Show me your execution plan, including which steps are irreversible, before starting."' },
    { n: 4, name: 'Async Disambiguation', action: 'At novel decision points: present fork, Option A/B with consequences, default-with-deadline.', prompt: '"If you hit a decision point not covered by my specification, present the options with a default and deadline."' },
    { n: 5, name: 'Spec Retrospective', action: 'After execution: what was underspecified, how was it resolved, what directive changes would have prevented deviations.', prompt: '"After completing, tell me: what parts of my directive were ambiguous and how did you resolve them?"' },
  ]
  return (
    <div>
      <div className="callout callout-purple mb-4">
        <div className="callout-title">The DTP Inversion</div>
        <div className="callout-body">The agent is the instructor. It has the specification literacy; you have the intention. The DTP is the mechanism by which they meet in the middle.</div>
      </div>
      <div className="stage-list">
        {stages.map(s => (
          <div key={s.n} className="stage-item">
            <div className="stage-num">{s.n}</div>
            <div className="stage-body">
              <div className="stage-title">{s.name}</div>
              <div className="stage-desc mb-3">{s.action}</div>
              <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '8px 12px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>
                Prompt: {s.prompt}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SEARef() {
  return (
    <div>
      <div className="callout callout-red mb-4">
        <div className="callout-title">Specification Elicitation Act (SEA)</div>
        <div className="callout-body">A structured communicative act in which one party presents the parameter space required for a task to be correctly executed and requests the other party to locate their intention within that space.</div>
      </div>
      <div className="grid-2 mb-6" style={{ gap: 16 }}>
        <div>
          <div className="label mb-2" style={{ color: 'var(--red-text)' }}>Malformed SEA (clarifying question)</div>
          <div className="directive-block" style={{ background: 'var(--red-subtle)', borderColor: 'rgba(255,59,48,0.2)', color: 'var(--red-text)' }}>"Could you clarify what you mean by 'handle the correspondence'?"</div>
          <p className="caption mt-2">Restores full disambiguation burden to the human. Introduces new natural-language ambiguity.</p>
        </div>
        <div>
          <div className="label mb-2" style={{ color: 'var(--green-text)' }}>Well-formed SEA</div>
          <div className="directive-block" style={{ background: 'var(--green-subtle)', borderColor: 'rgba(52,199,89,0.2)', fontSize: 12, whiteSpace: 'pre-wrap' }}>{`Handling the correspondence involves 3 parameters.

(1) Scope: all / this week only / specified senders?
(2) Action: draft for review / send / archive / flag?
(3) Priority: chronological / sender importance / urgency?

Default (24h): draft responses, this week, chronological.`}</div>
        </div>
      </div>
      <div className="label mb-3">Four Required Components</div>
      {[
        { n: 1, t: 'Parameter Identification', d: 'Name the specific dimension that requires specification.' },
        { n: 2, t: 'Option Mapping', d: 'Present the complete set of options within that dimension.' },
        { n: 3, t: 'Consequence Framing', d: 'State what each option entails for execution.' },
        { n: 4, t: 'Default Declaration', d: 'Specify what the agent will do if you do not respond.' },
      ].map(c => (
        <div key={c.n} className="flex gap-3 mb-3 items-start">
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>{c.n}</div>
          <div><span style={{ fontWeight: 600 }}>{c.t}: </span><span className="body-sm" style={{ color: 'var(--text-secondary)' }}>{c.d}</span></div>
        </div>
      ))}
      <div className="callout callout-green mt-4">
        <div className="callout-title">How to respond to a SEA</div>
        <div className="callout-body">Do not respond with natural language elaboration — that re-introduces ambiguity. Select parameter values directly: "Parameter 1: this week only. Parameter 2: draft for review. Parameter 3: urgency indicators."</div>
      </div>
    </div>
  )
}

function TransformRef() {
  const transforms = [
    { bad: '"Handle the Johnson correspondence."', good: '"[DRAFT] Responses to all unread Johnson correspondence. Flag any requiring legal review."' },
    { bad: '"I\'ve been thinking we should update the pricing page."', good: '"[DISCUSS] Updating the pricing page. What risks should I consider before deciding?"' },
    { bad: '"Fix this email before I send it."', good: '"[DRAFT] This email corrected for grammar and register. Preserve all factual content. Formal tone, no contractions."' },
    { bad: '"Clean up my notes from yesterday\'s meeting."', good: '"[EXECUTE] Organize yesterday\'s meeting notes by topic. Remove duplicate points. Do not delete any unique idea."' },
    { bad: '"The Q3 report needs to go out today."', good: '"[EXECUTE] Send Q3_Final.pdf to the distribution list in Contacts > Q3 Distribution. Confirm when sent."' },
    { bad: '"Make this proposal more compelling."', good: '"[DRAFT] A revision of this proposal. Improve the value proposition in section 2. Add a concrete ROI example in section 3. Preserve the executive summary exactly as written."' },
    { bad: '"Check if we have any issues with the Johnson account."', good: '"[ANALYZE] The Johnson account emails from the past 90 days. Identify: unresolved requests, missed deadlines, and tone indicators of dissatisfaction. Report only — do not contact."' },
    { bad: '"We should probably back this up."', good: '"[DISCUSS] Backing this up. What are the options and what would you recommend, given [context]?"' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="callout callout-blue mb-2">
        <div className="callout-title">The Full Transformation Pattern</div>
        <div className="callout-body">1. Add a metalanguage marker. 2. Replace Tier 1 verbs with single-path equivalents. 3. Replace Tier 2 evaluative phrases with measurable criteria. 4. State scope, constraints, and success criteria explicitly.</div>
      </div>
      {transforms.map((t, i) => (
        <div key={i} className="transform-pair">
          <div className="transform-before">
            <div className="transform-label">Ambiguous</div>
            <div className="transform-text" style={{ fontStyle: 'italic' }}>{t.bad}</div>
          </div>
          <div className="transform-after">
            <div className="transform-label">High Fidelity</div>
            <div className="transform-text" style={{ whiteSpace: 'pre-wrap' }}>{t.good}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
