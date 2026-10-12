import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, Trophy, RotateCcw, Volume2, Heart, Award } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

type ToyType = 'ball' | 'bone' | 'treat' | 'star';

interface DroppedToy {
  id: number;
  x: number;
  y: number;
  type: ToyType;
  bounces: number;
  caught: boolean;
}

export const HeroPointerPlayground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking state relative to the playground container
  const [mousePos, setMousePos] = useState({ x: 260, y: 150 });
  const [isInside, setIsInside] = useState(false);
  const [selectedToy, setSelectedToy] = useState<ToyType>('ball');
  const [fetchScore, setFetchScore] = useState(0);

  // CuteDODO positioning and animation state
  const [dodoPos, setDodoPos] = useState({ x: 120, y: 180 });
  const [dodoFacing, setDodoFacing] = useState<'left' | 'right'>('right');
  const [dodoAction, setDodoAction] = useState<'idle' | 'running' | 'fetching' | 'happy'>('idle');
  const [speechText, setSpeechText] = useState('Move your mouse here! Dodo loves chasing toys! 🐾');
  const [droppedToys, setDroppedToys] = useState<DroppedToy[]>([]);
  const [tailSpeed, setTailSpeed] = useState<'normal' | 'fast' | 'none'>('normal');

  // Next toy ID counter
  const nextToyIdRef = useRef(1);
  const isFetchingRef = useRef(false);

  // Compute angle from Dodo to mouse
  const dx = mousePos.x - dodoPos.x;
  const dy = mousePos.y - dodoPos.y;
  const distance = Math.hypot(dx, dy);

  // Eye pupil offset (clamped to [-6, 6] px)
  const eyeAngle = Math.atan2(dy, dx);
  const pupilX = Math.cos(eyeAngle) * Math.min(6, distance * 0.05);
  const pupilY = Math.sin(eyeAngle) * Math.min(5, distance * 0.05);

  // Head tilt rotation (between -14deg and +14deg)
  const headTilt = Math.max(-14, Math.min(14, (dx / 300) * 12));

  // Handle Mouse Move inside container
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(10, Math.min(rect.width - 10, e.clientX - rect.left));
    const y = Math.max(10, Math.min(rect.height - 10, e.clientY - rect.top));

    setMousePos({ x, y });
    setIsInside(true);

    // If close to Dodo, wag tail super fast!
    const distToDodo = Math.hypot(x - dodoPos.x, y - dodoPos.y);
    if (distToDodo < 100) {
      setTailSpeed('fast');
      if (!isFetchingRef.current && dodoAction !== 'fetching') {
        setSpeechText("Ooh you're tickling my nose! 🥰 Ruff!");
      }
    } else {
      setTailSpeed('normal');
      if (!isFetchingRef.current && dodoAction !== 'fetching') {
        if (x > dodoPos.x + 30) {
          setDodoFacing('right');
          setSpeechText("Dodo is tracking your mouse pointer to the right! 🐾");
        } else if (x < dodoPos.x - 30) {
          setDodoFacing('left');
          setSpeechText("Dodo is tracking your mouse pointer to the left! 🐾");
        }
      }
    }
  }, [dodoPos, dodoAction]);

  // Click inside container to throw / drop the toy
  const handlePlaygroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isFetchingRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const targetX = Math.max(40, Math.min(rect.width - 50, e.clientX - rect.left));
    const targetY = Math.max(80, Math.min(rect.height - 50, e.clientY - rect.top));

    sounds.pop();

    const newToy: DroppedToy = {
      id: nextToyIdRef.current++,
      x: targetX,
      y: targetY,
      type: selectedToy,
      bounces: 0,
      caught: false,
    };

    setDroppedToys((prev) => [...prev, newToy]);
    executeFetch(newToy);
  };

  // Animate CuteDODO running to fetch the toy
  const executeFetch = (toy: DroppedToy) => {
    isFetchingRef.current = true;
    setDodoAction('running');
    setTailSpeed('fast');
    sounds.bark();

    setSpeechText("Fetch! CuteDODO is sprinting to the toy! 🚀");
    const targetFacing = toy.x > dodoPos.x ? 'right' : 'left';
    setDodoFacing(targetFacing);

    // Step 1: Run to toy position
    setTimeout(() => {
      // Dodo arrives next to the toy
      setDodoPos({
        x: targetFacing === 'right' ? toy.x - 40 : toy.x + 40,
        y: Math.min(toy.y, 200),
      });
      setDodoAction('fetching');
      sounds.chew();

      setSpeechText("Pounced! Dodo caught the " + toy.type + "! 🐶🎉");

      // Step 2: Mark toy caught & celebrate
      setTimeout(() => {
        sounds.coin();
        setFetchScore((prev) => prev + 1);
        setDodoAction('happy');
        setDroppedToys((prev) => prev.filter((t) => t.id !== toy.id));

        // Return to center idle after celebration
        setTimeout(() => {
          setDodoAction('idle');
          setTailSpeed('normal');
          isFetchingRef.current = false;
          setSpeechText("Good boy Dodo! Drop another toy with your mouse! 🐾");
        }, 1200);
      }, 700);
    }, 600);
  };

  const toyEmojis: Record<ToyType, string> = {
    ball: '🎾',
    bone: '🦴',
    treat: '🥩',
    star: '⭐',
  };

  return (
    <div className="cartoon-card bg-linear-to-b from-amber-50 to-amber-100/60 rounded-3xl p-4 sm:p-6 border-3 border-amber-950 shadow-[6px_8px_0px_#3d2314] relative overflow-hidden mb-12">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-amber-950/10">
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-spin-slow">🐾</span>
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-cartoon text-amber-950 flex items-center gap-2">
              CuteDODO Interactive Mouse Playground
              <span className="text-xs px-2.5 py-0.5 bg-emerald-300 border border-amber-950 rounded-full font-sans font-bold text-amber-950">
                Move Mouse &amp; Click
              </span>
            </h3>
            <p className="text-xs text-amber-800 font-medium">
              Dodo watches your mouse pointer in real-time! Click anywhere in the yard to throw a toy for him to fetch!
            </p>
          </div>
        </div>

        {/* Score & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-300 border-2 border-amber-950 rounded-2xl shadow-[2px_2px_0px_#3d2314] text-xs font-bold text-amber-950">
            <Trophy className="w-3.5 h-3.5 text-amber-900" />
            <span>Fetched: <strong className="text-sm font-mono">{fetchScore}</strong></span>
          </div>

          <button
            onClick={() => {
              sounds.pop();
              setFetchScore(0);
              setDodoPos({ x: 120, y: 180 });
              setDodoAction('idle');
            }}
            className="p-1.5 bg-white hover:bg-amber-100 border-2 border-amber-950 rounded-xl shadow-[2px_2px_0px_#3d2314] text-amber-900 text-xs font-bold transition-transform active:scale-95"
            title="Reset fetch counter"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Toy Toolbar Selector */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-bold text-amber-900">Choose Mouse Toy:</span>
        {(['ball', 'bone', 'treat', 'star'] as ToyType[]).map((toy) => (
          <button
            key={toy}
            onClick={() => {
              sounds.pop();
              setSelectedToy(toy);
            }}
            className={`px-3 py-1 rounded-xl border-2 font-bold text-xs flex items-center gap-1.5 transition-all ${
              selectedToy === toy
                ? 'bg-amber-400 border-amber-950 shadow-[2px_2px_0px_#3d2314] -translate-y-0.5'
                : 'bg-white border-amber-950/40 text-amber-900 hover:bg-amber-100/50'
            }`}
          >
            <span className="text-base">{toyEmojis[toy]}</span>
            <span className="capitalize">{toy}</span>
          </button>
        ))}
      </div>

      {/* The Interactive Interactive Arena */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsInside(true)}
        onMouseLeave={() => {
          setIsInside(false);
          setTailSpeed('normal');
        }}
        onClick={handlePlaygroundClick}
        className="relative w-full h-[280px] sm:h-[320px] rounded-2xl bg-linear-to-b from-sky-200 via-emerald-100 to-emerald-200 border-3 border-amber-950 overflow-hidden cursor-crosshair select-none shadow-inner"
        style={{ perspective: 800 }}
      >
        {/* Park Environment details */}
        {/* Soft cartoon clouds */}
        <div className="absolute top-3 left-6 text-2xl opacity-60 animate-pulse">☁️</div>
        <div className="absolute top-6 right-16 text-3xl opacity-50">☁️</div>
        <div className="absolute top-2 right-1/3 text-xl opacity-40">☀️</div>

        {/* Green ground lawn texture */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-linear-to-t from-emerald-400 via-emerald-300 to-emerald-200 border-t-2 border-emerald-500/30">
          {/* Subtle grass tufts */}
          <div className="absolute bottom-3 left-8 text-xs text-emerald-800 font-bold opacity-70">🌱 🌱</div>
          <div className="absolute bottom-6 left-1/3 text-xs text-emerald-800 font-bold opacity-70">🌿</div>
          <div className="absolute bottom-2 right-1/4 text-xs text-emerald-800 font-bold opacity-70">🌱 🌱</div>
          <div className="absolute bottom-8 right-12 text-xs text-emerald-800 font-bold opacity-70">🌼 🌸</div>
        </div>

        {/* Speech Bubble Floating above CuteDODO */}
        <div
          className="absolute z-20 transition-all duration-300 pointer-events-none"
          style={{
            left: `${dodoPos.x - 20}px`,
            top: `${dodoPos.y - 75}px`,
          }}
        >
          <div className="bg-white border-2 border-amber-950 rounded-2xl px-3 py-1.5 shadow-[3px_3px_0px_#3d2314] text-xs font-bold text-amber-950 max-w-[220px] text-center animate-bounce">
            {speechText}
            <div className="absolute -bottom-2 left-8 w-3 h-3 bg-white border-r-2 border-b-2 border-amber-950 rotate-45" />
          </div>
        </div>

        {/* Dropped Toys on the field */}
        {droppedToys.map((toy) => (
          <div
            key={toy.id}
            className="absolute z-15 -translate-x-1/2 -translate-y-1/2 text-2xl animate-bounce pointer-events-none filter drop-shadow-md"
            style={{
              left: `${toy.x}px`,
              top: `${toy.y}px`,
            }}
          >
            {toyEmojis[toy.type]}
            {/* Ground shadow */}
            <div className="w-6 h-2 bg-black/20 rounded-full mx-auto -mt-1 blur-[1px]" />
          </div>
        ))}

        {/* The Animated CuteDODO Vector Character with Real-Time Head & Eye Tracking */}
        <div
          className="absolute z-10 transition-all duration-500 ease-out will-change-transform"
          style={{
            left: `${dodoPos.x}px`,
            top: `${dodoPos.y}px`,
            transform: `scale(${dodoFacing === 'left' ? -1 : 1}, 1)`,
          }}
        >
          {/* Ground drop shadow */}
          <div className="absolute bottom-0 left-4 w-28 h-5 bg-amber-950/20 rounded-full blur-[2px]" />

          {/* SVG CuteDODO Model */}
          <div
            className={`relative w-36 h-32 ${
              dodoAction === 'running' ? 'animate-bounce' : dodoAction === 'happy' ? 'animate-pulse' : ''
            }`}
          >
            <svg
              viewBox="0 0 160 140"
              className="w-full h-full overflow-visible"
            >
              {/* Fluffy wagging tail */}
              <g
                className={`origin-left transition-transform ${
                  tailSpeed === 'fast'
                    ? 'animate-tail-fast'
                    : tailSpeed === 'normal'
                    ? 'animate-tail'
                    : ''
                }`}
                style={{ transformOrigin: '32px 75px' }}
              >
                <path
                  d="M 32 75 C 15 65 10 40 25 35 C 38 32 42 50 34 72 Z"
                  fill="#F5F5F4"
                  stroke="#3d2314"
                  strokeWidth="2.5"
                />
                <circle cx="24" cy="38" r="7" fill="#B45309" opacity="0.8" />
              </g>

              {/* Back Paws */}
              <ellipse cx="45" cy="115" rx="10" ry="6" fill="#F5F5F4" stroke="#3d2314" strokeWidth="2.5" />
              <ellipse cx="68" cy="115" rx="10" ry="6" fill="#F5F5F4" stroke="#3d2314" strokeWidth="2.5" />

              {/* Dog Body (White with rich brown patch) */}
              <rect
                x="40"
                y="65"
                width="64"
                height="45"
                rx="20"
                fill="#FAFAF9"
                stroke="#3d2314"
                strokeWidth="2.8"
              />
              {/* Saddle Patch */}
              <path
                d="M 52 65 C 65 65 80 72 82 85 C 80 95 60 98 52 88 Z"
                fill="#B45309"
                opacity="0.9"
              />

              {/* Front Paws */}
              <ellipse cx="90" cy="116" rx="10" ry="6" fill="#F5F5F4" stroke="#3d2314" strokeWidth="2.5" />
              <ellipse cx="108" cy="116" rx="10" ry="6" fill="#F5F5F4" stroke="#3d2314" strokeWidth="2.5" />

              {/* Collar with Golden Bell */}
              <path
                d="M 94 65 C 98 75 110 75 114 65"
                stroke="#DC2626"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="104" cy="74" r="5" fill="#FBBF24" stroke="#3d2314" strokeWidth="1.8" />
              <circle cx="104" cy="74" r="1.5" fill="#78350F" />

              {/* Head Group - Tilt rotates toward mouse cursor! */}
              <g
                style={{
                  transformOrigin: '105px 50px',
                  transform: `rotate(${headTilt}deg)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                {/* Fluffy ears */}
                {/* Left Ear */}
                <path
                  d="M 88 35 C 75 35 72 65 85 70 C 92 72 96 55 92 40 Z"
                  fill="#92400E"
                  stroke="#3d2314"
                  strokeWidth="2.5"
                />
                {/* Right Ear */}
                <path
                  d="M 124 35 C 137 35 140 65 127 70 C 120 72 116 55 120 40 Z"
                  fill="#92400E"
                  stroke="#3d2314"
                  strokeWidth="2.5"
                />

                {/* Head circle */}
                <circle
                  cx="106"
                  cy="46"
                  r="24"
                  fill="#FFFBEB"
                  stroke="#3d2314"
                  strokeWidth="2.8"
                />

                {/* Shih-tzu facial mask / brown eye patches */}
                <ellipse cx="98" cy="44" rx="8" ry="9" fill="#B45309" opacity="0.85" />
                <ellipse cx="114" cy="44" rx="8" ry="9" fill="#B45309" opacity="0.85" />

                {/* White forehead blaze */}
                <path d="M 103 26 C 105 35 107 35 109 26 Z" fill="#FFFFFF" />

                {/* Big Cartoon Eyes - Pupils track the mouse cursor! */}
                {/* Left Eye White */}
                <ellipse cx="98" cy="43" rx="5" ry="6" fill="#FFFFFF" stroke="#3d2314" strokeWidth="1.5" />
                {/* Left Pupil (Dynamic offset) */}
                <circle
                  cx={98 + (dodoFacing === 'left' ? -pupilX : pupilX)}
                  cy={43 + pupilY}
                  r="2.8"
                  fill="#1C1917"
                />
                {/* Left Catchlight */}
                <circle
                  cx={97 + (dodoFacing === 'left' ? -pupilX : pupilX)}
                  cy={41 + pupilY}
                  r="1"
                  fill="#FFFFFF"
                />

                {/* Right Eye White */}
                <ellipse cx="114" cy="43" rx="5" ry="6" fill="#FFFFFF" stroke="#3d2314" strokeWidth="1.5" />
                {/* Right Pupil (Dynamic offset) */}
                <circle
                  cx={114 + (dodoFacing === 'left' ? -pupilX : pupilX)}
                  cy={43 + pupilY}
                  r="2.8"
                  fill="#1C1917"
                />
                {/* Right Catchlight */}
                <circle
                  cx={113 + (dodoFacing === 'left' ? -pupilX : pupilX)}
                  cy={41 + pupilY}
                  r="1"
                  fill="#FFFFFF"
                />

                {/* Cute Muzzle & Button Nose */}
                <ellipse cx="106" cy="54" rx="8" ry="5.5" fill="#FEF3C7" stroke="#3d2314" strokeWidth="1.5" />
                <ellipse cx="106" cy="51" rx="3.5" ry="2.2" fill="#1C1917" />

                {/* Happy Mouth / Tongue */}
                {dodoAction === 'happy' || tailSpeed === 'fast' ? (
                  <path
                    d="M 103 54 Q 106 60 109 54"
                    fill="#F43F5E"
                    stroke="#3d2314"
                    strokeWidth="1.5"
                  />
                ) : (
                  <path
                    d="M 102 54 Q 106 57 110 54"
                    fill="none"
                    stroke="#3d2314"
                    strokeWidth="1.5"
                  />
                )}

                {/* Little cute topknot hair ribbon */}
                <path
                  d="M 103 24 L 109 24 L 106 20 Z"
                  fill="#EF4444"
                  stroke="#3d2314"
                  strokeWidth="1.2"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Floating Mouse Cursor Toy Follower while mouse is inside arena */}
        {isInside && (
          <div
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-75 filter drop-shadow-lg"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
            }}
          >
            <div className="text-3xl animate-spin-slow">
              {toyEmojis[selectedToy]}
            </div>
            {/* Small target ring */}
            <div className="w-8 h-8 -mt-7 -ml-0.5 rounded-full border-2 border-amber-950/40 border-dashed animate-spin-reverse" />
          </div>
        )}

        {/* Bottom Helper Instruction Badge inside arena */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-bold text-amber-950/80 pointer-events-none">
          <span className="bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-amber-950/20">
            🎯 Mouse Tracking: Pupil + Head Tilt Active
          </span>
          <span className="bg-amber-300/90 px-2.5 py-1 rounded-full border border-amber-950/30 text-amber-950">
            💡 Click anywhere to drop {toyEmojis[selectedToy]}
          </span>
        </div>
      </div>
    </div>
  );
};
