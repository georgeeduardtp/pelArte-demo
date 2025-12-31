"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollManager() {
  const pathname = usePathname();

  // Scroll to top on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0 });
      if ('scrollRestoration' in history) {
        try {
          history.scrollRestoration = 'manual';
        } catch {}
      }
    }
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  // When tab becomes visible, scroll to top
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return null;
}
