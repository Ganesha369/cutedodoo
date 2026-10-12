import React, { useState, useEffect } from 'react';
import { Play, Pause, FastForward, Volume2, Sparkles, Compass, MapPin, Train } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface RailwayStationSceneProps {
  className?: string;
}

export const RailwayStationScene: React.FC<RailwayStationSceneProps> = ({ className = '' }) => {
  const [speed, setSpeed] = useState<'normal' | 'fast' | 'stopped'>('normal');
  const [activeStation, setActiveStation] = useState<'tokyo' | 'chennai' | 'singapore' | 'london'>('tokyo');
  const [showDodoConductor, setShowDodoConductor] = useState(true);
  const [platformCrowdCheer, setPlatformCrowdCheer] = useState(false);

  const stations = {
    tokyo: {
      kanji: '桜ヶ丘駅 / 渋谷',
      english: 'Sakuragaoka / Shibuya Station',
      nextStop: 'Connecting to Chennai Central (Dodo Line)',
      theme: 'Tokyo Evening · 17:42 Local Express',
      tag: 'Japan 🇯🇵',
    },
    chennai: {
      kanji: 'சென்ட்ரல் / சென்னை',
      english: 'Chennai Central Station',
      nextStop: 'Dodo Hometown Sanctuary Platform 1',
      theme: 'Tamil Nadu · Wholesome Strays Express',
      tag: 'India 🇮🇳',
    },
    singapore: {
      kanji: '滨海湾 / 狮城',
      english: 'Marina Bay Transit Hub',
      nextStop: '7-Nations Global Alliance Link',
      theme: 'Singapore Hub · Guardian Network',
      tag: 'Singapore 🇸🇬',
    },
    london: {
      kanji: 'キングス・クロス',
      english: 'King’s Cross International',
      nextStop: 'Shelter Rescue Support Line',
      theme: 'United Kingdom · Rescue Alliance',
      tag: 'United Kingdom 🇬🇧',
    },
  };

  const handleStationChange = (st: typeof activeStation) => {
    sounds.pop();
    setActiveStation(st);
  };

  const handleChimeClick = () => {
    sounds.trainChime();
    setPlatformCrowdCheer(true);
    setTimeout(() => setPlatformCrowdCheer(false), 2500);
  };

  const toggleSpeed = (newSpeed: typeof speed) => {
    sounds.pop();
    setSpeed(newSpeed);
    if (newSpeed !== 'stopped') {
      sounds.trainChime();
    }
  };

  return (
    <section
      id="railway"
      className={`relative py-16 md:py-24 bg-[#FFF9ED] border-y-3 border-amber-950/10 overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200 border-2 border-amber-950 rounded-full text-xs font-bold text-amber-950 shadow-[2px_2px_0px_#3d2314] mb-3">
              <Train className="w-3.5 h-3.5 text-amber-800" />
              <span>The 7-Nation Journey · Live Railway</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-cartoon text-amber-950 tracking-tight">
              The <span className="text-amber-500">Dodo Express</span> Railway
            </h2>
            <p className="text-sm sm:text-base text-amber-900/80 font-medium max-w-2xl mt-1">
              Inspired by VJDurga’s journey across 7 nations uniting genuine dog lovers. Watch the atmospheric Japanese commuter train glide across the twilight platform!
            </p>
          </div>

          {/* Interactive Railway Control Deck */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Speed / Stop buttons */}
            <div className="bg-white border-2 border-amber-950 p-1 rounded-2xl flex items-center gap-1 shadow-[2px_2px_0px_#3d2314]">
              <button
                onClick={() => toggleSpeed('normal')}
                title="Cruise Speed (12s)"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                  speed === 'normal'
                    ? 'bg-amber-400 text-amber-950 shadow-[1px_1px_0px_#3d2314]'
                    : 'text-amber-900/70 hover:bg-amber-100'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Cruise</span>
              </button>

              <button
                onClick={() => toggleSpeed('fast')}
                title="Express Speed (7.5s)"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                  speed === 'fast'
                    ? 'bg-amber-400 text-amber-950 shadow-[1px_1px_0px_#3d2314]'
                    : 'text-amber-900/70 hover:bg-amber-100'
                }`}
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Express</span>
              </button>

              <button
                onClick={() => toggleSpeed('stopped')}
                title="Station Stop (Pause at platform)"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                  speed === 'stopped'
                    ? 'bg-rose-400 text-rose-950 shadow-[1px_1px_0px_#3d2314]'
                    : 'text-amber-900/70 hover:bg-amber-100'
                }`}
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Station Stop</span>
              </button>
            </div>

            {/* Departure Chime Melody button */}
            <button
              onClick={handleChimeClick}
              title="Play Japanese Station Departure Chime"
              className="cartoon-btn px-3 py-2 bg-amber-300 hover:bg-amber-200 text-amber-950 rounded-2xl text-xs font-bold flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4 text-amber-900" />
              <span className="hidden sm:inline">Station Chime 🔔</span>
            </button>
          </div>
        </div>

        {/* Station Destination Switcher */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-700" /> Station Hub:
          </span>
          {(['tokyo', 'chennai', 'singapore', 'london'] as const).map((stKey) => (
            <button
              key={stKey}
              onClick={() => handleStationChange(stKey)}
              className={`px-3 py-1 rounded-xl text-xs font-bold border-2 border-amber-950 transition-all ${
                activeStation === stKey
                  ? 'bg-amber-400 text-amber-950 shadow-[2px_2px_0px_#3d2314]'
                  : 'bg-white text-amber-900/80 hover:bg-amber-100'
              }`}
            >
              {stations[stKey].tag} {stations[stKey].english.split(' ')[0]}
            </button>
          ))}
        </div>

      </div>

      {/* Cinematic Railway Stage Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cartoon-card relative w-full h-[360px] sm:h-[440px] md:h-[500px] rounded-3xl overflow-hidden border-4 border-amber-950 shadow-[8px_10px_0px_#3d2314] select-none bg-slate-900">
          
          {/* Layer 1: High-res Japanese Station Backdrop Photo with golden twilight */}
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/images/japanese_station_backdrop_1791705065925.jpg"
              alt="Japanese train station platform at golden hour"
              className="w-full h-full object-cover object-bottom"
              loading="eager"
            />
            {/* Atmospheric gradient overlay for contrast and cinematic mood */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-amber-950/20 pointer-events-none" />
          </div>

          {/* Layer 2: Glowing Platform Lanterns (Warm subtle breathing animation) */}
          <div className="absolute top-12 right-16 sm:right-28 z-10 pointer-events-none lantern-glow-anim">
            <div className="w-8 h-12 rounded-full bg-amber-400/40 blur-md" />
          </div>
          <div className="absolute top-20 right-48 sm:right-72 z-10 pointer-events-none lantern-glow-anim">
            <div className="w-10 h-14 rounded-full bg-amber-400/30 blur-lg" />
          </div>

          {/* Layer 3: Overhead Contact Wires and Gantry Pillars */}
          <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-10 opacity-75">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
              <line x1="0" y1="35" x2="1000" y2="40" stroke="#3d2314" strokeWidth="1.2" opacity="0.6" />
              <line x1="0" y1="50" x2="1000" y2="55" stroke="#3d2314" strokeWidth="1.5" opacity="0.8" />
              {/* Droppers */}
              {Array.from({ length: 20 }).map((_, i) => (
                <line
                  key={i}
                  x1={i * 50 + 20}
                  y1="38"
                  x2={i * 50 + 20}
                  y2="52"
                  stroke="#3d2314"
                  strokeWidth="0.8"
                  opacity="0.5"
                />
              ))}
            </svg>
          </div>

          {/* Layer 4: Interactive Digital Platform Station Signboard */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 pointer-events-none">
            <div className="bg-slate-950/90 text-amber-300 border-2 border-amber-400/80 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-[4px_4px_0px_#000] backdrop-blur-xs flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 signal-pulse-anim shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-cartoon font-bold text-xs sm:text-sm text-white tracking-wide">
                    {stations[activeStation].kanji}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-400">
                    {stations[activeStation].english}
                  </span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-amber-200/90 font-medium">
                  {stations[activeStation].nextStop}
                </div>
              </div>
            </div>
          </div>

          {/* Layer 5: Train Ground Shadow Plane & Double Steel Tracks */}
          <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 h-14 pointer-events-none z-15">
            {/* Dark ground ballast shadow strip */}
            <div className="absolute inset-x-0 bottom-2 h-8 bg-black/45 blur-xs" />
          </div>

          {/* Layer 6: THE TRAIN CARRIAGES (Multi-Car Detailed Japanese Express Train) */}
          <div
            className={`absolute bottom-14 sm:bottom-18 left-0 z-20 pointer-events-none flex items-end ${
              speed === 'fast'
                ? 'train-glide-fast'
                : speed === 'normal'
                ? 'train-glide-normal'
                : 'train-glide-paused !transform-none !translate-x-[5%] sm:!translate-x-[15%]'
            }`}
            style={{ width: '1300px' }}
          >
            <div className="train-rumble-anim relative w-full flex items-end">
              
              {/* Dynamic Ground Shadow directly beneath wheels */}
              <div className="absolute -bottom-1.5 inset-x-8 h-4 bg-black/70 blur-xs rounded-full" />

              {/* TRAIN HEAD CAR (Car 1: Streamlined Driver Cabin & Headlights) */}
              <div className="relative w-[420px] h-[170px] sm:h-[195px] shrink-0 rounded-l-3xl overflow-hidden border-3 border-amber-950 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 shadow-[6px_8px_0px_#00000080]">
                {/* Roof air conditioner units & pantograph wire bar */}
                <div className="absolute top-0 inset-x-4 h-3.5 bg-slate-400 border-b border-amber-950 rounded-t-lg flex items-center justify-around px-2">
                  <div className="w-12 h-2 bg-slate-600 rounded-sm" />
                  <div className="w-16 h-2 bg-slate-600 rounded-sm" />
                  <div className="w-12 h-2 bg-slate-600 rounded-sm" />
                </div>

                {/* Overhead Pantograph Arm */}
                <div className="absolute -top-6 left-28 w-12 h-6 border-t-2 border-r-2 border-slate-700 pointer-events-none" />

                {/* Driver Front Windshield with subtle reflection */}
                <div className="absolute top-7 left-3 w-16 h-20 rounded-l-2xl bg-gradient-to-tr from-sky-900 to-sky-600 border-2 border-amber-950 overflow-hidden shadow-inner">
                  <div className="absolute top-1 left-2 w-12 h-4 bg-white/30 rounded-full blur-[1px] rotate-[-25deg]" />
                  {/* Driver silhouette */}
                  <div className="absolute bottom-1 right-2 w-5 h-8 bg-slate-900/80 rounded-t-lg" />
                </div>

                {/* Front Headlights (Warm Glowing Golden Beams) */}
                <div className="absolute top-28 left-1 flex flex-col gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-300 border border-amber-950 shadow-[0_0_12px_#F59E0B]" />
                  <div className="w-4 h-4 rounded-full bg-amber-300 border border-amber-950 shadow-[0_0_12px_#F59E0B]" />
                </div>
                {/* Light beam projection forward */}
                <div className="absolute top-26 -left-32 w-32 h-16 bg-gradient-to-l from-amber-300/40 to-transparent blur-md pointer-events-none" />

                {/* Japanese JR / DODO Style Yellow Accent Stripe */}
                <div className="absolute top-28 inset-x-0 h-4 bg-amber-400 border-y-2 border-amber-950 flex items-center justify-between px-6">
                  <span className="text-[9px] font-black font-mono text-amber-950 tracking-wider">
                    JR-DODO 7-NATIONS
                  </span>
                  <span className="text-[8px] font-bold text-amber-950">
                    CAR 01
                  </span>
                </div>

                {/* Passenger Windows with Warm Golden Interior Glow & Silhouettes */}
                <div className="absolute top-8 left-24 right-4 flex items-center gap-3">
                  
                  {/* Window 1: Cute DODO Conductor Peeking! */}
                  <div className="relative w-16 h-16 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-950 overflow-hidden shadow-inner flex items-end justify-center">
                    {/* Window Reflection diagonal */}
                    <div className="absolute top-1 left-1 w-10 h-3 bg-white/40 rotate-[-20deg] blur-xs" />
                    {showDodoConductor && (
                      <div className="relative w-12 h-12 flex flex-col items-center animate-wag origin-bottom">
                        <span className="text-2xl leading-none" role="img" aria-label="CuteDodo">🐶</span>
                        <span className="text-[8px] font-bold text-amber-950 bg-amber-400 px-1 rounded-sm border border-amber-950 -mt-0.5">
                          DODO
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Window 2: Warm Passengers chatting */}
                  <div className="relative w-16 h-16 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-950 overflow-hidden shadow-inner flex items-end justify-around px-1">
                    <div className="absolute top-1 left-1 w-10 h-3 bg-white/40 rotate-[-20deg] blur-xs" />
                    <div className="w-4 h-9 bg-amber-950/80 rounded-t-md" />
                    <div className="w-4 h-7 bg-amber-950/70 rounded-t-md" />
                  </div>

                  {/* Window 3: Commuter reading */}
                  <div className="relative w-16 h-16 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-950 overflow-hidden shadow-inner flex items-end justify-center">
                    <div className="absolute top-1 left-1 w-10 h-3 bg-white/40 rotate-[-20deg] blur-xs" />
                    <div className="w-5 h-9 bg-amber-950/75 rounded-t-md" />
                  </div>

                  {/* Automatic Passenger Sliding Door */}
                  <div className="relative w-12 h-26 -mt-3 rounded-t-lg bg-slate-200 border-2 border-amber-950 flex flex-col items-center pt-2">
                    <div className="w-8 h-12 rounded-sm bg-gradient-to-b from-amber-100 to-amber-200 border border-amber-950 shadow-inner" />
                    <div className="w-1.5 h-3 bg-amber-950 rounded-full mt-2" />
                  </div>
                </div>

                {/* Under-frame bogies and suspension machinery */}
                <div className="absolute bottom-1 inset-x-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-amber-950 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-amber-950 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    </div>
                  </div>
                  <div className="w-16 h-4 bg-slate-800 border border-amber-950 rounded" />
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-amber-950 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-amber-950 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gangway Coupler / Inter-car connection accordion */}
              <div className="w-4 h-24 bg-slate-800 border-y-2 border-amber-950 shrink-0 mb-6 flex flex-col justify-around">
                <div className="h-0.5 bg-slate-600" />
                <div className="h-0.5 bg-slate-600" />
                <div className="h-0.5 bg-slate-600" />
              </div>

              {/* TRAIN MIDDLE CAR (Car 2: Passenger Coach with high windows) */}
              <div className="relative w-[400px] h-[170px] sm:h-[195px] shrink-0 overflow-hidden border-3 border-amber-950 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 shadow-[6px_8px_0px_#00000080]">
                {/* Roof vents */}
                <div className="absolute top-0 inset-x-4 h-3.5 bg-slate-400 border-b border-amber-950 rounded-t-lg flex items-center justify-around px-2">
                  <div className="w-16 h-2 bg-slate-600 rounded-sm" />
                  <div className="w-16 h-2 bg-slate-600 rounded-sm" />
                </div>

                {/* Yellow Stripe */}
                <div className="absolute top-28 inset-x-0 h-4 bg-amber-400 border-y-2 border-amber-950 flex items-center justify-between px-6">
                  <span className="text-[9px] font-black font-mono text-amber-950 tracking-wider">
                    PAWS OVER PROFITS
                  </span>
                  <span className="text-[8px] font-bold text-amber-950">
                    CAR 02
                  </span>
                </div>

                {/* Passenger Windows */}
                <div className="absolute top-8 inset-x-4 flex items-center justify-around">
                  {/* Sliding door */}
                  <div className="relative w-12 h-26 -mt-3 rounded-t-lg bg-slate-200 border-2 border-amber-950 flex flex-col items-center pt-2">
                    <div className="w-8 h-12 rounded-sm bg-gradient-to-b from-amber-100 to-amber-200 border border-amber-950 shadow-inner" />
                  </div>

                  <div className="relative w-16 h-16 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-950 overflow-hidden shadow-inner flex items-end justify-center">
                    <div className="absolute top-1 left-1 w-10 h-3 bg-white/40 rotate-[-20deg] blur-xs" />
                    <div className="w-4 h-8 bg-amber-950/75 rounded-t-md" />
                  </div>

                  <div className="relative w-16 h-16 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-950 overflow-hidden shadow-inner flex items-end justify-around px-1">
                    <div className="absolute top-1 left-1 w-10 h-3 bg-white/40 rotate-[-20deg] blur-xs" />
                    <span className="text-lg leading-none" role="img" aria-label="dog passenger">🐕</span>
                  </div>

                  <div className="relative w-16 h-16 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-950 overflow-hidden shadow-inner flex items-end justify-center">
                    <div className="absolute top-1 left-1 w-10 h-3 bg-white/40 rotate-[-20deg] blur-xs" />
                    <div className="w-4 h-9 bg-amber-950/80 rounded-t-md" />
                  </div>

                  {/* Sliding door */}
                  <div className="relative w-12 h-26 -mt-3 rounded-t-lg bg-slate-200 border-2 border-amber-950 flex flex-col items-center pt-2">
                    <div className="w-8 h-12 rounded-sm bg-gradient-to-b from-amber-100 to-amber-200 border border-amber-950 shadow-inner" />
                  </div>
                </div>

                {/* Bogies */}
                <div className="absolute bottom-1 inset-x-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-amber-950 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-amber-950 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    </div>
                  </div>
                  <div className="w-16 h-4 bg-slate-800 border border-amber-950 rounded" />
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-amber-950 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-amber-950 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gangway Coupler */}
              <div className="w-4 h-24 bg-slate-800 border-y-2 border-amber-950 shrink-0 mb-6 flex flex-col justify-around">
                <div className="h-0.5 bg-slate-600" />
                <div className="h-0.5 bg-slate-600" />
                <div className="h-0.5 bg-slate-600" />
              </div>

              {/* TRAIN REAR CAR (Car 3: Tail Lights & Rear Windows) */}
              <div className="relative w-[380px] h-[170px] sm:h-[195px] shrink-0 rounded-r-3xl overflow-hidden border-3 border-amber-950 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 shadow-[6px_8px_0px_#00000080]">
                {/* Yellow Stripe */}
                <div className="absolute top-28 inset-x-0 h-4 bg-amber-400 border-y-2 border-amber-950 flex items-center justify-between px-6">
                  <span className="text-[9px] font-black font-mono text-amber-950 tracking-wider">
                    STRAY ANIMAL ENDOWMENT
                  </span>
                  <span className="text-[8px] font-bold text-amber-950">
                    CAR 03
                  </span>
                </div>

                {/* Red Tail Marker Lights on rear */}
                <div className="absolute top-28 right-2 flex flex-col gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-600 border border-amber-950 shadow-[0_0_10px_#E11D48]" />
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-600 border border-amber-950 shadow-[0_0_10px_#E11D48]" />
                </div>

                {/* Windows */}
                <div className="absolute top-8 left-4 right-14 flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-950 overflow-hidden shadow-inner flex items-end justify-center">
                    <div className="w-4 h-8 bg-amber-950/70 rounded-t-md" />
                  </div>
                  <div className="relative w-16 h-16 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-950 overflow-hidden shadow-inner flex items-end justify-around px-1">
                    <span className="text-xl" role="img" aria-label="dog treat">🦴</span>
                  </div>
                  <div className="relative w-16 h-16 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-950 overflow-hidden shadow-inner flex items-end justify-center">
                    <div className="w-4 h-9 bg-amber-950/80 rounded-t-md" />
                  </div>
                </div>

                {/* Bogies */}
                <div className="absolute bottom-1 inset-x-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-amber-950 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-amber-950 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    </div>
                  </div>
                  <div className="w-16 h-4 bg-slate-800 border border-amber-950 rounded" />
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-amber-950 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-amber-950 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Layer 7: Realistic Railway Steel Rails & Wooden Sleepers */}
          <div className="absolute bottom-12 sm:bottom-15 left-0 right-0 h-6 pointer-events-none z-22">
            {/* Top Steel Rail */}
            <div className="h-1.5 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 shadow-[0_1px_2px_#000]" />
            {/* Ballast / Wooden Sleepers */}
            <div className="h-3 bg-amber-950/60 flex items-center justify-around px-2">
              {Array.from({ length: 40 }).map((_, idx) => (
                <div key={idx} className="w-2.5 h-3 bg-amber-900/80 border-x border-black/40" />
              ))}
            </div>
            {/* Bottom Steel Rail */}
            <div className="h-1.5 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 shadow-[0_1px_2px_#000]" />
          </div>

          {/* Layer 8: Station Platform Edge Foreground (Yellow Tactile Safety Line) */}
          <div className="absolute bottom-0 inset-x-0 h-12 sm:h-14 bg-gradient-to-t from-slate-900 to-slate-800/90 border-t-2 border-amber-950/80 z-25 flex flex-col justify-between px-6 py-2">
            {/* Tactile Paving Yellow Bumps Strip */}
            <div className="h-2 bg-amber-400 rounded-sm border border-amber-950/60 flex items-center justify-around px-1">
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1 bg-amber-600 rounded-xs" />
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-amber-200/90">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 signal-pulse-anim" />
                <span>Platform 1 · DODO Express Line</span>
              </span>
              <span className="hidden sm:inline font-mono text-amber-300">
                {stations[activeStation].theme}
              </span>
              <span className="text-amber-400 font-cartoon">
                🐾 Please stand behind the yellow line
              </span>
            </div>
          </div>

          {/* Layer 9: Cheer overlay when Station Chime is rung */}
          {platformCrowdCheer && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-amber-950/95 text-amber-300 border-3 border-amber-400 px-6 py-3 rounded-2xl shadow-[6px_6px_0px_#000] text-center pointer-events-none animate-bounce">
              <div className="text-2xl mb-1">🔔 🚅 🐾</div>
              <div className="font-cartoon font-bold text-base text-white">
                Departure Melody Sounding!
              </div>
              <div className="text-xs text-amber-300 font-semibold mt-0.5">
                Next Stop: {stations[activeStation].english}
              </div>
            </div>
          )}

        </div>

        {/* Station Lore Story Footer */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border-2 border-amber-950 rounded-2xl shadow-[3px_3px_0px_#3d2314] text-xs font-semibold text-amber-900">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>The 7-Nation Connection:</strong> VJDurga travelled across 7 nations before returning to Tamil Nadu. The Dodo Express symbolizes bringing together web3 animal lovers across borders.
            </span>
          </div>
          <button
            onClick={() => setShowDodoConductor(!showDodoConductor)}
            className="cartoon-btn px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl text-xs font-bold shrink-0"
          >
            {showDodoConductor ? 'Conductor Dodo: Visible 🐶' : 'Hide Dodo Window'}
          </button>
        </div>

      </div>
    </section>
  );
};
