import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import CookieConsent from './components/CookieConsenst';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';
import { useAnalytics } from './hooks/useAnalytics';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Skills from './components/Skills';
import GalleryCertificates from './components/GalleryCertificates';
import Projects from './components/Projects';
import FAQ from './components/FAQ';
import Contact from './components/Contact';

export default function App() {
  useAnalytics();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ErrorBoundary>
      <LoadingScreen />
      <SmoothScroll>
        <CustomCursor />
        <BrowserRouter>
          <div
            style={{
              position: 'fixed', top: 0, left: 0, height: '3px',
              background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
              width: `${scrollProgress}%`, zIndex: 9999,
              transition: 'width 0.1s linear'
            }}
          />

          <div className="bg-gradient-mesh" />
          <div className="geo-shapes">
            <div className="geo-shape" /><div className="geo-shape" />
            <div className="geo-shape" /><div className="geo-shape" />
          </div>

          <Navbar />

          <main id="main">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <About />
                  <Experience />
                  <Testimonials />
                  <Skills />
                  <GalleryCertificates />
                  <Projects />
                  <FAQ />
                  <Contact />
                </>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <footer style={{
            textAlign: 'center', padding: '40px 24px',
            borderTop: '1px solid var(--border-color)',
            color: 'var(--text-secondary)', fontSize: '0.85rem'
          }}>
            <p>© {new Date().getFullYear()} Ahmad Ibrahimovic.</p>
          </footer>

          <button
            className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            type="button"
            style={{
              position: 'fixed', bottom: '30px', right: '30px',
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'var(--accent-primary)', border: 'none',
              color: '#fff', cursor: 'pointer', zIndex: 999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem', fontWeight: '600',
              transform: showBackToTop ? 'translateY(0)' : 'translateY(100px)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: showBackToTop ? '0 8px 24px rgba(139, 92, 246, 0.4)' : 'none'
            }}
          >
            ↑
          </button>

          <CookieConsent />
        </BrowserRouter>
      </SmoothScroll>
    </ErrorBoundary>
  );
}