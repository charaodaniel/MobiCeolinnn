"use client";

import { PassengerDashboard } from '@/components/passenger/PassengerDashboard';
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => console.log('scope is: ', registration.scope))
        .catch((e) => console.error('Service worker registration failed', e));
    }
  }, []);

  return <PassengerDashboard />;
}
