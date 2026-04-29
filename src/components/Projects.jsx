import useReveal from '../hooks/useReveal';
import { FiExternalLink, FiGithub, FiTrendingUp, FiClock, FiAward } from 'react-icons/fi';

const projects = [
    {
        title: 'Tools kit belajar',
        problem: 'Para siswa SMK kesulitan untuk belajar tools yang gratis. Maka dari itu saya membuat tools kit belajar untuk membantu mereka belajar dengan lebih mudah dan menyenangkan.',
        solution: 'Bisa membantu mereka belajar dengan lebih interaktif, dan juga tools juga bisa membantu mereka untuk belajar dengan lebih mudah dan menyenangkan.',
        result: '↓ Load time 65% (8s → 2.8s) | ↑ User engagement 40% | 100% Lighthouse score',
        metrics: [
            { icon: FiClock, value: '65%', label: 'Faster Load' },
            { icon: FiTrendingUp, value: '40%', label: 'More Engagement' },
            { icon: FiAward, value: '100', label: 'Lighthouse Score' }
        ],
        tech: ['React', 'Vite', 'Tailwind'],
        image: '/images/tools-kit-belajar.png',
        live: 'https://web-tools-woad-eight.vercel.app/',
        code: 'https://github.com/Ibrahimovic1970/web-tools'
    },
];

export default function Projects() {
    const headerRef = useReveal(0.1);
    const projectsRef = useReveal(0.1);

    return (
        <section id="projects">
            <div className="container">
                <div ref={headerRef} className="reveal-up section-header">
                    <div className="section-label">
                        <span style={{ width: 24, height: 1, background: 'var(--accent-primary)', display: 'inline-block' }} />
                        Portfolio
                    </div>
                    <h2 className="section-title">
                        Proyek <span className="gradient-text">Unggulan</span>
                    </h2>
                    <p className="section-desc">
                        Beberapa karya dengan impact terukur untuk klien.
                    </p>
                </div>

                <div ref={projectsRef} className="stagger-container" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                    gap: 32,
                }}>
                    {projects.map((project, i) => (
                        <div key={i} className="stagger-item gradient-border-card project-card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="project-image-wrapper" style={{ height: 240, overflow: 'hidden', position: 'relative' }}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                    decoding="async"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                />
                                <div className="project-overlay">
                                    <div style={{ display: 'flex', gap: 12 }}>
                                        <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff', fontSize: '0.85rem', fontWeight: 600, padding: '8px 16px', background: 'rgba(255,255,255,0.2)', borderRadius: 8, backdropFilter: 'blur(4px)' }}>
                                            <FiExternalLink size={14} /> Live
                                        </a>
                                        <a href={project.code} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff', fontSize: '0.85rem', fontWeight: 600, padding: '8px 16px', background: 'rgba(0,0,0,0.5)', borderRadius: 8, backdropFilter: 'blur(4px)' }}>
                                            <FiGithub size={14} /> Code
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div style={{ padding: 28, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 16 }}>{project.title}</h3>

                                <div style={{ marginBottom: 16 }}>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 12 }}>
                                        <strong style={{ color: 'var(--text-primary)' }}>🎯 Masalah:</strong> {project.problem}
                                    </p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 12 }}>
                                        <strong style={{ color: 'var(--text-primary)' }}>💡 Solusi:</strong> {project.solution}
                                    </p>
                                    <p style={{ color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.6, padding: '12px', background: 'rgba(6,182,212,0.08)', borderRadius: 8, borderLeft: '3px solid var(--accent-secondary)' }}>
                                        📈 Hasil: {project.result}
                                    </p>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20, padding: '16px', background: 'var(--bg-card)', borderRadius: 12 }}>
                                    {project.metrics.map((metric, k) => {
                                        const Icon = metric.icon;
                                        return (
                                            <div key={k} style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: 4 }}>{metric.value}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{metric.label}</div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
                                    {project.tech.map((t, k) => (
                                        <span key={k} style={{
                                            fontSize: '0.75rem', padding: '6px 12px',
                                            background: 'rgba(139,92,246,0.1)', color: 'var(--accent-primary)',
                                            borderRadius: 999, fontWeight: 600,
                                        }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}