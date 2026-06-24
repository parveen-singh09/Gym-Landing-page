import { motion } from 'framer-motion'
import { CLASSES } from '../data/content'

function ClassCard({ cls, index }) {
  return (
    <motion.div
      className="glass"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: '1.8rem' }}>{cls.icon}</span>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{cls.title}</h3>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
        {cls.desc}
      </p>
      <div style={{
        fontSize: '0.75rem',
        color: 'var(--color-accent-soft)',
        fontWeight: 600,
        letterSpacing: '0.5px',
        marginTop: 'auto',
        paddingTop: 12,
        borderTop: '1px solid var(--color-border)',
      }}>
        {cls.schedule}
      </div>
    </motion.div>
  )
}

export default function Classes() {
  return (
    <section className="section" id="classes">
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <div className="section-label">Our Classes</div>
        <h2 className="section-title">Find Your Workout</h2>
        <p className="section-sub" style={{ margin: '0 auto' }}>
          From powerlifting to yoga — every class is coached with your goals in mind.
        </p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20,
      }}>
        {CLASSES.map((c, i) => (
          <ClassCard key={c.title} cls={c} index={i} />
        ))}
      </div>
    </section>
  )
}
