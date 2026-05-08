import { useEffect, useState } from 'react';
import { FiMessageCircle } from 'react-icons/fi';

export default function WhatsAppChat() {
    const [isVisible, setIsVisible] = useState(false);

    // 🔧 GANTI NOMOR WHATSAPP ANDA DI SINI
    // Format: kode negara + nomor HP (tanpa tanda +, spasi, atau angka 0 di depan)
    // Contoh: 0812-3456-7890 → 6281234567890
    const WHATSAPP_NUMBER = '6285779050610';

    // 🔧 GANTI PESAN OTOMATIS DI SINI
    const DEFAULT_MESSAGE = 'Halo, saya tertarik dengan portfolio Anda. Bisa diskusi lebih lanjut?';

    useEffect(() => {
        // Tombol muncul setelah 2.5 detik agar tidak mengganggu loading awal
        const timer = setTimeout(() => setIsVisible(true), 2500);
        return () => clearTimeout(timer);
    }, []);

    const openWhatsApp = () => {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
        window.open(url, '_blank');
    };

    if (!isVisible) return null;

    return (
        <>
            <button
                onClick={openWhatsApp}
                aria-label="Chat via WhatsApp"
                className="wa-float-btn"
            >
                <span className="wa-pulse-ring" />
                <FiMessageCircle size={26} />
                <span className="wa-tooltip">Chat via WhatsApp</span>
            </button>

            <style>{`
        .wa-float-btn {
          position: fixed;
          bottom: 30px;
          left: 30px;
          z-index: 9998;
          background: #25D366;
          color: #fff;
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          transform: scale(1);
        }
        .wa-float-btn:hover {
          transform: scale(1.1) translateY(-2px);
          box-shadow: 0 8px 30px rgba(37, 211, 102, 0.5);
        }
        .wa-pulse-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid #25D366;
          animation: waPulse 2s ease-out infinite;
          pointer-events: none;
        }
        .wa-tooltip {
          position: absolute;
          left: 70px;
          background: #fff;
          color: #111;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.3s ease;
          pointer-events: none;
        }
        .wa-float-btn:hover .wa-tooltip {
          opacity: 1;
          transform: translateX(0);
        }
        @keyframes waPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @media (max-width: 768px) {
          .wa-float-btn { width: 54px; height: 54px; bottom: 20px; left: 20px; }
          .wa-tooltip { display: none; }
        }
      `}</style>
        </>
    );
}