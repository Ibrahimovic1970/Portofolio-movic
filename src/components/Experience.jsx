import useReveal from '../hooks/useReveal';
import { FiCalendar, FiMapPin, FiBriefcase } from 'react-icons/fi';

const experiences = [
    {
        period: '2023 - Sekarang',
        role: 'IT Support, Networking, dan frontend',
        company: 'SMK TI BAZMA',
        location: 'Bogor, Indonesia',
        desc: 'Mempelajari dan mengelola tentang jaringan komputer, termasuk konfigurasi router, switch, dan firewall. Mempelajari dasar dari kriptografi'
    },
    
];

export default function Experience() {
    const ref = useReveal(0.1);

    return (
        <section id="experience" style={{ padding: '120px 0', background: 'var(--bg-secondary)' }}>
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
                <div ref={ref} className="reveal-up" style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <div className="section-label">
                        <span style={{ width: '24px', height: '1px', background: 'var(--accent-tertiary)', display: 'inline-block' }} />
                        PERJALANAN
                    </div>
                    <h2 className="section-title">Pengalaman & <span className="gradient-text">Pendidikan</span></h2>
                </div>

                <div style={{ position: 'relative', paddingLeft: '32px', borderLeft: '2px solid var(--border-color)' }}>
                    {experiences.map((exp, i) => (
                        <div key={i} style={{ position: 'relative', marginBottom: '48px', paddingLeft: '32px' }}>
                            <div style={{
                                position: 'absolute',
                                left: '-39px',
                                top: '4px',
                                width: '16px',
                                height: '16px',
                                background: 'var(--bg-primary)',
                                border: '3px solid var(--accent-primary)',
                                borderRadius: '50%',
                                zIndex: 1
                            }} />
                            <div className="glass-card" style={{ padding: '24px', transition: 'transform 0.3s var(--ease-out-back)' }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'translateX(8px)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                            >
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FiCalendar size={16} /> {exp.period}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FiMapPin size={16} /> {exp.location}
                                    </span>
                                </div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '4px' }}>{exp.role}</h3>
                                <p style={{ color: 'var(--accent-primary)', fontWeight: '500', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <FiBriefcase size={16} /> {exp.company}
                                </p>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>{exp.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}