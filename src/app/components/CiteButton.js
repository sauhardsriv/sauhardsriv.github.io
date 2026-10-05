'use client'

import { useEffect, useRef, useState } from 'react'
import { labels } from '../settings'

async function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text)
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  document.execCommand('copy')
  area.remove()
}

// Copies a paper's BibTeX entry and briefly confirms. preventDefault keeps a click inside
// the abstract's <summary> from toggling it.
export default function CiteButton({ bibtex, title, className }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleClick = async (event) => {
    event.preventDefault()
    try {
      await copyText(bibtex)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      title={labels.citeHint}
      aria-label={`${labels.citeHint}: ${title}`}
    >
      <span aria-live="polite">{copied ? labels.citeCopied : labels.paperActions.cite}</span>
    </button>
  )
}
