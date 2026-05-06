import { useEffect, useRef } from 'react';

export function useScrollAnimation({ threshold = 0.1, animation = 'fade-up', delay = 0, duration = 600, once = true } = {}) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const styles = {
            'fade-up': { initial: { opacity: 0, transform: 'translateY(40px)' }, animate: { opacity: 1, transform: 'translateY(0)' } },
            'fade-left': { initial: { opacity: 0, transform: 'translateX(-40px)' }, animate: { opacity: 1, transform: 'translateX(0)' } },
            'scale': { initial: { opacity: 0, transform: 'scale(0.95)' }, animate: { opacity: 1, transform: 'scale(1)' } }
        };
        const preset = styles[animation] || styles['fade-up'];
        Object.assign(el.style, { ...preset.initial, transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1), transform ${duration}ms cubic-bezier(0.16,1,0.3,1)`, transitionDelay: `${delay}ms` });
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                Object.assign(el.style, preset.animate);
                if (once) obs.unobserve(el);
            } else if (!once) Object.assign(el.style, preset.initial);
        }, { threshold });
        obs.observe(el);
        return () => obs.disconnect();
    }, [animation, delay, duration, threshold, once]);
    return ref;
}