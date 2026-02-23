import { FaCogs, FaChartBar, FaBrain } from 'react-icons/fa';

const pillars = [
  {
    label: 'AUTOMATE',
    icon: FaCogs,
    title: 'AI Automated Workflows',
    description:
      'We design and deploy automations that remove repetitive work across your tools — CRM, email, Slack, Notion, ERP, and more.',
    bullets: [
      'Workflow orchestration',
      'Intelligent agent triggers',
      'Scalable execution pipelines',
    ],
  },
  {
    label: 'ANALYZE',
    icon: FaChartBar,
    title: 'AI Powered Analytics',
    description:
      'We connect your data sources and generate decision-ready insights, anomalies, forecasts, drivers, and weekly executive summaries.',
    bullets: [
      'KPI trees & data models',
      'Alert & narrative layers',
      'Decision Q&A systems',
    ],
  },
  {
    label: 'CUSTOMIZE',
    icon: FaBrain,
    title: 'AI Customized Systems',
    description:
      'Custom AI built around your workflows, internal knowledge Q&A, support copilots, proposal automation, and ops assistants.',
    bullets: [
      'RAG pipelines & integrations',
      'Evaluation & governance',
      'Production deployment',
    ],
  },
];

const Services = () => {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionHeader}>PRODUCTS & SERVICES</h2>
      <div className="services-grid" style={styles.grid}>
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div key={pillar.label} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.pill}>{pillar.label}</span>
                <Icon style={styles.icon} />
                <h3 style={styles.cardTitle}>{pillar.title}</h3>
              </div>
              <div style={styles.cardBody}>
                <p style={styles.description}>{pillar.description}</p>
                <ul style={styles.bulletList}>
                  {pillar.bullets.map((b) => (
                    <li key={b} style={styles.bulletItem}>
                      <span style={styles.checkmark}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            max-width: 500px !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
      `}</style>
    </section>
  );
};

const styles = {
  section: {
    padding: 'clamp(3rem, 8vh, 6rem) clamp(1.5rem, 5vw, 3rem)',
    fontFamily: 'Poppins, sans-serif',
  },
  sectionHeader: {
    textAlign: 'center',
    fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
    fontWeight: 600,
    letterSpacing: '3px',
    color: '#E9EAE8',
    marginBottom: 'clamp(2rem, 4vh, 3rem)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'clamp(1rem, 2vw, 1.5rem)',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  cardHeader: {
    background: '#072D1F',
    padding: 'clamp(1.25rem, 3vw, 2rem)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 'clamp(0.5rem, 1vw, 0.75rem)',
  },
  pill: {
    fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
    fontWeight: 600,
    letterSpacing: '2px',
    color: '#02E673',
    border: '1px solid #02E673',
    borderRadius: '20px',
    padding: '0.25rem 0.75rem',
  },
  icon: {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    color: '#02E673',
    marginTop: '0.25rem',
  },
  cardTitle: {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    fontWeight: 600,
    color: '#FFFFFF',
    margin: 0,
  },
  cardBody: {
    background: 'rgba(255, 255, 255, 0.03)',
    padding: 'clamp(1.25rem, 3vw, 2rem)',
    borderTop: 'none',
  },
  description: {
    fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
    color: 'rgba(233, 234, 232, 0.7)',
    lineHeight: 1.6,
    margin: '0 0 1rem 0',
  },
  bulletList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  bulletItem: {
    fontSize: 'clamp(0.8rem, 1.4vw, 0.9rem)',
    color: '#E9EAE8',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  checkmark: {
    color: '#02E673',
    fontWeight: 700,
    fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
  },
};

export default Services;
