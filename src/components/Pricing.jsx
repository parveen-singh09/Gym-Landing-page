import { motion } from 'framer-motion'
import { PRICING } from '../data/content'

function PricingCard({ plan, index }) {
  return (
    <motion.div
      className="glass"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        position: 'relative',
        borderColor: plan.highlighted ? 'var(--color-accent)' : undefined,
        boxShadow: plan.highlighted ? '0 0 40px var(--color-accent-glow)' : undefined,
        transform: plan.highlighted ? 'scale(1.05)' : undefined,
      }}
    >
      {plan.highlighted && (
        <div style={{
          position: 'absolute',
          top: -14,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--color-accent)',
          color: '#fff',
          fontSize: '0.7rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          padding: '6px 20px',
          borderRadius: 20,
        }}>
          Most Popular
        </div>
      )}

      <div>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 8 }}>
          {plan.tier}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontSize: '2.8rem', fontWeight: 800 }}>${plan.price}</span>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{plan.period}</span>
        </div>
      </div>

      <ul style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        flex: 1,
      }}>
        {plan.features.map(f => (
          <li key={f} style={{
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span style={{ color: 'var(--color-accent)' }}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href="#"
        className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-outline'}`}
        style={{ justifyContent: 'center' }}
      >
        Get Started
      </a>
    </motion.div>
  )
}

export default function Pricing() {
  return (
    <section className="section" id="pricing">
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <div className="section-label">Pricing</div>
        <h2 className="section-title">Choose Your Plan</h2>
        <p className="section-sub" style={{ margin: '0 auto' }}>
          No hidden fees. No long-term contracts. Just the tools you need to reach your goals.
        </p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
        alignItems: 'center',
      }}>
        {PRICING.map((p, i) => (
          <PricingCard key={p.tier} plan={p} index={i} />
        ))}
      </div>
    </section>
  )
}
