import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll helper. Returns a ref to attach and whether the element has
 * entered the viewport. State is React-managed (not DOM class mutation), so it
 * survives parent re-renders. Falls back to "always visible" without
 * IntersectionObserver or when the user prefers reduced motion.
 */
export function useInView<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (
            !("IntersectionObserver" in window) ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            setInView(true);
            return;
        }
        // Opt in to the hidden-then-revealed state only once JS is confirmed.
        document.documentElement.classList.add("js-reveal");
        const io = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setInView(true);
                    io.disconnect();
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return [ref, inView] as const;
}
