import { useTypingEffect } from '../hooks/useTypingEffect';
import useReveal from '../hooks/useReveal';
import { FiArrowDown, FiCode, FiGlobe, FiZap } from 'react-icons/fi';

const typingTexts = [
    'Frontend Developer',
    'IT Support',
    'Problem Solver',
    'Networking'
];

const stats = [
    { icon: FiCode, value: '5+', label: 'Proyek Selesai' },
    { icon: FiGlobe, value: '1+', label: 'Tahun Pengalaman' },
    { icon: FiZap, value: '99%', label: 'percaya diri' },
];

export default function Hero() {
    const typedText = useTypingEffect(typingTexts, 75, 35, 1200);
    const mainRef = useReveal(0.1);

    return (
        <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '10%', right: '5%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '5%', left: '10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

            <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                <div ref={mainRef} className="reveal-up" style={{ maxWidth: '640px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: '999px', marginBottom: '24px', fontSize: '0.85rem', color: 'var(--accent-secondary)' }}>
                        <span className="pulse-dot" />
                        Available for freelance work
                    </div>

                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '700', fontFamily: 'Space Grotesk, sans-serif', lineHeight: '1.15', marginBottom: '20px' }}>
                        Halo, Saya <span style={{ color: 'var(--accent-primary)' }}>Ahmad Ibrahimovic</span><br />
                        <span className="gradient-text" style={{ display: 'inline-block', minHeight: '1.1em' }}>
                            {typedText}<span className="typing-cursor"></span>
                        </span>
                    </h1>

                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '520px', marginBottom: '36px', lineHeight: '1.8' }}>
                        Saya membuat website yang tidak hanya menarik secara visual, tetapi juga memberikan pengalaman pengguna yang mulus dan intuitif. 
                    </p>

                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
                        <a href="#projects" className="btn-primary"><span>Lihat Karya</span></a>
                        <a href="#contact" className="btn-secondary">Diskusi Proyek</a>
                    </div>

                    <div className="stagger-container" style={{ display: 'flex', gap: '36px', flexWrap: 'wrap' }}>
                        {stats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <div key={index} className="stagger-item" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--accent-primary)' }}>
                                        <IconComponent size={18} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: '700', fontFamily: 'Space Grotesk, sans-serif' }}>{stat.value}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{stat.label}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="reveal-up" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    <div style={{ position: 'relative', width: '100%', maxWidth: '420px', aspectRatio: '1/1' }}>
                        <div style={{ position: 'absolute', inset: '-10px', borderRadius: '50%', background: 'var(--gradient-main)', filter: 'blur(40px)', transform: 'scale(0.9)' }} />
                        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--border-color)', background: 'var(--bg-card)' }}>
                            <img src="/images/hero.jpeg" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '16px 24px', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                            <div style={{ width: '12px', height: '12px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 0 4px rgba(34,197,94,0.2)' }} />
                            <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Open to Work</span>
                        </div>
                    </div>
                </div>
            </div>

            <a href="#about" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', color: 'var(--text-secondary)', animation: 'bounceDown 2s ease-in-out infinite', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <FiArrowDown size={20} />
                <span>Scroll</span>
            </a>
        </section>
    );
}