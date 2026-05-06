import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';

export default function NotFound() {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            // Cari di Google dengan filter site Anda (ganti domain jika sudah live)
            window.open(`https://www.google.com/search?q=site:ahmadibrahim.dev+${encodeURIComponent(search)}`, '_blank');
        }
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'var(--bg-primary)', color: 'var(--text-primary)', textAlign: 'center', padding: '24px', position: 'relative', overflow: 'hidden'
        }}>
            {/* Floating shapes background */}
            <div style={{ position: 'absolute', top: '10%', left: '10%', width: 150, height: 150, borderRadius: '30%', border: '2px solid rgba(139,92,246,0.2)', animation: 'floatGeo 8s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: 100, height: 100, borderRadius: '50%', border: '2px solid rgba(6,182,212,0.2)', animation: 'floatGeo 10s ease-in-out infinite reverse' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <h1 style={{
                    fontSize: 'clamp(6rem, 20vw, 12rem)', fontWeight: 800, lineHeight: 0.9,
                    background: 'var(--gradient-main)', WebkitBackgroundClip: 'text', color: 'transparent',
                    animation: 'glitch 3s infinite', marginBottom: 16
                }}>404</h1>
                <h2 style={{ fontSize: '1.8rem', marginBottom: 12, color: 'var(--text-primary)' }}>Halaman Tidak Ditemukan</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 32, maxWidth: 450, marginInline: 'auto' }}>
                    Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. Coba cari di bawah ini.
                </p>

                <form onSubmit={handleSearch} style={{ display: 'flex', gap: 12, maxWidth: 400, margin: '0 auto 32px' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <FiSearch size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input
                            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari sesuatu..."
                            style={{
                                width: '100%', padding: '12px 12px 12px 36px', background: 'var(--bg-card)',
                                border: '1px solid var(--border-color)', borderRadius: 8, color: 'var(--text-primary)',
                                fontSize: '0.95rem', outline: 'none'
                            }}
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ padding: '12px 20px' }}>
                        <FiSearch size={18} />
                    </button>
                </form>

                <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <FiArrowLeft size={18} /> <span>Kembali ke Beranda</span>
                </Link>
            </div>
        </div>
    );
}