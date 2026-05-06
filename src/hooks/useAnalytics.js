import { useEffect } from 'react';

export function useAnalytics() {
    useEffect(() => {
        // Cek cookie consent dulu
        try {
            const consent = localStorage.getItem('cookie-consent');
            if (consent) {
                const prefs = JSON.parse(consent);
                if (!prefs.analytics) return; // Jangan track jika user tidak setuju
            }
        } catch (e) {
            // Ignore error jika localStorage tidak tersedia
        }

        // Fungsi untuk track page view
        const trackPageView = () => {
            fetch('/api/analytics/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    page: window.location.pathname + window.location.search,
                    referrer: document.referrer,
                    title: document.title,
                    timestamp: new Date().toISOString()
                }),
                keepalive: true // Agar request tetap jalan saat navigasi
            }).catch(() => {
                // Silently fail - analytics tidak boleh merusak UX
            });
        };

        // Track initial page load
        trackPageView();

        // Track navigation untuk SPA (Single Page Application)
        const originalPushState = history.pushState;
        history.pushState = function (...args) {
            originalPushState.apply(this, args);
            trackPageView();
        };

        const originalReplaceState = history.replaceState;
        history.replaceState = function (...args) {
            originalReplaceState.apply(this, args);
            trackPageView();
        };

        // Track back/forward button
        const handlePopState = () => trackPageView();
        window.addEventListener('popstate', handlePopState);

        // Cleanup
        return () => {
            window.removeEventListener('popstate', handlePopState);
            history.pushState = originalPushState;
            history.replaceState = originalReplaceState;
        };
    }, []);
}