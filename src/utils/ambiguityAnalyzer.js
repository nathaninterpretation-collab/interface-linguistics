// ================================================================
// AMBIGUITY ANALYZER — Offline core engine for the Directive Lab
// Based on Interface Linguistics (Huang, BilinCo 2026)
// ================================================================

// --- TIER 1: Lexical Ambiguity ---
const TIER1 = [
  { words: ['fix', 'fixes', 'fixing', 'fixed'],    issue: 'Distributes across repair / rewrite / restructure / delete-and-replace', suggestions: ['correct [specific error type]', 'rewrite [specific section]', 'repair [specific element]'] },
  { words: ['handle', 'handles', 'handling'],       issue: 'Distributes across manage / process / forward / delegate / resolve / ignore', suggestions: ['respond to', 'forward to [name]', 'archive', 'draft a response to'] },
  { words: ['update', 'updates', 'updating'],       issue: 'Distributes across change content / notify stakeholders / upgrade version / refresh UI', suggestions: ['change [specific field] to [value]', 'send an update to [recipients]', 'edit the [specific section]'] },
  { words: ['clean', 'cleans', 'cleaning', 'cleanup', 'clean up'], issue: 'Distributes across delete / archive / rename / reorganize / simplify', suggestions: ['delete items matching [criteria]', 'archive emails older than [date]', 'remove duplicate entries'] },
  { words: ['review', 'reviews', 'reviewing'],      issue: 'Distributes across read / evaluate / approve / edit / audit', suggestions: ['read and flag errors in', 'evaluate [specific criteria] of', 'approve or reject'] },
  { words: ['improve', 'improves', 'improving', 'improved'], issue: 'Distributes across edit for clarity / expand / condense / restructure / reformat', suggestions: ['improve sentence clarity in', 'restructure [section] for [goal]', 'condense to under [N] words'] },
  { words: ['check', 'checks', 'checking'],         issue: 'Distributes across verify / proofread / test / validate / look over', suggestions: ['verify that [specific condition] is true', 'proofread for grammar errors', 'test that [function] produces [output]'] },
  { words: ['organize', 'organizes', 'organizing'], issue: 'Distributes across sort / categorize / restructure / prioritize / group', suggestions: ['sort by [field] in [order]', 'group by [category]', 'prioritize by [criteria]'] },
  { words: ['prepare', 'prepares', 'preparing'],    issue: 'Distributes across draft / compile / format / assemble / research', suggestions: ['draft a [document type] covering [topics]', 'compile [data source] into [format]'] },
  { words: ['send', 'sends', 'sending', 'sent'],    issue: 'May be a capability question or an execution directive', suggestions: ['[EXECUTE] send [specific file] to [specific recipient]'] },
  { words: ['take care', 'deal with', 'sort out'],  issue: 'Completely underspecified action type', suggestions: ['specify the exact action: respond / archive / escalate / delete / forward'] },
  { words: ['look into', 'look at', 'have a look'], issue: 'Distributes across research / verify / audit / monitor', suggestions: ['[ANALYZE]', '[MONITOR]', 'research [topic] and report [specific findings]'] },
  { words: ['process', 'processes', 'processing'],  issue: 'Distributes across read / categorize / act on / forward / file', suggestions: ['categorize each item by [criteria]', 'forward [items matching criteria] to [recipient]'] },
  { words: ['manage', 'manages', 'managing'],       issue: 'Distributes across oversee / handle / coordinate / control / maintain', suggestions: ['specify the exact management action and scope'] },
  { words: ['address', 'addresses', 'addressing'],  issue: 'Distributes across respond to / fix / acknowledge / escalate', suggestions: ['respond to [specific issue]', 'fix [specific problem]', 'escalate [issue] to [person]'] },
]

