import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // GANTI LINK CV DI SINI
    const CV_LINK = 'https://canva.link/hvatazegicjeckj'; // Bisa juga URL eksternal: 'https://drive.google.com/...'

    const links = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Experience', href: '#experience' },
        { label: 'Skills', href: '#skills' },
        { label: 'GalleryCertificates', href: '#gallery-certificates' },
        { label: 'Projects', href: '#projects' },
        { label: 'Contact', href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.querySelectorAll('section').forEach(section => {
                observer.unobserve(section);
            });
        };
    }, []);

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <a href="#home" style={{ fontFamily: 'Space Grotesk', fontSize: '1.5rem', fontWeight: 700 }}>
                        Port-movic<span style={{ color: 'var(--accent-primary)' }}>.</span>
                    </a>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }} className="desktop-nav">
                        {links.map((link) => {
                            const isActive = activeSection === link.href.replace('#', '');
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    style={{
                                        fontSize: '0.9rem',
                                        fontWeight: isActive ? 700 : 500,
                                        color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                        transition: 'color 0.3s ease',
                                        position: 'relative'
                                    }}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span style={{
                                            position: 'absolute',
                                            bottom: '-4px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '4px',
                                            height: '4px',
                                            background: 'var(--accent-primary)',
                                            borderRadius: '50%'
                                        }} />
                                    )}
                                </a>
                            );
                        })}

                        {/* BUTTON CV */}
                        <a
                            href={CV_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                            style={{
                                padding: '8px 16px',
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            <FiDownload size={16} />
                            CV
                        </a>

                        <a href="#contact" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
                            <span>Hire Me</span>
                        </a>
                    </div>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-primary)',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            display: 'none'
                        }}
                        className="mobile-toggle"
                    >
                        {mobileOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </nav>

            {mobileOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(10,10,15,0.95)',
                    backdropFilter: 'blur(20px)',
                    zIndex: 999,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 32
                }}>
                    {links.map((link, i) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                fontSize: '1.8rem',
                                fontWeight: 600,
                                color: activeSection === link.href.replace('#', '') ? 'var(--accent-primary)' : 'var(--text-primary)',
                                transform: mobileOpen ? 'translateY(0)' : 'translateY(-20px)',
                                transition: `transform 0.5s var(--ease-out-expo) ${i * 0.1}s`
                            }}
                        >
                            {link.label}
                        </a>
                    ))}

                    {/* BUTTON CV - MOBILE */}
                    <a
                        href={CV_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        style={{
                            padding: '12px 24px',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginTop: '16px'
                        }}
                        onClick={() => setMobileOpen(false)}
                    >
                        <FiDownload size={20} />
                        Download CV
                    </a>

                    <a href="#contact" className="btn-primary" onClick={() => setMobileOpen(false)}>
                        <span>Hire Me</span>
                    </a>
                </div>
            )}
        </>
    );
}