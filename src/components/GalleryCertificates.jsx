import { useState } from 'react';
import useReveal from '../hooks/useReveal';

// Ganti src gambar dengan file asli Anda di public/images/
const galleryItems = [
    { id: 1, title: 'Outing', img: 'public/images/galeri1.jpg' },
    { id: 2, title: 'You Amazing', img: 'public/images/galeri.jpg' },
];

const certificates = [
    { id: 1, title: 'Cryptography', issuer: 'Cyberacademy', date: '2024', img: 'public/images/certi1.jpg' },
    { id: 2, title: 'Pengenalan dasar cyber', issuer: 'Cyberacademy', date: '2024', img: 'public/images/certi2.jpg' },
    { id: 3, title: 'Bootcamp Cyber security', issuer: 'Binus', date: '2024', img: 'public/images/certi.png' },
    
];

export default function GalleryCertificates() {
    const [activeTab, setActiveTab] = useState('gallery');
    const ref = useReveal(0.1);

    const items = activeTab === 'gallery' ? galleryItems : certificates;

    return (
        <section id="gallery-certificates" style={{ padding: '120px 0', background: 'var(--bg-secondary)' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                <div ref={ref} className="reveal-up" style={{ textAlign: 'center', marginBottom: 48 }}>
                    <div className="section-label">
                        <span style={{ width: '24px', height: '2px', background: 'var(--accent-secondary)', display: 'inline-block' }} />
                        GALERI & SERTIFIKAT
                    </div>
                    <h2 className="section-title">Dokumentasi & <span className="gradient-text">Pencapaian</span></h2>
                    <p className="section-desc">Beberapa Foto yang saya ambil dari kegiatan saya</p>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 40 }}>
                    <button
                        onClick={() => setActiveTab('gallery')}
                        style={{
                            padding: '10px 24px', borderRadius: 999, border: 'none', cursor: 'pointer',
                            background: activeTab === 'gallery' ? 'var(--accent-primary)' : 'var(--bg-card)',
                            color: activeTab === 'gallery' ? '#fff' : 'var(--text-secondary)',
                            fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.3s ease'
                        }}
                    >
                        Galeri
                    </button>
                    <button
                        onClick={() => setActiveTab('certificates')}
                        style={{
                            padding: '10px 24px', borderRadius: 999, border: 'none', cursor: 'pointer',
                            background: activeTab === 'certificates' ? 'var(--accent-primary)' : 'var(--bg-card)',
                            color: activeTab === 'certificates' ? '#fff' : 'var(--text-secondary)',
                            fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.3s ease'
                        }}
                    >
                        Sertifikat
                    </button>
                </div>

                {/* Grid Items */}
                <div className="stagger-container" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 24
                }}>
                    {items.map((item) => (
                        <div key={item.id} className="stagger-item glass-card" style={{ overflow: 'hidden', position: 'relative' }}>
                            <div style={{ height: 200, overflow: 'hidden' }}>
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    loading="lazy"
                                    onError={(e) => { e.target.src = `https://via.placeholder.com/600x400/111118/8b5cf6?text=${encodeURIComponent(item.title)}`; }}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            </div>
                            <div style={{ padding: '20px 16px' }}>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 4 }}>{item.title}</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {activeTab === 'certificates' ? `${item.issuer} • ${item.date}` : 'Dokumentasi proyek & aktivitas'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}