import { FaShoppingCart, FaBullhorn, FaHospital, FaUniversity, FaTruck, FaCode } from 'react-icons/fa';

const industries = [
  {
    name: 'Retail & E-Commerce',
    icon: FaShoppingCart,
    description: 'Inventory AI, demand forecasting, customer journey automation',
  },
  {
    name: 'Marketing & Agencies',
    icon: FaBullhorn,
    description: 'Lead workflows, campaign analytics, proposal automation',
  },
  {
    name: 'Healthcare & Wellness',
    icon: FaHospital,
    description: 'Patient intake automation, knowledge assistants, compliance AI',
  },
  {
    name: 'Finance & Professional Services',
    icon: FaUniversity,
    description: 'Report automation, contract AI, decision support dashboards',
  },
  {
    name: 'Operations & Logistics',
    icon: FaTruck,
    description: 'Process automation, ERP integration, supply chain intelligence',
  },
  {
    name: 'SaaS & Technology',
    icon: FaCode,
    description: 'AI-powered features, internal copilots, data pipelines',
  },
];

const Industries = () => {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionHeader}>INDUSTRIES WE SERVE</h2>
      <p style={styles.tagline}>AI that fits your industry, not the other way around.</p>
      <div style={styles.grid} className="industries-grid">
        {industries.map((industry) => {
          const Icon = industry.icon;
          return (
            <div key={industry.name} style={styles.card} className="industry-card">
              <div style={styles.iconContainer}>
                <Icon style={styles.icon} />
              </div>
              <h3 style={styles.name}>{industry.name}</h3>
              <p style={styles.description}>{industry.description}</p>
            </div>
          );
        })}
      </div>

      <style>{`
        .industry-card {
          transition: border-color 0.3s ease;
        }
        .industry-card:hover {
          border-color: rgba(2, 230, 115, 0.2) !important;
        }
        @media (max-width: 1024px) {
          .industries-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .industries-grid {
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
    padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 5vw, 3rem)',
    fontFamily: 'Poppins, sans-serif',
  },
  sectionHeader: {
    textAlign: 'center',
    fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
    fontWeight: 600,
    letterSpacing: '3px',
    color: '#E9EAE8',
    marginBottom: '0.75rem',
  },
  tagline: {
    textAlign: 'center',
    fontSize: 'clamp(1.3rem, 3.5vw, 2.2rem)',
    color: '#E9EAE8',
    margin: '0 0 clamp(2rem, 4vh, 3rem) 0',
    fontFamily: 'Poppins, sans-serif',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'clamp(1rem, 2vw, 1.5rem)',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: 'clamp(1.5rem, 3vw, 2rem)',
  },
  iconContainer: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#072D1F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  icon: {
    fontSize: '18px',
    color: '#02E673',
  },
  name: {
    fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
    fontWeight: 700,
    color: '#E9EAE8',
    margin: '0 0 0.5rem 0',
  },
  description: {
    fontSize: 'clamp(0.8rem, 1.4vw, 0.9rem)',
    color: 'rgba(233, 234, 232, 0.6)',
    lineHeight: 1.6,
    margin: 0,
  },
};

export default Industries;
