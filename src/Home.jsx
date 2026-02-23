import { useRef, useEffect } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import HowWeWork from './components/HowWeWork';
import Industries from './components/Industries';
import AboutUsSection from './components/AboutUS';
import ContactUsForm from './components/ContactUs';

const Home = ({ onRefsReady }) => {
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    if (onRefsReady) {
      onRefsReady({ servicesRef, aboutRef });
    }
  }, [onRefsReady]);

  return (
    <div>
      <Hero />
      <div ref={servicesRef}><Services /></div>
      <HowWeWork />
      <Industries />
      <div ref={aboutRef}><AboutUsSection /></div>
      <ContactUsForm />
    </div>
  );
};
export default Home;
