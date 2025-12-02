import { useRef, useEffect } from 'react';
import Hero from './components/Hero';
import Products from './components/Products';
import Services from './components/Services';
import ContactUsForm from './components/ContactUs';

const Home = ({ onRefsReady }) => {
  const productsRef = useRef(null);
  const servicesRef = useRef(null);

  // Pass refs to parent when they're ready
  useEffect(() => {
    if (onRefsReady) {
      onRefsReady({ productsRef, servicesRef });
    }
  }, [onRefsReady]);

  return (
    <div>
      {/* Hero Section with Video Background */}
      <Hero />

      {/* Products Section */}
      <div ref={productsRef}>
        <Products />
      </div>

      {/* Services Section */}
      <div ref={servicesRef}>
        <Services />
      </div>

      {/* Contact Us Section */}
      <ContactUsForm />
    </div>
  );
};

export default Home;