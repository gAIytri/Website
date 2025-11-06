import React, { useState, useEffect } from 'react';

const words = ['automate', 'optimize', 'scale', 'evolve'];

export default function HeroTypewriter() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000);
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) =>
        deleting ? prev - 1 : prev + 1
      );
    }, deleting ? 60 : 120);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  return (
    <div style={styles.heroSection}>
      <h1 style={styles.heroHeader}>
        Empowering businesses to{' '}
        <span style={styles.rotate}>{words[index].substring(0, subIndex)}</span>
      </h1>
      <p style={styles.heroSubheader}>
        Gaiytri designs intelligent systems that streamline operations, reduce manual effort, and help businesses grow smarter — not harder.
      </p>
    </div>
  );
}

const styles = {
  heroSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '4rem 2rem',
    textAlign: 'center',
    color: '#E9EAE8',
    fontFamily: 'Poppins, sans-serif',
  },
  heroHeader: {
    fontSize: '2.5rem',
    fontWeight: '600',
    lineHeight: '1.2',
  },
  heroSubheader: {
    fontSize: '1.2rem',
    maxWidth: '600px',
    lineHeight: '1.6',
    color: '#B0B0B0',
  },
  rotate: {
    fontWeight: '700',
    color: '#FF55B8',
  },
};