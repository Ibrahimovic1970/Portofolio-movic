import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import ogRouter from './routes/og.js';
import analyticsRouter from './routes/analytics.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MOCK_MODE = process.env.MOCK_MODE === 'true';

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));

// Data Sanitization
app.use(xss());
app.use(mongoSanitize());

// Rate Limiting
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, message: 'Terlalu banyak permintaan. Tunggu 15 menit.' }
});

// CORS
app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
    credentials: true
}));

// Body Parser
app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api', ogRouter);
app.use('/api/analytics', analyticsRouter);

// Email Transporter
let transporter = null;
if (!MOCK_MODE && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    transporter.verify((error) => {
        if (error) {
            console.error('❌ Email Error:', error.message);
        } else {
            console.log('✅ Email connected successfully');
        }
    });
}

// Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        mock: MOCK_MODE,
        email: transporter ? 'ready' : 'offline',
        timestamp: new Date().toISOString()
    });
});

// Contact Form Endpoint
app.post('/api/send', contactLimiter, async (req, res) => {
    const { name, email, message, website } = req.body;

    // Honeypot check
    if (website && website.trim() !== '') {
        return res.status(400).json({ success: false, message: 'Spam detected' });
    }

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Data tidak lengkap' });
    }

    // Sanitize
    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedEmail = email.trim().slice(0, 255);
    const sanitizedMessage = message.trim().slice(0, 2000);

    // Mock Mode
    if (MOCK_MODE) {
        console.log('🧪 MOCK EMAIL:', {
            name: sanitizedName,
            email: sanitizedEmail,
            message: sanitizedMessage
        });
        return res.json({
            success: true,
            message: 'Pesan berhasil dikirim (Mock Mode)',
            mock: true
        });
    }

    // Send Email
    if (!transporter) {
        return res.status(500).json({ success: false, message: 'Email server not ready' });
    }

    try {
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: sanitizedEmail,
            subject: `Pesan Baru dari ${sanitizedName}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #333;">Pesan Baru dari Website</h2>
          <p><strong>Nama:</strong> ${sanitizedName}</p>
          <p><strong>Email:</strong> ${sanitizedEmail}</p>
          <p><strong>Pesan:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
            ${sanitizedMessage.replace(/\n/g, '<br>')}
          </p>
        </div>
      `
        });

        res.json({ success: true, message: 'Pesan berhasil dikirim!' });
    } catch (error) {
        console.error('Email Error:', error.message);
        res.status(500).json({ success: false, message: 'Gagal mengirim email' });
    }
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
    console.log(`📩 POST http://localhost:${PORT}/api/send`);
    console.log(`💚 Health: http://localhost:${PORT}/api/health`);
    console.log(`🧪 Mock Mode: ${MOCK_MODE}`);
});