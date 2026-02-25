import { useState } from 'react';
import { useToast } from './ToastContainer';

const ContactUsForm = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    industry: '',
    email: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdNCMRrhld87swedo5ljBFA-rk1ghFjJJT4uZAlkphMttiwpA/formResponse';
    const formBody = new FormData();
    formBody.append('entry.838571376', formData.name);
    formBody.append('entry.387779500', formData.company);
    formBody.append('entry.1890139754', formData.industry);
    formBody.append('entry.815722688', formData.email);
    formBody.append('entry.445429351', formData.description);

    fetch(formUrl, {
      method: 'POST',
      mode: 'no-cors',
      body: formBody,
    }).then(() => {
      showToast('Thank you! We will be in touch soon.', 'success', 4000);
      setFormData({
        name: '',
        company: '',
        industry: '',
        email: '',
        description: '',
      });
    }).catch(() => {
      showToast('Something went wrong. Please try again.', 'error', 4000);
    });
  };

  return (
    <section style={styles.container}>
      {/* Row 1: Contact Us Heading */}
 

      {/* Row 4: Two Column Layout */}
      <div style={styles.formSection} className="contact-form-section">
        {/* Left Side - Text */}
        <div style={styles.leftText} className="contact-left-text">
              <h2 style={styles.mainHeading}>Contact Us</h2>

              {/* Row 2: Reach Us At */}
              <div>
                <h3 style={styles.subHeading}>REACH US AT</h3>
              </div>


              {/* Row 3: Contact Information */}
              <div style={styles.contactInfo}>
                <span>admin@gaiytri.com</span>
              </div>
        </div>

        <div style={{marginRight:'2rem'}} className="contact-or-divider"><h3 style={styles.subHeading}>OR</h3></div>


        {/* Right Side - Form */}
        <div style={styles.formBox} className="contact-form-box">
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Row 1: Name and Company side by side */}
            <div style={styles.row}>
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            {/* Row 2: Email */}
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.inputFull}
            />

            {/* Row 3: Industry Dropdown */}
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              style={{
                ...styles.inputFull,
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                cursor: 'pointer',
                color: formData.industry ? '#000000' : '#666',
              }}
            >
              <option value="" disabled hidden>
                Select Industry *
              </option>
              <option value="Transit">Transit</option>
              <option value="Ecommerce">Ecommerce</option>
              <option value="Retail">Retail</option>
              <option value="Food">Food</option>
              <option value="Education">Education</option>
              <option value="Technology">Technology</option>
            </select>

            {/* Row 4: Message/Description */}
            <textarea
              name="description"
              placeholder="Message *"
              value={formData.description}
              onChange={handleChange}
              required
              style={styles.textarea}
            />

            {/* Submit Button */}
            <button type="submit" style={styles.button}>SUBMIT</button>
          </form>
        </div>
      </div>

      <style>
        {`
          input::placeholder,
          textarea::placeholder,
          select::placeholder {
            color: #666;
            opacity: 1;
          }

          /* Mobile responsive - vertical layout */
          @media (max-width: 768px) {
            .contact-form-section {
              flex-direction: column !important;
              align-items: center !important;
              flex-wrap: nowrap !important;
              width: 100% !important;
              gap: 0 !important;
              padding: 0 !important;
            }

            .contact-left-text {
              text-align: center !important;
              padding-top: 0 !important;
              padding-left: 1rem !important;
              padding-right: 1rem !important;
              width: 100% !important;
              min-width: 100% !important;
              flex: 0 0 100% !important;
              margin-bottom: 1.5rem !important;
              order: 1 !important;
              box-sizing: border-box !important;
            }

            .contact-or-divider {
              margin: 0 !important;
              margin-bottom: 1.5rem !important;
              width: 100% !important;
              min-width: 100% !important;
              flex: 0 0 100% !important;
              text-align: center !important;
              order: 2 !important;
            }

            .contact-form-box {
              width: 100% !important;
              min-width: 100% !important;
              max-width: 100% !important;
              flex: 0 0 auto !important;
              order: 3 !important;
              margin: 0 !important;
              padding: 1.5rem !important;
              box-sizing: border-box !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default ContactUsForm;

const styles = {
  container: {
    padding: 'clamp(2rem, 8vh, 3rem) 0',
    backgroundColor: '#000000',
    color: '#E9EAE8',
    fontFamily: 'Poppins, sans-serif',
    width: '100%',
    marginTop:'10rem'
  },
  mainHeading: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 'clamp(1rem, 3vh, 2rem)',
    color: '#E9EAE8',
  },
  subHeading: {
    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 'clamp(0.4rem, 1vh, 0.5rem)',
    color: '#E9EAE8',
    letterSpacing: '2px',
  },
  contactInfo: {
    fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
    textAlign: 'center',
    marginBottom: 'clamp(2rem, 5vh, 4rem)',
    color: 'rgba(233, 234, 232, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 'clamp(0.5rem, 2vw, 1rem)',
  },
  separator: {
    color: 'rgba(233, 234, 232, 0.4)',
  },
  formSection: {
    display: 'flex',
    gap: 'clamp(2rem, 5vw, 4rem)',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    flexWrap: 'wrap',
    padding: '0 clamp(1.5rem, 5vw, 3rem)',
    justifyContent:'center'
  },
  leftText: {
    flex: '1',
    minWidth: 'min(250px, 100%)',
    paddingTop: '2rem',
    width: 'auto',
  },
  formHeading: {
    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
    fontWeight: '400',
    lineHeight: '1.4',
    color: '#E9EAE8',
  },
  formBox: {
    flex: '1.5',
    minWidth: 'min(300px, 100%)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
    borderRadius: '8px',
    boxSizing: 'border-box',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  row: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    minWidth: 'min(200px, 100%)',
    padding: '0.9rem 1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
    outline: 'none',
    boxSizing: 'border-box',
  },
  inputFull: {
    width: '100%',
    padding: '0.9rem 1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
    outline: 'none',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '0.9rem 1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
    outline: 'none',
    minHeight: '120px',
    resize: 'vertical',
    fontFamily: 'Poppins, sans-serif',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#02E673',
    color: '#000000',
    border: 'none',
    borderRadius: '4px',
    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    letterSpacing: '1px',
    boxSizing: 'border-box',
  },
};
