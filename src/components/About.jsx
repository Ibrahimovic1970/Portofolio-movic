import useReveal from '../hooks/useReveal';
import { FiHeart, FiTarget, FiStar, FiCoffee } from 'react-icons/fi';

const values = [
    { icon: FiTarget, title: 'Fokus pada Hasil', desc: 'Saya tidak hanya menulis kode, saya memastikan produk Anda mencapai tujuan bisnis.' },
    { icon: FiStar, title: 'Solusi Kreatif', desc: 'Masalah kompleks butuh pendekatan unik. Saya selalu cari cara terbaik, bukan cara termudah.' },
    { icon: FiHeart, title: 'User First', desc: 'Setiap interaksi dirancang untuk kenyamanan pengguna. Teknologi adalah alat, manusia adalah fokus.' },
    { icon: FiCoffee, title: 'Komunikasi Jelas', desc: 'Update rutin, transparansi progress, dan diskusi terbuka adalah kunci kolaborasi sukses.' }
];

export default function About() {
    const headerRef = useReveal(0.1);
    const contentRef = useReveal(0.1);

    return (
        <section id="about" style={{ background: 'var(--bg-secondary)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: 'radial-gradient(circle at 0% 0%, rgba(139,92,246,0.05) 0%, transparent 50%)', pointerEvents: 'none' }} />

            <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                <div ref={headerRef} className="reveal-up" style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <div className="section-label">
                        <span style={{ width: '24px', height: '2px', background: 'var(--accent-secondary)', display: 'inline-block' }} />
                        TENTANG SAYA
                    </div>
                    <h2 className="section-title" style={{ marginBottom: '16px' }}>
                        Lebih dari Sekadar <span className="gradient-text">Developer</span>
                    </h2>
                    <p className="section-desc">
                        Saya percaya bahwa teknologi terbaik adalah yang terasa alami bagi pengguna.
                    </p>
                </div>

                <div ref={contentRef} className="reveal-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '60px', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: '-15px', borderRadius: '24px', background: 'var(--gradient-main)', filter: 'blur(30px)', transform: 'scale(0.95)' }} />
                        <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-color)', aspectRatio: '4/5', background: 'var(--bg-card)' }}>
                            <img src="/images/about.jpg" alt="Working Setup" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '24px', background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, transparent 100%)' }}>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>"Kode yang baik adalah puisi yang bisa dijalankan mesin."</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: '700', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '20px' }}>Perjalanan & Filosofi Kerja</h3>
                        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '32px' }}>
                            <p style={{ marginBottom: '16px' }}>
                                Saya memulai perjalanan di dunia web development sejak 2021, bermula dari rasa penasaran bagaimana website bisa terasa "hidup". Dari sana, saya mendalami React, sistem desain, dan optimasi performa hingga bisa membantu berbagai startup & UMKM membangun kehadiran digital yang profesional.
                            </p>
                            <p style={{ marginBottom: '16px' }}>
                                Bagi saya, development bukan sekadar menulis sintaks. Ini tentang memahami masalah bisnis, menerjemahkannya ke dalam antarmuka yang intuitif, dan memastikan pengalaman pengguna tetap mulus di semua perangkat. Saya bekerja dengan disiplin, transparan, dan selalu mengutamakan kualitas jangka panjang.
                            </p>
                            <p>
                                Saat tidak coding, saya biasanya mengeksplorasi UI trends, membaca tentang product psychology, atau menikmati kopi sambil debugging masalah yang "mustahil" ternyata cuma typo. ☕
                            </p>
                        </div>

                        <div className="stagger-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            {values.map((val, i) => {
                                const Icon = val.icon;
                                return (
                                    <div key={i} className="stagger-item glass-card" style={{ padding: '20px' }}>
                                        <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gradient-subtle)', borderRadius: '10px', color: 'var(--accent-primary)', marginBottom: '12px' }}>
                                            <Icon size={18} />
                                        </div>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '6px' }}>{val.title}</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>{val.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}