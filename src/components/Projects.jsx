import useReveal from '../hooks/useReveal';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const projects = [
    {
        title: 'Dashboard Analytics',
        desc: 'Visualisasi data real-time dengan performa tinggi, tema gelap adaptif, dan grafik interaktif.',
        tech: ['React', 'Recharts', 'Tailwind'],
        image: '/images/project1.jpg',
        live: '#',
        code: '#',
    },
    {
        title: 'E-Commerce Minimalis',
        desc: 'Checkout cepat, state management ringan, animasi transisi halus, dan integrasi pembayaran.',
        tech: ['Vite', 'Stripe', 'Zustand'],
        image: '/images/project2.jpg',
        live: '#',
        code: '#',
    },
    {
        title: 'Portfolio Generator',
        desc: 'Template dinamis yang bisa dikustomisasi tanpa build tools kompleks, dengan export statis.',
        tech: ['React Router', 'CSS Variables'],
        image: '/images/project3.jpg',
        live: '#',
        code: '#',
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
                        Beberapa karya yang saya banggakan dan terus dikembangkan.
                    </p>
                </div>

                <div ref={projectsRef} className="stagger-container" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                    gap: 24,
                }}>
                    {projects.map((project, i) => (
                        <div key={i} className="stagger-item gradient-border-card project-card">
                            <div className="project-image-wrapper" style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                />
                                <div className="project-overlay">
                                    <div style={{ display: 'flex', gap: 12 }}>
                                        <a href={project.live} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff', fontSize: '0.85rem', fontWeight: 600, padding: '8px 16px', background: 'rgba(255,255,255,0.2)', borderRadius: 8, backdropFilter: 'blur(4px)' }}>
                                            <FiExternalLink size={14} /> Live
                                        </a>
                                        <a href={project.code} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff', fontSize: '0.85rem', fontWeight: 600, padding: '8px 16px', background: 'rgba(0,0,0,0.5)', borderRadius: 8, backdropFilter: 'blur(4px)' }}>
                                            <FiGithub size={14} /> Code
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div style={{ padding: 24 }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 8 }}>{project.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 16 }}>
                                    {project.desc}
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {project.tech.map((t, k) => (
                                        <span key={k} style={{
                                            fontSize: '0.75rem', padding: '4px 12px',
                                            background: 'rgba(139,92,246,0.1)', color: 'var(--accent-primary)',
                                            borderRadius: 999, fontWeight: 500,
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