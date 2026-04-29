import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiDownload, FiExternalLink } from 'react-icons/fi';

// ⚙️ KONFIGURASI CV: Ganti sesuai kebutuhan Anda
const CV_CONFIG = {
    type: 'link', // 'link' untuk Canva/Website, 'file' untuk PDF/Gambar lokal
    url: 'https://canva.link/hvatazegicjeckj', // Link Canva atau '/images/CV.pdf'
    label: 'Lihat CV'
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const links = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Experience', href: '#experience' },
        { label: 'Projects', href: '#projects' },
        { label: 'Contact', href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        const observerOptions = { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActiveSection(entry.target.id);
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(sec => observer.observe(sec));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.querySelectorAll('section').forEach(sec => observer.unobserve(sec));
        };
    }, []);

    const cvButton = (
        <a
            href={CV_CONFIG.url}
            target={CV_CONFIG.type === 'link' ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}
        >
            {CV_CONFIG.type === 'link' ? <FiExternalLink size={16} /> : <FiDownload size={16} />}
            {CV_CONFIG.label}
        </a>
    );

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <a href="#home" style={{ fontFamily: 'Space Grotesk', fontSize: '1.5rem', fontWeight: 700 }}>
                        Movic-YC<span style={{ color: 'var(--accent-primary)' }}>.</span>
                    </a>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }} className="desktop-nav">
                        {links.map(link => {
                            const isActive = activeSection === link.href.replace('#', '');
                            return (
                                <a key={link.label} href={link.href} style={{
                                    fontSize: '0.9rem', fontWeight: isActive ? 700 : 500,
                                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                    transition: 'color 0.3s ease', position: 'relative'
                                }}>
                                    {link.label}
                                    {isActive && <span style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', background: 'var(--accent-primary)', borderRadius: '50%' }} />}
                                </a>
                            );
                        })}
                        {cvButton}
                        <a href="#contact" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
                            <span>Hire Me</span>
                        </a>
                    </div>

                    <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '1.5rem', cursor: 'pointer', display: 'none' }} className="mobile-toggle">
                        {mobileOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </nav>

            <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,15,0.95)', zIndex: 999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, transform: mobileOpen ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.5s var(--ease-out-expo)' }}>
                {links.map((link, i) => (
                    <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} style={{
                        fontSize: '1.8rem', fontWeight: 600, color: activeSection === link.href.replace('#', '') ? 'var(--accent-primary)' : 'var(--text-primary)',
                        transform: mobileOpen ? 'translateY(0)' : 'translateY(-20px)', transition: `transform 0.5s var(--ease-out-expo) ${i * 0.1}s`
                    }}>{link.label}</a>
                ))}
                <div onClick={() => setMobileOpen(false)}>{cvButton}</div>
            </div>

            <style>{` @media (max-width: 900px) { .desktop-nav { display: none !important; } .mobile-toggle { display: flex !important; } } `}</style>
        </>
    );
}