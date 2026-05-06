import { useEffect, useRef } from 'react';

export function useMagnetic(strength = 0.3) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // Only apply magnetic effect when close
            if (distance < 200) {
                const moveX = deltaX * strength;
                const moveY = deltaY * strength;
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        };

        const handleMouseLeave = () => {
            element.style.transform = 'translate(0, 0)';
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.style.transform = 'translate(0, 0)';
        };
    }, [strength]);

    return ref;
}