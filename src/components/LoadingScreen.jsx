import { useState, useEffect } from 'react';
import { FiLoader, FiCheck } from 'react-icons/fi';

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState('loading'); // 'loading' | 'complete'

    useEffect(() => {
        // Simulasi progress loading yang natural
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setPhase('complete');
                    // Tunda sebentar agar animasi complete terlihat
                    setTimeout(() => setLoading(false), 600);
                    return 100;
                }
                // Increment random agar terasa natural, bukan mekanis
                const increment = prev < 30 ? Math.random() * 15 + 5
                    : prev < 70 ? Math.random() * 10 + 3
                        : Math.random() * 8 + 2;
                return Math.min(prev + increment, 100);
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    if (!loading) return null;

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'var(--bg-primary)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s',
            opacity: loading ? 1 : 0,
            visibility: loading ? 'visible' : 'hidden',
            overflow: 'hidden'
        }}>
            {/* Background animated gradient blobs */}
            <div style={{
                position: 'absolute', top: '-20%', left: '-10%', width: '500px', height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
                animation: 'blobFloat1 6s ease-in-out infinite alternate',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute', bottom: '-15%', right: '-10%', width: '400px', height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
                filter: 'blur(60px)',
                animation: 'blobFloat2 7s ease-in-out infinite alternate-reverse',
                pointerEvents: 'none'
            }} />

            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    width: `${4 + Math.random() * 6}px`,
                    height: `${4 + Math.random() * 6}px`,
                    borderRadius: '50%',
                    background: `rgba(${i % 2 === 0 ? '139,92,246' : '6,182,212'}, ${0.2 + Math.random() * 0.3})`,
                    top: `${10 + Math.random() * 80}%`,
                    left: `${10 + Math.random() * 80}%`,
                    animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite alternate`,
                    animationDelay: `${Math.random() * 2}s`,
                    pointerEvents: 'none'
                }} />
            ))}

            {/* Main content */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>

                {/* Animated Logo Ring */}
                <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                    {/* Outer ring - spinning */}
                    <div style={{
                        position: 'absolute', inset: '0',
                        borderRadius: '50%',
                        border: '3px solid transparent',
                        borderTopColor: '#8b5cf6',
                        borderRightColor: '#8b5cf6',
                        animation: 'spinClockwise 2s linear infinite'
                    }} />

                    {/* Middle ring - spinning reverse */}
                    <div style={{
                        position: 'absolute', inset: '8px',
                        borderRadius: '50%',
                        border: '2px solid transparent',
                        borderBottomColor: '#06b6d4',
                        borderLeftColor: '#06b6d4',
                        animation: 'spinCounterClockwise 1.5s linear infinite'
                    }} />

                    {/* Inner ring - pulsing */}
                    <div style={{
                        position: 'absolute', inset: '18px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))',
                        animation: 'pulse 2s ease-in-out infinite'
                    }} />

                    {/* Center icon */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.8rem',
                        color: '#8b5cf6',
                        animation: 'pulse 2s ease-in-out infinite'
                    }}>
                        {phase === 'complete' ? <FiCheck size={32} /> : <FiLoader size={32} />}
                    </div>
                </div>

                {/* Brand Name */}
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '1.8rem',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        background: 'linear-gradient(135deg, #8b5cf6, #06b6d4, #8b5cf6)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        animation: 'gradientShift 3s ease-in-out infinite',
                        marginBottom: '4px'
                    }}>
                        PORT-MOVIC
                    </h2>
                    <p style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.05em',
                        animation: 'fadeInOut 2s ease-in-out infinite'
                    }}>
                        {phase === 'complete' ? '✨ Siap digunakan!' : 'Memuat pengalaman digital...'}
                    </p>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '240px', position: 'relative' }}>
                    {/* Track */}
                    <div style={{
                        width: '100%', height: '4px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '999px',
                        overflow: 'hidden'
                    }}>
                        {/* Fill */}
                        <div style={{
                            width: `${Math.min(progress, 100)}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
                            borderRadius: '999px',
                            transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            position: 'relative',
                            boxShadow: '0 0 12px rgba(139,92,246,0.4)'
                        }}>
                            {/* Glow effect at the tip */}
                            <div style={{
                                position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)',
                                width: '8px', height: '8px', borderRadius: '50%',
                                background: '#06b6d4',
                                boxShadow: '0 0 16px rgba(6,182,212,0.8), 0 0 32px rgba(6,182,212,0.4)',
                                opacity: progress < 100 ? 1 : 0,
                                transition: 'opacity 0.3s'
                            }} />
                        </div>
                    </div>

                    {/* Percentage text */}
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', marginTop: '8px',
                        fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'Space Grotesk, sans-serif'
                    }}>
                        <span>Loading assets</span>
                        <span style={{ color: '#8b5cf6', fontWeight: 600 }}>
                            {Math.min(Math.round(progress), 100)}%
                        </span>
                    </div>
                </div>

                {/* Loading dots animation */}
                <div style={{ display: 'flex', gap: '8px' }}>
                    {[0, 1, 2].map((i) => (
                        <div key={i} style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            background: 'var(--accent-primary)',
                            animation: `dotBounce 1.4s ease-in-out infinite`,
                            animationDelay: `${i * 0.2}s`
                        }} />
                    ))}
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
        @keyframes spinClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spinCounterClockwise {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes blobFloat1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(50px, 30px) scale(1.1); }
        }
        @keyframes blobFloat2 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-40px, -20px) scale(1.15); }
        }
        @keyframes particleFloat {
          0% { transform: translate(0, 0); }
          100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${10 + Math.random() * 30}px, -${20 + Math.random() * 40}px); }
        }
      `}</style>
        </div>
    );
}