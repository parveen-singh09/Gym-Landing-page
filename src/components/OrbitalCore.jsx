import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { HERO } from '../data/content'

function OrbitRing({ radius, delay = 0, className = '' }) {
  const ringRef = useRef(null)

  useEffect(() => {
    gsap.to(ringRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center',
      delay,
    })
  }, [delay])

  return (
    <div
      ref={ringRef}
      className={className}
      style={{
        position: 'absolute',
        width: radius * 2,
        height: radius * 2,
        top: '50%',
        left: '50%',
        marginLeft: -radius,
        marginTop: -radius,
        borderRadius: '50%',
        border: '1px solid var(--color-glass-border)',
        pointerEvents: 'none',
      }}
    />
  )
}

function OrbitingCard({ card, index, total }) {
  const cardRef = useRef(null)
  const angle = (360 / total) * index

  useEffect(() => {
    gsap.to(cardRef.current, {
      rotation: -360,
      duration: 20,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center',
    })
  }, [])

  return (
    <div
      ref={cardRef}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 120,
        height: 120,
        marginLeft: -60,
        marginTop: -60,
        borderRadius: 'var(--radius-md)',
        background: 'var(--color-glass)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid var(--color-glass-border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        fontSize: '0.75rem',
        fontWeight: 600,
        color: 'var(--color-text)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        transform: `rotate(${angle}deg) translateY(-160px)`,
      }}
    >
      <span style={{ fontSize: '1.6rem' }}>{card.icon}</span>
      <span>{card.label}</span>
    </div>
  )
}

export default function OrbitalCore() {
  const centerRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    gsap.to(glowRef.current, {
      scale: 1.15,
      opacity: 0.4,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  const cards = HERO.orbitCards
  const radius = 160

  return (
    <div
      style={{
        position: 'relative',
        width: radius * 2 + 120,
        height: radius * 2 + 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />
      <div
        ref={centerRef}
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-soft))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.8rem',
          fontWeight: 800,
          color: '#fff',
          boxShadow: '0 0 60px var(--color-accent-glow), 0 0 120px rgba(34,197,94,0.1)',
          zIndex: 2,
        }}
      >
        P
      </div>

      <OrbitRing radius={radius} delay={0} />
      <OrbitRing radius={radius - 30} delay={-10} />

      <div style={{ position: 'absolute', inset: 0 }}>
        {cards.map((card, i) => (
          <OrbitingCard key={card.label} card={card} index={i} total={cards.length} />
        ))}
      </div>
    </div>
  )
}
