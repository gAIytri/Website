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
        <p style={styles.lastUpdated}>Effective Date: December 2025 | Last Updated: December 2025</p>

        {/* Privacy Policy */}
        <section id="privacy-policy" style={styles.section}>
          <h2 style={styles.sectionHeading}>Privacy Policy</h2>

          <h3 style={styles.subHeading}>1. Introduction</h3>
          <p style={styles.body}>
            Gaiytri LLC (&ldquo;Gaiytri,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy and the personal information you share with us. This Privacy Policy describes how we collect, use, store, and safeguard personal data when you access or use our public website and general communication channels (e.g. contact forms, email inquiries).
          </p>
          <p style={styles.body}>
            This policy applies only to our publicly accessible website. Practices for specific products or services (such as custom AI systems or automation solutions) will be explained in separate product or service specific privacy notices provided at the time of use.
          </p>

          <h3 style={styles.subHeading}>2. Information We Collect</h3>
          <p style={styles.body}>
            We collect the following types of information, depending on how you interact with our website:
          </p>
          <p style={styles.subSubHeading}>2.1 Information You Provide Voluntarily</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Name</li>
            <li style={styles.listItem}>Email address</li>
            <li style={styles.listItem}>Phone number (if provided)</li>
            <li style={styles.listItem}>Company name and job related information (if submitted)</li>
            <li style={styles.listItem}>Inquiry or request details</li>
            <li style={styles.listItem}>Files or documents you choose to upload (e.g. resume, attachments)</li>
          </ul>
          <p style={styles.subSubHeading}>2.2 Automatically Collected Information</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>IP address</li>
            <li style={styles.listItem}>Device and browser metadata (device type, browser version, operating system)</li>
            <li style={styles.listItem}>Usage data (pages visited, timestamps)</li>
            <li style={styles.listItem}>Cookies and tracking data for analytics and website performance</li>
          </ul>
          <p style={styles.body}>
            We do not intentionally collect sensitive personal information (e.g. Social Security numbers, health data, etc.) unless you choose to provide it.
          </p>

          <h3 style={styles.subHeading}>3. How We Use Your Information</h3>
          <p style={styles.body}>We may use collected data for the following purposes:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>To respond to your inquiries or requests</li>
            <li style={styles.listItem}>To provide information about our services</li>
            <li style={styles.listItem}>To improve our website functionality, performance, and user experience</li>
            <li style={styles.listItem}>To analyze general usage trends (in anonymized or aggregated form)</li>
            <li style={styles.listItem}>To maintain security and prevent abuse</li>
          </ul>
          <p style={styles.body}>
            We do not use your data for profiling, automated decision making, or targeted advertising.
          </p>

          <h3 style={styles.subHeading}>4. Information Sharing & Disclosure</h3>
          <ul style={styles.list}>
            <li style={styles.listItem}>We will not sell, rent, or trade your personal information under any circumstances.</li>
            <li style={styles.listItem}>We may disclose information if required by law or legal process, or to protect the rights, safety, or property of Gaiytri, our users, or the public.</li>
            <li style={styles.listItem}>We may share data with trusted third party vendors only when required to provide a specific product or service, but those integrations will be disclosed separately in product specific privacy notices.</li>
          </ul>

          <h3 style={styles.subHeading}>5. Cookies and Analytics</h3>
          <p style={styles.body}>
            Our website may use cookies, tracking tools, and analytics services to help understand user behavior and improve site performance. Cookies do not store personal data unless you voluntarily provide that data.
          </p>
          <p style={styles.body}>
            You can manage or disable cookies through your browser settings. Disabling cookies may affect certain website functions, but you will still be able to access general content.
          </p>

          <h3 style={styles.subHeading}>6. Data Security</h3>
          <p style={styles.body}>
            We take commercially reasonable technical and organizational measures to protect your data from unauthorized access, disclosure, alteration, or destruction. However, no security system is absolutely secure.
          </p>
          <p style={styles.body}>
            By using our website, you acknowledge and accept that we cannot guarantee total security of information transferred over the internet.
          </p>

          <h3 style={styles.subHeading}>7. International Access & Data Transfers</h3>
          <p style={styles.body}>
            Given that our website is accessible globally, data submitted by users may be processed and stored in the United States. By providing information, you consent to such transfer, storage, and processing under U.S. law, regardless of your country of origin.
          </p>
          <p style={styles.body}>
            We apply consistent security practices to safeguard data from any location.
          </p>

          <h3 style={styles.subHeading}>8. Data Retention</h3>
          <p style={styles.body}>
            We retain personal information only as long as needed to fulfill the purposes described in this policy or as required by law. If you request deletion or account removal, we commit to deleting your data within 90 days, unless retention is legally required.
          </p>

          <h3 style={styles.subHeading}>9. Your Rights</h3>
          <p style={styles.body}>Depending on your jurisdiction, you may have certain rights regarding your personal data, including:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Right to access the data we hold about you</li>
            <li style={styles.listItem}>Right to correct or update inaccurate data</li>
            <li style={styles.listItem}>Right to request deletion of your data</li>
            <li style={styles.listItem}>Right to withdraw consent or opt out of certain uses where applicable</li>
            <li style={styles.listItem}>Right to opt out of communications</li>
          </ul>
          <p style={styles.body}>
            To exercise these rights, contact us at <a href="mailto:admin@gaiytri.com" style={styles.emailLink}>admin@gaiytri.com</a>. We may require verification of identity before fulfilling requests, to protect user security.
          </p>

          <h3 style={styles.subHeading}>10. Third Party Links</h3>
          <p style={styles.body}>
            Our website may include links to external sites or services. This Privacy Policy does not apply to external sites. We are not responsible for the content or privacy practices of third party websites, and users access them at their own discretion.
          </p>

          <h3 style={styles.subHeading}>11. Children&rsquo;s Privacy</h3>
          <p style={styles.body}>
            We do not knowingly collect personal information from children under 16 years of age. If we become aware of any such data, we will delete it promptly.
          </p>
          <p style={styles.body}>
            Our services are intended for individuals 16 years or older.
          </p>

          <h3 style={styles.subHeading}>12. Policy Changes</h3>
          <p style={styles.body}>
            We may periodically update this Privacy Policy to reflect changes in our business practices, legal requirements, or products. When we do, we will update the &ldquo;Last Updated&rdquo; date. Continued use of the website after changes constitutes acceptance of the revised policy.
          </p>

          <h3 style={styles.subHeading}>13. Governing Law</h3>
          <p style={styles.body}>
            This Privacy Policy is governed by the laws of the State of New Jersey, United States, without regard to conflict of law principles.
          </p>

          <h3 style={styles.subHeading}>14. Contact Us</h3>
          <p style={styles.body}>
            If you have any questions, concerns, or requests regarding your privacy or this policy, please contact:
          </p>
          <p style={styles.body}>
            Gaiytri LLC<br />
            <a href="mailto:admin@gaiytri.com" style={styles.emailLink}>admin@gaiytri.com</a>
          </p>
        </section>

        {/* Terms of Service */}
        <section id="terms-of-service" style={styles.section}>
          <h2 style={styles.sectionHeading}>Terms of Service</h2>

          <h3 style={styles.subHeading}>1. Acceptance of Terms</h3>
          <p style={styles.body}>
            By accessing or using Gaiytri LLC&rsquo;s website (&ldquo;Site&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, please discontinue use of the Site.
          </p>
          <p style={styles.body}>
            These Terms apply solely to our public facing website. Terms relating to specific products, platforms, services, or contracts will be presented separately at the time of engagement.
          </p>

          <h3 style={styles.subHeading}>2. Use of the Website</h3>
          <p style={styles.body}>You agree not to use the Site in any manner that:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Violates applicable laws or regulations</li>
            <li style={styles.listItem}>Interferes with Site security or functionality</li>
            <li style={styles.listItem}>Distributes harmful or malicious content</li>
            <li style={styles.listItem}>Attempts unauthorized access to any systems, servers, or data</li>
          </ul>
          <p style={styles.body}>
            We reserve the right to deny or restrict access to the Site for security or legal reasons.
          </p>

          <h3 style={styles.subHeading}>3. Intellectual Property</h3>
          <p style={styles.body}>
            All content on this Site, including text, graphics, logos, designs, data, and other materials, is owned or licensed by Gaiytri LLC and protected by intellectual property laws.
          </p>
          <p style={styles.body}>
            You may not reproduce, copy, modify, sell, or redistribute any content without explicit written permission.
          </p>

          <h3 style={styles.subHeading}>4. No Professional Advice</h3>
          <p style={styles.body}>
            Information provided on the Site is for general informational purposes only. It is not legal, financial, technical, or professional advice.
          </p>
          <p style={styles.body}>
            Decisions made based on information from the Site are solely your responsibility.
          </p>

          <h3 style={styles.subHeading}>5. Third Party Links</h3>
          <p style={styles.body}>
            The Site may include hyperlinks to external websites. These are provided as a convenience and not as an endorsement.
          </p>
          <p style={styles.body}>Gaiytri LLC is not responsible for:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>External content</li>
            <li style={styles.listItem}>Privacy practices</li>
            <li style={styles.listItem}>Accuracy of information on third party sites</li>
          </ul>
          <p style={styles.body}>Accessing external links is at your discretion.</p>

          <h3 style={styles.subHeading}>6. Disclaimer of Warranties</h3>
          <p style={styles.body}>
            The Site is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of any kind.
          </p>
          <p style={styles.body}>We do not guarantee:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Uninterrupted or error free operation</li>
            <li style={styles.listItem}>Completeness, accuracy, or reliability of Site content</li>
            <li style={styles.listItem}>Immunity from malware or harmful components</li>
          </ul>
          <p style={styles.body}>Use of the Site is at your own risk.</p>

          <h3 style={styles.subHeading}>7. Limitation of Liability</h3>
          <p style={styles.body}>
            To the fullest extent permitted by law, Gaiytri LLC shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Use or inability to use the Site</li>
            <li style={styles.listItem}>Reliance on Site content</li>
            <li style={styles.listItem}>Security breaches</li>
            <li style={styles.listItem}>Loss of data or business interruption</li>
          </ul>
          <p style={styles.body}>
            Some jurisdictions do not allow limitations of liability; in such cases, liability will be limited to the maximum legal extent.
          </p>

          <h3 style={styles.subHeading}>8. Indemnification</h3>
          <p style={styles.body}>
            You agree to indemnify and hold harmless Gaiytri LLC, its officers, employees, and agents from any claims, liabilities, damages, losses, or expenses arising from your use of the Site or violation of these Terms.
          </p>

          <h3 style={styles.subHeading}>9. Governing Law</h3>
          <p style={styles.body}>
            These Terms are governed by the laws of the State of New Jersey, United States, without regard to conflict of law principles.
          </p>

          <h3 style={styles.subHeading}>10. Changes to Terms</h3>
          <p style={styles.body}>
            We may update these Terms at any time. The updated version will be posted on this page with a new &ldquo;Last Updated&rdquo; date.
          </p>
          <p style={styles.body}>
            Continued use of the Site after such updates constitutes acceptance of the revised Terms.
          </p>

          <h3 style={styles.subHeading}>11. Contact Information</h3>
          <p style={styles.body}>
            For questions regarding these Terms, please contact:
          </p>
          <p style={styles.body}>
            <a href="mailto:admin@gaiytri.com" style={styles.emailLink}>admin@gaiytri.com</a><br />
            Gaiytri LLC, Jersey City, New Jersey, USA
          </p>
        </section>

        {/* Cookie Policy */}
        <section id="cookie-policy" style={styles.section}>
          <h2 style={styles.sectionHeading}>Cookie Policy</h2>

          <h3 style={styles.subHeading}>1. What Are Cookies?</h3>
          <p style={styles.body}>
            Cookies are small text files stored on your device when you visit a website. They help improve functionality, performance, and user experience.
          </p>

          <h3 style={styles.subHeading}>2. How We Use Cookies</h3>
          <p style={styles.body}>Our website may use cookies to:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Analyze traffic and user activity</li>
            <li style={styles.listItem}>Enhance user experience and site performance</li>
            <li style={styles.listItem}>Remember basic preferences</li>
          </ul>
          <p style={styles.body}>
            Cookies do not store personal information unless you voluntarily provide it.
          </p>

          <h3 style={styles.subHeading}>3. Types of Cookies Used</h3>
          <p style={styles.subSubHeading}>3.1 Essential Cookies</p>
          <p style={styles.body}>
            Required for basic website functionality. Disabling may impair site operation.
          </p>
          <p style={styles.subSubHeading}>3.2 Analytics Cookies</p>
          <p style={styles.body}>
            Help us understand how visitors use the Site (e.g., Google Analytics). Data is anonymized and used only for performance improvements.
          </p>

          <h3 style={styles.subHeading}>4. Third Party Cookies</h3>
          <p style={styles.body}>
            Some cookies are placed by third party analytics services solely to measure website performance and traffic. These cookies do not identify users personally.
          </p>
          <p style={styles.body}>
            Product specific integrations, if any, are disclosed within product privacy notices, not in this Cookie Policy.
          </p>

          <h3 style={styles.subHeading}>5. Managing or Disabling Cookies</h3>
          <p style={styles.body}>
            You may disable or delete cookies through your browser settings. Doing so may affect certain features but will not block general access to the Site.
          </p>

          <h3 style={styles.subHeading}>6. Updates to this Cookie Policy</h3>
          <p style={styles.body}>
            We may update this Cookie Policy periodically. Changes will be reflected by the &ldquo;Last Updated&rdquo; date.
          </p>

          <h3 style={styles.subHeading}>7. Contact</h3>
          <p style={styles.body}>
            For questions about cookies or data usage, please contact:<br />
            <a href="mailto:admin@gaiytri.com" style={styles.emailLink}>admin@gaiytri.com</a>
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
    fontWeight: 500,
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
    fontWeight: 500,
    margin: '0 0 1.5rem 0',
  },
  subHeading: {
    color: '#E9EAE8',
    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
    fontWeight: 500,
    margin: '1.5rem 0 0.75rem 0',
  },
  subSubHeading: {
    color: 'rgba(233, 234, 232, 0.85)',
    fontSize: 'clamp(0.88rem, 1.8vw, 0.98rem)',
    fontWeight: 500,
    margin: '1rem 0 0.5rem 0',
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
