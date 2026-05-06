import express from 'express';
import { createCanvas, registerFont } from 'canvas';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Try to register custom font
try {
    const fontPath = path.join(__dirname, '../../public/fonts/Inter-Bold.ttf');
    if (fs.existsSync(fontPath)) {
        registerFont(fontPath, { family: 'Inter' });
    }
} catch (e) {
    console.warn('⚠️ Custom font not found, using system font');
}

router.get('/og/:name?', (req, res) => {
    const name = req.params.name || 'Ahmad Ibrahim';
    const width = 1200;
    const height = 630;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0a0a0f');
    gradient.addColorStop(1, '#111118');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative Blobs
    ctx.fillStyle = 'rgba(139, 92, 246, 0.12)';
    ctx.beginPath();
    ctx.arc(900, 100, 250, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(6, 182, 212, 0.1)';
    ctx.beginPath();
    ctx.arc(200, 500, 200, 0, Math.PI * 2);
    ctx.fill();

    // Text: "Portfolio"
    ctx.fillStyle = '#8b5cf6';
    ctx.font = 'bold 48px Inter, Arial, sans-serif';
    ctx.fillText('Portfolio', 80, 120);

    // Text: Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 72px Inter, Arial, sans-serif';
    const displayName = name.length > 22 ? name.slice(0, 22) + '...' : name;
    ctx.fillText(displayName, 80, 220);

    // Text: Title
    ctx.fillStyle = '#9ca3af';
    ctx.font = '36px Inter, Arial, sans-serif';
    ctx.fillText('Web Developer & UI Designer', 80, 290);

    // Decorative Line
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(80, 320);
    ctx.lineTo(200, 320);
    ctx.stroke();

    // Footer
    ctx.fillStyle = '#6b7280';
    ctx.font = '24px Inter, Arial, sans-serif';
    ctx.fillText('ahmadibrahim.dev', 80, 580);

    // Send as PNG
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(canvas.toBuffer('image/png'));
});

export default router;