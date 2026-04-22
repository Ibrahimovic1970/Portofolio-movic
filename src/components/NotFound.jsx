import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', color: 'var(--text-primary)', textAlign: 'center', padding: '24px' }}>
            <h1 style={{ fontSize: 'clamp(4rem, 15vw, 8rem)', fontWeight: 800, lineHeight: 1, background: 'var(--gradient-main)', WebkitBackgroundClip: 'text', color: 'transparent', marginBottom: '16px' }}>404</h1>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Halaman Tidak Ditemukan</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '450px' }}>
                Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
            </p>
            <Link to="/" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiArrowLeft size={18} /> <span>Kembali ke Beranda</span>
            </Link>
        </div>
    );
}