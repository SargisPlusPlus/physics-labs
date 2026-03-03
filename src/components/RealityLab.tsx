import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Globe, Box, ArrowDown, ArrowUp, Activity } from 'lucide-react';

export const RealityLab: React.FC = () => {
  const [activeExperiment, setActiveExperiment] = useState<'entanglement' | 'equivalence'>('entanglement');
  const [entangledState, setEntangledState] = useState<'up' | 'down'>('up');
  const [isMeasuring, setIsMeasuring] = useState(false);
  
  const [equivalenceMode, setEquivalenceMode] = useState<'gravity' | 'acceleration'>('gravity');
  const [isDropping, setIsDropping] = useState(false);

  // Entanglement Logic
  const toggleEntanglement = () => {
    setIsMeasuring(true);
    setTimeout(() => {
      setEntangledState(prev => prev === 'up' ? 'down' : 'up');
      setIsMeasuring(false);
    }, 400);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation & Info */}
        <div className="lg:col-span-4 space-y-6">
          <section className="glass p-8 rounded-3xl border border-white/10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-6">Reality Experiments</h3>
            
            <div className="space-y-4">
              <button 
                onClick={() => setActiveExperiment('entanglement')}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${activeExperiment === 'entanglement' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/10 text-white/60'}`}
              >
                <Activity className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-sm font-bold">Quantum Entanglement</div>
                  <div className="text-[10px] opacity-60 uppercase">Non-locality</div>
                </div>
              </button>

              <button 
                onClick={() => setActiveExperiment('equivalence')}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${activeExperiment === 'equivalence' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/10 text-white/60'}`}
              >
                <Box className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-sm font-bold">Equivalence Principle</div>
                  <div className="text-[10px] opacity-60 uppercase">Gravity vs Acceleration</div>
                </div>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeExperiment}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-white/60 leading-relaxed"
                >
                  {activeExperiment === 'entanglement' ? (
                    <p>
                      Two particles become "entangled" such that their states are linked. 
                      Measuring one instantly determines the state of the other, 
                      no matter how far apart they are. Einstein called this "spooky action at a distance."
                    </p>
                  ) : (
                    <p>
                      Einstein's "happiest thought": Gravity and acceleration are indistinguishable. 
                      An observer in a closed elevator cannot tell if they are being pulled by a planet 
                      or accelerated by a rocket.
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          {activeExperiment === 'entanglement' && (
            <section className="glass p-8 rounded-3xl border border-white/10">
              <button 
                onClick={toggleEntanglement}
                disabled={isMeasuring}
                className="w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all disabled:opacity-50"
              >
                {isMeasuring ? 'Measuring...' : 'Measure Particle A'}
              </button>
            </section>
          )}

          {activeExperiment === 'equivalence' && (
            <section className="glass p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                <button 
                  onClick={() => setEquivalenceMode('gravity')}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-mono uppercase transition-all ${equivalenceMode === 'gravity' ? 'bg-emerald-500 text-black' : 'text-white/40'}`}
                >
                  On Earth
                </button>
                <button 
                  onClick={() => setEquivalenceMode('acceleration')}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-mono uppercase transition-all ${equivalenceMode === 'acceleration' ? 'bg-emerald-500 text-black' : 'text-white/40'}`}
                >
                  In Space
                </button>
              </div>
              <button 
                onClick={() => {
                  setIsDropping(true);
                  setTimeout(() => setIsDropping(false), 2000);
                }}
                disabled={isDropping}
                className="w-full py-4 border border-emerald-500/50 text-emerald-400 font-bold rounded-2xl hover:bg-emerald-500/10 transition-all disabled:opacity-50"
              >
                Drop Ball
              </button>
            </section>
          )}
        </div>

        {/* Visualization Area */}
        <div className="lg:col-span-8">
          <section className="glass p-8 rounded-[40px] border border-white/10 h-[600px] relative overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              {activeExperiment === 'entanglement' ? (
                <motion.div 
                  key="entanglement-viz"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex flex-col items-center justify-center gap-20"
                >
                  <div className="flex items-center gap-40 relative">
                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-emerald-500/20 border-t border-dashed border-emerald-500/40" />
                    
                    {/* Particle A */}
                    <div className="relative flex flex-col items-center gap-4">
                      <div className="text-[10px] font-mono text-white/40 uppercase">Particle A</div>
                      <motion.div 
                        animate={{ 
                          scale: isMeasuring ? [1, 1.2, 1] : 1,
                          rotate: entangledState === 'up' ? 0 : 180
                        }}
                        className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                      >
                        <ArrowUp className="w-8 h-8 text-black" />
                      </motion.div>
                      <div className="text-xs font-mono text-emerald-400">Spin {entangledState === 'up' ? 'UP' : 'DOWN'}</div>
                    </div>

                    {/* Particle B */}
                    <div className="relative flex flex-col items-center gap-4">
                      <div className="text-[10px] font-mono text-white/40 uppercase">Particle B</div>
                      <motion.div 
                        animate={{ 
                          scale: isMeasuring ? [1, 1.2, 1] : 1,
                          rotate: entangledState === 'up' ? 180 : 0
                        }}
                        className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                      >
                        <ArrowUp className="w-8 h-8 text-black" />
                      </motion.div>
                      <div className="text-xs font-mono text-blue-400">Spin {entangledState === 'up' ? 'DOWN' : 'UP'}</div>
                    </div>
                  </div>

                  <div className="text-center max-w-md">
                    <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] mb-4">Instantaneous Correlation</div>
                    <p className="text-xs text-white/40 leading-relaxed italic">
                      Notice how Particle B reacts instantly when you measure Particle A, 
                      even though no signal could have traveled between them.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="equivalence-viz"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="relative w-64 h-96 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    {/* Elevator Interior */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      {/* Observer */}
                      <div className="w-8 h-16 bg-white/20 rounded-full mb-12" />
                      
                      {/* Ball */}
                      <motion.div 
                        animate={isDropping ? { y: 120 } : { y: 0 }}
                        transition={{ duration: 1, ease: "easeIn" }}
                        className="w-6 h-6 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                      />
                    </div>

                    {/* External Context */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/40 uppercase">
                      {equivalenceMode === 'gravity' ? 'Earth (1g)' : 'Space (1g Accel)'}
                    </div>

                    {/* Visual Cues */}
                    {equivalenceMode === 'gravity' ? (
                      <div className="absolute bottom-0 left-0 right-0 h-2 bg-emerald-500/20" />
                    ) : (
                      <motion.div 
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center"
                      >
                        <ArrowUp className="w-4 h-4 text-emerald-500 animate-pulse" />
                        <ArrowUp className="w-4 h-4 text-emerald-500/50" />
                      </motion.div>
                    )}
                  </div>

                  <div className="ml-12 max-w-xs space-y-6">
                    <div className="glass p-6 rounded-2xl border border-white/10">
                      <h4 className="text-xs font-mono uppercase text-emerald-400 mb-2">The Result</h4>
                      <p className="text-xs text-white/60 leading-relaxed">
                        In both cases, the ball falls to the floor at exactly 9.8 m/s². 
                        Without looking outside, there is <b>no experiment</b> you can perform 
                        to distinguish between gravity and acceleration.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-mono text-white/30 uppercase">
                      <Zap className="w-3 h-3" />
                      <span>Principle of Equivalence</span>
                    </div>
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
