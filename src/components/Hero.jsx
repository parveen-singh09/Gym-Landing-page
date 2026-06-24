import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import OrbitalCore from './OrbitalCore'
import { HERO } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const statsRef = useRef(null)
  const orbitRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        headlineRef.current.children,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 }
      )
      .fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
      .fromTo(ctaRef.current.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 }, '-=0.2')
      .fromTo(statsRef.current.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 }, '-=0.2')
      .fromTo(orbitRef.current, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' }, '-=0.6')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'var(--nav-height)',
        overflow: 'hidden',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 60,
        alignItems: 'center',
      }}>
        <div>
          <h1
            ref={headlineRef}
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 4.8rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-2px',
              marginBottom: 20,
            }}
          >
            {HERO.headline.map((word, i) => (
              <span key={i} style={{ display: 'inline-block', marginRight: '0.15em' }}>
                {i === 1 ? <span className="gradient-text">{word}</span> : word}
              </span>
            ))}
          </h1>

          <p
            ref={subRef}
            style={{
              fontSize: '1.1rem',
              color: 'var(--color-text-muted)',
              maxWidth: 520,
              marginBottom: 32,
              lineHeight: 1.7,
            }}
          >
            {HERO.subcopy}
          </p>

          <div ref={ctaRef} style={{ display: 'flex', gap: 16, marginBottom: 40 }}>
            {HERO.ctas.map((cta, i) => (
              <a
                key={i}
                href={cta.href}
                className={`btn ${cta.primary ? 'btn-primary' : 'btn-outline'}`}
              >
                {cta.label}
              </a>
            ))}
          </div>

          <div
            ref={statsRef}
            style={{
              display: 'flex',
              gap: 36,
              padding: '20px 0',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            {HERO.stats.map(stat => (
              <div key={stat.label}>
                <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>{stat.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={orbitRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <OrbitalCore />
        </div>
      </div>
    </section>
  )
}
