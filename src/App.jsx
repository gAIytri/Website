import { useState, useRef, useCallback, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './home';
import TrustSecurity from './components/TrustSecurity';
import { ToastProvider } from './components/ToastContainer';

const styles = {
appWrapper: {
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
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
  zIndex: 0,
},

contentWrapper: {
  position: 'relative',
  zIndex: 1,
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
  const pendingScrollRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // When sectionRefs become available after navigating back to /, handle pending scroll
  useEffect(() => {
    if (sectionRefs && pendingScrollRef.current) {
      const refName = pendingScrollRef.current;
      pendingScrollRef.current = null;
      const ref = sectionRefs[refName];
      if (ref && ref.current) {
        setTimeout(() => {
          const yOffset = -80;
          const element = ref.current;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 50);
      }
    }
  }, [sectionRefs]);

  const scrollToSection = useCallback((refName) => {
    if (location.pathname !== '/') {
      pendingScrollRef.current = refName;
      navigate('/');
      return;
    }
    const ref = sectionRefs?.[refName];
    if (ref && ref.current) {
      const yOffset = -80;
      const element = ref.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [location.pathname, navigate, sectionRefs]);

  return (
    <ToastProvider>
      <div style={styles.appWrapper}>
        <div style={styles.gradientOverlay}></div>
        <div style={styles.contentWrapper}>
          <Navbar
            onServicesClick={() => scrollToSection('servicesRef')}
            onAboutClick={() => scrollToSection('aboutRef')}
            onContactClick={() => scrollToSection('contactRef')}
          />
          <main style={styles.mainContent}>
            <Routes>
              <Route path="/" element={<Home onRefsReady={setSectionRefs} />} />
              <Route path="/trust" element={<TrustSecurity />} />
            </Routes>
          </main>
          <Footer
            onServicesClick={() => scrollToSection('servicesRef')}
            onAboutClick={() => scrollToSection('aboutRef')}
          />
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;