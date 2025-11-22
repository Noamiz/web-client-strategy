import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'

interface AiMessage {
  id: string
  role: 'assistant' | 'user'
  content: string
}

interface AiAssistantPanelProps {
  isOpen: boolean
  onClose: () => void
}

const initialMessages: AiMessage[] = [
  {
    id: 'assistant-welcome',
    role: 'assistant',
    content: 'Hi! I can help you find routes, explain design tokens, and outline next steps.',
  },
]

export function AiAssistantPanel({ isOpen, onClose }: AiAssistantPanelProps) {
  const [messages, setMessages] = useState<AiMessage[]>(initialMessages)
  const [draft, setDraft] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const scrollTarget = endRef.current
    if (scrollTarget && typeof scrollTarget.scrollIntoView === 'function') {
      scrollTarget.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isOpen, messages])

  if (!isOpen) {
    return null
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = draft.trim()
    if (!trimmed) {
      return
    }

    const userMessage: AiMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    }

    const assistantMessage: AiMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: `Noted! (stub) — I will route "${trimmed}" to the appropriate agent once the backend arrives.`,
    }

    setMessages((prev) => [...prev, userMessage, assistantMessage])
    setDraft('')
  }

  return (
    <aside className="ai-panel" role="complementary" aria-label="AI assistant panel">
      <div className="ai-panel__header">
        <div>
          <p className="page-header__eyebrow">AI assistant</p>
          <h2 className="page-header__title">Workspace helper</h2>
        </div>
        <button type="button" className="btn btn-icon" aria-label="Close AI assistant" onClick={onClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="ai-panel__messages">
        {messages.map((message) => (
          <p
            key={message.id}
            className={`ai-message ${message.role === 'assistant' ? 'ai-message--assistant' : 'ai-message--user'}`}
          >
            {message.content}
          </p>
        ))}
        <div ref={endRef} />
      </div>

      <form className="ai-panel__composer" onSubmit={handleSubmit}>
        <textarea
          placeholder="Ask something about this repo..."
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </aside>
  )
}

