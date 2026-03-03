import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Zap, Clock, Navigation, Car, Triangle, Infinity, ChevronRight, ChevronLeft, Sparkles, Target } from 'lucide-react';

export const SimultaneityLab: React.FC = () => {
  const [lessonStep, setLessonStep] = useState(0);
  const [velocity, setVelocity] = useState(0.5);
  const [time, setTime] = useState(0);

  const steps = [
    {
      title: "The Car Analogy",
      icon: <Car className="w-5 h-5" />,
      content: "Two cars drive at 100 mph but at an angle. Each driver sees the other as 'behind' them. Neither car is slower—they just measure motion from an angle. Spacetime works exactly like this.",
      visual: "car",
      badge: "Perspective"
    },
    {
      title: "Hyperbolic Geometry",
      icon: <Triangle className="w-5 h-5" />,
      content: "In space, distance is x² + y² (circles). In spacetime, it's t² - x² (hyperbolas). This minus sign changes everything: 'rotating' in spacetime tilts your 'Now' and stretches your 'Time'.",
      visual: "geometry",
      badge: "Mathematics"
    },
    {
      title: "The Twins Paradox",
      icon: <Infinity className="w-5 h-5" />,
      content: "The traveling twin ages less because she took a SHORTER path through spacetime. In spacetime, a straight line is the LONGEST proper time. Acceleration is like 'turning the steering wheel' to take a shortcut.",
      visual: "twins",
      badge: "Shortcuts"
    },
    {
      title: "Curved Spacetime",
      icon: <Layers className="w-5 h-5" />,
      content: "Gravity doesn't 'slow time'—it curves spacetime. This curvature reduces the proper time along paths passing through it, just like a hill in space changes distances.",
      visual: "gravity",
      badge: "General Relativity"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lesson Navigation & Content */}
        <div className="lg:col-span-4 space-y-6">
          <section className="glass p-8 rounded-3xl border border-white/10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  {steps[lessonStep].icon}
                </div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/60">Lesson Module</h3>
              </div>
              <div className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-white/30 border border-white/5">
                {lessonStep + 1} / {steps.length}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={lessonStep}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex-grow"
              >
                <div className="inline-block px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[9px] font-mono text-emerald-400 uppercase tracking-wider mb-4">
                  {steps[lessonStep].badge}
                </div>
                <h2 className="text-2xl font-display font-bold mb-4">{steps[lessonStep].title}</h2>
                <p className="text-sm text-white/60 leading-relaxed mb-8">
                  {steps[lessonStep].content}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="space-y-6 mt-auto">
              {lessonStep === 0 && (
                <div className="space-y-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-mono text-white/40 uppercase">Relative Angle</label>
                    <span className="text-[10px] font-mono text-emerald-400">{(velocity * 90).toFixed(0)}°</span>
                  </div>
                  <input 
                    type="range" min="0" max="0.9" step="0.01" value={velocity}
                    onChange={(e) => setVelocity(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>
              )}
              
              {(lessonStep === 2 || lessonStep === 3) && (
                <div className="space-y-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-mono text-white/40 uppercase">Time Evolution</label>
                    <span className="text-[10px] font-mono text-emerald-400">{time.toFixed(1)}s</span>
                  </div>
                  <input 
                    type="range" min="0" max="10" step="0.1" value={time}
                    onChange={(e) => setTime(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>
              )}

              <div className="flex gap-2">
                <button 
                  onClick={() => setLessonStep(Math.max(0, lessonStep - 1))}
                  disabled={lessonStep === 0}
                  className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 disabled:opacity-20 transition-all flex justify-center items-center gap-2 text-[10px] font-mono uppercase tracking-widest"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </button>
                <button 
                  onClick={() => setLessonStep(Math.min(steps.length - 1, lessonStep + 1))}
                  disabled={lessonStep === steps.length - 1}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 disabled:opacity-20 transition-all flex justify-center items-center gap-2 text-[10px] font-mono uppercase tracking-widest"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Visualizations */}
        <div className="lg:col-span-8">
          <section className="glass p-8 rounded-[40px] border border-white/10 h-[600px] relative overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              {lessonStep === 0 && (
                <motion.div 
                  key="car" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <div className="absolute inset-0 opacity-[0.03] grid grid-cols-12 grid-rows-12">
                    {Array.from({ length: 144 }).map((_, i) => <div key={i} className="border border-white" />)}
                  </div>
                  
                  {/* Car A */}
                  <div className="relative w-1 h-64 bg-white/10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-10 bg-white rounded-md shadow-[0_0_30px_white] flex items-center justify-center">
                      <div className="w-1 h-4 bg-black/20 rounded-full" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[8px] font-mono text-white/40 uppercase whitespace-nowrap translate-y-6">Observer A</div>
                  </div>

                  {/* Car B */}
                  <motion.div 
                    className="absolute w-1 h-64 bg-emerald-400/20 origin-center"
                    animate={{ rotate: velocity * 90 }}
                    transition={{ type: 'spring', stiffness: 50 }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-10 bg-emerald-400 rounded-md shadow-[0_0_30px_#00ff88] flex items-center justify-center">
                      <div className="w-1 h-4 bg-black/20 rounded-full" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[8px] font-mono text-emerald-400 uppercase whitespace-nowrap translate-y-6">Observer B</div>
                    
                    {/* Measurement Line */}
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="absolute top-0 left-1/2 w-[400px] h-[1px] bg-emerald-400/30 origin-left -rotate-90 translate-x-4 border-t border-dashed border-emerald-400/50"
                    />
                  </motion.div>

                  <div className="absolute bottom-12 text-center max-w-sm">
                    <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] mb-4">Relative Measurement</div>
                    <p className="text-xs text-white/40 leading-relaxed italic">
                      "Moving clocks tick slower" is a measurement effect. 
                      You are seeing their time axis from an angle.
                    </p>
                  </div>
                </motion.div>
              )}

              {lessonStep === 1 && (
                <motion.div 
                  key="geometry" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <svg className="w-full h-full max-w-md overflow-visible">
                    <defs>
                      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#00ff88" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    
                    {/* Hyperbolas */}
                    {[1, 2, 3, 4, 5].map(i => (
                      <path 
                        key={i}
                        d={`M ${200 - i*35} 0 Q 200 ${i*35} ${200 + i*35} 0`}
                        fill="none" stroke="rgba(0, 255, 136, 0.15)" strokeWidth="1" strokeDasharray="4 4"
                        className="translate-y-[200px]"
                      />
                    ))}
                    
                    {/* Axes */}
                    <line x1="200" y1="0" x2="200" y2="400" stroke="rgba(255,255,255,0.05)" />
                    <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(255,255,255,0.05)" />
                    
                    {/* Boosted Axis */}
                    <motion.g animate={{ rotate: velocity * 45 }} className="origin-[200px_200px]">
                      <line x1="200" y1="0" x2="200" y2="400" stroke="#00ff88" strokeWidth="2" />
                      <circle cx="200" cy="100" r="4" fill="#00ff88" />
                      <text x="210" y="105" fill="#00ff88" className="text-[10px] font-mono uppercase">Time Axis (t')</text>
                    </motion.g>
                  </svg>
                  
                  <div className="absolute top-12 left-12 flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Hyperbolic Spacetime</div>
                  </div>
                  
                  <div className="absolute bottom-12 right-12 text-[10px] font-mono text-white/20 uppercase text-right leading-relaxed">
                    Lorentz Transformation:<br/>
                    <span className="text-emerald-400/40">t' = γ(t - vx/c²)</span><br/>
                    <span className="text-emerald-400/40">x' = γ(x - vt)</span>
                  </div>
                </motion.div>
              )}

              {lessonStep === 2 && (
                <motion.div 
                  key="twins" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <div className="relative h-96 w-64 border-l border-white/10">
                    {/* Earth Twin */}
                    <div className="absolute left-0 top-0 w-[2px] h-full bg-white/5">
                      <motion.div 
                        className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white] -translate-x-1/2 flex items-center justify-center"
                        style={{ bottom: `${time * 38.4}px` }}
                      >
                        <div className="w-1 h-1 bg-black rounded-full" />
                      </motion.div>
                      <div className="absolute -left-16 bottom-0 text-[8px] font-mono text-white/40 uppercase [writing-mode:vertical-rl] rotate-180">Stationary Twin</div>
                    </div>

                    {/* Traveling Twin */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                      <path 
                        d="M 0 384 L 120 192 L 0 0" 
                        fill="none" stroke="#00ff88" strokeWidth="2" strokeDasharray="6 6" strokeOpacity="0.3"
                      />
                      <motion.g
                        animate={{ 
                          x: time < 5 ? (time * 24) : (120 - (time - 5) * 24),
                          y: 384 - (time * 38.4)
                        }}
                      >
                        <circle r="8" fill="#00ff88" className="shadow-[0_0_25px_#00ff88]" />
                        <circle r="4" fill="black" />
                      </motion.g>
                    </svg>
                    <div className="absolute left-36 top-1/2 text-[10px] font-mono text-emerald-400 uppercase flex items-center gap-2">
                      <Target className="w-3 h-3" />
                      Traveling Twin
                    </div>
                  </div>
                  
                  <div className="absolute bottom-8 text-center max-w-xs">
                    <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] mb-4">The Shortcut</div>
                    <p className="text-xs text-white/40 leading-relaxed italic">
                      The traveler covers less "distance" in time because 
                      her path through spacetime was bent.
                    </p>
                  </div>
                </motion.div>
              )}

              {lessonStep === 3 && (
                <motion.div 
                  key="gravity" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <div className="relative w-80 h-80">
                    {/* Event Horizon */}
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute inset-0 m-auto w-24 h-24 bg-black rounded-full border border-white/10 shadow-[0_0_80px_rgba(16,185,129,0.15)]" 
                    />
                    
                    {/* Accretion Disk visualization */}
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 m-auto w-48 h-48 border border-emerald-500/10 rounded-full border-dashed"
                    />

                    {/* Curved Spacetime Grid */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                      {[1, 2, 3, 4, 5].map(i => (
                        <circle 
                          key={i} cx="160" cy="160" r={40 + i*28} 
                          fill="none" stroke="rgba(0, 255, 136, 0.05)" strokeWidth="1"
                        />
                      ))}
                      
                      {/* Light Ray bending */}
                      <motion.path 
                        d="M -40 160 Q 160 40 360 160" 
                        fill="none" stroke="#00ff88" strokeWidth="2" strokeOpacity="0.6"
                        animate={{ strokeDashoffset: [1000, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        strokeDasharray="10 10"
                      />
                    </svg>
                  </div>
                  
                  <div className="absolute bottom-12 text-center max-w-sm">
                    <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] mb-4">Gravitational Time Dilation</div>
                    <p className="text-xs text-white/40 leading-relaxed italic">
                      Mass curves the grid. Clocks near the center take 
                      a shorter path through time relative to those far away.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </div>
  );
};
