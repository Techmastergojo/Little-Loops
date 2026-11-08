import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Reusable scroll-reveal hook
export function useScrollReveal(selector, options = {}) {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        els,
        { y: 48, opacity: 0, ...options.from },
        {
          y: 0, opacity: 1,
          duration: options.duration || 0.75,
          stagger: options.stagger || 0.1,
          ease: options.ease || 'power3.out',
          scrollTrigger: {
            trigger: els[0].closest('section') || els[0],
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          ...options.to,
        }
      );
    });

    return () => ctx.revert();
  }, [selector]);
}

// Wrapper component that animates children on scroll
export default function ScrollReveal({ children, delay = 0, className = '', style = {} }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
