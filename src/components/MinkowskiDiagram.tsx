import React from 'react';
import { motion } from 'motion/react';

interface MinkowskiDiagramProps {
  velocity: number;
}

export const MinkowskiDiagram: React.FC<MinkowskiDiagramProps> = ({ velocity }) => {
  // Angle of the boosted axes: tan(theta) = v/c
  // Since we use c=1, theta = atan(v)
  const angleRad = Math.atan(velocity);
  const angleDeg = (angleRad * 180) / Math.PI;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Static Axes */}
      <div className="absolute w-full h-[1px] bg-white/10" /> {/* Space (x) */}
      <div className="absolute h-full w-[1px] bg-white/10" /> {/* Time (t) */}
      
      {/* Light Cones */}
      <div className="absolute w-full h-full border-x border-y border-white/5 rotate-45 pointer-events-none" />
      <div className="absolute w-full h-full border-x border-y border-white/5 -rotate-45 pointer-events-none" />

      {/* Boosted Axes (Traveler) */}
      <motion.div 
        className="absolute h-full w-[2px] bg-emerald-400/50"
        animate={{ rotate: angleDeg }}
        transition={{ type: 'spring', stiffness: 40 }}
      >
        <div className="absolute top-0 -translate-x-1/2 text-[8px] font-mono text-emerald-400 uppercase tracking-widest -rotate-90 translate-y-[-20px]">t' (Time)</div>
      </motion.div>

      <motion.div 
        className="absolute w-full h-[2px] bg-emerald-400/50"
        animate={{ rotate: -angleDeg }}
        transition={{ type: 'spring', stiffness: 40 }}
      >
        <div className="absolute right-0 -translate-y-1/2 text-[8px] font-mono text-emerald-400 uppercase tracking-widest translate-x-[20px]">x' (Space)</div>
      </motion.div>

      {/* Hyperbola of Constant Proper Time */}
      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none opacity-20">
        <path 
          d="M 50 150 Q 150 100 250 150" 
          fill="none" 
          stroke="white" 
          strokeWidth="1" 
          strokeDasharray="2 2"
          className="translate-y-[-50px]"
        />
      </svg>

      <div className="absolute bottom-4 left-4 text-[9px] font-mono text-white/30 max-w-[150px]">
        Notice how the axes "close in" on the light cone as you approach speed <b>c</b>.
      </div>
    </div>
  );
};
