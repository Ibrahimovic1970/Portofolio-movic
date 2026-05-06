import useReveal from '../hooks/useReveal';
import { FiExternalLink, FiGithub, FiTrendingUp, FiClock, FiAward } from 'react-icons/fi';

const projects = [
    {
        title: 'Dashboard Analytics',
        problem: 'Klien kesulitan memantau data penjualan real-time dengan performa lambat (load time 8+ detik).',
        solution: 'Membangun dashboard interaktif dengan implementasi caching cerdas, lazy loading chart, dan virtualisasi data untuk handling 10K+ rows.',
        result: '↓ Load time 65% (8s → 2.8s) | ↑ User engagement 40% | 100% Lighthouse score',
        metrics: [
            { icon: FiClock, value: '65%', label: 'Faster Load' },
            { icon: FiTrendingUp, value: '40%', label: 'More Engagement' },
            { icon: FiAward, value: '100', label: 'Lighthouse Score' }
        ],
        tech: ['React', 'Recharts', 'Tailwind', 'React Query'],
        image: '/images/project1.webp',
        live: '#',
        code: '#'
    },
    {
        title: 'E-Commerce Minimalis',
        problem: 'Toko online klien memiliki bounce rate tinggi (68%) karena checkout process yang rumit dan lambat.',
        solution: 'Redesign UX dengan one-page checkout, optimasi gambar WebP, dan integrasi payment gateway dengan lazy loading.',
        result: '↓ Bounce rate 68% → 32% | ↑ Conversion 156% | ↓ Cart abandonment 45%',
        metrics: [
            { icon: FiTrendingUp, value: '156%', label: 'Conversion ↑' },
            { icon: FiClock, value: '45%', label: 'Less Abandonment' },
            { icon: FiAward, value: '98', label: 'Performance Score' }
        ],
        tech: ['Vite', 'Stripe', 'Zustand', 'Framer Motion'],
        image: '/images/project2.webp',
        live: '#',
        code: '#'
    },
    {
        title: 'Portfolio Generator',
        problem: 'Developer pemula butuh waktu 2-3 hari untuk membuat portfolio dari nol dengan hasil yang kurang profesional.',
        solution: 'Membuat template dinamis dengan CLI generator, 10+ tema siap pakai, dan export statis untuk hosting instant.',
        result: '⏱️ Build time 2 hari → 15 menit | 📦 500+ downloads | ⭐ 4.9/5 rating',
        metrics: [
            { icon: FiClock, value: '15min', label: 'Build Time' },
            { icon: FiAward, value: '500+', label: 'Downloads' },
            { icon: FiTrendingUp, value: '4.9', label: 'User Rating' }
        ],
        tech: ['React Router', 'CSS Variables', 'Node.js CLI'],
        image: '/images/project3.webp',
        live: '#',
        code: '#'
    }
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
                    <h2 className="section-title">Proyek <span className="gradient-text">Unggulan</span></h2>
                    <p className="section-desc">Beberapa karya dengan impact terukur untuk klien.</p>
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
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600/111118/8b5cf6?text=' + encodeURIComponent(project.title); }}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                />
                                <div className="project-overlay" style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.4) 60%, transparent 100%)',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    padding: 24,
                                    transform: 'translateY(100%)',
                                    transition: 'transform 0.4s var(--ease-out-expo)'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(100%)'}
                                >
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