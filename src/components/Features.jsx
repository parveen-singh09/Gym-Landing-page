import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FEATURES } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

function FeatureCard({ feature, index }) {
  return (
    <motion.div
      className="glass"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{
        padding: 36,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '2.4rem', marginBottom: 16 }}>{feature.icon}</div>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 10 }}>{feature.title}</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
        {feature.desc}
      </p>
    </motion.div>
  )
}

export default function Features() {
  return (
    <section className="section" id="features">
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <div className="section-label">Why PULSE</div>
        <h2 className="section-title">Built for Results</h2>
        <p className="section-sub" style={{ margin: '0 auto' }}>
          Every detail of our space is designed to help you show up, push harder, and recover smarter.
        </p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 24,
      }}>
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} />
        ))}
      </div>
    </section>
  )
}
