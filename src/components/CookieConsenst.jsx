import { useState, useEffect } from 'react';
import { FiX, FiSettings, FiCheck } from 'react-icons/fi';

export default function CookieConsent() {
    const [show, setShow] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [preferences, setPreferences] = useState({ necessary: true, analytics: false, marketing: false, functional: false });

    useEffect(() => {
        if (!localStorage.getItem('cookie-consent')) {
            const timer = setTimeout(() => setShow(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleSave = (customPrefs) => {
        const finalPrefs = customPrefs || preferences;
        localStorage.setItem('cookie-consent', JSON.stringify({ ...finalPrefs, timestamp: new Date().toISOString(), version: '1.0' }));
        setShow(false);
        if (finalPrefs.analytics) console.log('📊 Analytics initialized');
        window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: finalPrefs }));
    };

    const handleRejectAll = () => {
        const minimal = { necessary: true, analytics: false, marketing: false, functional: false, timestamp: new Date().toISOString(), version: '1.0' };
        localStorage.setItem('cookie-consent', JSON.stringify(minimal));
        setShow(false);
    };

    if (!show) return null;

    return (
        <>
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 9998 }} onClick={() => setShow(false)} />
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'var(--bg-card)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-color)', borderTop: 'none', padding: '24px', zIndex: 9999 }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gradient-subtle)', borderRadius: 10, color: 'var(--accent-primary)' }}>
                                    <FiSettings size={20} />
                                </div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>🍪 Cookie Preferences</h4>
                            </div>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
                                Website ini menggunakan cookie untuk meningkatkan pengalaman Anda. Anda dapat memilih cookie mana yang diizinkan.
                            </p>
                            <button onClick={() => setExpanded(!expanded)} style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', marginBottom: 16, padding: 0 }}>
                                {expanded ? 'Sembunyikan Detail' : 'Lihat Pengaturan Detail'}
                            </button>
                            {expanded && (
                                <div style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, marginBottom: 20, border: '1px solid var(--border-color)' }}>
                                    {[
                                        { key: 'necessary', label: 'Strictly Necessary', desc: 'Diperlukan untuk fungsi dasar website.', disabled: true },
                                        { key: 'functional', label: 'Functional', desc: 'Mengingat pilihan Anda untuk pengalaman personal.', disabled: false },
                                        { key: 'analytics', label: 'Analytics', desc: 'Memahami interaksi visitor secara anonim.', disabled: false },
                                        { key: 'marketing', label: 'Marketing', desc: 'Menampilkan konten yang relevan.', disabled: false }
                                    ].map((cookie) => (
                                        <label key={cookie.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '12px 0', borderBottom: '1px solid var(--border-color)', cursor: cookie.disabled ? 'not-allowed' : 'pointer', opacity: cookie.disabled ? 0.7 : 1 }}>
                                            <input type="checkbox" checked={preferences[cookie.key]} disabled={cookie.disabled} onChange={(e) => setPreferences({ ...preferences, [cookie.key]: e.target.checked })} style={{ accentColor: 'var(--accent-primary)', width: 18, height: 18, marginTop: 3 }} />
                                            <div><span style={{ fontWeight: 600 }}>{cookie.label}</span><p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 4 }}>{cookie.desc}</p></div>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 200 }}>
                            <button onClick={handleRejectAll} className="btn-secondary" style={{ padding: '12px 20px', fontSize: '0.9rem', justifyContent: 'center' }}>Reject All</button>
                            <button onClick={() => handleSave()} className="btn-primary" style={{ padding: '12px 20px', fontSize: '0.9rem', justifyContent: 'center' }}>Accept Selected</button>
                            <button onClick={() => setShow(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '0.85rem', cursor: 'pointer', padding: '8px' }}>
                                <FiX size={16} /> Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}