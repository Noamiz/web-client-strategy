import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface CommandPaletteCommand {
  id: string
  label: string
  category: string
  action: () => void
}

interface CommandPaletteProps {
  onClose: () => void
  commands: CommandPaletteCommand[]
}

export function CommandPalette({ onClose, commands }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return commands
    }

    return commands.filter((command) =>
      command.label.toLowerCase().includes(normalizedQuery),
    )
  }, [commands, query])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSelect = useCallback(
    (command: CommandPaletteCommand | undefined) => {
      if (!command) {
        return
      }

      command.action()
      onClose()
    },
    [onClose],
  )

  const activeIndex = useMemo(
    () => (filteredCommands.length === 0 ? -1 : Math.min(highlightedIndex, filteredCommands.length - 1)),
    [filteredCommands.length, highlightedIndex],
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setHighlightedIndex((prev) =>
          Math.min(prev + 1, Math.max(filteredCommands.length - 1, 0)),
        )
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setHighlightedIndex((prev) => Math.max(prev - 1, 0))
      }

      if (event.key === 'Enter') {
        event.preventDefault()
        handleSelect(filteredCommands[activeIndex])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, filteredCommands, handleSelect, onClose])

  return (
    <div className="command-palette-overlay" onClick={onClose} role="presentation">
      <div
        className="command-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          ref={inputRef}
          type="text"
          className="command-palette__input"
          placeholder="Search actions..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <div className="command-palette__list" role="listbox">
          {filteredCommands.length === 0 ? (
            <div className="command-palette__item">
              <span className="command-palette__category">No matches</span>
              <strong>Try a different term</strong>
            </div>
          ) : (
            filteredCommands.map((command, index) => (
              <button
                key={command.id}
                type="button"
                className="command-palette__item"
                role="option"
                aria-selected={index === activeIndex}
                data-active={index === activeIndex}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => handleSelect(command)}
              >
                <span className="command-palette__category">{command.category}</span>
                <strong>{command.label}</strong>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

