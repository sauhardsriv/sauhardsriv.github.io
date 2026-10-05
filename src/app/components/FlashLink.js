'use client'

// In-page link that reveals a paper's abstract, scrolls to its row, and flashes it
// without changing the URL hash.
export default function FlashLink({ targetId, className, children }) {
  const handleClick = (event) => {
    const el = document.getElementById(targetId)
    if (!el) return

    event.preventDefault()
    const abstract = el.querySelector('details')
    if (abstract) abstract.open = true

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })

    // Remove, force a reflow, then re-add so the animation replays on every click.
    el.classList.remove('flash-now')
    void el.offsetWidth
    el.classList.add('flash-now')
  }

  return (
    <a href={`#${targetId}`} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
