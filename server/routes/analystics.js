import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(ANALYTICS_FILE)) {
    fs.writeFileSync(ANALYTICS_FILE, '[]');
}

const router = express.Router();

// Track Page View
router.post('/track', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf8') || '[]');

        const entry = {
            timestamp: new Date().toISOString(),
            page: req.body.page || '/',
            referrer: req.body.referrer || 'direct',
            ip: req.ip,
            userAgent: req.get('user-agent') || ''
        };

        data.push(entry);

        // Keep only last 5000 entries
        const trimmed = data.slice(-5000);
        fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(trimmed, null, 2));

        res.json({ success: true });
    } catch (error) {
        console.error('Analytics Error:', error);
        res.status(500).json({ success: false, error: 'Failed to track' });
    }
});

// Get Stats
router.get('/stats', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf8') || '[]');

        const stats = {
            totalViews: data.length,
            uniquePages: [...new Set(data.map(d => d.page))].length,
            topPages: Object.entries(
                data.reduce((acc, d) => {
                    acc[d.page] = (acc[d.page] || 0) + 1;
                    return acc;
                }, {})
            )
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map(([page, views]) => ({ page, views })),
            last24h: data.filter(d => {
                const date = new Date(d.timestamp);
                const now = new Date();
                return (now - date) < 24 * 60 * 60 * 1000;
            }).length
        };

        res.json(stats);
    } catch (error) {
        console.error('Stats Error:', error);
        res.status(500).json({ success: false, error: 'Failed to get stats' });
    }
});

export default router;