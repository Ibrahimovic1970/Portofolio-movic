import { useState } from 'react';
import useReveal from '../hooks/useReveal';
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheck, FiLoader } from 'react-icons/fi';

export default function Contact() {
    const formRef = useReveal(0.1);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ loading: false, success: false, error: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: '' });

        try {
            const res = await fetch('http://localhost:3001/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);

            setStatus({ loading: false, success: true, error: '' });
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus({ loading: false, success: false, error: '' }), 4000);
        } catch (err) {
            setStatus({ loading: false, success: false, error: 'Gagal mengirim. Coba lagi nanti.' });
        }
    };

    return (
        <section id="contact" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div ref={formRef} className="reveal-up" style={{ maxWidth: '640px', margin: '0 auto' }}>
                    <div className="section-header" style={{ marginBottom: '48px' }}>
                        <div className="section-label">
                            <span style={{ width: '24px', height: '1px', background: 'var(--accent-tertiary)', display: 'inline-block' }} />
                            Kontak
                        </div>
                        <h2 className="section-title">Mari <span className="gradient-text">Berkolaborasi</span></h2>
                        <p className="section-desc">Punya proyek menarik? Kirim pesan dan saya akan merespons dalam 24 jam.</p>
                    </div>

                    <div className="glass-card" style={{ padding: '40px 32px' }}>
                        {status.success ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{ width: '64px', height: '64px', margin: '0 auto 20px', background: 'rgba(6,182,212,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-secondary)' }}>
                                    <FiCheck size={28} />
                                </div>
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '8' }}>Pesan Terkirim! 🎉</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>Terima kasih, saya akan segera menghubungi Anda.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <input required name="name" value={formData.name} onChange={handleChange} placeholder="Nama Lengkap" className="form-input" disabled={status.loading} />
                                    <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Aktif" className="form-input" disabled={status.loading} />
                                </div>
                                <textarea required name="message" value={formData.message} onChange={handleChange} placeholder="Ceritakan tentang proyek Anda..." rows="5" className="form-input" style={{ resize: 'vertical' }} disabled={status.loading} />

                                {status.error && <p style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>{status.error}</p>}

                                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', width: '100%', opacity: status.loading ? 0.7 : 1, pointerEvents: status.loading ? 'none' : 'auto' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        {status.loading ? <FiLoader className="spin" size={16} /> : <FiSend size={16} />}
                                        {status.loading ? 'Mengirim...' : 'Kirim Pesan'}
                                    </span>
                                </button>
                            </form>
                        )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '40px' }}>
                        {[
                            { icon: <FiMail size={20} />, href: 'mailto:anda@email.com', label: 'Email' },
                            { icon: <FiGithub size={20} />, href: '#', label: 'GitHub' },
                            { icon: <FiLinkedin size={20} />, href: '#', label: 'LinkedIn' },
                        ].map((social, i) => (
                            <button key={i} className="btn-icon" onClick={() => window.open(social.href, '_blank')} aria-label={social.label} title={social.label}>
                                {social.icon}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}