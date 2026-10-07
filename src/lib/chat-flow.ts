import type { ChatFlowContent, ChatFlowNode, ContactQuestion } from '@/types/content.types'

export interface ChatFlow {
  start: string
  nodes: Record<string, ChatFlowNode>
}

/** One visited node; `answer` is set once the user responded to its input. */
export interface PathEntry {
  nodeId: string
  answer?: string
}

export type FlowStatus = 'active' | 'review' | 'closed'

export interface SummaryItem {
  nodeId: string
  label: string
  value: string
}

export interface LinearQuestion {
  id: string
  label: string
  type: ContactQuestion['type'] | 'choice'
  options?: string[]
}

export function createFlow(content: ChatFlowContent): ChatFlow {
  return {
    start: content.start,
    nodes: Object.fromEntries(content.nodes.map((node) => [node.id, node])),
  }
}

/** Chains questions one after another; the last one ends with the send screen. */
export function createLinearFlow(questions: LinearQuestion[]): ChatFlow {
  const nodes: ChatFlowNode[] = questions.map((q, i) => {
    const next = questions[i + 1]?.id
    const base = { id: q.id, messages: [q.label], label: q.label }
    const linkage = next ? { next } : { end: 'send' as const }
    if (q.type === 'text') return { ...base, ...linkage, input: { kind: 'text' } }
    const labels = q.type === 'boolean' ? ['Sí', 'No'] : (q.options ?? [])
    return {
      ...base,
      ...linkage,
      input: { kind: 'options', options: labels.map((label) => ({ label, next: next ?? '' })) },
    }
  })
  return createFlow({ start: questions[0]?.id ?? '', nodes })
}

export function startPath(flow: ChatFlow): PathEntry[] {
  return [{ nodeId: flow.start }]
}

export function currentNode(flow: ChatFlow, path: PathEntry[]): ChatFlowNode | undefined {
  const last = path[path.length - 1]
  return last ? flow.nodes[last.nodeId] : undefined
}

export function flowStatus(flow: ChatFlow, path: PathEntry[]): FlowStatus {
  const last = path[path.length - 1]
  const node = currentNode(flow, path)
  // A dangling reference ends the flow on the send screen rather than
  // trapping the user in an empty conversation.
  if (!last || !node) return 'review'
  // A completed node at the tail of the path is terminal: applyAnswer only
  // stops advancing on `end` nodes (or a missing `next`, treated as 'send').
  const completed = !node.input || last.answer !== undefined
  if (!completed) return 'active'
  return node.end === 'close' ? 'closed' : 'review'
}

/** Records the answer for the current node and moves to the next node. */
export function applyAnswer(flow: ChatFlow, path: PathEntry[], raw: string): PathEntry[] {
  const node = currentNode(flow, path)
  const trimmed = raw.trim()
  if (!node?.input || !trimmed || flowStatus(flow, path) !== 'active') return path

  let answer = trimmed
  let next = node.next
  if (node.input.kind === 'options') {
    const option = node.input.options.find((o) => o.label === trimmed)
    if (!option) return path
    answer = option.value ?? option.label
    next = option.next || node.next
  }

  const answered = [...path.slice(0, -1), { nodeId: node.id, answer }]
  if (node.end || !next) return answered
  return [...answered, { nodeId: next }]
}

export function summarize(flow: ChatFlow, path: PathEntry[]): SummaryItem[] {
  return path.flatMap((entry) => {
    const label = flow.nodes[entry.nodeId]?.label
    return label && entry.answer !== undefined ? [{ nodeId: entry.nodeId, label, value: entry.answer }] : []
  })
}
