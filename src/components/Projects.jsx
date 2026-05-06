import useReveal from '../hooks/useReveal';
import { FiExternalLink, FiGithub, FiTrendingUp, FiClock, FiAward } from 'react-icons/fi';

const projects = [
    {
        title: 'BazmaTools',
        problem: 'Saya berfikir untuk membuat alat bantu untuk mempermudah proses belajar.',
        solution: 'membuat tools dengan fitur yang akan di butuhkan oleh pelajar, seperti kalkulator, konverter, dan lain-lain.',
        result: '↓ Load time 65% (8s → 2.8s) | ↑ User engagement 40% | 100% Lighthouse score',
        metrics: [
            { icon: FiClock, value: '65%', label: 'Faster Load' },
            { icon: FiTrendingUp, value: '40%', label: 'More Engagement' },
            { icon: FiAward, value: '100', label: 'Lighthouse Score' }
        ],
        tech: ['React', 'React Query', 'Vite', 'CSS'],
        image: '/public/images/tools-kit-belajar.png',
        liveUrl: 'https://web-tools-woad-eight.vercel.app/', 
        githubUrl: 'https://github.com/Ibrahimovic1970/web-tools' 
    },
    {
        title: 'Website Bantu-Sosial',
        problem: 'Saya merasa banyak organisasi sosial yang kesulitan membangun kehadiran digital yang efektif untuk menggalang dukungan dan donasi.',
        solution: 'Membangun website yang memudahkan organisasi sosial dalam menggalang dukungan dan donasi melalui fitur yang intuitif dan menarik.',
        result: '↑ User satisfaction 90% | ↓ Bounce rate 30% | 100% SEO score',
        metrics: [
            { icon: FiClock, value: '90%', label: 'User Satisfaction' },
            { icon: FiTrendingUp, value: '30%', label: 'Lower Bounce Rate' },
            { icon: FiAward, value: '100', label: 'SEO Score' }
        ],
        tech: ['React', 'CSS', 'Vite'],
        image: '/public/images/aksa.png',
        liveUrl: 'https://website-aksa.vercel.app/',
        githubUrl: 'https://github.com/Ibrahimovic1970/website-aksa'
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
                        PORTFOLIO
                    </div>
                    <h2 className="section-title">Proyek <span className="gradient-text">Unggulan</span></h2>
                    <p className="section-desc">Beberapa karya dengan impact terukur untuk klien. Klik untuk melihat hasil langsung.</p>
                </div>

                <div ref={projectsRef} className="stagger-container" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                    gap: 32,
                }}>
                    {projects.map((project, i) => (
                        <a
                            key={i}
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="stagger-item gradient-border-card project-card"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                textDecoration: 'none',
                                color: 'inherit',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Gambar Project dengan Overlay Klik */}
                            <div className="project-image-wrapper" style={{ height: 240, overflow: 'hidden', position: 'relative' }}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600/111118/8b5cf6?text=' + encodeURIComponent(project.title); }}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                                />

                                {/* Overlay Hover: Muncul saat mouse diarahkan */}
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'rgba(10,10,15,0.7)',
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center',
                                    gap: 12, opacity: 0,
                                    transition: 'opacity 0.3s ease',
                                    backdropFilter: 'blur(4px)'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                                >
                                    <span style={{
                                        padding: '10px 24px', background: 'var(--accent-primary)', color: '#fff',
                                        borderRadius: '999px', fontWeight: 600, fontSize: '0.95rem',
                                        boxShadow: '0 4px 15px rgba(139,92,246,0.4)'
                                    }}>
                                        🔗 Lihat Project Langsung
                                    </span>
                                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
                                        Dibuka di tab baru
                                    </span>
                                </div>
                            </div>

                            {/* Konten Project */}
                            <div style={{ padding: 28, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 16 }}>{project.title}</h3>

                                <div style={{ marginBottom: 16 }}>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 12 }}>
                                        <strong style={{ color: 'var(--text-primary)' }}>🎯 Masalah:</strong> {project.problem}
                                    </p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 12 }}>
                                        <strong style={{ color: 'var(--text-primary)' }}>💡 Solusi:</strong> {project.solution}
                                    </p>
                                    <p style={{
                                        color: 'var(--accent-secondary)', fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.6,
                                        padding: '12px', background: 'rgba(6,182,212,0.08)', borderRadius: 8,
                                        borderLeft: '3px solid var(--accent-secondary)', margin: 0
                                    }}>
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

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto', alignItems: 'center' }}>
                                    {project.tech.map((t, k) => (
                                        <span key={k} style={{
                                            fontSize: '0.75rem', padding: '6px 12px',
                                            background: 'rgba(139,92,246,0.1)', color: 'var(--accent-primary)',
                                            borderRadius: 999, fontWeight: 600,
                                        }}>
                                            {t}
                                        </span>
                                    ))}

                                    {/* Tombol Tambahan di dalam card */}
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()} // Mencegah klik github menutup link utama
                                        style={{
                                            marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6,
                                            fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500,
                                            padding: '4px 8px', borderRadius: 6, transition: 'color 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                                    >
                                        <FiGithub size={16} /> Source
                                    </a>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}