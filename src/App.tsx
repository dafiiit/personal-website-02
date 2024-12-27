import React, { useState } from 'react';
    import ParticleText from './components/ParticleText';
    import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
    import AboutMe from './components/AboutMe';
    import Highlights from './components/Highlights';
    import MenuBar from './components/MenuBar';
    import Gallery from './components/Gallery';
    import Contact from './components/Contact';

    function App() {
      const [showWebsite, setShowWebsite] = useState(false);

      const handleFadeComplete = () => {
        setShowWebsite(true);
      };

      return (
        <Router>
          <div className="w-full h-screen bg-black relative">
            {!showWebsite && <ParticleText onFadeComplete={handleFadeComplete} />}
            {showWebsite && (
              <>
                <MenuBar />
                <div className="pt-20">
                  <Routes>
                    <Route path="/" element={<Navigate to="/about" />} />
                    <Route path="/about" element={<AboutMe />} />
                    <Route path="/highlights" element={<Highlights />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </div>
              </>
            )}
          </div>
        </Router>
      );
    }

    export default App;
