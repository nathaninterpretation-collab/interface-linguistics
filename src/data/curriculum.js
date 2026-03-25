// Full curriculum derived from Mintao Huang, "Interface Linguistics" (BilinCo, March 2026)

export const MODULES = [
  {
    id: 'M1',
    title: 'Why AI Miscommunicates',
    subtitle: 'The structural mismatch between natural language and the agent interface',
    duration: '12 min',
    difficulty: 'Foundational',
    color: '#0071E3',
    icon: '🧠',
    summary: 'Natural language evolved to coordinate humans who share bodies, cultures, and social stakes. AI agents have none of that. This module explains why the mismatch is permanent — and why better AI models won\'t fix it.',
    sections: [
      {
        id: 'M1S1',
        title: 'What language was actually built for',
        blocks: [
          {
            type: 'text',
            content: 'Human language did not emerge as a neutral information-transmission system. It emerged as a survival technology for social primates operating in bands of 50–150 individuals — managing coalitions, coordinating collective action, negotiating status, and transmitting knowledge across generations.'
          },
          {
            type: 'text',
            content: 'The constraints of that environment are not incidental features of language. They are the engineering requirements language was built to satisfy:'
          },
          {
            type: 'list',
            items: [
              'Memory limitations — language had to be compressible, reconstructible from partial cues, tolerant of lossy transmission.',
              'Bandwidth limitations — speech is slow. Every word had to carry maximum semantic payload. Compression was survival.',
              'Social constraints — language is primarily relationship management and coalition signaling. Indirection and politeness are core functions, not inefficiencies.',
              'Shared substrate assumption — speaker and listener share embodiment, evolutionary history, cultural context. Compression works because the decompression apparatus on the receiving end is nearly identical to the one on the sending end.'
            ]
          },
          {
            type: 'callout',
            variant: 'blue',
            title: 'Key Insight',
            content: 'Polysemy is efficiency. Ambiguity is compression. The lossy encoding works because the receiver has the decompression key built into their biology and culture. These are not bugs — they are the optimal solution to the actual engineering problem language was solving.'
          }
        ]
      },
      {
        id: 'M1S2',
        title: 'The Intersubjective Accuracy Standard',
        blocks: [
          {
            type: 'text',
            content: 'For ten thousand years, communication succeeded when the listener\'s internal state — their understanding, their felt sense of the message — corresponded sufficiently to the speaker\'s internal state that coordinated action became possible.'
          },
          {
            type: 'text',
            content: 'This standard does not require perfect correspondence. It requires sufficient correspondence — defined functionally: did the coordination happen? Did the joint action succeed? Did the relationship survive the exchange?'
          },
          {
            type: 'callout',
            variant: 'amber',
            title: 'The Problem',
            content: 'The emergence of AI agents made this standard insufficient. Not wrong — it remains correct for human-to-human communication. Insufficient for the new interface, where the receiver has no phenomenal interior against which intersubjective accuracy could even be measured.'
          }
        ]
      },
      {
        id: 'M1S3',
        title: 'What changes when the receiver changes',
        blocks: [
          {
            type: 'text',
            content: 'An AI agent receiving your natural language directive has none of the decompression infrastructure that human-to-human communication assumes:'
          },
          {
            type: 'list',
            items: [
              'No shared embodiment — no body, no sensorimotor history, no somatic grounding for spatial, temporal, or emotional concepts.',
              'No shared phenomenal substrate — no interior state to meet your interior state halfway.',
              'No social relationship — no face to save, no coalition to maintain, no status to negotiate.',
              'No continuous generative model — no background process running between sessions, dreaming, consolidating.',
              'No automatic decompression — the statistical training distribution is not calibrated to your specific semantic conventions.'
            ]
          },
          {
            type: 'text',
            content: 'Every feature of natural language that made it efficient for human-to-human communication becomes a liability at this interface. Polysemy becomes ambiguity. Indirection becomes instruction failure. Compression becomes information loss with no recovery mechanism.'
          }
        ]
      },
      {
        id: 'M1S4',
        title: 'The gap will not close',
        blocks: [
          {
            type: 'text',
            content: 'A more capable model narrows the gap between your compressed expression and the agent\'s parse — it can infer more from less, weight competing interpretations more accurately, use context more effectively. But it cannot eliminate the gap.'
          },
          {
            type: 'text',
            content: 'The gap exists because your semantic object — a word as you use it, embedded in your specific history, embodied experience, professional context, and current intent — is constitutively different from the agent\'s semantic object, which is a distribution over all training contexts in which that word appeared.'
          },
          {
            type: 'callout',
            variant: 'purple',
            title: 'The Permanent Principle',
            content: 'Better models reduce the variance of the agent\'s distribution. They do not collapse it to your specific semantic object. The gap narrows asymptotically. It does not close. The disambiguation problem is structural, not temporary.'
          },
          {
            type: 'comparison',
            title: 'Two Standards of Communication',
            headers: ['Dimension', 'Intersubjective Accuracy', 'Agentic Execution Fidelity'],
            rows: [
              ['Goal', 'Shared felt understanding', 'Correct execution of intended task'],
              ['Measurement', 'Felt mutual understanding — subjective', 'Output correctness — binary, verifiable'],
              ['Ambiguity', 'Resolved by shared substrate automatically', 'Must be resolved explicitly before execution'],
              ['Failure mode', 'Misunderstanding — usually recoverable', 'Misparse → wrong execution — may be irreversible'],
            ]
          }
        ]
      }
    ]
  },

  {
    id: 'M2',
    title: 'The Ambiguity Taxonomy',
    subtitle: 'Three structurally distinct tiers — each requiring a different fix',
    duration: '15 min',
    difficulty: 'Core',
    color: '#FF9F0A',
    icon: '🔍',
    summary: 'Not all ambiguity is the same. Treating Tier 1 problems with Tier 3 solutions wastes effort and misses the issue. This module gives you a precise taxonomy so every fix targets the right layer.',
    sections: [
      {
        id: 'M2S1',
        title: 'Why taxonomy matters',
        blocks: [
          {
            type: 'text',
            content: 'Ambiguity at the human-agent interface is not uniform. It occurs at three structurally distinct tiers, each requiring a different disambiguation strategy. Conflating these tiers produces interventions that address surface symptoms while leaving deeper structural ambiguity intact.'
          },
          {
            type: 'callout',
            variant: 'blue',
            title: 'The Three Tiers',
            content: 'Tier 1 — Lexical: individual words with multiple execution paths. Tier 2 — Phrasal: phrases that require unstated standards or reference points. Tier 3 — Pragmatic: identical surface forms that are structurally different speech acts.'
          }
        ]
      },
      {
        id: 'M2S2',
        title: 'Tier 1 — Lexical Ambiguity',
        blocks: [
          {
            type: 'text',
            content: 'The most surface-level tier. Action verbs and content nouns that feel unambiguous to you distribute across multiple executable meanings in the agent\'s semantic space. You have a single intent. The agent\'s parse distribution has multiple near-equal mass peaks.'
          },
          {
            type: 'comparison',
            title: 'Common Tier 1 Words',
            headers: ['Word', 'Your Assumption', 'Agent\'s Parse Distribution'],
            rows: [
              ['"fix"', 'Correct the specific error I have in mind', 'repair formatting / correct grammar / rewrite / restructure / all of the above'],
              ['"handle"', 'Take appropriate action on this', 'manage / process / forward / delegate / resolve / all of the above'],
              ['"update"', 'Make it current', 'change content / inform stakeholders / upgrade version / refresh display / all of the above'],
              ['"clean"', 'Remove what doesn\'t belong', 'delete / archive / rename / reorganize / simplify / all of the above'],
              ['"review"', 'Look at this carefully', 'read / evaluate / approve / edit / audit / all of the above'],
            ]
          },
          {
            type: 'callout',
            variant: 'green',
            title: 'The Tier 1 Test',
            content: 'Can you draw a complete flowchart of exactly what the agent will do from your instruction alone — with no branches? If not, the instruction is Tier 1 ambiguous. Fix: substitute with a single-execution-path verb and append explicit scope constraints.'
          },
          {
            type: 'transform',
            before: 'Fix this document.',
            after: 'Correct all spelling errors and broken hyperlinks in this document. Do not change sentence structure, content, or formatting.'
          },
          {
            type: 'transform',
            before: 'Clean up my inbox.',
            after: 'Archive all emails older than 30 days that have no unread replies and are not flagged. Do not delete anything.'
          }
        ]
      },
      {
        id: 'M2S3',
        title: 'Tier 2 — Phrasal Ambiguity',
        blocks: [
          {
            type: 'text',
            content: 'More dangerous than Tier 1 because it is less visible. Phrases feel clear to you — they have a single obvious meaning in your social context. The agent\'s compositional parser produces a different meaning, also coherent, with high confidence. The agent executes against a wrong parse it cannot detect as wrong.'
          },
          {
            type: 'text',
            content: 'Phrasal ambiguity occurs when you use evaluative phrases that require an unstated reference point the agent does not possess.'
          },
          {
            type: 'comparison',
            title: 'Tier 2 Phrase Failures',
            headers: ['Phrase', 'The Problem', 'Resolution'],
            rows: [
              ['"respond appropriately"', 'Appropriate by what standard?', '"respond in formal register, under 150 words, no contractions"'],
              ['"make it better"', 'Better on which dimension?', '"improve sentence clarity; preserve all technical terms and argument structure"'],
              ['"keep it simple"', 'Simple relative to what audience?', '"use vocabulary accessible to non-specialist; define terms not in general press"'],
              ['"take care of it"', 'Care consisting of what actions?', '"draft response, flag for my review, do not send"'],
              ['"be professional"', 'Professional by which convention?', '"formal register, title + last name salutation, no humor"'],
            ]
          },
          {
            type: 'callout',
            variant: 'amber',
            title: 'The Tier 2 Rule',
            content: 'Replace every evaluative or relational phrase with a concrete measurable criterion. If the criterion requires a reference point, state the reference point explicitly. Never leave the agent to infer a standard from context.'
          },
          {
            type: 'transform',
            before: 'Write a professional response to this complaint.',
            after: 'Write a response to this complaint. Tone: formal register. Length: under 200 words. Format: no bullet points. Salutation: "Dear [Title] [Last Name]". Do not admit liability. End with a specific next step.'
          }
        ]
      },
      {
        id: 'M2S4',
        title: 'Tier 3 — Pragmatic Ambiguity',
        blocks: [
          {
            type: 'text',
            content: 'The deepest and most dangerous tier. Natural language uses identical surface forms for fundamentally different speech acts. In human-to-human communication, tone and shared history disambiguate speech act type instantly and unconsciously. At the human-agent interface, those resources are absent.'
          },
          {
            type: 'comparison',
            title: 'Identical Surface, Different Intent',
            headers: ['What you said', 'Possible speech acts', 'Consequence of misparse'],
            rows: [
              ['"Can you send this to John?"', '2 types', 'Capability question answered (yes) vs. email sent to John immediately'],
              ['"I was thinking we might archive these"', '3 types', 'Thinking-out-loud acknowledged vs. archive executed immediately'],
              ['"This email seems important"', '4 types', 'Observation noted vs. email flagged / responded to / escalated'],
              ['"The deadline is tomorrow"', '3 types', 'Information noted vs. calendar entry created vs. stakeholders notified'],
              ['"We should probably back this up"', '2 types', 'Suggestion discussed vs. backup executed immediately'],
            ]
          },
          {
            type: 'callout',
            variant: 'red',
            title: 'Why Tier 3 is the Most Dangerous',
            content: 'Tier 3 misparsing produces actions, not just wrong outputs. The agent that interprets "I was thinking we might archive these" as an execution directive doesn\'t produce a wrong document — it takes an action. Actions can be irreversible.'
          },
          {
            type: 'text',
            content: 'Tier 3 ambiguity is resolved by one thing only: explicit speech act marking. The Interface Linguistics metalanguage markers eliminate Tier 3 ambiguity entirely. This is covered fully in Module 3.'
          }
        ]
      }
    ]
  },

  {
    id: 'M3',
    title: 'The Metalanguage',
    subtitle: 'Six markers that eliminate the most dangerous class of misparse',
    duration: '10 min',
    difficulty: 'Core',
    color: '#34C759',
    icon: '🏷️',
    summary: 'A minimal formal layer sitting above natural language. Four primary markers plus two secondary ones eliminate Tier 3 pragmatic ambiguity entirely — with zero learning curve.',
    sections: [
      {
        id: 'M3S1',
        title: 'Why natural language alone is not enough',
        blocks: [
          {
            type: 'text',
            content: 'Natural language cannot, by itself, provide the pragmatic parameters the agent interface requires. Speech act type, scope constraints, reversibility profile, success criteria — these are parameters the agent needs for execution fidelity that natural language encodes only implicitly, if at all.'
          },
          {
            type: 'text',
            content: 'In human-to-human communication, the shared substrate provided these parameters automatically. At the human-agent interface, they must be provided explicitly. A metalanguage — a formal layer sitting above natural language — carries them.'
          },
          {
            type: 'callout',
            variant: 'blue',
            title: 'The Metalanguage Principle',
            content: 'The metalanguage is not a replacement for natural language. It is a supplement that provides pragmatic scaffolding natural language was never designed to provide — because the shared substrate provided it automatically in human-to-human communication.'
          }
        ]
      },
      {
        id: 'M3S2',
        title: 'The four primary markers',
        blocks: [
          {
            type: 'text',
            content: 'Four markers cover the vast majority of agent interactions. Each one specifies a different execution posture — what the agent should do, and crucially, what it should not do.'
          },
          {
            type: 'markers',
            items: [
              {
                marker: '[EXECUTE]',
                color: 'execute',
                definition: 'Perform this action autonomously. Report when complete.',
                usage: 'Use when you have specified the task precisely enough to trust autonomous execution and accept the output without review.',
                example: '[EXECUTE] Send the meeting summary to all attendees using the email list in the shared folder.',
                warning: 'Only use [EXECUTE] when the action is reversible or you have reviewed an equivalent [DRAFT] output first.'
              },
              {
                marker: '[DRAFT]',
                color: 'draft',
                definition: 'Produce candidate output for my review. Take no action until confirmed.',
                usage: 'Use for any output you need to verify before it reaches anyone or becomes a permanent record.',
                example: '[DRAFT] A response to the Johnson complaint. I will review before sending.',
                warning: 'The default for most agent interactions until you have calibrated the agent\'s output quality for a specific task type.'
              },
              {
                marker: '[ANALYZE]',
                color: 'analyze',
                definition: 'Assess and report findings. Do not act on findings unless separately directed.',
                usage: 'Use when you need intelligence without triggering downstream execution.',
                example: '[ANALYZE] The last 30 emails from the Johnson account and identify unresolved issues.',
                warning: 'A common Tier 3 failure: "Look into the Johnson matter" parsed as [EXECUTE] rather than [ANALYZE].'
              },
              {
                marker: '[DISCUSS]',
                color: 'discuss',
                definition: 'This is exploratory. Respond with analysis. Execute nothing.',
                usage: 'Use for thinking-out-loud, brainstorming, hypothetical scenarios, and strategy conversations.',
                example: '[DISCUSS] What would be the risks of archiving the 2022 client files?',
                warning: 'Protects against the most catastrophic Tier 3 failure: thinking-out-loud parsed as an execution directive.'
              }
            ]
          }
        ]
      },
      {
        id: 'M3S3',
        title: 'The two secondary markers',
        blocks: [
          {
            type: 'text',
            content: 'Two additional markers cover common edge cases not fully addressed by the primary four.'
          },
          {
            type: 'markers',
            items: [
              {
                marker: '[PLAN]',
                color: 'plan',
                definition: 'Produce an execution architecture for my review before any action begins.',
                usage: 'Use for complex, multi-step tasks where you want to approve the approach before committing to execution.',
                example: '[PLAN] Migration of the client portal to the new server. Show me the full sequence before starting.',
                warning: 'Especially important for irreversible actions. [PLAN] → review → [EXECUTE] is the safe sequence for high-stakes tasks.'
              },
              {
                marker: '[MONITOR]',
                color: 'monitor',
                definition: 'Observe this domain and report changes meeting specified criteria. Do not act on observations.',
                usage: 'Use for ongoing surveillance tasks where you want intelligence but not autonomous action.',
                example: '[MONITOR] The inbox for emails from Johnson. Alert me when any arrive; do not respond.',
                warning: 'Without [MONITOR], "keep an eye on the inbox" may be parsed as authorization to act on what the agent observes.'
              }
            ]
          }
        ]
      },
      {
        id: 'M3S4',
        title: 'Markers in practice',
        blocks: [
          {
            type: 'text',
            content: 'The six markers take approximately two minutes to learn and eliminate the most dangerous class of AI interaction failure permanently. Here are before/after examples across real use cases.'
          },
          {
            type: 'transform',
            before: '"Handle the Johnson correspondence."',
            after: '"[DRAFT] Responses to all unread Johnson correspondence. Flag any that require legal review."'
          },
          {
            type: 'transform',
            before: '"I\'ve been thinking we should update the pricing page."',
            after: '"[DISCUSS] Updating the pricing page. What are the risks and what should I consider before deciding?"'
          },
          {
            type: 'transform',
            before: '"The Q3 report needs to go out today."',
            after: '"[EXECUTE] Send the Q3 report (file: Q3_Final.pdf) to the distribution list in contacts. Confirm when sent."'
          },
          {
            type: 'callout',
            variant: 'green',
            title: 'The Marker Habit',
            content: 'Start every agent interaction by choosing a marker first. Ask: "What posture do I want the agent in — executing, drafting, analyzing, or discussing?" Answer that question before writing the rest of your directive. The marker takes two seconds. The misparse it prevents can take hours to undo.'
          }
        ]
      }
    ]
  },

  {
    id: 'M4',
    title: 'The Directive Protocol',
    subtitle: 'The five-stage process that transforms intent into execution',
    duration: '18 min',
    difficulty: 'Advanced',
    color: '#BF5AF2',
    icon: '⚙️',
    summary: 'The Directive Translation Protocol is the agent-side architecture of Interface Linguistics. Understanding it tells you what your agent should be doing — and what to demand when it isn\'t.',
    sections: [
      {
        id: 'M4S1',
        title: 'The core inversion',
        blocks: [
          {
            type: 'text',
            content: 'Current AI system architecture places the entire disambiguation burden on the human user. You produce a natural language directive. The agent commits to a parse. The agent executes. Any misparse is your responsibility for failing to specify correctly.'
          },
          {
            type: 'text',
            content: 'This architecture is backwards. You have the intention but no visibility into the agent\'s parse distribution. The agent has the parse distribution but no access to your intention. The party with visibility into the gap — the agent — bears none of the responsibility for closing it.'
          },
          {
            type: 'callout',
            variant: 'purple',
            title: 'The DTP Inversion',
            content: 'The Directive Translation Protocol (DTP) inverts this assignment. The agent is the instructor. You have the intention but not the specification literacy. The agent has the specification literacy but not the intention. The DTP is the mechanism by which they meet in the middle.'
          }
        ]
      },
      {
        id: 'M4S2',
        title: 'Stage 1 — Intent Reconstruction',
        blocks: [
          {
            type: 'text',
            content: 'The agent receives your natural language directive and performs an immediate reconstruction pass — not parsing for tool calls, not committing to an interpretation, but asking: what problem is this person actually trying to solve?'
          },
          {
            type: 'text',
            content: 'The reconstruction operates one level above the directive. It identifies the underlying problem that generated the surface expression. The directive is the symptom. The intent is the disease. Treating the symptom without diagnosing the disease produces correct execution of the wrong task.'
          },
          {
            type: 'comparison',
            title: 'Intent Reconstruction Examples',
            headers: ['Your Directive', 'Reconstructed Intent'],
            rows: [
              ['"Clean up my inbox"', '"Reduce cognitive overhead from email backlog while preserving anything requiring action or follow-up"'],
              ['"Fix this document"', '"Produce a version that achieves its stated communicative purpose without the current errors preventing that"'],
              ['"Build me a client portal"', '"Create infrastructure that allows clients to accomplish [unstated goal] without requiring my direct involvement"'],
              ['"Handle the Johnson matter"', '"Advance the Johnson matter toward resolution through appropriate next steps within my authorization"'],
            ]
          },
          {
            type: 'callout',
            variant: 'blue',
            title: 'What to demand from your agent',
            content: 'Before an agent takes any action on a complex task, it should state its reconstructed intent and ask for confirmation. If your agent never does this — it is skipping the most important step. You can prompt it manually: "Before you start, tell me in one sentence what you understand the actual goal to be."'
          }
        ]
      },
      {
        id: 'M4S3',
        title: 'Stage 2 — Problem Formulation',
        blocks: [
          {
            type: 'text',
            content: 'Once intent is confirmed, the agent translates intent into a formal problem specification — a structured statement of the transformation required from current state to desired state under specified constraints.'
          },
          {
            type: 'list',
            items: [
              'Current state: what is true now that is not desired.',
              'Desired state: what should be true after execution.',
              'Constraints: what must be preserved or avoided during transformation.',
              'Success criteria: what verifiable condition confirms the desired state has been achieved.',
              'Failure conditions: what outcomes would constitute failure even if the desired state appears achieved.'
            ]
          },
          {
            type: 'callout',
            variant: 'green',
            title: 'The Problem Formulation in practice',
            content: 'The problem formulation is not a clarifying question. It is the agent demonstrating its understanding of the problem structure and inviting you to correct any component that doesn\'t match your intent. Your cognitive load is confirmation and correction — not generation from scratch.'
          }
        ]
      },
      {
        id: 'M4S4',
        title: 'Stages 3–5 — Architecture, Execution, Retrospective',
        blocks: [
          {
            type: 'stages',
            items: [
              {
                num: 3,
                title: 'Execution Architecture',
                desc: 'Before any tool calls, the agent makes its execution plan legible: which tools in what sequence, what intermediate outputs, where human review is required, the reversibility profile of each action (reversible / recoverable / irreversible), and the rollback plan. Every irreversible action appears explicitly. You approve before execution begins.'
              },
              {
                num: 4,
                title: 'Execution with Async Disambiguation',
                desc: 'Execution proceeds against the confirmed architecture. At genuine novel decision points not covered by the specification, the agent issues an Asynchronous Disambiguation Request: the fork description, Option A/B with consequences, and a default-with-deadline (what the agent will do if you don\'t respond within X time). This prevents both blocking and silent wrong-path execution.'
              },
              {
                num: 5,
                title: 'Specification Retrospective',
                desc: 'After execution, the agent produces a structured analysis of specification quality: where the original directive was underspecified and how it resolved the gap, where its committed interpretation differed from your actual intent, and what changes to your original directive would have prevented deviations. This is the training signal for your own specification literacy development.'
              }
            ]
          },
          {
            type: 'callout',
            variant: 'amber',
            title: 'How to use the DTP right now',
            content: 'Most agents today do not implement the full DTP. But you can prompt each stage manually. Before a complex task: "State your understanding of my goal before starting." After execution: "What parts of my directive were ambiguous, and how did you resolve them?" These two prompts alone capture the highest-value stages.'
          }
        ]
      }
    ]
  },

  {
    id: 'M5',
    title: 'Specification Elicitation',
    subtitle: 'The new speech act type — and how to recognize and respond to it',
    duration: '12 min',
    difficulty: 'Advanced',
    color: '#FF3B30',
    icon: '💬',
    summary: 'Classical speech act theory has five types. The agent interface requires a sixth: the Specification Elicitation Act. Understanding it transforms you from a passive directive-sender into an active specification partner.',
    sections: [
      {
        id: 'M5S1',
        title: 'A new speech act type',
        blocks: [
          {
            type: 'text',
            content: 'Classical speech act theory identifies five illocutionary types: assertives (truth claims), directives (requests for action), commissives (commitments), expressives (emotional states), and declarations (world-changing utterances). This taxonomy has proven remarkably durable across fifty years of linguistic theory.'
          },
          {
            type: 'text',
            content: 'The human-agent interface requires a sixth type not found in Austin, Searle, or their successors: the Specification Elicitation Act.'
          },
          {
            type: 'callout',
            variant: 'red',
            title: 'Definition: Specification Elicitation Act (SEA)',
            content: 'A structured communicative act in which one party presents the parameter space required for a task to be correctly executed and requests the other party to locate their intention within that space.'
          },
          {
            type: 'list',
            items: [
              'It is not a question — questions are open-ended and restore the full generation burden to you. The SEA maps the space and asks for selection within it.',
              'It is not a directive — directives specify what you should do. The SEA requests information required to specify what the agent should do.',
              'It is collaborative — it cannot be performed unilaterally. The agent contributes the parameter map; you contribute the intent location. Both are required to produce the specification jointly.'
            ]
          }
        ]
      },
      {
        id: 'M5S2',
        title: 'Malformed vs. well-formed SEAs',
        blocks: [
          {
            type: 'text',
            content: 'The difference between a clarifying question and a Specification Elicitation Act is the difference between restoring the disambiguation burden to you and sharing it jointly. Only one of these produces execution fidelity.'
          },
          {
            type: 'transform',
            label_before: 'MALFORMED (clarifying question)',
            label_after: 'WELL-FORMED (SEA)',
            before: '"Could you clarify what you mean by \'handle the correspondence\'?"',
            after: '"Handling the correspondence involves decisions across three parameters.\n\n(1) Scope: all correspondence in the folder / only correspondence dated this week / only from specified senders?\n\n(2) Action type: draft responses for your review / send responses autonomously / archive without response / flag for your direct attention?\n\n(3) Priority: chronological order / sender importance / urgency indicators?\n\nDefault if no response in 24h: draft responses for review, this week\'s correspondence, chronological order."'
          },
          {
            type: 'callout',
            variant: 'blue',
            title: 'Why the SEA is better',
            content: 'The malformed version gives you nothing to work with — you must generate the specification from scratch in natural language, introducing new ambiguity. The well-formed SEA gives you a structured selection task. You pick from mapped options. Your response is a set of parameter values, not a new natural language directive that starts the ambiguity cycle over.'
          }
        ]
      },
      {
        id: 'M5S3',
        title: 'The four components of a well-formed SEA',
        blocks: [
          {
            type: 'list',
            items: [
              'Parameter identification — naming the specific dimension that requires specification.',
              'Option mapping — presenting the complete set of options within that dimension.',
              'Consequence framing — stating what each option entails for execution.',
              'Default declaration — specifying what the agent will do if you do not respond.'
            ]
          },
          {
            type: 'callout',
            variant: 'green',
            title: 'How to respond to a SEA',
            content: 'When your agent issues a well-formed SEA: do not respond in natural language elaboration. Select parameter values directly. "Parameter 1: this week only. Parameter 2: draft for review. Parameter 3: urgency indicators." That is a complete, unambiguous response. Natural language elaboration re-introduces the ambiguity the SEA was designed to eliminate.'
          }
        ]
      },
      {
        id: 'M5S4',
        title: 'The bigger picture: specification literacy',
        blocks: [
          {
            type: 'text',
            content: 'Every major communication technology has required a new literacy. Writing required learning that spoken conventions do not transfer. Print required standardization. Digital communication required learning that print conventions do not scale to the permanent public record.'
          },
          {
            type: 'text',
            content: 'The agent interface requires a new literacy: the capacity to produce intent specifications precise enough for autonomous execution, and the capacity to respond to agent-generated specification protocols accurately.'
          },
          {
            type: 'callout',
            variant: 'purple',
            title: 'The Knowledge Moat',
            content: 'AI development organizations possess extensive informal knowledge of what directive formulations produce reliable agent execution. This knowledge is embedded in their system prompt architectures and internal specification conventions. It is not published. It is not taught. Formalizing this literacy and making it teachable — which is what Interface Linguistics does — eliminates the artificial scarcity that currently makes good AI outcomes the preserve of specialists.'
          },
          {
            type: 'text',
            content: 'You now have the complete foundational framework. The Directive Lab is where you practice it.'
          }
        ]
      }
    ]
  }
]

export const MODULE_MAP = Object.fromEntries(MODULES.map(m => [m.id, m]))
