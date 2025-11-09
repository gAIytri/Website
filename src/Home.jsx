import React, { useRef } from 'react';
import SlidingSection from './components/SlidingSection';
import AboutUsSection from './components/AboutUS';
import ContactUsForm from './components/ContactUs.jsx';
import CenteredChat from './components/CenteredChat';

const styles = {
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 'clamp(4rem, 15vh, 10rem)',
    padding: '0 clamp(1rem, 5vw, 2rem)',
  },
  heroHeading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
    fontFamily: 'Poppins, sans-serif',
    color: '#E9EAE8',
    margin: 0,
    lineHeight: '1.2',
  },
  subtext: {
    fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
    fontWeight: 300,
    textAlign: 'center',
    opacity: 0.85,
    marginTop: '1rem',
    padding: '0 1rem',
    lineHeight: '1.6',
  },
  conatiner:{
     backgroundColor: 'transparent',
  },
  chatSection: {
    paddingTop: '2rem',
    paddingBottom: '1rem',
  },
slidingLeftFlush: {
  paddingTop: '15rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem', // tighten the gap
  flexDirection:'column'
},


  slidingRightFlush: {
    padding: '7rem 0 2rem', // touch right, pad left
    display: 'flex',
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center'
  },
  slidingCentered: {
    paddingTop: '20rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:'5rem',
    paddingLeft:"1rem",
    paddingRight:"1rem",
    flexDirection:'column',
  },
    title: {
    fontSize: '3rem',
    marginBottom: '0.7rem',
    textAlign:'center',
    marginBottom:"1.5rem"
  },


};
const Home = ({slidingRef, aboutRef}) => {

  // Expose ref to parent (App) to pass into Navbar


  return (
    <div>
      <div style={styles.headerSection}>
        <h1 style={styles.heroHeading}>
          Empowering businesses to automate,<br />
          optimize, evolve and scale
        </h1>
        <p style={styles.subtext}>
          Gaiytri designs intelligent systems that streamline operations,<br />
          reduce manual effort, and help businesses grow smarter
        </p>
      </div>

      {/* AI Chat Section */}
      <div style={styles.chatSection}>
        <CenteredChat />
      </div>

         <div style={styles.slidingLeftFlush} ref={slidingRef}>

               <h2 style={styles.title}>Product & servcies</h2>
                <SlidingSection />


        </div>
               
         

        <div style={styles.slidingRightFlush} ref={aboutRef}>
       <h2 style={styles.title}>Our Founders</h2>
          <AboutUsSection />
        </div>

        <div style={styles.slidingCentered}>
           <h2 style={styles.title}>Contact Us</h2>
          <ContactUsForm />
        </div>
    </div>
  );
};

export default Home;