import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}

function CountUp({ end, duration = 2000, decimals = 0, suffix = '' }: CountUpProps) {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          const startTime = Date.now();

          const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setValue(Math.floor(end * progress * Math.pow(10, decimals)) / Math.pow(10, decimals));

            if (progress === 1) {
              clearInterval(interval);
            }
          }, 16);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, decimals]);

  return (
    <div ref={elementRef}>
      {value.toFixed(decimals)}
      {suffix}
    </div>
  );
}

export default CountUp;
