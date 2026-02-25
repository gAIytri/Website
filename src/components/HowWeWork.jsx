import React from 'react';
import { FaSearch, FaClipboardCheck, FaPlug, FaPlay, FaBullseye } from 'react-icons/fa';

const steps = [
  {
    icon: FaSearch,
    title: 'Understand',
    description:
      'We start with a conversation, not a pitch. We learn your business, your frustrations, and where your time is actually going.',
  },
  {
    icon: FaClipboardCheck,
    title: 'Design',
    description:
      'We map out exactly what to build and how it fits into your existing tools. You see the plan before a single line of code is written.',
  },
  {
    icon: FaPlug,
    title: 'Integrate',
    description:
      'We build and connect the system directly into your stack. No disruption, no switching tools, no steep learning curve for your team.',
  },
  {
    icon: FaPlay,
    title: 'Launch & Test',
    description:
      'We go live together. We test everything in the real environment, fix what needs fixing, and make sure your team is confident using it.',
  },
  {
    icon: FaBullseye,
    title: 'Support & Evolve',
    description:
      "We don't disappear after launch. We monitor performance, gather feedback, and keep improving the system as your business grows.",
  },
];

const HowWeWork = () => {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.header}>HOW WE WORK</h2>
        <p style={styles.tagline}>From operational insight to deployed intelligence.</p>
        <div className="hww-grid" style={styles.grid}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="hww-card" style={styles.card}>
                <Icon style={styles.icon} />
                <h3 style={styles.title}>{step.title}</h3>
                <p style={styles.description}>{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hww-grid {
            flex-wrap: wrap !important;
            justify-content: center !important;
          }
          .hww-card {
            flex: 1 1 calc(50% - 1rem) !important;
            max-width: calc(50% - 1rem) !important;
          }
        }
        @media (max-width: 768px) {
          .hww-card {
            flex: 1 1 100% !important;
            max-width: 100% !important;
          }
        }
        @media (max-width: 480px) {
          .hww-card {
            padding: 1rem !important;
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
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    color: '#E9EAE8',
    marginBottom: '0.5rem',
    fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
    fontWeight: 500,
  },
  tagline: {
    textAlign: 'center',
    fontSize: 'clamp(1.3rem, 3.5vw, 2.2rem)',
    color: '#E9EAE8',
    marginBottom: '3rem',
    fontWeight: 500,
  },
  grid: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  card: {
    background: 'rgba(7, 45, 31, 0.6)',
    border: '1px solid rgba(2, 230, 115, 0.15)',
    borderRadius: '12px',
    padding: 'clamp(1.2rem, 2.5vw, 2rem)',
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
    color: '#02E673',
    marginBottom: '0.75rem',
  },
  title: {
    color: '#ffffff',
    fontWeight: 500,
    fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
    margin: '0 0 0.5rem 0',
  },
  description: {
    color: 'rgba(233, 234, 232, 0.7)',
    lineHeight: 1.6,
    fontSize: 'clamp(0.82rem, 1.8vw, 0.9rem)',
    margin: 0,
  },
};

export default HowWeWork;
