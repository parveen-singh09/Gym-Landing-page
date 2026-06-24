import { motion } from 'framer-motion'
import { TRAINERS } from '../data/content'

function TrainerCard({ trainer, index }) {
  return (
    <motion.div
      className="glass"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{
        padding: 32,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          margin: '0 auto 16px',
          background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-soft))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
        }}
      >
        {trainer.name.charAt(0)}
      </div>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{trainer.name}</h3>
      <div style={{
        fontSize: '0.8rem',
        color: 'var(--color-accent-soft)',
        fontWeight: 600,
        marginBottom: 12,
        letterSpacing: '0.3px',
      }}>
        {trainer.role}
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
        {trainer.bio}
      </p>
    </motion.div>
  )
}

export default function Trainers() {
  return (
    <section className="section" id="trainers">
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <div className="section-label">Expert Team</div>
        <h2 className="section-title">Meet Your Coaches</h2>
        <p className="section-sub" style={{ margin: '0 auto' }}>
          Certified professionals who bring experience, energy, and a genuine passion for helping you improve.
        </p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 24,
      }}>
        {TRAINERS.map((t, i) => (
          <TrainerCard key={t.name} trainer={t} index={i} />
        ))}
      </div>
    </section>
  )
}
