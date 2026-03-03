import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Waves, CircleDot, Info, Zap } from 'lucide-react';

export const DoubleSlitExperiment: React.FC = () => {
  const [isObserved, setIsObserved] = useState(false);
  const [slitCount, setSlitCount] = useState<1 | 2>(2);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hits, setHits] = useState<{ y: number; opacity: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = canvas.width = 600;
    const height = canvas.height = 400;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Draw Slits
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(200, 0, 10, height);
      
      ctx.fillStyle = '#050505';
      if (slitCount === 1) {
        ctx.fillRect(200, height / 2 - 10, 10, 20);
      } else {
        ctx.fillRect(200, height / 2 - 40, 10, 20);
        ctx.fillRect(200, height / 2 + 20, 10, 20);
      }

      // Wave visualization
      const waveSpeed = 0.05;
      const frequency = 0.02;
      
      // Incoming waves
      for (let x = 0; x < 200; x += 5) {
        const alpha = Math.sin(x * frequency - time * waveSpeed) * 0.5 + 0.5;
        ctx.strokeStyle = `rgba(0, 255, 136, ${alpha * 0.2})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Outgoing waves
      if (!isObserved) {
        for (let x = 210; x < width - 40; x += 8) {
          for (let y = 0; y < height; y += 8) {
            const d1 = Math.sqrt(Math.pow(x - 210, 2) + Math.pow(y - (height / 2 - 30), 2));
            const d2 = Math.sqrt(Math.pow(x - 210, 2) + Math.pow(y - (height / 2 + 30), 2));
            const w1 = Math.sin(d1 * frequency - time * waveSpeed);
            const w2 = Math.sin(d2 * frequency - time * waveSpeed);
            const combined = (w1 + w2) / 2;
            const alpha = combined * 0.5 + 0.5;
            if (alpha > 0.8) {
              ctx.fillStyle = `rgba(0, 255, 136, ${(alpha - 0.8) * 0.4})`;
              ctx.fillRect(x, y, 4, 4);
            }
          }
        }
      } else {
        const slits = slitCount === 1 ? [height/2] : [height/2 - 30, height/2 + 30];
        slits.forEach(slitY => {
          for (let x = 210; x < width - 40; x += 8) {
            for (let y = 0; y < height; y += 8) {
              const d = Math.sqrt(Math.pow(x - 210, 2) + Math.pow(y - slitY, 2));
              const alpha = (Math.sin(d * frequency - time * waveSpeed) * 0.5 + 0.5) * Math.exp(-(Math.pow(y - slitY, 2)) / 800);
              if (alpha > 0.6) {
                ctx.fillStyle = `rgba(0, 255, 136, ${alpha * 0.15})`;
                ctx.fillRect(x, y, 4, 4);
              }
            }
          }
        });
      }

      // Draw Probability Curve
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.5)';
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y++) {
        let intensity = 0;
        if (!isObserved && slitCount === 2) {
          const theta = (y - height / 2) * 0.1;
          intensity = Math.pow(Math.cos(theta), 2);
        } else {
          const s1 = Math.exp(-Math.pow(y - (height / 2 - 30), 2) / 400);
          const s2 = slitCount === 2 ? Math.exp(-Math.pow(y - (height / 2 + 30), 2) / 400) : 0;
          intensity = (s1 + s2);
        }
        const x = width - 60 - intensity * 50;
        if (y === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw Detection Screen Pattern
      const screenX = width - 20;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(screenX, 0, 20, height);

      for (let y = 0; y < height; y++) {
        let intensity = 0;
        if (!isObserved && slitCount === 2) {
          const theta = (y - height / 2) * 0.1;
          intensity = Math.pow(Math.cos(theta), 2);
        } else {
          const s1 = Math.exp(-Math.pow(y - (height / 2 - 30), 2) / 400);
          const s2 = slitCount === 2 ? Math.exp(-Math.pow(y - (height / 2 + 30), 2) / 400) : 0;
          intensity = (s1 + s2);
        }
        ctx.fillStyle = `rgba(0, 255, 136, ${intensity * 0.8})`;
        ctx.fillRect(screenX, y, 20, 1);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isObserved, slitCount]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <section className="glass p-8 rounded-3xl border border-white/10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-6">Quantum Controls</h3>
            
            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <label className="text-[10px] font-mono text-white/40 uppercase">Observation State</label>
                <button 
                  onClick={() => setIsObserved(!isObserved)}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${isObserved ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/10 text-white/60'}`}
                >
                  <span className="text-sm font-medium">{isObserved ? 'Observer Present' : 'No Observer'}</span>
                  {isObserved ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-[10px] font-mono text-white/40 uppercase">Slit Configuration</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setSlitCount(1)}
                    className={`py-3 rounded-xl border text-xs font-mono uppercase transition-all ${slitCount === 1 ? 'bg-white/10 border-white/40' : 'border-white/5 text-white/40'}`}
                  >
                    Single Slit
                  </button>
                  <button 
                    onClick={() => setSlitCount(2)}
                    className={`py-3 rounded-xl border text-xs font-mono uppercase transition-all ${slitCount === 2 ? 'bg-white/10 border-white/40' : 'border-white/5 text-white/40'}`}
                  >
                    Double Slit
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="flex items-start gap-3 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
                  <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-white/60 leading-relaxed">
                    {isObserved 
                      ? "Observation forces the wave function to collapse. The particle 'chooses' a path, destroying the interference pattern." 
                      : "Without observation, the particle travels as a probability wave, interfering with itself to create bands."}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-4 rounded-[32px] border border-white/10 overflow-hidden relative aspect-[3/2] flex items-center justify-center">
            <canvas ref={canvasRef} className="max-w-full h-auto" />
            <div className="absolute top-6 left-6 text-[10px] font-mono text-white/20 uppercase">Source</div>
            <div className="absolute top-6 left-1/3 text-[10px] font-mono text-white/20 uppercase">Barrier</div>
            <div className="absolute top-6 right-1/3 text-[10px] font-mono text-emerald-400/40 uppercase">Probability Curve</div>
            <div className="absolute top-6 right-6 text-[10px] font-mono text-white/20 uppercase">Detector</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-6 rounded-3xl border border-white/10">
              <Waves className="w-4 h-4 text-emerald-400 mb-4" />
              <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Phenomenon</div>
              <div className="text-xl font-display font-bold">
                {isObserved ? 'Particle Hits' : 'Interference'}
              </div>
            </div>
            <div className="glass p-6 rounded-3xl border border-white/10">
              <CircleDot className="w-4 h-4 text-emerald-400 mb-4" />
              <div className="text-[10px] font-mono text-white/40 uppercase mb-1">State</div>
              <div className="text-xl font-display font-bold">
                {isObserved ? 'Collapsed' : 'Superposition'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
