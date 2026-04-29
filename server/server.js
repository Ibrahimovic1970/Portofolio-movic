import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname untuk ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MOCK_MODE = process.env.MOCK_MODE === 'true';

// ========================================
// SECURITY MIDDLEWARE
// ========================================
app.use(helmet({
    contentSecurityPolicy: false, // Disable untuk development React
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false
}));

// Data sanitization against NoSQL injection and XSS
app.use(xss());
app.use(mongoSanitize());

// Rate limiting untuk endpoint contact form
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 5, // Maksimal 5 request per IP dalam 15 menit
    message: {
        success: false,
        message: 'Terlalu banyak permintaan. Mohon tunggu 15 menit sebelum mengirim lagi.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// CORS Configuration
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        process.env.FRONTEND_URL || 'https://domainanda.com'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser dengan limit
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ========================================
// EMAIL CONFIGURATION (Nodemailer)
// ========================================
let transporter = null;
let emailReady = false;

// Hanya inisialisasi transporter jika MOCK_MODE=false
if (!MOCK_MODE && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Verifikasi koneksi email
    transporter.verify((error, success) => {
        if (error) {
            console.error('❌ GAGAL koneksi ke email. Cek EMAIL_USER & EMAIL_PASS di .env');
            console.error('   Error detail:', error.message);
            console.error('   Solusi:');
            console.error('   1. Pastikan 2-Step Verification Gmail aktif');
            console.error('   2. Gunakan App Password, bukan password login');
            console.error('   3. Cek link: https://myaccount.google.com/apppasswords');
            emailReady = false;
        } else {
            console.log('✅ Server email BERHASIL terhubung');
            emailReady = true;
        }
    });
} else if (MOCK_MODE) {
    console.log('🧪 MOCK MODE: Email tidak akan dikirim (hanya logging)');
    emailReady = true; // Anggap ready agar form bisa di-test
} else {
    console.warn('⚠️ EMAIL_USER atau EMAIL_PASS tidak ditemukan di .env');
}

// ========================================
// ROUTES
// ========================================

// Health Check Endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        email: emailReady ? 'connected' : 'disconnected',
        mockMode: MOCK_MODE
    });
});

