import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="section" style={{ textAlign: 'center' }}>
      <motion.div
        className="glass"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        style={{
          padding: '80px 40px',
          borderColor: 'var(--color-accent)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, var(--color-accent-glow), transparent 60%)',
          opacity: 0.3,
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            Ready to <span className="gradient-text">Transform?</span>
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--color-text-muted)',
            maxWidth: 500,
            margin: '0 auto 32px',
            lineHeight: 1.7,
          }}>
            Your first session is on us. Come feel the difference a dedicated gym and expert coaches make.
          </p>
          <a href="#" className="btn btn-primary" style={{ fontSize: '1rem', padding: '16px 40px' }}>
            Claim Your Free Trial
          </a>
        </div>
      </motion.div>
    </section>
  )
}
