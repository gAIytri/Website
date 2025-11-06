import React, { useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Home';

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
  const slidingRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={styles.appWrapper}>
      <div style={styles.gradientOverlay}></div>
      <div style={styles.contentWrapper}>
    <Navbar
        onComingSoonClick={() => scrollToSection(slidingRef)}
        onAboutUsClick={() => scrollToSection(aboutRef)}
      />
        <main style={styles.mainContent}>
     <Home slidingRef={slidingRef} aboutRef={aboutRef} />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;