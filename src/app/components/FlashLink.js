'use client'

// In-page link that scrolls to a paper row and flashes it, without changing the URL hash.
export default function FlashLink({ targetId, className, children }) {
  const handleClick = (event) => {
    const el = document.getElementById(targetId)
    if (!el) return

    event.preventDefault()
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })

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
