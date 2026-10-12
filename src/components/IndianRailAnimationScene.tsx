import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, FastForward, Volume2, Sparkles, Train, Compass, RotateCcw, Eye, ArrowLeftRight, Heart, Footprints } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { CuteDODOCharacter, DogAnimationState } from './scenes/CuteDODOCharacter';

interface IndianRailAnimationSceneProps {
  className?: string;
}

export const IndianRailAnimationScene: React.FC<IndianRailAnimationSceneProps> = ({ className = '' }) => {
  // Train passing state
  const [trainSpeed, setTrainSpeed] = useState<'superfast' | 'express' | 'halt'>('express');
  const [trainDirection, setTrainDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [trainModel, setTrainModel] = useState<'wap7' | 'vandebharat'>('wap7');
  const [perspectiveView, setPerspectiveView] = useState<'cinematic' | 'parallel' | 'trackside'>('cinematic');
  const [hornBlasting, setHornBlasting] = useState(false);
  const [stationChimeActive, setStationChimeActive] = useState(false);

  // Dog and Owner movement state
  const [ownerDogAction, setOwnerDogAction] = useState<'walking' | 'waving' | 'resting' | 'sprinting'>('walking');
  const [walkPhase, setWalkPhase] = useState(0);
  const [platformPos, setPlatformPos] = useState(30); // percentage across platform 10% - 75%
  const [walkDirection, setWalkDirection] = useState<'right' | 'left'>('right');
  const [dialogueText, setDialogueText] = useState('Dodo and owner enjoying the evening breeze at Chennai Central! 🚆');
  const [dogMood, setDogMood] = useState<DogAnimationState>('walk');

  // Animation frame loop for continuous dog and owner walking movement
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (ownerDogAction === 'walking' || ownerDogAction === 'sprinting') {
        const stepRate = ownerDogAction === 'sprinting' ? 14 : 7;
        setWalkPhase((prev) => (prev + delta * stepRate) % (Math.PI * 2));

        // Move position back and forth along the station platform
        const moveSpeed = (ownerDogAction === 'sprinting' ? 9 : 4.5) * delta;
        setPlatformPos((prev) => {
          if (walkDirection === 'right') {
            if (prev >= 68) {
              setWalkDirection('left');
              return 68;
            }
            return prev + moveSpeed;
          } else {
            if (prev <= 12) {
              setWalkDirection('right');
              return 12;
            }
            return prev - moveSpeed;
          }
        });
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [ownerDogAction, walkDirection]);

  // Sync dog animation state with owner action
  useEffect(() => {
    if (ownerDogAction === 'walking') {
      setDogMood('walk');
    } else if (ownerDogAction === 'sprinting') {
      setDogMood('walk');
    } else if (ownerDogAction === 'waving') {
      setDogMood('play');
    } else if (ownerDogAction === 'resting') {
      setDogMood('sit');
    }
  }, [ownerDogAction]);

  // Train passing duration in seconds
  const getTrainDuration = () => {
    if (trainSpeed === 'superfast') return '6s';
    if (trainSpeed === 'express') return '11s';
    return '0s'; // halted
  };

  // Sound triggers
  const triggerHorn = () => {
    sounds.indianTrainHorn();
    setHornBlasting(true);
    setDialogueText('WAP-7 dual air horn blasts! Dodo’s ears perk up! 📢🐶');
    setTimeout(() => setHornBlasting(false), 1200);
  };

  const triggerStationGong = () => {
    sounds.indianStationGong();
    setStationChimeActive(true);
    setDialogueText('Station announcement: Chennai to Coimbatore Express arriving on Platform 1! 🔔');
    setTimeout(() => setStationChimeActive(false), 2400);
  };

  const handleDogClick = () => {
    sounds.bark();
    setDogMood('play');
    setDialogueText('Dodo gives a joyful bark and wags his tail at the passing locomotive! 🐕✨');
    setTimeout(() => {
      setDogMood(ownerDogAction === 'resting' ? 'sit' : 'walk');
    }, 1500);
  };

  const handleOwnerClick = () => {
    sounds.pop();
    setOwnerDogAction('waving');
    setDialogueText('Owner waves cheerfully at the train driver and loco pilot! 👋👨‍💼');
    setTimeout(() => {
      setOwnerDogAction('walking');
    }, 2500);
  };

  // Coordinated leg and arm cycle for Owner SVG
  const isMoving = ownerDogAction === 'walking' || ownerDogAction === 'sprinting';
  const legSwingAmp = ownerDogAction === 'sprinting' ? 32 : 20;
  const manLegAngle1 = isMoving ? Math.sin(walkPhase) * legSwingAmp : 0;
  const manLegAngle2 = isMoving ? -Math.sin(walkPhase) * legSwingAmp : 0;
  const manArmAngle = ownerDogAction === 'waving'
    ? -45 + Math.sin(walkPhase * 2) * 25
    : isMoving ? Math.sin(walkPhase) * 16 : 0;
  const manBobY = isMoving ? Math.abs(Math.sin(walkPhase)) * (ownerDogAction === 'sprinting' ? 6 : 3.5) : 0;

  // Perspective style classes
  const getPerspectiveStyle = (): React.CSSProperties => {
    if (perspectiveView === 'cinematic') {
      return {
        transform: 'perspective(1100px) rotateY(-5deg) rotateX(2.5deg)',
        transformOrigin: 'center center',
      };
    }
    if (perspectiveView === 'trackside') {
      return {
        transform: 'perspective(900px) scale(1.05) translateY(2px)',
        transformOrigin: 'bottom center',
      };
    }
    return {
      transform: 'none',
    };
  };

  return (
    <div
      className={`relative rounded-3xl overflow-hidden border-4 border-amber-950 bg-amber-50 shadow-[8px_10px_0px_#3d2314] mb-16 select-none ${className}`}
      id="indian-rail-section"
    >
      {/* Top Banner / Station Header Strip */}
      <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 border-b-3 border-amber-950 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-950 text-amber-300 flex items-center justify-center font-bold shadow-[2px_2px_0px_#000] shrink-0">
            <Train className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-2 py-0.5 bg-rose-600 text-white rounded-md border border-amber-950 uppercase tracking-wider">
                Southern Railway
              </span>
              <span className="text-xs font-bold text-amber-950 bg-white/80 px-2 py-0.5 rounded-md border border-amber-950">
                Platform 1 · Chennai Central
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-cartoon text-amber-950 tracking-tight flex items-center gap-2">
              <span>Indian Rail Express Transform Effect</span>
              <span className="text-sm font-sans font-semibold text-amber-900 bg-amber-200/90 px-2.5 py-0.5 rounded-full border border-amber-950/40">
                Chennai Central
              </span>
            </h2>
          </div>
        </div>

        {/* Live Status Prompt Bubble */}
        <div className="bg-white border-2 border-amber-950 rounded-2xl px-4 py-1.5 shadow-[2px_2px_0px_#3d2314] text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-2 max-w-md">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 animate-spin-slow" />
          <span className="truncate">{dialogueText}</span>
        </div>
      </div>

      {/* Control Console Bar: Speed, Transform Perspective, Audio & Dog/Owner Actions */}
      <div className="bg-[#FFFDF4] border-b-2 border-amber-950/20 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Train Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Speed Buttons */}
          <div className="bg-white border-2 border-amber-950 p-1 rounded-2xl flex items-center gap-1 shadow-[2px_2px_0px_#3d2314]">
            <button
              onClick={() => {
                sounds.pop();
                setTrainSpeed('superfast');
                setDialogueText('Superfast Express roaring past at full speed! 🚀');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                trainSpeed === 'superfast'
                  ? 'bg-amber-400 text-amber-950 shadow-[1px_1px_0px_#3d2314]'
                  : 'text-amber-900/70 hover:bg-amber-100'
              }`}
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>Superfast (110 km/h)</span>
            </button>

            <button
              onClick={() => {
                sounds.pop();
                setTrainSpeed('express');
                setDialogueText('Mail Express cruising smoothly on the tracks! 🚆');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                trainSpeed === 'express'
                  ? 'bg-amber-400 text-amber-950 shadow-[1px_1px_0px_#3d2314]'
                  : 'text-amber-900/70 hover:bg-amber-100'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Mail Cruise</span>
            </button>

            <button
              onClick={() => {
                sounds.pop();
                setTrainSpeed('halt');
                setDialogueText('Train halted at Platform 1! Passengers boarding. 🛑');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                trainSpeed === 'halt'
                  ? 'bg-rose-400 text-rose-950 shadow-[1px_1px_0px_#3d2314]'
                  : 'text-amber-900/70 hover:bg-amber-100'
              }`}
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Platform Halt</span>
            </button>
          </div>

          {/* Direction Toggle */}
          <button
            onClick={() => {
              sounds.pop();
              setTrainDirection(trainDirection === 'ltr' ? 'rtl' : 'ltr');
              setDialogueText(
                trainDirection === 'ltr'
                  ? 'Train route reversed: Heading toward Chennai Central! ⬅️'
                  : 'Train route set: Departing Chennai Central outward! ➡️'
              );
            }}
            className="cartoon-btn px-3 py-1.5 bg-white hover:bg-amber-100 text-amber-950 rounded-xl text-xs font-bold flex items-center gap-1.5"
            title="Toggle train passing direction"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-amber-800" />
            <span>Direction: {trainDirection === 'ltr' ? 'L ➔ R' : 'R ➔ L'}</span>
          </button>

          {/* Train Model Livery Switcher */}
          <div className="bg-white border-2 border-amber-950 p-1 rounded-2xl flex items-center gap-1 shadow-[2px_2px_0px_#3d2314]">
            <button
              onClick={() => {
                sounds.pop();
                setTrainModel('wap7');
                setDialogueText('Selected: Iconic WAP-7 Locomotive & Classic Blue ICF Coaches! 🇮🇳');
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                trainModel === 'wap7'
                  ? 'bg-amber-400 text-amber-950 shadow-[1px_1px_0px_#3d2314]'
                  : 'text-amber-900/70 hover:bg-amber-100'
              }`}
            >
              🔴 WAP-7 Express
            </button>
            <button
              onClick={() => {
                sounds.pop();
                setTrainModel('vandebharat');
                setDialogueText('Selected: Vande Bharat Express High-Speed Trainset! ⚡');
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                trainModel === 'vandebharat'
                  ? 'bg-sky-400 text-sky-950 shadow-[1px_1px_0px_#3d2314]'
                  : 'text-amber-900/70 hover:bg-amber-100'
              }`}
            >
              ⚡ Vande Bharat
            </button>
          </div>
        </div>

        {/* Right: Sound & Dog/Owner Movement Control */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Indian Train Horn */}
          <button
            onClick={triggerHorn}
            className={`cartoon-btn px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              hornBlasting ? 'bg-amber-400 text-amber-950 scale-105' : 'bg-rose-500 hover:bg-rose-400 text-white'
            }`}
            title="Blow Indian Railways WAP-7 dual air horn"
          >
            <Volume2 className="w-4 h-4" />
            <span>Train Horn 📢</span>
          </button>

          {/* Station Bell Gong */}
          <button
            onClick={triggerStationGong}
            className="cartoon-btn px-3 py-2 bg-amber-300 hover:bg-amber-200 text-amber-950 rounded-2xl text-xs font-bold flex items-center gap-1"
            title="Ring Station Bell"
          >
            <span>Station Bell 🔔</span>
          </button>

          {/* Perspective View Switcher */}
          <div className="flex items-center gap-1 bg-white border-2 border-amber-950 p-1 rounded-2xl shadow-[2px_2px_0px_#3d2314]">
            <span className="text-[11px] font-bold text-amber-900/80 px-1 flex items-center gap-1">
              <Eye className="w-3 h-3 text-amber-700" /> View:
            </span>
            {(['cinematic', 'parallel', 'trackside'] as const).map((v) => (
              <button
                key={v}
                onClick={() => {
                  sounds.pop();
                  setPerspectiveView(v);
                }}
                className={`px-2 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                  perspectiveView === v
                    ? 'bg-amber-400 text-amber-950 shadow-[1px_1px_0px_#3d2314]'
                    : 'text-amber-900/60 hover:bg-amber-100'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Railway Visual Stage (3D Canvas Box) */}
      <div className="relative w-full h-[400px] sm:h-[480px] md:h-[530px] overflow-hidden bg-slate-950 select-none">
        {/* Layer 1: Authentic Indian Railway Station Platform Backdrop (Chennai Central Photo) */}
        <div
          className="absolute inset-0 z-0 transition-transform duration-500 ease-out will-change-transform"
          style={getPerspectiveStyle()}
        >
          <img
            src="/assets/images/indian_rail_station_1791789596156.jpg"
            alt="Chennai Central Railway Station Platform at golden hour sunset"
            className="w-full h-full object-cover object-bottom"
            loading="eager"
          />
          {/* Atmospheric twilight gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-amber-950/30 pointer-events-none" />
        </div>

        {/* Layer 2: Overhead 25kV Electric Catenary Gantry & Sparkles */}
        <div className="absolute top-0 inset-x-0 h-28 pointer-events-none z-10 opacity-70">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 90">
            {/* Main catenary wire */}
            <path d="M 0 30 Q 250 42 500 32 T 1000 35" fill="none" stroke="#2a180b" strokeWidth="1.8" />
            {/* Contact wire */}
            <line x1="0" y1="48" x2="1000" y2="48" stroke="#3d2314" strokeWidth="1.6" />
            {/* Dropper wires */}
            {Array.from({ length: 25 }).map((_, i) => (
              <line
                key={i}
                x1={i * 40 + 20}
                y1="34"
                x2={i * 40 + 20}
                y2="48"
                stroke="#3d2314"
                strokeWidth="0.8"
                opacity="0.6"
              />
            ))}
          </svg>
          {/* Pantograph electric sparks flashing */}
          <div className="absolute top-10 left-1/3 w-3 h-3 rounded-full bg-sky-300 panto-spark-anim blur-[1px]" />
          <div className="absolute top-10 left-2/3 w-3 h-3 rounded-full bg-cyan-300 panto-spark-anim blur-[1px]" style={{ animationDelay: '1.6s' }} />
        </div>

        {/* Layer 3: Classic Southern Railway Chennai Central Yellow Station Signboard in trilingual */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-25 pointer-events-none">
          <div className="bg-[#FFEB3B] text-amber-950 border-3 border-amber-950 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl shadow-[4px_5px_0px_#000] flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 signal-green-glow shrink-0 border border-amber-950" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base font-cartoon text-amber-950 tracking-wide">
                  CHENNAI CENTRAL
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-amber-900 bg-amber-300/80 px-1.5 py-0.5 rounded border border-amber-950/40">
                  MAS
                </span>
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-amber-900 flex items-center gap-2">
                <span>சென்ட்ரல்</span>
                <span>•</span>
                <span>चेन्नई सेंट्रल</span>
                <span>•</span>
                <span className="text-emerald-800 font-mono">Platform 1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 4: Live Signal Light (Green = Train passing, Red = Halted) */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-25 pointer-events-none">
          <div className="bg-slate-900/90 border-2 border-amber-400 p-2 rounded-xl shadow-[3px_3px_0px_#000] flex flex-col items-center gap-1.5">
            <div className={`w-3.5 h-3.5 rounded-full border border-black ${trainSpeed === 'halt' ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' : 'bg-slate-800'}`} />
            <div className={`w-3.5 h-3.5 rounded-full border border-black ${trainSpeed !== 'halt' ? 'bg-emerald-400 signal-green-glow' : 'bg-slate-800'}`} />
            <span className="text-[9px] font-mono font-bold text-amber-300">MAS-01</span>
          </div>
        </div>

        {/* Layer 5: THE PASSING INDIAN TRAIN with Dynamic Transform Animation */}
        <div
          className="absolute bottom-28 sm:bottom-32 left-0 right-0 h-48 z-20 pointer-events-none overflow-hidden"
          style={getPerspectiveStyle()}
        >
          {/* Train Wrapper with CSS Translation and Direction Transform */}
          <div
            className={`absolute bottom-0 flex items-end ${
              trainSpeed === 'halt'
                ? '!transform-none !left-[8%] sm:!left-[18%]'
                : trainDirection === 'ltr'
                ? 'animate-train-ltr'
                : 'animate-train-rtl'
            }`}
            style={{
              width: '1450px',
              animationDuration: getTrainDuration(),
              animationTimingFunction: 'linear',
              animationIterationCount: trainSpeed === 'halt' ? '1' : 'infinite',
            }}
          >
            <div className="train-rumble relative w-full flex items-end">
              {/* Dynamic Ground Shadow beneath bogies */}
              <div className="absolute -bottom-2 inset-x-4 h-5 bg-black/80 blur-sm rounded-full" />

              {/* ==============================================================
                  LOCOMOTIVE: WAP-7 or Vande Bharat
                  ============================================================== */}
              {trainModel === 'wap7' ? (
                /* --- ICONIC WAP-7 ELECTRIC LOCOMOTIVE (Crimson & Cream) --- */
                <div
                  className={`relative w-[440px] h-[180px] sm:h-[205px] shrink-0 rounded-l-3xl overflow-hidden border-3 border-amber-950 bg-gradient-to-b from-rose-700 via-rose-600 to-rose-800 shadow-[6px_8px_0px_#00000090] ${
                    trainDirection === 'rtl' ? 'rotate-y-180 order-3' : 'order-1'
                  }`}
                >
                  {/* Roof Equipment, Air Tanks & Pantograph */}
                  <div className="absolute top-0 inset-x-4 h-4 bg-slate-300 border-b border-amber-950 flex items-center justify-around px-2">
                    <div className="w-14 h-2 bg-slate-600 rounded" />
                    <div className="w-20 h-2 bg-slate-700 rounded" />
                    <div className="w-12 h-2 bg-slate-600 rounded" />
                  </div>
                  {/* Overhead Pantograph Arm */}
                  <div className="absolute -top-7 left-28 w-14 h-7 border-t-2 border-r-2 border-amber-400 pointer-events-none" />

                  {/* Front Driver Cabin Windshield & Dual Wiper */}
                  <div className="absolute top-8 left-3 w-20 h-22 rounded-l-2xl bg-gradient-to-tr from-slate-900 to-sky-800 border-2 border-amber-950 overflow-hidden shadow-inner">
                    <div className="absolute top-1 left-2 w-14 h-4 bg-white/40 rounded-full blur-[1px] rotate-[-25deg]" />
                    {/* Loco Pilot Silhouette waving */}
                    <div className="absolute bottom-1 right-3 w-6 h-10 bg-slate-900/90 rounded-t-lg flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-amber-200 mt-1" />
                    </div>
                  </div>

                  {/* High Beam Headlights (Twin White Beams) */}
                  <div className="absolute top-32 left-1 flex flex-col gap-2">
                    <div className="w-4 h-4 rounded-full bg-amber-200 border border-amber-950 shadow-[0_0_14px_#FDE047]" />
                    <div className="w-4 h-4 rounded-full bg-amber-200 border border-amber-950 shadow-[0_0_14px_#FDE047]" />
                  </div>
                  {/* Forward Headlight Beam projection */}
                  <div className="absolute top-30 -left-40 w-40 h-20 bg-gradient-to-l from-amber-200/50 via-amber-300/20 to-transparent blur-md pointer-events-none" />

                  {/* Classic Indian Railways Cream & Yellow Warning Band */}
                  <div className="absolute top-32 inset-x-0 h-5 bg-[#FFF275] border-y-2 border-amber-950 flex items-center justify-between px-6">
                    <span className="text-[10px] font-black font-mono text-amber-950 tracking-wider">
                      INDIAN RAILWAYS · WAP-7 37019
                    </span>
                    <span className="text-[9px] font-bold text-amber-950 flex items-center gap-1">
                      <span>🇮🇳</span> MAS
                    </span>
                  </div>

                  {/* Loco Side Vents & Air Filters */}
                  <div className="absolute top-9 left-26 right-4 flex items-center gap-3">
                    <div className="w-24 h-16 rounded-lg bg-rose-900/80 border-2 border-amber-950 grid grid-cols-4 gap-1 p-1">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="bg-slate-950 rounded-xs" />
                      ))}
                    </div>
                    {/* WAP-7 Loco Emblem */}
                    <div className="flex-1 bg-amber-100 border-2 border-amber-950 rounded-lg p-1.5 text-center">
                      <div className="text-[9px] font-black text-rose-900 uppercase">
                        SOUTHERN RAILWAY
                      </div>
                      <div className="text-[8px] font-bold text-amber-950">
                        ROYAPURAM SHED · WAP-7
                      </div>
                    </div>
                  </div>

                  {/* Heavy Bogie Wheels & Suspension Frame */}
                  <div className="absolute bottom-1 inset-x-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-950 flex items-center justify-center animate-wheel-spin">
                        <div className="w-3 h-3 rounded-full bg-slate-400" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-950 flex items-center justify-center animate-wheel-spin">
                        <div className="w-3 h-3 rounded-full bg-slate-400" />
                      </div>
                    </div>
                    <div className="w-20 h-4 bg-slate-800 border border-amber-950 rounded" />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-950 flex items-center justify-center animate-wheel-spin">
                        <div className="w-3 h-3 rounded-full bg-slate-400" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-950 flex items-center justify-center animate-wheel-spin">
                        <div className="w-3 h-3 rounded-full bg-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* --- MODERN VANDE BHARAT EXPRESS ENGINE (White & Navy Aerodynamic) --- */
                <div
                  className={`relative w-[440px] h-[180px] sm:h-[205px] shrink-0 rounded-l-3xl overflow-hidden border-3 border-amber-950 bg-gradient-to-b from-slate-100 via-white to-slate-200 shadow-[6px_8px_0px_#00000090] ${
                    trainDirection === 'rtl' ? 'rotate-y-180 order-3' : 'order-1'
                  }`}
                >
                  {/* Roof AC Unit */}
                  <div className="absolute top-0 inset-x-4 h-4 bg-slate-400 border-b border-amber-950 rounded-t-lg" />
                  {/* Aerodynamic Sleek Windshield */}
                  <div className="absolute top-8 left-2 w-28 h-20 rounded-l-3xl bg-gradient-to-tr from-slate-950 to-sky-900 border-2 border-amber-950 overflow-hidden">
                    <div className="absolute top-1 left-2 w-20 h-4 bg-white/40 rounded-full blur-[1px] rotate-[-20deg]" />
                  </div>
                  {/* Orange & Royal Blue Vande Bharat Streak */}
                  <div className="absolute top-30 inset-x-0 h-6 bg-[#002B49] border-y-2 border-amber-950 flex items-center justify-between px-6">
                    <span className="text-[10px] font-black font-mono text-amber-300 tracking-wider">
                      VANDE BHARAT · CHENNAI ➔ BENGALURU
                    </span>
                    <span className="text-[9px] font-bold text-amber-400">20607</span>
                  </div>
                  <div className="absolute top-36 inset-x-0 h-1.5 bg-[#FF671F]" />
                  {/* Bogies */}
                  <div className="absolute bottom-1 inset-x-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-950 flex items-center justify-center animate-wheel-spin">
                        <div className="w-3 h-3 rounded-full bg-slate-400" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-950 flex items-center justify-center animate-wheel-spin">
                        <div className="w-3 h-3 rounded-full bg-slate-400" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-950 flex items-center justify-center animate-wheel-spin">
                        <div className="w-3 h-3 rounded-full bg-slate-400" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-950 flex items-center justify-center animate-wheel-spin">
                        <div className="w-3 h-3 rounded-full bg-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Inter-coach Gangway Coupler */}
              <div className="w-4 h-26 bg-slate-900 border-y-2 border-amber-950 shrink-0 mb-6 flex flex-col justify-around order-2">
                <div className="h-0.5 bg-slate-600" />
                <div className="h-0.5 bg-slate-600" />
                <div className="h-0.5 bg-slate-600" />
              </div>

              {/* ==============================================================
                  COACH 1: CLASSIC BLUE ICF PASSENGER SLEEPER / AC COACH
                  ============================================================== */}
              <div className="relative w-[450px] h-[180px] sm:h-[205px] shrink-0 overflow-hidden border-3 border-amber-950 bg-gradient-to-b from-sky-800 via-sky-700 to-sky-900 shadow-[6px_8px_0px_#00000090] order-2">
                {/* Roof Vents */}
                <div className="absolute top-0 inset-x-4 h-4 bg-slate-300 border-b border-amber-950 flex items-center justify-around px-2">
                  <div className="w-16 h-2 bg-slate-600 rounded" />
                  <div className="w-16 h-2 bg-slate-600 rounded" />
                </div>

                {/* Classic ICF Yellow Band & Lettering */}
                <div className="absolute top-32 inset-x-0 h-5 bg-[#FFEB3B] border-y-2 border-amber-950 flex items-center justify-between px-6">
                  <span className="text-[10px] font-black font-mono text-amber-950 tracking-wider">
                    SOUTHERN RAILWAY · CUTEDODO EXPRESS
                  </span>
                  <span className="text-[9px] font-bold text-amber-950">COACH S1</span>
                </div>

                {/* Coach Passenger Windows with Warm Golden Interior Light */}
                <div className="absolute top-9 inset-x-4 flex items-center justify-around">
                  {/* Passenger Door */}
                  <div className="relative w-12 h-28 -mt-2 rounded-t-md bg-sky-950 border-2 border-amber-950 flex flex-col items-center pt-2">
                    <div className="w-8 h-12 rounded-xs bg-amber-100 border border-amber-950" />
                    <div className="w-1.5 h-3 bg-amber-400 rounded-full mt-2" />
                  </div>

                  {/* Window 1: Friendly Indian Family waving */}
                  <div className="relative w-16 h-16 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-950 overflow-hidden shadow-inner flex items-end justify-center">
                    <div className="absolute top-1 left-1 w-10 h-3 bg-white/40 rotate-[-20deg] blur-xs" />
                    <div className="w-5 h-9 bg-amber-950/80 rounded-t-md" />
                  </div>

                  {/* Window 2: Cute DODO junior peek-a-boo! */}
                  <div className="relative w-16 h-16 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-950 overflow-hidden shadow-inner flex items-end justify-center">
                    <div className="absolute top-1 left-1 w-10 h-3 bg-white/40 rotate-[-20deg] blur-xs" />
                    <div className="text-2xl animate-bounce">🐶</div>
                  </div>

                  {/* Window 3: Chai cup on table */}
                  <div className="relative w-16 h-16 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-950 overflow-hidden shadow-inner flex items-end justify-around px-1">
                    <div className="absolute top-1 left-1 w-10 h-3 bg-white/40 rotate-[-20deg] blur-xs" />
                    <span className="text-lg">☕</span>
                    <div className="w-4 h-8 bg-amber-950/75 rounded-t-md" />
                  </div>

                  {/* Passenger Door */}
                  <div className="relative w-12 h-28 -mt-2 rounded-t-md bg-sky-950 border-2 border-amber-950 flex flex-col items-center pt-2">
                    <div className="w-8 h-12 rounded-xs bg-amber-100 border border-amber-950" />
                  </div>
                </div>

                {/* Bogies */}
                <div className="absolute bottom-1 inset-x-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-950 flex items-center justify-center animate-wheel-spin">
                      <div className="w-3 h-3 rounded-full bg-slate-400" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-950 flex items-center justify-center animate-wheel-spin">
                      <div className="w-3 h-3 rounded-full bg-slate-400" />
                    </div>
                  </div>
                  <div className="w-20 h-4 bg-slate-800 border border-amber-950 rounded" />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-950 flex items-center justify-center animate-wheel-spin">
                      <div className="w-3 h-3 rounded-full bg-slate-400" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-950 flex items-center justify-center animate-wheel-spin">
                      <div className="w-3 h-3 rounded-full bg-slate-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Inter-coach Gangway Coupler */}
              <div className="w-4 h-26 bg-slate-900 border-y-2 border-amber-950 shrink-0 mb-6 flex flex-col justify-around order-2">
                <div className="h-0.5 bg-slate-600" />
                <div className="h-0.5 bg-slate-600" />
              </div>

              {/* ==============================================================
                  COACH 2: REAR GUARD & LUGGAGE VAN (SLR)
                  ============================================================== */}
              <div className="relative w-[430px] h-[180px] sm:h-[205px] shrink-0 rounded-r-3xl overflow-hidden border-3 border-amber-950 bg-gradient-to-b from-sky-800 via-sky-700 to-sky-900 shadow-[6px_8px_0px_#00000090] order-3">
                {/* Yellow Band */}
                <div className="absolute top-32 inset-x-0 h-5 bg-[#FFEB3B] border-y-2 border-amber-950 flex items-center justify-between px-6">
                  <span className="text-[10px] font-black font-mono text-amber-950 tracking-wider">
                    STRAY DOG RESCUE VAULT
                  </span>
                  <span className="text-[9px] font-bold text-amber-950">GUARD / SLR</span>
                </div>

                {/* Red Tail Marker Lamps */}
                <div className="absolute top-32 right-2 flex flex-col gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-600 border border-amber-950 shadow-[0_0_12px_#F43F5E]" />
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-600 border border-amber-950 shadow-[0_0_12px_#F43F5E]" />
                </div>

                {/* Windows & Guard Cabin */}
                <div className="absolute top-9 left-4 right-14 flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-950 overflow-hidden shadow-inner flex items-end justify-center">
                    <span className="text-xl">🦴</span>
                  </div>
                  <div className="relative w-28 h-20 rounded-lg bg-sky-950 border-2 border-amber-950 flex flex-col items-center justify-center p-2 text-center">
                    <span className="text-[9px] font-bold text-amber-300">LUGGAGE / PET CARE</span>
                    <span className="text-[8px] text-amber-200">1% SHELTER SUPPLIES</span>
                  </div>
                </div>

                {/* Bogies */}
                <div className="absolute bottom-1 inset-x-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-950 flex items-center justify-center animate-wheel-spin">
                      <div className="w-3 h-3 rounded-full bg-slate-400" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-950 flex items-center justify-center animate-wheel-spin">
                      <div className="w-3 h-3 rounded-full bg-slate-400" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-950 flex items-center justify-center animate-wheel-spin">
                      <div className="w-3 h-3 rounded-full bg-slate-400" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-amber-950 flex items-center justify-center animate-wheel-spin">
                      <div className="w-3 h-3 rounded-full bg-slate-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 6: Realistic Indian Railway Track (Dual Steel Rails & Concrete Sleepers) */}
        <div className="absolute bottom-24 sm:bottom-28 inset-x-0 h-8 pointer-events-none z-22">
          {/* Top Steel Rail */}
          <div className="h-1.5 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 shadow-[0_1px_3px_#000]" />
          {/* Concrete Railway Sleepers with Gravel Ballast */}
          <div className="h-4 bg-[#4A3B32] flex items-center justify-around px-1 overflow-hidden">
            {Array.from({ length: 48 }).map((_, idx) => (
              <div key={idx} className="w-2.5 h-4 bg-[#78716C] border-x border-black/60 shadow-xs" />
            ))}
          </div>
          {/* Bottom Steel Rail */}
          <div className="h-1.5 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 shadow-[0_1px_3px_#000]" />
        </div>

        {/* Layer 7: Station Platform Foreground with Tactile Yellow Paving */}
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-t from-[#E2D4C3] via-[#EFE6DC] to-[#D5C4B1] border-t-3 border-amber-950 z-25 overflow-hidden">
          {/* Yellow Tactile Safety Warning Line */}
          <div className="h-2.5 bg-[#FFC107] border-b-2 border-amber-950 flex items-center justify-around px-2 shadow-sm">
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-[#E65100] rounded-xs" />
            ))}
          </div>

          {/* Chai Stall & Platform Signage in background of platform */}
          <div className="absolute top-3 right-6 hidden md:flex items-center gap-2 opacity-90">
            <div className="bg-amber-100 border-2 border-amber-950 rounded-xl px-2.5 py-1 text-center shadow-[1px_1px_0px_#3d2314]">
              <span className="text-[10px] font-black text-amber-950 block">CHAI STALL ☕</span>
              <span className="text-[8px] font-bold text-amber-800">Fresh Masala Chai</span>
            </div>
          </div>

          {/* ==============================================================
              LAYER 8: MOVEMENT OF DOG AND OWNER (Requested feature!)
              ============================================================== */}
          <div
            className="absolute bottom-3 z-30 transition-all duration-300 ease-out"
            style={{
              left: `${platformPos}%`,
              transform: walkDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
              transformOrigin: 'center center',
            }}
          >
            <div className="relative flex items-end">
              {/* --- OWNER CHARACTER (Animated SVG with walking legs & swinging arm) --- */}
              <div
                onClick={handleOwnerClick}
                className="cursor-pointer group select-none relative"
                title="Click owner to wave or interact!"
              >
                {/* Speech Prompt over Owner */}
                {ownerDogAction === 'waving' && (
                  <div
                    className="absolute -top-10 -left-6 bg-white border-2 border-amber-950 px-2 py-0.5 rounded-xl text-[10px] font-bold text-amber-950 shadow-[2px_2px_0px_#3d2314] whitespace-nowrap animate-bounce z-40"
                    style={{ transform: walkDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)' }}
                  >
                    Safe travels, loco pilot! 👋
                  </div>
                )}

                <svg
                  viewBox="0 0 160 220"
                  className="w-28 h-40 sm:w-32 sm:h-44 drop-shadow-[2px_3px_0px_#3d2314] overflow-visible"
                  style={{ transform: `translateY(${-manBobY}px)` }}
                >
                  {/* Man Ground Shadow */}
                  <ellipse cx="65" cy="208" rx="26" ry="7" fill="#3d2314" opacity="0.25" />

                  {/* Back Leg */}
                  <g style={{ transform: `rotate(${manLegAngle2}deg)`, transformOrigin: '65px 135px' }}>
                    <path
                      d="M 62 135 L 56 175 L 54 205 L 68 205 L 70 175 Z"
                      fill="#1E293B"
                      stroke="#3d2314"
                      strokeWidth="2.5"
                    />
                    <path d="M 50 205 C 50 200 68 200 74 205 L 76 210 L 48 210 Z" fill="#92400E" stroke="#3d2314" strokeWidth="2" />
                  </g>

                  {/* Front Leg */}
                  <g style={{ transform: `rotate(${manLegAngle1}deg)`, transformOrigin: '65px 135px' }}>
                    <path
                      d="M 68 135 L 74 175 L 76 205 L 90 205 L 86 175 Z"
                      fill="#334155"
                      stroke="#3d2314"
                      strokeWidth="2.5"
                    />
                    <path d="M 72 205 C 72 200 90 200 96 205 L 98 210 L 70 210 Z" fill="#92400E" stroke="#3d2314" strokeWidth="2" />
                  </g>

                  {/* Torso: Indian Casual Polo with collar */}
                  <path
                    d="M 45 75 L 85 75 L 88 140 L 42 140 Z"
                    fill="#F59E0B"
                    stroke="#3d2314"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  {/* Collar details */}
                  <path d="M 55 75 L 65 95 L 75 75" fill="#D97706" stroke="#3d2314" strokeWidth="2" />

                  {/* Head & Hair */}
                  <circle cx="65" cy="46" r="18" fill="#FBBF24" stroke="#3d2314" strokeWidth="3" />
                  <path
                    d="M 48 42 C 48 26 82 24 82 42 C 78 35 54 34 48 42 Z"
                    fill="#451A03"
                    stroke="#3d2314"
                    strokeWidth="2.5"
                  />
                  {/* Friendly smiling face */}
                  <circle cx="72" cy="44" r="2.5" fill="#3d2314" />
                  <path d="M 68 52 Q 74 57 78 52" fill="none" stroke="#3d2314" strokeWidth="2" strokeLinecap="round" />

                  {/* Arm holding leash or waving */}
                  <g style={{ transform: `rotate(${manArmAngle}deg)`, transformOrigin: '50px 80px' }}>
                    <path
                      d="M 50 82 Q 75 100 98 112"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Hand holding leash handle */}
                    <circle cx="100" cy="114" r="5" fill="#FBBF24" stroke="#3d2314" strokeWidth="2" />
                  </g>
                </svg>
              </div>

              {/* Dynamic Curved Leash (from Owner hand to Dog collar) */}
              <svg className="w-24 h-24 -ml-4 pointer-events-none overflow-visible z-20">
                <path
                  d="M 12 40 Q 45 70 80 50"
                  fill="none"
                  stroke="#B45309"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={isMoving ? 'none' : '3 2'}
                />
                <circle cx="80" cy="50" r="3" fill="#F59E0B" stroke="#3d2314" strokeWidth="1.5" />
              </svg>

              {/* --- CUTEDODO CHARACTER BESIDE OWNER --- */}
              <div
                onClick={handleDogClick}
                className="cursor-pointer select-none -ml-6 relative z-30 group"
                title="Click CuteDODO to hear him bark and hop!"
              >
                {/* Collar Bell / Chennai Tag */}
                <div
                  className="absolute -top-7 -right-2 bg-amber-400 border border-amber-950 px-2 py-0.5 rounded-full text-[9px] font-extrabold text-amber-950 shadow-[1px_1px_0px_#3d2314] whitespace-nowrap animate-pulse"
                  style={{ transform: walkDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)' }}
                >
                  CuteDODO 🔔
                </div>

                <CuteDODOCharacter
                  state={dogMood}
                  facing="right"
                  tailWagSpeed={isMoving ? 'fast' : 'normal'}
                  scale={0.9}
                  className="transition-transform group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Platform Edge safety label */}
          <div className="absolute bottom-2 inset-x-6 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-amber-950/80 pointer-events-none">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 signal-green-glow" />
              <span>Platform 1 · VJDurga & CuteDODO on Evening Stroll</span>
            </span>
            <span className="hidden sm:inline font-mono text-amber-900">
              Chennai Central Railway Junction 🚉
            </span>
            <span className="text-amber-900 font-cartoon">
              🐾 Indian Railways · Wholesome Journey
            </span>
          </div>
        </div>
      </div>

      {/* Movement Selector & Story Footer */}
      <div className="bg-[#FFFDF4] border-t-2 border-amber-950/20 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Owner & Dog Activity Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
            <Footprints className="w-3.5 h-3.5 text-amber-700" /> Dog & Owner Action:
          </span>
          {(
            [
              { id: 'walking', label: '🚶‍♂️ Platform Stroll' },
              { id: 'waving', label: '👋 Wave at Train' },
              { id: 'resting', label: '☕ Chai Break' },
              { id: 'sprinting', label: '⚡ Joyful Jog' },
            ] as const
          ).map((act) => (
            <button
              key={act.id}
              onClick={() => {
                sounds.pop();
                setOwnerDogAction(act.id);
                if (act.id === 'walking') {
                  setDialogueText('Dodo and owner pacing along the Chennai Central platform! 🐾🚶‍♂️');
                } else if (act.id === 'waving') {
                  setDialogueText('Waving at the loco pilot as the train rumbles past! 👋🚂');
                } else if (act.id === 'resting') {
                  setDialogueText('Taking a relaxed break beside the platform Chai stall! ☕🐶');
                } else if (act.id === 'sprinting') {
                  setDialogueText('CuteDODO zoomies alongside the passing coaches! 🏃‍♂️💨');
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 border-amber-950 transition-all ${
                ownerDogAction === act.id
                  ? 'bg-amber-400 text-amber-950 shadow-[2px_2px_0px_#3d2314]'
                  : 'bg-white text-amber-900 hover:bg-amber-100'
              }`}
            >
              {act.label}
            </button>
          ))}
        </div>

        {/* Narrative / Context info */}
        <div className="text-xs font-semibold text-amber-900/80 flex items-center gap-1.5 text-center md:text-right">
          <Heart className="w-3.5 h-3.5 text-rose-600 shrink-0 fill-current" />
          <span>
            Inspired by Chennai hometown roots & 7-nation journey uniting animal lovers across borders.
          </span>
        </div>
      </div>
    </div>
  );
};
