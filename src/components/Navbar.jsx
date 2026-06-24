import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { NAV_LINKS, BRAND } from '../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className="nav"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        transition: 'background 0.3s, box-shadow 0.3s',
        background: scrolled ? 'rgba(10,10,18,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 var(--color-border)' : 'none',
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: 'var(--max-width)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <a href="#" style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
          {BRAND.name}<span className="gradient-text">.</span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <ul style={{ display: 'flex', gap: 28, fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-muted)' }}>
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{ transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
                  onMouseLeave={e => e.target.style.color = ''}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
            Join Now
          </a>
        </div>
      </div>
    </motion.nav>
  )
}
