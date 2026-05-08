import useReveal from '../hooks/useReveal';
import { FiMessageSquare } from 'react-icons/fi';

const testimonials = [
    {
        name: 'Muhammad Dzikri',
        role: 'Teman',
        quote: 'Ahmad Ibrahimovic adalah teman yang inisiatif dan selalu siap membantu. Dia memiliki semangat belajar yang tinggi dan selalu berusaha untuk berkembang.',
        img: 'public/images/Dzikri.jpg'
    },
];

export default function Testimonials() {
    const ref = useReveal(0.1);

    return (
        <section id="testimonials" style={{ padding: '120px 0', background: 'var(--bg-primary)' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                <div ref={ref} className="reveal-up" style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <div className="section-label">
                        <span style={{ width: '24px', height: '1px', background: 'var(--accent-secondary)', display: 'inline-block' }} />
                        Testimoni
                    </div>
                    <h2 className="section-title">Apa Kata <span className="gradient-text">Mereka</span></h2>
                    <p className="section-desc">Feedback langsung dari klien yang telah berkolaborasi.</p>
                </div>

                <div className="stagger-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                    {testimonials.map((t, i) => (
                        <div key={i} className="stagger-item glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <FiMessageSquare size={32} style={{ color: 'var(--accent-primary)', marginBottom: '-8px' }} />
                            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-secondary)', flex: 1 }}>"{t.quote}"</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <img
                                    src={t.img}
                                    alt={t.name}
                                    onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(t.name) + '&background=8b5cf6&color=fff'; }}
                                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }}
                                />
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: '600' }}>{t.name}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}