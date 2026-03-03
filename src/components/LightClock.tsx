import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface LightClockProps {
  velocity: number; // 0 to 0.99 (fraction of c)
  label: string;
}

export const LightClock: React.FC<LightClockProps> = ({ velocity, label }) => {
  const [photonY, setPhotonY] = useState(0);
  const [photonX, setPhotonX] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for down, -1 for up
  const [tickCount, setTickCount] = useState(0);
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const CLOCK_HEIGHT = 160;
  const SPEED_OF_LIGHT = 2; // Arbitrary units per ms

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current !== undefined) {
        const deltaTime = time - lastTimeRef.current;
        
        // The photon always travels at speed c.
        // In the moving frame, it has a horizontal component v and vertical component vy.
        // c^2 = v^2 + vy^2  => vy = sqrt(c^2 - v^2)
        // We normalize c = 1 for the math, then scale.
        const vy = Math.sqrt(1 - Math.pow(velocity, 2)) * SPEED_OF_LIGHT;
        
        setPhotonY(prevY => {
          let nextY = prevY + direction * vy * (deltaTime / 16);
          if (nextY >= CLOCK_HEIGHT) {
            nextY = CLOCK_HEIGHT;
            setDirection(-1);
            setTickCount(t => t + 1);
          } else if (nextY <= 0) {
            nextY = 0;
            setDirection(1);
            setTickCount(t => t + 1);
          }
          return nextY;
        });

        // Horizontal movement (visual only to show it's "moving" in space)
        setPhotonX(prevX => (prevX + velocity * SPEED_OF_LIGHT * (deltaTime / 16)) % 300);
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [velocity, direction]);

  return (
    <div className="flex flex-col items-center p-6 glass rounded-2xl border border-white/10 w-full max-w-xs">
      <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4">{label}</div>
      <div className="text-3xl font-display font-bold mb-6 tabular-nums">
        {tickCount} <span className="text-sm font-normal text-white/40">TICKS</span>
      </div>
      
      <div className="relative w-16 h-[200px] border-x-2 border-white/20 flex justify-center">
        {/* Mirrors */}
        <div className="absolute top-0 w-full h-1 bg-white/40" />
        <div className="absolute bottom-0 w-full h-1 bg-white/40" />
        
        {/* Path Trace (Hypotenuse) */}
        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
           <line 
             x1="50%" y1="0" x2="50%" y2="100%" 
             stroke="rgba(255,255,255,0.05)" 
             strokeDasharray="4 4"
           />
        </svg>

        {/* Photon */}
        <motion.div 
          className="absolute w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_#00ff88]"
          style={{ top: photonY + 20 }}
        />
      </div>

      <div className="mt-6 text-[10px] text-white/50 text-center leading-relaxed">
        {velocity === 0 
          ? "Stationary: Light travels straight up and down." 
          : `Moving at ${(velocity * 100).toFixed(0)}% c: Light must travel a diagonal path, taking longer to reach the mirrors.`
        }
      </div>
    </div>
  );
};
