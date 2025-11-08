import React, { useState } from 'react';

const ContactUsForm = () => {
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
      alert('Thank you! We’ll be in touch soon.');
      setFormData({
        name: '',
        company: '',
        industry: '',
        email: '',
        description: '',
      });
    });
  };

  return (
    <section style={styles.container}>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.row}>
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="company"
            placeholder="Company (optional)"
            value={formData.company}
            onChange={handleChange}
            style={styles.input }
          />
          
        <select
  name="industry"
  value={formData.industry}
  onChange={handleChange}
  required
  style={{
    ...styles.input,
    appearance: 'none',          // Removes default arrow + styling (Safari/Chrome)
    WebkitAppearance: 'none',    // Removes white glossy overlay (Safari)
    MozAppearance: 'none',       // Firefox
    backgroundColor: '#072D1F',  // Force same background as inputs
    color: '#f4f4f4',
    opacity: 1,                  // Make text fully visible
    backgroundImage: 'none',     // Prevents gradient overlays
    cursor: 'pointer',
  }}
>
  <option value="" disabled hidden style={{ color: '#888' }}>
    Select Industry *
  </option>
  <option value="Transit">Transit</option>
  <option value="Ecommerce">Ecommerce</option>
  <option value="Retail">Retail</option>
  <option value="Food">Food</option>
  <option value="Education">Education</option>
  <option value="Technology">Technology</option>
</select>
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.row}>

        <textarea
          name="description"
          placeholder="Describe your problem or requirement *"
          value={formData.description}
          
          onChange={handleChange}
          required
          style={{ ...styles.input, height: '100px', width: '100%',color:'#f4f4f4'}}
        />
        </div>


        <button type="submit" style={styles.button}>Submit</button>
      </form>
            <style>
      {`
        input::placeholder,
        textarea::placeholder {
          color: #f4f4f4;
          opacity: 1;
        }
      `}
      </style>
    </section>
  );
};

export default ContactUsForm;

const styles = {
  container: {
    padding: '2.5rem 2.5rem',
    width: '80%',
    margin: 'auto',
    color: '#f4f4f4',
    fontFamily: 'Poppins, sans-serif',
    paddingBottom:'1rem',
    paddingTop:'1rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
    backgroundColor:'#E0E9CC',
    borderRadius:"12px"
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
  borderRadius: '8px',
  border: '1px solid #444',
  backgroundColor: '#072D1F',
  color: '#f4f4f4',
  fontSize: '1rem',
  padding: '0.8rem 0.8rem',
  fontWeight: '500',
  opacity: 1,
  outline: 'none',
},
  button: {
    padding: '0.9rem',
    backgroundColor: '#072D1F',
    color: '#f4f4f4',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    opacity:1
  },
};