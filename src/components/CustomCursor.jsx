import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const rafIdRef = useRef(null);

    useEffect(() => {
        // Check if device supports hover (not touch device)
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (isTouchDevice || prefersReducedMotion) {
            document.body.style.cursor = 'auto';
            return;
        }

        // Show cursor after mount
        setIsVisible(true);
        document.body.style.cursor = 'none';

        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;

        const updatePosition = (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isInteractive = target.closest('a, button, [role="button"], .interactive, input, textarea, select, .project-card, .glass-card');

            if (isInteractive) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseOut = () => {
            setIsHovering(false);
        };

        // Smooth animation loop
        const animate = () => {
            // Linear interpolation for smoother follow
            const ease = 0.15;
            currentX += (targetX - currentX) * ease;
            currentY += (targetY - currentY) * ease;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${targetX - 6}px, ${targetY - 6}px, 0)`;
            }

            if (followerRef.current) {
                followerRef.current.style.transform = `translate3d(${currentX - 20}px, ${currentY - 20}px, 0)`;
            }

            rafIdRef.current = requestAnimationFrame(animate);
        };

        // Event listeners
        document.addEventListener('mousemove', updatePosition, { passive: true });
        document.addEventListener('mouseover', handleMouseOver, { passive: true });
        document.addEventListener('mouseout', handleMouseOut, { passive: true });

        // Start animation loop
        rafIdRef.current = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
            document.body.style.cursor = 'auto';
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Main cursor dot - follows mouse instantly */}
            <div
                ref={cursorRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    pointerEvents: 'none',
                    zIndex: 10001,
                    mixBlendMode: 'difference',
                    boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.3)',
                    transition: 'transform 0.1s ease-out',
                    willChange: 'transform'
                }}
            />

            {/* Follower circle - follows with delay */}
            <div
                ref={followerRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '2px solid var(--accent-primary)',
                    pointerEvents: 'none',
                    zIndex: 10000,
                    opacity: isHovering ? 0.3 : 0.6,
                    transition: 'opacity 0.2s ease, border-color 0.2s ease',
                    willChange: 'transform'
                }}
            />

            {/* CSS for touch devices */}
            <style>{`
        @media (pointer: coarse) {
          body { cursor: auto !important; }
          div[style*="position: fixed"] { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="position: fixed"] { display: none !important; }
        }
      `}</style>
        </>
    );
}