import { useState, useEffect } from 'react';
import { FiLoader } from 'react-icons/fi';

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulasi progress loading
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // Tunda sedikit agar animasi fade-out terlihat smooth
                    setTimeout(() => setLoading(false), 400);
                    return 100;
                }
                // Random increment agar terlihat natural
                return prev + Math.random() * 12 + 3;
            });
        }, 80);

        return () => clearInterval(interval);
    }, []);

    if (!loading) return null;

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'var(--bg-primary)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            transition: 'opacity 0.5s ease, visibility 0.5s ease',
            opacity: loading ? 1 : 0, visibility: loading ? 'visible' : 'hidden'
        }}>
            <div style={{ position: 'relative', width: 80, height: 80, marginBottom: 24 }}>
                <FiLoader className="spin" size={80} style={{ color: 'var(--accent-primary)' }} />
                <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    border: '3px solid transparent', borderTopColor: 'var(--accent-secondary)',
                    animation: 'spin 1s linear infinite'
                }} />
            </div>
            <h2 style={{
                fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem',
                color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '0.1em'
            }}>
                PORT-MOVIC
            </h2>
            <div style={{ width: 200, height: 4, background: 'var(--bg-card)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{
                    width: `${Math.min(progress, 100)}%`,
                    height: '100%',
                    background: 'var(--gradient-main)',
                    borderRadius: 999,
                    transition: 'width 0.2s ease'
                }} />
            </div>
            <p style={{ marginTop: 12, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Memuat pengalaman digital...
            </p>
        </div>
    );
}