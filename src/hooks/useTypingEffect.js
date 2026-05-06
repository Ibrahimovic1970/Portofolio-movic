import { useState, useEffect, useRef } from 'react';

export function useTypingEffect(texts, typingSpeed = 75, deletingSpeed = 35, pauseDuration = 1200) {
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const currentFullText = texts[index % texts.length] ?? '';
        const handleTimeout = () => {
            if (!isDeleting) {
                if (charIndex < currentFullText.length) {
                    setCharIndex(prev => prev + 1);
                    timeoutRef.current = setTimeout(handleTimeout, typingSpeed);
                } else {
                    timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseDuration);
                }
            } else {
                if (charIndex > 0) {
                    setCharIndex(prev => prev - 1);
                    timeoutRef.current = setTimeout(handleTimeout, deletingSpeed);
                } else {
                    setIsDeleting(false);
                    setIndex(prev => (prev + 1) % texts.length);
                }
            }
        };
        timeoutRef.current = setTimeout(handleTimeout, isDeleting ? deletingSpeed : typingSpeed);
        return () => clearTimeout(timeoutRef.current);
    }, [charIndex, isDeleting, index, texts, typingSpeed, deletingSpeed, pauseDuration]);

    return (texts[index % texts.length] ?? '').substring(0, charIndex);
}