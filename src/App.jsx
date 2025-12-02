import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './home';
import { ToastProvider } from './components/ToastContainer';

const styles = {
appWrapper: {
  position: 'relative',
  minHeight: '100vh',
  width: '100vw',
  overflowX: 'hidden',
  fontFamily: 'Poppins, sans-serif',
},

gradientOverlay: {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  background:
    'radial-gradient(circle at -20% 200%, #02E673 -10%, transparent 60%),' +
    'radial-gradient(circle at 95% 130%, #02E673 2%, transparent 40%),' +
    'radial-gradient(circle at 100% 100%, #002E25 -1000%, #111111 200%)',
  backgroundBlendMode: 'screen',
  backgroundColor: '#111111',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  zIndex: 0, // behind all content
},

contentWrapper: {
  position: 'relative',
  zIndex: 1, // above the background
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  color: '#E9EAE8',
},
mainContent: {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
},
};

function App() {
  const [sectionRefs, setSectionRefs] = useState(null);

  const scrollToSection = (ref) => {
    console.log('scrollToSection called', ref);
    if (ref && ref.current) {
      console.log('Ref exists, scrolling to:', ref.current);
      const yOffset = -80; // Offset for navbar height
      const element = ref.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      console.log('Ref not found or not ready');
    }
  };

  return (
    <ToastProvider>
      <div style={styles.appWrapper}>
        <div style={styles.gradientOverlay}></div>
        <div style={styles.contentWrapper}>
          <Navbar
            onProductsClick={() => {
              if (sectionRefs?.productsRef) {
                scrollToSection(sectionRefs.productsRef);
              }
            }}
            onServicesClick={() => {
              if (sectionRefs?.servicesRef) {
                scrollToSection(sectionRefs.servicesRef);
              }
            }}
            onContactClick={() => {
              // TODO: Navigate to Contact page
              console.log('Contact Us clicked');
            }}
          />
          <main style={styles.mainContent}>
            <Home onRefsReady={setSectionRefs} />
          </main>
          <Footer
            onProductsClick={() => {
              console.log('Footer Products clicked', sectionRefs);
              if (sectionRefs?.productsRef) {
                scrollToSection(sectionRefs.productsRef);
              }
            }}
            onServicesClick={() => {
              console.log('Footer Services clicked', sectionRefs);
              if (sectionRefs?.servicesRef) {
                scrollToSection(sectionRefs.servicesRef);
              }
            }}
          />
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;