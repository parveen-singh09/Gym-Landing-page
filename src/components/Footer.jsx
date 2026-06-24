import { BRAND, NAV_LINKS, SOCIALS } from '../data/content'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '60px 24px 40px',
      }}
    >
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: 40,
      }}>
        <div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 12, letterSpacing: '-0.5px' }}>
            {BRAND.name}<span className="gradient-text">.</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.7, maxWidth: 300 }}>
            {BRAND.tagline}. Built for those who show up.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-text-muted)', marginBottom: 16 }}>
            Quick Links
          </h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <a href={link.href} style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
                  onMouseLeave={e => e.target.style.color = ''}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-text-muted)', marginBottom: 16 }}>
            Connect
          </h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {SOCIALS.map(s => (
              <li key={s.label}>
                <a href={s.href} style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
                  onMouseLeave={e => e.target.style.color = ''}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-text-muted)', marginBottom: 16 }}>
            Contact
          </h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            <li>hello@pulse.fit</li>
            <li>555-0123</li>
            <li>123 Fitness Ave</li>
          </ul>
        </div>
      </div>

      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '40px auto 0',
        paddingTop: 24,
        borderTop: '1px solid var(--color-border)',
        fontSize: '0.78rem',
        color: 'var(--color-text-muted)',
        textAlign: 'center',
      }}>
        &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
      </div>
    </footer>
  )
}