// Contact Form Endpoint
app.post('/api/send', contactLimiter, async (req, res) => {
    const { name, email, message, website } = req.body;

    // Honeypot check (jika field 'website' terisi, berarti bot)
    if (website && website.trim() !== '') {
        console.log('🚫 SPAM detected from IP:', req.ip);
        return res.status(400).json({
            success: false,
            message: 'Request ditolak. Spam terdeteksi.'
        });
    }

    // Validasi input wajib
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Data tidak lengkap. Mohon isi Nama, Email, dan Pesan.'
        });
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Format email tidak valid.'
        });
    }

    // Sanitasi & trim input
    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedEmail = email.trim().slice(0, 255);
    const sanitizedMessage = message.trim().slice(0, 2000);

    // Log data masuk
    console.log('📩 Pesan baru diterima:');
    console.log('   Nama:', sanitizedName);
    console.log('   Email:', sanitizedEmail);
    console.log('   IP:', req.ip);

    // ========================================
    // MOCK MODE: Tidak kirim email, hanya log & simpan file
    // ========================================
    if (MOCK_MODE) {
        console.log('🧪 [MOCK MODE] Email tidak dikirim. Detail:');
        console.log('   To:', process.env.EMAIL_USER || 'not-set');
        console.log('   From:', sanitizedEmail);
        console.log('   Subject: Pesan Baru dari ' + sanitizedName);
        console.log('   Message:', sanitizedMessage);

        // Simpan ke file JSON sebagai backup
        try {
            const logsDir = join(__dirname, 'logs');
            if (!existsSync(logsDir)) {
                mkdirSync(logsDir, { recursive: true });
            }

            const logEntry = {
                timestamp: new Date().toISOString(),
                name: sanitizedName,
                email: sanitizedEmail,
                message: sanitizedMessage,
                ip: req.ip,
                userAgent: req.get('user-agent')
            };

            const logFile = join(logsDir, 'contact-logs.json');
            appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
            console.log('💾 Log disimpan ke: server/logs/contact-logs.json');
        } catch (e) {
            console.log('⚠️ Gagal simpan log:', e.message);
        }

        return res.status(200).json({
            success: true,
            message: 'Pesan berhasil dikirim (MOCK MODE - cek server/logs/contact-logs.json)',
            mock: true,
            data: { name: sanitizedName, email: sanitizedEmail }
        });
    }

    // ========================================
    // PRODUCTION MODE: Kirim email via Nodemailer
    // ========================================
    if (!emailReady || !transporter) {
        return res.status(500).json({
            success: false,
            message: 'Konfigurasi email belum siap. Hubungi administrator.'
        });
    }

    try {
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: sanitizedEmail,
            subject: `📨 Pesan Baru dari ${sanitizedName}`,
            html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; background: #f8f9fa; margin: 0; color: #333; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 32px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { color: #333; margin-top: 0; border-bottom: 3px solid #8b5cf6; padding-bottom: 16px; }
    .info { margin: 24px 0; }
    .info p { margin: 8px 0; }
    .message { background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin: 24px 0; }
    .message p { margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap; }
    .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb; font-size: 0.9rem; color: #6b7280; }
    a { color: #8b5cf6; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <h2 class="header">📨 Pesan Baru dari Website Portfolio</h2>
    
    <div class="info">
      <p><strong>👤 Nama:</strong> ${sanitizedName}</p>
      <p><strong>📧 Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
      <p><strong>🕐 Dikirim:</strong> ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}</p>
      <p><strong>🌐 IP Address:</strong> ${req.ip}</p>
    </div>

    <div class="message">
      <p><strong>💬 Pesan:</strong></p>
      <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
    </div>

    <div class="footer">
      <p>Email ini dikirim dari form contact website portfolio Ahmad Ibrahim.</p>
      <p>Klik "Reply" untuk membalas pengirim.</p>
    </div>
  </div>
</body>
</html>
      `,
            text: `
Pesan Baru dari Website Portfolio Ahmad Ibrahim
================================================

Nama: ${sanitizedName}
Email: ${sanitizedEmail}
Dikirim: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}
IP: ${req.ip}

Pesan:
${sanitizedMessage}

---
Email ini dikirim dari form contact website portfolio.
Balas email ini untuk membalas pengirim.
      `
        });

        console.log('✅ Email BERHASIL dikirim ke:', sanitizedEmail);
        res.status(200).json({
            success: true,
            message: 'Pesan berhasil dikirim. Terima kasih! Saya akan membalas dalam 24 jam.'
        });

    } catch (error) {
        console.error('❌ ERROR saat kirim email:', error.message);

        // Fallback: simpan ke log jika email gagal
        try {
            const logsDir = join(__dirname, 'logs');
            if (!existsSync(logsDir)) mkdirSync(logsDir, { recursive: true });

            const logEntry = {
                timestamp: new Date().toISOString(),
                name: sanitizedName,
                email: sanitizedEmail,
                message: sanitizedMessage,
                ip: req.ip,
                error: error.message
            };

            appendFileSync(join(logsDir, 'contact-logs.json'), JSON.stringify(logEntry) + '\n');
            console.log('💾 Email gagal, data disimpan ke log sebagai backup');
        } catch (e) {
            // Ignore log error
        }

        res.status(500).json({
            success: false,
            message: 'Gagal mengirim email. Silakan coba lagi nanti atau hubungi via email langsung: ' + process.env.EMAIL_USER,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// ========================================
// ERROR HANDLERS
// ========================================

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan',
        path: req.path,
        method: req.method
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('🔥 Server Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ========================================
// START SERVER
// ========================================
app.listen(PORT, () => {
    console.log('');
    console.log('🚀 Backend running on http://localhost:' + PORT);
    console.log('📩 Endpoint: POST http://localhost:' + PORT + '/api/send');
    console.log('💚 Health: GET http://localhost:' + PORT + '/api/health');
    console.log('🔒 Security: Helmet + XSS + Rate Limit + MongoSanitize active');
    console.log('🧪 Mock Mode: ' + (MOCK_MODE ? 'ON (email tidak dikirim)' : 'OFF (email dikirim)'));
    console.log('');
});