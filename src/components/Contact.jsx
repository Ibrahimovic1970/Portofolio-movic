import { useState } from 'react';
import useReveal from '../hooks/useReveal';
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheck, FiLoader, FiAlertCircle, FiInstagram } from 'react-icons/fi';

// ✅ Cara akses env variable di Vite frontend:
const VITE_EMAIL = import.meta.env.VITE_EMAIL || 'ahmadibrahim.dev@gmail.com';
const VITE_GITHUB = import.meta.env.VITE_GITHUB || 'https://github.com/ahmadibrahim';
const VITE_LINKEDIN = import.meta.env.VITE_LINKEDIN || 'https://linkedin.com/in/ahmadibrahim';

export default function Contact() {
    const formRef = useReveal(0.1);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ loading: false, success: false, error: '', mock: false });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: '', mock: false });

        try {
            const res = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, website: '' })
            });
            const data = await res.json();

            if (!data.success) {
                throw new Error(data.message || 'Gagal mengirim pesan');
            }

            setStatus({ loading: false, success: true, error: '', mock: data.mock || false });
            setFormData({ name: '', email: '', message: '' });

            setTimeout(() => {
                setStatus({ loading: false, success: false, error: '', mock: false });
            }, 5000);

        } catch (err) {
            console.error('Form submit error:', err);
            setStatus({
                loading: false,
                success: false,
                error: err.message || 'Gagal mengirim. Coba lagi nanti.',
                mock: false
            });
        }
    };

    return (
        <section id="contact" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden', padding: '120px 0' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

            <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                <div ref={formRef} className="reveal-up" style={{ maxWidth: '640px', margin: '0 auto' }}>

                    <div className="section-header" style={{ marginBottom: '48px', textAlign: 'center' }}>
                        <div className="section-label" style={{ justifyContent: 'center' }}>
                            <span style={{ width: '24px', height: '1px', background: 'var(--accent-tertiary)', display: 'inline-block' }} />
                            Kontak
                        </div>
                        <h2 className="section-title">Mari <span className="gradient-text">Berkolaborasi</span></h2>
                        <p className="section-desc" style={{ margin: '0 auto' }}>
                            Punya proyek menarik? Kirim pesan dan saya akan merespons dalam 24 jam.
                        </p>
                    </div>

                    <div className="glass-card" style={{ padding: '40px 32px' }}>
                        {status.success ? (
                            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                <div style={{ width: '72px', height: '72px', margin: '0 auto 24px', background: 'rgba(34,197,94,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e' }}>
                                    <FiCheck size={32} />
                                </div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '12px' }}>Pesan Terkirim! 🎉</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                    Terima kasih, {formData.name || 'teman'}! Saya akan segera menghubungi Anda.
                                </p>
                                {status.mock && (
                                    <p style={{ fontSize: '0.85rem', color: 'var(--accent-secondary)', background: 'rgba(6,182,212,0.1)', padding: '12px', borderRadius: '8px', marginTop: '16px' }}>
                                        ℹ️ Mock Mode: Email tidak dikirim ke server. Cek console/backend logs untuk detail.
                                    </p>
                                )}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                                <input type="text" name="website" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label htmlFor="name" style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '6px', color: 'var(--text-primary)' }}>Nama *</label>
                                        <input
                                            id="name"
                                            required
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Nama Lengkap Anda"
                                            className="form-input"
                                            disabled={status.loading}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '6px', color: 'var(--text-primary)' }}>Email *</label>
                                        <input
                                            id="email"
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="email@anda.com"
                                            className="form-input"
                                            disabled={status.loading}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '6px', color: 'var(--text-primary)' }}>Pesan *</label>
                                    <textarea
                                        id="message"
                                        required
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Ceritakan tentang proyek Anda, timeline, dan budget..."
                                        rows="5"
                                        className="form-input"
                                        style={{ resize: 'vertical', width: '100%' }}
                                        disabled={status.loading}
                                    />
                                </div>

                                {status.error && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#ef4444', fontSize: '0.9rem' }}>
                                        <FiAlertCircle size={18} />
                                        <span>{status.error}</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn-primary"
                                    style={{
                                        justifyContent: 'center',
                                        width: '100%',
                                        opacity: status.loading ? 0.7 : 1,
                                        pointerEvents: status.loading ? 'none' : 'auto',
                                        marginTop: '8px'
                                    }}
                                    disabled={status.loading}
                                >
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {status.loading ? <FiLoader className="spin" size={18} /> : <FiSend size={18} />}
                                        {status.loading ? 'Mengirim...' : 'Kirim Pesan'}
                                    </span>
                                </button>

                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '12px' }}>
                                    🔒 Data Anda aman. Saya tidak akan pernah membagikan informasi pribadi Anda.
                                </p>
                            </form>
                        )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '40px' }}>
                        {[
                            { icon: <FiMail size={20} />, href: 'mailto:' + VITE_EMAIL, label: 'Email' },
                            { icon: <FiGithub size={20} />, href: 'https://github.com/Ibrahimovic1970', label: 'GitHub' },
                            { icon: <FiInstagram size={20} />, href: 'https://www.instagram.com/movic6879/', label: 'Instagram' },
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-icon"
                                aria-label={social.label}
                                title={social.label}
                                style={{ display: 'flex' }}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}