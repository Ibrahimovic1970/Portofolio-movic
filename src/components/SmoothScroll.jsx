import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }) {
    useEffect(() => {
        // Initialize Lenis dengan konfigurasi yang lebih cepat
        const lenis = new Lenis({
            duration: 0.6, // Lebih cepat (default 1.2, kita set 0.6)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing yang lebih responsif
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.2, // Tingkatkan multiplier agar scroll lebih cepat
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
            lerp: 0.1, // Linear interpolation - lebih rendah = lebih cepat
        });

        // Request animation frame loop
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Sync Lenis scroll dengan window scroll
        lenis.on('scroll', (e) => {
            // Optional: Add scroll-based animations here
        });

        // Cleanup
        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}