// --- TIER 2: Phrasal Ambiguity ---
const TIER2 = [
  { phrase: 'respond appropriately',    issue: 'No response standard specified',          fix: 'respond in [register], under [N] words, no contractions' },
  { phrase: 'make it better',           issue: 'No improvement dimension specified',      fix: 'improve [clarity/structure/conciseness]; preserve [what to keep]' },
  { phrase: 'keep it simple',           issue: 'Simple relative to what audience?',       fix: 'use vocabulary accessible to [audience type]; define terms not in [reference standard]' },
  { phrase: 'take care of it',          issue: 'No action type specified',                fix: 'draft response, flag for my review, do not send' },
  { phrase: 'be professional',          issue: 'No professional convention specified',    fix: 'formal register, title + last name salutation, no humor' },
  { phrase: 'as soon as possible',      issue: 'No deadline specified',                   fix: 'by [specific date/time]' },
  { phrase: 'asap',                     issue: 'No deadline specified',                   fix: 'by [specific date/time]' },
  { phrase: 'when you get a chance',    issue: 'No priority or deadline specified',       fix: 'by [date], low priority' },
  { phrase: 'deal with this',           issue: 'No action type specified',                fix: 'specify: respond / archive / escalate / draft response' },
  { phrase: 'sort this out',            issue: 'No resolution criteria',                  fix: 'resolve by [criteria], deadline [date]' },
  { phrase: 'handle this',              issue: 'No action type specified',                fix: 'specify: respond / forward / archive / flag' },
  { phrase: 'clean this up',            issue: 'No cleanup criteria specified',           fix: 'remove [specific type of content]; preserve [what to keep]' },
  { phrase: 'it needs work',            issue: 'No dimension or standard specified',      fix: 'it needs [specific improvement] to meet [specific standard]' },
  { phrase: 'make it look nice',        issue: 'No aesthetic standard specified',         fix: 'format using [style guide / template]; align to [reference document]' },
  { phrase: 'make it more engaging',    issue: 'No engagement dimension specified',       fix: 'add [examples/questions/concrete specifics]; shorten paragraphs to under [N] sentences' },
  { phrase: 'be concise',              issue: 'No length target specified',               fix: 'under [N] words / under [N] sentences per paragraph' },
  { phrase: 'tone it down',            issue: 'No tone target specified',                 fix: 'remove [specific tone markers]; replace with [alternative register]' },
  { phrase: 'sounds too formal',       issue: 'No alternative register specified',        fix: 'use conversational register; contractions ok; no jargon' },
  { phrase: 'sounds too casual',       issue: 'No alternative register specified',        fix: 'formal register; no contractions; title + last name' },
  { phrase: 'it\'s not quite right',   issue: 'No dimension or target specified',         fix: 'it does not meet [specific criterion]; the gap is [specific description]' },
  { phrase: 'add some personality',    issue: 'No personality dimension specified',       fix: 'add [humor/warmth/directness] consistent with [example/style guide]' },
]

// --- TIER 3: Missing metalanguage marker ---
const MARKERS = ['[execute]', '[draft]', '[analyze]', '[discuss]', '[plan]', '[monitor]']

