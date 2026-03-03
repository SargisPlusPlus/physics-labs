import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LightClock } from './components/LightClock';
import { SpaceBackground } from './components/SpaceBackground';
import { MinkowskiDiagram } from './components/MinkowskiDiagram';
import { DoubleSlitExperiment } from './components/DoubleSlitExperiment';
import { SimultaneityLab } from './components/SimultaneityLab';
import { RealityLab } from './components/RealityLab';
import { Info, Zap, Timer, Move, RotateCcw, Atom, Rocket, Layers, Globe, Activity, LineChart as ChartIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function App() {
  const [velocity, setVelocity] = useState(0);
  const [showTheory, setShowTheory] = useState(false);
  const [activeTab, setActiveTab] = useState<'relativity' | 'quantum' | 'simultaneity' | 'reality'>('relativity');
  const [activeView, setActiveView] = useState<'grid' | 'minkowski'>('grid');
  const [graphData, setGraphData] = useState<{ v: number; gamma: number }[]>([]);

  // Lorentz Factor: gamma = 1 / sqrt(1 - v^2/c^2)
  const gamma = 1 / Math.sqrt(1 - Math.pow(velocity, 2));
  const timeDilation = (1 / gamma).toFixed(3);
  const lengthContraction = (1 / gamma).toFixed(3);

  useEffect(() => {
    const data = [];
    for (let v = 0; v <= 0.99; v += 0.05) {
      data.push({
        v: v * 100,
        gamma: 1 / Math.sqrt(1 - Math.pow(v, 2))
      });
    }
    setGraphData(data);
  }, []);

  return (
    <div className="min-h-screen text-white selection:bg-emerald-500/30">
      <SpaceBackground />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-8 flex justify-between items-end z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="text-5xl font-display font-bold tracking-tighter uppercase leading-none">
            Physics<br/><span className="text-emerald-400">Lab</span>
          </h1>
          <p className="mt-2 text-xs font-mono text-white/40 uppercase tracking-[0.2em]">
            Exploring the fundamental laws of nature
          </p>
        </div>
        
        <div className="flex items-center gap-4 pointer-events-auto">
          <nav className="flex bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md">
            <button 
              onClick={() => setActiveTab('relativity')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono uppercase transition-all ${activeTab === 'relativity' ? 'bg-emerald-500 text-black' : 'text-white/40 hover:text-white'}`}
            >
              <Rocket className="w-3.5 h-3.5" />
              Relativity
            </button>
            <button 
              onClick={() => setActiveTab('quantum')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono uppercase transition-all ${activeTab === 'quantum' ? 'bg-emerald-500 text-black' : 'text-white/40 hover:text-white'}`}
            >
              <Atom className="w-3.5 h-3.5" />
              Quantum
            </button>
            <button 
              onClick={() => setActiveTab('simultaneity')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono uppercase transition-all ${activeTab === 'simultaneity' ? 'bg-emerald-500 text-black' : 'text-white/40 hover:text-white'}`}
            >
              <Layers className="w-3.5 h-3.5" />
              Spacetime
            </button>
            <button 
              onClick={() => setActiveTab('reality')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono uppercase transition-all ${activeTab === 'reality' ? 'bg-emerald-500 text-black' : 'text-white/40 hover:text-white'}`}
            >
              <Activity className="w-3.5 h-3.5" />
              Reality Lab
            </button>
          </nav>
          
          <button 
            onClick={() => setShowTheory(!showTheory)}
            className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-40 pb-20 px-8 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'relativity' ? (
            <motion.div 
              key="relativity"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Column: Controls & Stats */}
              <div className="lg:col-span-4 space-y-8">
                <section className="glass p-8 rounded-3xl border border-white/10">
                  <div className="flex items-center gap-2 mb-6">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <h2 className="text-xs font-mono uppercase tracking-widest text-white/60">Velocity Control</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <span className="text-4xl font-display font-bold tabular-nums">
                        {(velocity * 100).toFixed(1)}<span className="text-xl text-white/30">%</span>
                      </span>
                      <span className="text-xs font-mono text-white/40 uppercase">Fraction of c</span>
                    </div>
                    
                    <input 
                      type="range" 
                      min="0" 
                      max="0.99" 
                      step="0.01" 
                      value={velocity}
                      onChange={(e) => setVelocity(parseFloat(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                    />
                    
                    <div className="grid grid-cols-3 gap-2">
                      {[0, 0.5, 0.9, 0.99].map(v => (
                        <button 
                          key={v}
                          onClick={() => setVelocity(v)}
                          className="py-2 text-[10px] font-mono uppercase border border-white/10 rounded hover:bg-white/5 transition-colors"
                        >
                          {v === 0 ? 'Static' : `${v * 100}%`}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="grid grid-cols-2 gap-4">
                  <div className="glass p-6 rounded-3xl border border-white/10">
                    <Timer className="w-4 h-4 text-emerald-400 mb-4" />
                    <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Time Rate</div>
                    <div className="text-2xl font-display font-bold">{timeDilation}x</div>
                    <div className="text-[9px] text-white/30 mt-2 leading-tight">
                      Relative to stationary observer
                    </div>
                  </div>
                  <div className="glass p-6 rounded-3xl border border-white/10">
                    <Move className="w-4 h-4 text-emerald-400 mb-4" />
                    <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Length</div>
                    <div className="text-2xl font-display font-bold">{lengthContraction}x</div>
                    <div className="text-[9px] text-white/30 mt-2 leading-tight">
                      Contraction in direction of motion
                    </div>
                  </div>
                </section>

                <section className="glass p-8 rounded-3xl border border-white/10">
                  <div className="flex items-center gap-2 mb-6">
                    <ChartIcon className="w-4 h-4 text-emerald-400" />
                    <h2 className="text-xs font-mono uppercase tracking-widest text-white/60">Lorentz Curve</h2>
                  </div>
                  <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="v" hide />
                        <YAxis hide domain={[1, 10]} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                          itemStyle={{ color: '#10b981', fontSize: '10px', textTransform: 'uppercase' }}
                        />
                        <Line type="monotone" dataKey="gamma" stroke="#10b981" strokeWidth={2} dot={false} />
                        {/* Current Point */}
                        <Line 
                          type="monotone" 
                          data={[{ v: velocity * 100, gamma: gamma }]} 
                          dataKey="gamma" 
                          stroke="#fff" 
                          dot={{ r: 4, fill: '#fff' }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-white/40 uppercase">Lorentz Factor (γ)</span>
                    <span className="text-xl font-display font-bold">{gamma.toFixed(3)}</span>
                  </div>
                </section>
              </div>

              {/* Right Column: Visualizations */}
              <div className="lg:col-span-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <LightClock velocity={0} label="Observer (Rest)" />
                  <LightClock velocity={velocity} label="Traveler (Moving)" />
                </div>

                {/* Space-Time Visualization */}
                <section className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden h-[500px]">
                   <div className="absolute top-8 left-8 z-10 flex justify-between w-[calc(100%-64px)] items-start">
                      <div>
                        <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
                          {activeView === 'grid' ? 'Space-Time Grid' : 'Minkowski Diagram'}
                        </h3>
                        <p className="text-sm text-white/60 max-w-xs">
                          {activeView === 'grid' 
                            ? 'As you move faster, you are essentially "rotating" your motion from the time dimension into space.'
                            : 'Visualizing how space and time axes tilt relative to each other as velocity increases.'
                          }
                        </p>
                      </div>
                      
                      <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                        <button 
                          onClick={() => setActiveView('grid')}
                          className={`px-3 py-1.5 rounded-md text-[10px] font-mono uppercase transition-all ${activeView === 'grid' ? 'bg-emerald-500 text-black' : 'text-white/40 hover:text-white'}`}
                        >
                          3D Grid
                        </button>
                        <button 
                          onClick={() => setActiveView('minkowski')}
                          className={`px-3 py-1.5 rounded-md text-[10px] font-mono uppercase transition-all ${activeView === 'minkowski' ? 'bg-emerald-500 text-black' : 'text-white/40 hover:text-white'}`}
                        >
                          Diagram
                        </button>
                      </div>
                   </div>

                   {/* Visualization Container */}
                   <div className="absolute inset-0 flex items-center justify-center">
                      {activeView === 'grid' ? (
                        <div 
                          className="relative w-[600px] h-[600px] transition-transform duration-700 ease-out"
                          style={{ 
                            perspective: '1000px',
                            transform: `rotateX(60deg) rotateZ(${-velocity * 45}deg)` 
                          }}
                        >
                          {/* Grid Lines */}
                          <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 border border-emerald-500/20">
                            {Array.from({ length: 121 }).map((_, i) => (
                              <div key={i} className="border-[0.5px] border-emerald-500/10" />
                            ))}
                          </div>

                          {/* World Line */}
                          <motion.div 
                            className="absolute bottom-1/2 left-1/2 w-1 h-[300px] bg-emerald-400 origin-bottom"
                            animate={{ 
                              rotateZ: velocity * 90,
                              scaleY: gamma
                            }}
                            transition={{ type: 'spring', stiffness: 50 }}
                          />
                          
                          {/* Observer Line */}
                          <div className="absolute bottom-1/2 left-1/2 w-1 h-[300px] bg-white/10 origin-bottom" />
                        </div>
                      ) : (
                        <div className="w-full h-full max-w-md max-h-md">
                          <MinkowskiDiagram velocity={velocity} />
                        </div>
                      )}
                   </div>
                   
                   <div className="absolute bottom-8 right-8 text-right">
                      <div className="text-[10px] font-mono text-white/40 uppercase">
                        {activeView === 'grid' ? 'Visualizing Rotation' : 'Lorentz Boost'}
                      </div>
                      <div className="text-xs text-white/60 mt-1">
                        {activeView === 'grid' 
                          ? 'Acceleration is a rotation in 4D space-time'
                          : 'Space and time are two sides of the same coin'
                        }
                      </div>
                   </div>
                </section>
              </div>
            </motion.div>
          ) : activeTab === 'quantum' ? (
            <motion.div 
              key="quantum"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <DoubleSlitExperiment />
            </motion.div>
          ) : activeTab === 'simultaneity' ? (
            <motion.div 
              key="simultaneity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SimultaneityLab />
            </motion.div>
          ) : (
            <motion.div 
              key="reality"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <RealityLab />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Theory Overlay */}
      <AnimatePresence>
        {showTheory && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-xl"
          >
            <div className="max-w-4xl glass p-12 rounded-[40px] border border-white/20 relative">
              <button 
                onClick={() => setShowTheory(false)}
                className="absolute top-8 right-8 text-white/40 hover:text-white"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
              
              <h2 className="text-4xl font-display font-bold mb-8">The Core Concepts</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-white/70 leading-relaxed overflow-y-auto max-h-[70vh] pr-4">
                <div className="space-y-8">
                  <h3 className="text-white font-display text-xl">Relativity</h3>
                  <div>
                    <h4 className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">1. Measurement vs. Reality</h4>
                    <p>Clocks don't physically 'slow down'. Instead, you <b>measure</b> a moving clock as behind because you are viewing its motion from a tilted angle in 4D spacetime.</p>
                  </div>
                  <div>
                    <h4 className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">2. Hyperbolic Geometry</h4>
                    <p>In space, distance is circular (x² + y²). In spacetime, it's hyperbolic (t² - x²). This minus sign means that 'straight' inertial paths actually accumulate the <b>most</b> time.</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-white font-display text-xl">Quantum Mechanics</h3>
                  <div>
                    <h4 className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">1. The Observer Effect</h4>
                    <p>The act of measuring or observing a quantum system forces it to choose a single state, "collapsing" the wave function into a definite particle position.</p>
                  </div>
                  <div>
                    <h4 className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">2. Entanglement</h4>
                    <p>Particles can become linked such that the state of one instantly determines the state of the other, regardless of distance. This suggests reality is non-local.</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-white font-display text-xl">Reality & Spacetime</h3>
                  <div>
                    <h4 className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">1. Equivalence Principle</h4>
                    <p>Gravity and acceleration are indistinguishable. This insight led Einstein to realize that gravity is not a force, but the curvature of spacetime itself.</p>
                  </div>
                  <div>
                    <h4 className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">2. The Block Universe</h4>
                    <p>If "now" is relative, then all moments—past, present, and future—must be equally real. Time is a static 4D block we move through.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="p-8 text-center text-[10px] font-mono text-white/20 uppercase tracking-widest">
        Physics Lab // Educational Simulation // {new Date().getFullYear()}
      </footer>
    </div>
  );
}
