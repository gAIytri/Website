import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TrustSecurity = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          const yOffset = -80;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [hash]);

  return (
    <div className="trust-security-page" style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.pageTitle}>Trust & Security</h1>
        <p style={styles.subtitle}>
          Our commitment to protecting your data and maintaining your trust.
        </p>
        <p style={styles.lastUpdated}>Last Updated: February 2026</p>

        {/* Privacy Policy */}
        <section id="privacy-policy" style={styles.section}>
          <h2 style={styles.sectionHeading}>Privacy Policy</h2>

          <h3 style={styles.subHeading}>Information We Collect</h3>
          <p style={styles.body}>
            We may collect the following types of information when you interact with our website or services:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Contact information you voluntarily provide (name, email address, phone number) through our contact form</li>
            <li style={styles.listItem}>Usage data such as pages visited, time spent on pages, and interaction patterns</li>
            <li style={styles.listItem}>Technical data including browser type, device information, and IP address</li>
            <li style={styles.listItem}>Communication data from conversations with our AI assistant</li>
          </ul>

          <h3 style={styles.subHeading}>How We Use Your Information</h3>
          <p style={styles.body}>We use the information we collect to:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Respond to your inquiries and provide requested services</li>
            <li style={styles.listItem}>Improve our website experience and AI systems</li>
            <li style={styles.listItem}>Communicate updates about our services</li>
            <li style={styles.listItem}>Ensure the security and proper functioning of our platform</li>
          </ul>

          <h3 style={styles.subHeading}>Data Sharing</h3>
          <p style={styles.body}>
            We do not sell, trade, or rent your personal information to third parties. We may share information with:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Service providers who assist in operating our platform (cloud hosting, analytics)</li>
            <li style={styles.listItem}>Legal authorities when required by law or to protect our rights</li>
          </ul>

          <h3 style={styles.subHeading}>Data Retention</h3>
          <p style={styles.body}>
            We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy. Conversation data with our AI assistant is processed in real time and not stored permanently.
          </p>

          <h3 style={styles.subHeading}>Your Rights</h3>
          <p style={styles.body}>You have the right to:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Request access to your personal data</li>
            <li style={styles.listItem}>Request correction or deletion of your data</li>
            <li style={styles.listItem}>Opt out of communications at any time</li>
            <li style={styles.listItem}>Contact us with privacy concerns at <a href="mailto:admin@gaiytri.com" style={styles.emailLink}>admin@gaiytri.com</a></li>
          </ul>

          <h3 style={styles.subHeading}>Cookies</h3>
          <p style={styles.body}>
            Our website may use essential cookies to ensure proper functionality. We do not use tracking cookies for advertising purposes.
          </p>
        </section>

        {/* Terms of Service */}
        <section id="terms-of-service" style={styles.section}>
          <h2 style={styles.sectionHeading}>Terms of Service</h2>

          <h3 style={styles.subHeading}>Acceptance of Terms</h3>
          <p style={styles.body}>
            By accessing and using gaiytri.com, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.
          </p>

          <h3 style={styles.subHeading}>Services</h3>
          <p style={styles.body}>
            Gaiytri LLC provides AI consulting, development, and integration services. Our website serves as an informational platform and initial point of contact. Specific service engagements are governed by separate agreements.
          </p>

          <h3 style={styles.subHeading}>Use of AI Assistant</h3>
          <p style={styles.body}>
            Our website features an AI powered assistant designed to answer questions about Gaiytri and our services. The assistant provides general information and should not be considered professional advice. Responses are generated using AI and may not always be fully accurate.
          </p>

          <h3 style={styles.subHeading}>Intellectual Property</h3>
          <p style={styles.body}>
            All content on gaiytri.com, including text, graphics, logos, and software, is the property of Gaiytri LLC and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
          </p>

          <h3 style={styles.subHeading}>Limitation of Liability</h3>
          <p style={styles.body}>
            Gaiytri LLC provides this website and its content on an &ldquo;as is&rdquo; basis. We make no warranties, express or implied, regarding the accuracy, completeness, or reliability of any content. Gaiytri LLC shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or services.
          </p>

          <h3 style={styles.subHeading}>Modifications</h3>
          <p style={styles.body}>
            We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated effective date. Continued use of our website after modifications constitutes acceptance of the updated terms.
          </p>

          <h3 style={styles.subHeading}>Governing Law</h3>
          <p style={styles.body}>
            These terms are governed by and construed in accordance with the laws of the State of New Jersey, United States.
          </p>
        </section>

        {/* Security */}
        <section id="security" style={styles.section}>
          <h2 style={styles.sectionHeading}>Security</h2>

          <h3 style={styles.subHeading}>Our Commitment to Security</h3>
          <p style={styles.body}>
            At Gaiytri, security is foundational to everything we build. As a company that designs and deploys AI systems for businesses, we understand the critical importance of protecting data and maintaining trust.
          </p>

          <h3 style={styles.subHeading}>Infrastructure Security</h3>
          <ul style={styles.list}>
            <li style={styles.listItem}>Our services are hosted on enterprise grade cloud infrastructure (Microsoft Azure)</li>
            <li style={styles.listItem}>All data is encrypted in transit using TLS 1.2+ and at rest using AES 256 encryption</li>
            <li style={styles.listItem}>We implement network isolation and access controls to limit exposure</li>
          </ul>

          <h3 style={styles.subHeading}>Application Security</h3>
          <ul style={styles.list}>
            <li style={styles.listItem}>We follow secure development practices aligned with OWASP guidelines</li>
            <li style={styles.listItem}>All AI systems are built with data privacy by design</li>
            <li style={styles.listItem}>API endpoints are authenticated and rate limited</li>
            <li style={styles.listItem}>We conduct regular security reviews of our codebase</li>
          </ul>

          <h3 style={styles.subHeading}>Data Protection</h3>
          <ul style={styles.list}>
            <li style={styles.listItem}>Client data is processed within isolated environments</li>
            <li style={styles.listItem}>We implement the principle of least privilege for all system access</li>
            <li style={styles.listItem}>Conversation data with our AI assistant is not used to train models</li>
            <li style={styles.listItem}>We maintain strict data segregation between client environments</li>
          </ul>

          <h3 style={styles.subHeading}>AI Safety</h3>
          <ul style={styles.list}>
            <li style={styles.listItem}>Our AI systems include guardrails to prevent misuse and harmful outputs</li>
            <li style={styles.listItem}>We implement content filtering and response validation</li>
            <li style={styles.listItem}>AI models are configured with appropriate access boundaries</li>
            <li style={styles.listItem}>We continuously monitor AI system behavior for anomalies</li>
          </ul>

          <h3 style={styles.subHeading}>Incident Response</h3>
          <ul style={styles.list}>
            <li style={styles.listItem}>We maintain an incident response plan for security events</li>
            <li style={styles.listItem}>Critical vulnerabilities are addressed within 24 hours of discovery</li>
            <li style={styles.listItem}>We commit to transparent communication with affected parties</li>
          </ul>

          <h3 style={styles.subHeading}>Compliance</h3>
          <ul style={styles.list}>
            <li style={styles.listItem}>We are committed to aligning with industry standards and best practices</li>
            <li style={styles.listItem}>Our data handling practices are designed with GDPR and CCPA principles in mind</li>
            <li style={styles.listItem}>We regularly review and update our security posture</li>
          </ul>

          <h3 style={styles.subHeading}>Contact</h3>
          <p style={styles.body}>
            For security concerns or to report a vulnerability, please contact us at{' '}
            <a href="mailto:admin@gaiytri.com" style={styles.emailLink}>admin@gaiytri.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: 'Poppins, sans-serif',
    padding: 'clamp(6rem, 10vh, 8rem) clamp(1.5rem, 5vw, 3rem) clamp(4rem, 8vh, 6rem)',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  pageTitle: {
    color: '#E9EAE8',
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight: 600,
    textAlign: 'center',
    margin: '0 0 0.75rem 0',
  },
  subtitle: {
    color: 'rgba(233, 234, 232, 0.6)',
    fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
    textAlign: 'center',
    margin: '0 0 0.5rem 0',
    lineHeight: 1.6,
  },
  lastUpdated: {
    color: 'rgba(233, 234, 232, 0.4)',
    fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
    textAlign: 'center',
    margin: '0 0 2rem 0',
  },
  section: {
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    padding: 'clamp(2rem, 4vh, 3rem) 0',
  },
  sectionHeading: {
    color: '#E9EAE8',
    fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
    fontWeight: 600,
    margin: '0 0 1.5rem 0',
  },
  subHeading: {
    color: '#E9EAE8',
    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
    fontWeight: 600,
    margin: '1.5rem 0 0.75rem 0',
  },
  body: {
    color: 'rgba(233, 234, 232, 0.7)',
    fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
    lineHeight: 1.8,
    margin: '0 0 0.5rem 0',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 0.5rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  listItem: {
    color: 'rgba(233, 234, 232, 0.7)',
    fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
    lineHeight: 1.8,
    paddingLeft: '1.25rem',
    position: 'relative',
  },
  emailLink: {
    color: '#02E673',
    textDecoration: 'none',
  },
};

// Inject bullet marker styles
const bulletStyle = document.createElement('style');
bulletStyle.textContent = `
  .trust-security-page li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.7em;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #02E673;
  }

  .trust-security-page a[style*="emailLink"]:hover {
    text-decoration: underline !important;
  }
`;
if (!document.head.querySelector('style[data-trust-security]')) {
  bulletStyle.setAttribute('data-trust-security', 'true');
  document.head.appendChild(bulletStyle);
}

export default TrustSecurity;