// Patterns suggesting high Tier 3 risk (clear speech act ambiguity)
const TIER3_RISK = [
  { pattern: /^(can you|could you|would you)/i,        risk: 'Capability question or execution directive?', suggestion: 'Add [EXECUTE] if you want action, or [DISCUSS] if asking a question.' },
  { pattern: /\bi (was thinking|think we|think it)/i,  risk: 'Thinking-out-loud or execution directive?',   suggestion: 'Add [DISCUSS] to signal exploratory intent, or [EXECUTE]/[DRAFT] to signal action.' },
  { pattern: /\b(we should|we need to|it would be good to)\b/i, risk: 'Suggestion or execution directive?', suggestion: 'Add [DISCUSS] to discuss the idea, or [EXECUTE] to act on it.' },
  { pattern: /\b(this (needs|requires|should))\b/i,    risk: 'Observation or execution directive?',         suggestion: 'Add [DISCUSS] if noting an issue, or [EXECUTE]/[DRAFT] to trigger action.' },
  { pattern: /\b(seems|looks like|appears)\b/i,        risk: 'Observation or action request?',             suggestion: 'Add [ANALYZE] to request assessment, or [DISCUSS] if thinking out loud.' },
  { pattern: /^(let'?s|let us)\b/i,                    risk: 'Collaborative suggestion or execution directive?', suggestion: 'Add [PLAN] to architect first, or [EXECUTE] to proceed immediately.' },
  { pattern: /\bmaybe\b|\bperhaps\b|\bpossibly\b/i,   risk: 'Hedged language suggests exploratory intent not execution.', suggestion: 'Use [DISCUSS] to explore, or commit with [EXECUTE]/[DRAFT].' },
  { pattern: /\bdon'?t forget\b|\bremember to\b/i,    risk: 'Reminder or execution directive?',            suggestion: 'Use [EXECUTE] with a specific task, or this is a note-to-self (no agent action needed).' },
]

// ================================================================
// MAIN ANALYZER FUNCTION
// ================================================================
export function analyzeDirective(text) {
  if (!text || text.trim().length < 3) return null

  const issues = []
  const lowerText = text.toLowerCase()
  const words = lowerText.split(/\b/)

  // --- Tier 1 scan ---
  const foundTier1Words = new Set()
  for (const entry of TIER1) {
    for (const w of entry.words) {
      const re = new RegExp(`\\b${w}\\b`, 'gi')
      const matches = [...text.matchAll(re)]
      if (matches.length > 0 && !foundTier1Words.has(w)) {
        foundTier1Words.add(w)
        issues.push({
          tier: 1,
          word: matches[0][0],
          matchText: w,
          index: matches[0].index,
          length: matches[0][0].length,
          issue: entry.issue,
          suggestions: entry.suggestions,
        })
      }
    }
  }

  // --- Tier 2 scan ---
  for (const entry of TIER2) {
    const idx = lowerText.indexOf(entry.phrase)
    if (idx !== -1) {
      issues.push({
        tier: 2,
        word: text.slice(idx, idx + entry.phrase.length),
        matchText: entry.phrase,
        index: idx,
        length: entry.phrase.length,
        issue: entry.issue,
        fix: entry.fix,
      })
    }
  }

  // --- Tier 3: check for missing marker ---
  const hasMarker = MARKERS.some(m => lowerText.includes(m))
  if (!hasMarker) {
    for (const risk of TIER3_RISK) {
      if (risk.pattern.test(text)) {
        issues.push({
          tier: 3,
          word: 'No speech act marker',
          matchText: null,
          index: 0,
          length: 0,
          issue: risk.risk,
          fix: risk.suggestion,
        })
        break
      }
    }
    // Generic Tier 3 if no specific pattern matched but also no marker
    if (!issues.some(i => i.tier === 3)) {
      issues.push({
        tier: 3,
        word: 'No speech act marker',
        matchText: null,
        index: 0,
        length: 0,
        issue: 'Speech act type is unspecified. The agent cannot determine whether this is a request to execute, draft, analyze, or discuss.',
        fix: 'Prepend [EXECUTE], [DRAFT], [ANALYZE], or [DISCUSS] to explicitly declare your intended speech act type.',
      })
    }
  }

  // --- Score ---
  let score = 100
  const t1count = issues.filter(i => i.tier === 1).length
  const t2count = issues.filter(i => i.tier === 2).length
  const t3count = issues.filter(i => i.tier === 3).length

  score -= t1count * 8
  score -= t2count * 12
  score -= t3count * 18
  if (hasMarker) score += 8

  // Length bonus — specificity correlates with length (diminishing returns)
  const wordCount = text.trim().split(/\s+/).length
  if (wordCount >= 20) score += 5
  if (wordCount >= 40) score += 3

  score = Math.max(0, Math.min(100, Math.round(score)))

  // --- Grade ---
  const grade = score >= 85 ? { label: 'High Fidelity', color: 'green' }
    : score >= 65 ? { label: 'Moderate Risk', color: 'amber' }
    : score >= 40 ? { label: 'High Risk', color: 'amber' }
    : { label: 'Critical Risk', color: 'red' }

  // --- Generate rewrite suggestion ---
  const rewrite = generateRewrite(text, issues, hasMarker)

  return { score, grade, issues, hasMarker, wordCount, rewrite }
}

// ================================================================
// REWRITE GENERATOR
// ================================================================
function generateRewrite(text, issues, hasMarker) {
  let result = text.trim()

  // Suggest the right marker
  if (!hasMarker) {
    const lc = result.toLowerCase()
    if (/\b(think|maybe|perhaps|discuss|what if|brainstorm|consider)\b/.test(lc)) {
      result = '[DISCUSS] ' + result
    } else if (/\b(check|review|analyze|assess|look into|research|find out)\b/.test(lc)) {
      result = '[ANALYZE] ' + result
    } else if (/\b(draft|write|create|generate|produce|compose)\b/.test(lc)) {
      result = '[DRAFT] ' + result
    } else {
      result = '[DRAFT] ' + result
    }
  }

  // Apply Tier 2 fixes inline where easy
  const t2 = issues.filter(i => i.tier === 2)
  for (const issue of t2) {
    if (issue.fix) {
      result = result.replace(new RegExp(issue.matchText, 'gi'), `[${issue.fix}]`)
    }
  }

  return result
}

// ================================================================
// HIGHLIGHT HELPER — returns array of {text, tier|null} segments
// ================================================================
export function buildHighlightSegments(text, issues) {
  // Only highlight tier 1 and tier 2 (tier 3 has no position)
  const positioned = issues
    .filter(i => i.matchText && i.index >= 0)
    .sort((a, b) => a.index - b.index)

  const segments = []
  let cursor = 0

  for (const issue of positioned) {
    if (issue.index < cursor) continue // overlap, skip
    if (issue.index > cursor) {
      segments.push({ text: text.slice(cursor, issue.index), tier: null })
    }
    segments.push({
      text: text.slice(issue.index, issue.index + issue.length),
      tier: issue.tier,
      issue,
    })
    cursor = issue.index + issue.length
  }

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), tier: null })
  }

  return segments
}

// ================================================================
// SCORE COLOR HELPER
// ================================================================
export function scoreColor(score) {
  if (score >= 85) return '#34C759'
  if (score >= 65) return '#FF9F0A'
  if (score >= 40) return '#FF6B00'
  return '#FF3B30'
}
