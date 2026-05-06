import useReveal from '../hooks/useReveal';
import { FiLayout, FiServer, FiSettings, FiPenTool } from 'react-icons/fi';

const categories = [
    {
        title: 'Frontend',
        icon: FiLayout,
        color: 'var(--accent-primary)',
        skills: ['React', 'Vite', 'JavaScript', 'Laravel', 'bootstrap']
    },
    {
        title: 'Backend & Tools',
        icon: FiServer,
        color: 'var(--accent-secondary)',
        skills: ['Express.js', 'MySQL', 'Git', 'GitHub']
    },
    {
        title: 'Design & Workflow',
        icon: FiPenTool,
        color: 'var(--accent-tertiary)',
        skills: ['Canva']
    }
];

export default function Skills() {
    const headerRef = useReveal(0.1);
    const gridRef = useReveal(0.1);

    return (
        <section id="skills" style={{ padding: '120px 0', background: 'var(--bg-primary)' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                <div ref={headerRef} className="reveal-up" style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <div className="section-label">
                        <span style={{ width: '24px', height: '2px', background: 'var(--accent-tertiary)', display: 'inline-block' }} />
                        Keahlian
                    </div>
                    <h2 className="section-title">Tech Stack & <span className="gradient-text">Workflow</span></h2>
                    <p className="section-desc">Kombinasi teknologi modern & disiplin kerja yang saya gunakan untuk menghasilkan produk berkualitas.</p>
                </div>

                <div ref={gridRef} className="stagger-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                    {categories.map((cat, i) => {
                        const Icon = cat.icon;
                        return (
                            <div key={i} className="stagger-item glass-card" style={{ padding: '32px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                    <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${cat.color}15`, borderRadius: '12px', color: cat.color }}>
                                        <Icon size={22} />
                                    </div>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700', fontFamily: 'Space Grotesk, sans-serif' }}>{cat.title}</h3>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {cat.skills.map((skill, k) => (
                                        <span key={k} className="skill-tag" style={{ borderColor: `${cat.color}30` }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}