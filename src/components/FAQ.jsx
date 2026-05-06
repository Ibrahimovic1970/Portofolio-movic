import { useState } from 'react';
import useReveal from '../hooks/useReveal';
import { FiChevronDown, FiChevronUp, FiCalendar, FiDollarSign, FiShield, FiCode } from 'react-icons/fi';

const faqs = [
    {
        icon: FiCalendar,
        question: 'Berapa lama waktu pengerjaan website?',
        answer: 'Tergantung kompleksitas proyek. Untuk landing page sederhana: 3-5 hari. Website company profile: 1-2 minggu. E-commerce/dashboard custom: 2-4 minggu. Saya selalu berikan timeline detail di awal sebelum proyek dimulai.'
    },
    {
        icon: FiDollarSign,
        question: 'Bagaimana sistem pembayaran?',
        answer: 'Saya menggunakan sistem termin: 50% di awal sebagai DP untuk memulai proyek, 50% setelah proyek selesai dan disetujui. Untuk proyek besar (>20jt), bisa dibagi 3 termin. Pembayaran via transfer bank atau PayPal.'
    },
    {
        icon: FiShield,
        question: 'Apakah ada garansi maintenance?',
        answer: 'Ya! Semua paket termasuk free maintenance 30 hari setelah launch untuk bug fixing dan minor adjustments. Setelah itu, tersedia paket maintenance bulanan (optional) mulai dari 500rb/bulan untuk update konten, security patch, dan backup rutin.'
    },
    {
        icon: FiCode,
        question: 'Apakah saya bisa update konten sendiri?',
        answer: 'Tentu! Saya bisa integrasikan CMS seperti Sanity, Strapi, atau WordPress headless sehingga Anda bisa update konten dengan mudah tanpa coding. Atau jika prefer static site, saya akan dokumentasikan cara editnya.'
    },
    {
        question: 'Apakah website akan mobile-friendly?',
        answer: '100% responsive! Semua website yang saya bangun menggunakan mobile-first approach dan ditest di berbagai device (iPhone, Android, tablet) untuk memastikan tampilan sempurna di semua ukuran layar.'
    },
    {
        question: 'Bagaimana proses komunikasinya?',
        answer: 'Saya update progress via WhatsApp/Email minimal 2x seminggu. Kita juga bisa scheduled call via Google Meet untuk diskusi detail. Saya responsif (biasanya reply dalam 2-4 jam di jam kerja).'
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);
    const ref = useReveal(0.1);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" style={{ padding: '100px 0', background: 'var(--bg-secondary)' }}>
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
                <div ref={ref} className="reveal-up" style={{ textAlign: 'center', marginBottom: 56 }}>
                    <div className="section-label">
                        <span style={{ width: '24px', height: '1px', background: 'var(--accent-tertiary)', display: 'inline-block' }} />
                        FAQ
                    </div>
                    <h2 className="section-title">Pertanyaan yang <span className="gradient-text">Sering Diajukan</span></h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 64 }}>
                    {faqs.map((faq, i) => {
                        const Icon = faq.icon;
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className="glass-card"
                                style={{
                                    overflow: 'hidden',
                                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                                }}
                            >
                                <button
                                    onClick={() => toggleFAQ(i)}
                                    style={{
                                        width: '100%',
                                        padding: '24px 28px',
                                        background: 'transparent',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 16,
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    {Icon && (
                                        <div style={{
                                            minWidth: 40,
                                            height: 40,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: 'var(--gradient-subtle)',
                                            borderRadius: 10,
                                            color: 'var(--accent-primary)'
                                        }}>
                                            <Icon size={18} />
                                        </div>
                                    )}
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 8 }}>
                                            {faq.question}
                                        </h3>
                                        <div style={{
                                            maxHeight: isOpen ? '300px' : '0',
                                            overflow: 'hidden',
                                            transition: 'max-height 0.3s var(--ease-out-expo), opacity 0.3s ease',
                                            opacity: isOpen ? 1 : 0
                                        }}>
                                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{
                                        color: 'var(--accent-primary)',
                                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s var(--ease-out-expo)'
                                    }}>
                                        {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                                    </div>
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <div className="reveal-up" style={{
                    padding: '48px 40px',
                    background: 'var(--gradient-main)',
                    borderRadius: '24px',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.3, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
                            Masih Punya Pertanyaan?
                        </h3>
                        <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)', marginBottom: 32, maxWidth: 600, marginInline: 'auto' }}>
                            Saya siap diskusi tentang proyek Anda. Konsultasi awal gratis, tanpa kewajiban!
                        </p>

                        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a
                                href="#contact"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    padding: '16px 32px',
                                    background: '#fff',
                                    color: 'var(--accent-primary)',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    textDecoration: 'none',
                                    transition: 'transform 0.3s var(--ease-out-back), box-shadow 0.3s ease',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                                }}
                            >
                                <FiCalendar size={20} />
                                Book Free 15-min Call
                            </a>

                            <a
                                href="#contact"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    padding: '16px 32px',
                                    background: 'rgba(255,255,255,0.15)',
                                    color: '#fff',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    textDecoration: 'none',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'background 0.3s ease, border-color 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                                }}
                            >
                                <FiCode size={20} />
                                Get Free Website Audit
                            </a>
                        </div>

                        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginTop: 24 }}>
                            ⚡ Response time: 2-4 jam di jam kerja | 💬 WhatsApp/Email/Telegram
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}