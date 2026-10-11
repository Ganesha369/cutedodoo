import React, { useState } from 'react';
import { Copy, Check, ExternalLink, ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface HeroProps {
  onOpenBuyModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBuyModal }) => {
  const [copied, setCopied] = useState(false);
  const [liveMode, setLiveMode] = useState(false);
  const [mascotMood, setMascotMood] = useState<'happy' | 'barking' | 'eating'>('happy');
  const [speechBubbleText, setSpeechBubbleText] = useState('Woof! Welcome to my pack! 🐾');

  const contractAddress = 'Coming soon';

  const handleCopy = () => {
    sounds.coin();
    navigator.clipboard?.writeText('Coming soon');
    setCopied(true);
    setSpeechBubbleText('Token CA is coming soon at launch! Join Telegram & X! 🎉');
    setTimeout(() => setCopied(false), 2400);
  };

  const handleMascotClick = () => {
    sounds.bark();
    setMascotMood('barking');
    const quotes = [
      'Woof! Grandma gave me belly scratches today! ❤️',
      'Solana speed: 400ms! CuteDODO zoomies: 200ms! 🚀',
      'Every coin helps street dogs get food and water! 🐶🥣',
      'No marketing dump! 100% wholesome family love! ✨',
      'Did you hear my collar bell jingle? Ding! 🔔'
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setSpeechBubbleText(randomQuote);
    setTimeout(() => setMascotMood('happy'), 1200);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-radial from-amber-100/60 via-[#FFFDF7] to-[#FFFDF7]">
      {/* Whimsical background cartoon elements */}
      <div className="absolute top-6 left-6 text-3xl opacity-30 select-none animate-bounce">🦴</div>
      <div className="absolute top-20 right-12 text-2xl opacity-30 select-none animate-pulse">🐾</div>
      <div className="absolute bottom-12 left-1/4 text-3xl opacity-20 select-none">✨</div>
      <div className="absolute top-1/2 right-4 text-3xl opacity-25 select-none">🥣</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline / Mission Kickers */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 text-xs sm:text-sm font-bold text-amber-900">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-200/80 border-2 border-amber-950 rounded-full shadow-[2px_2px_0px_#3d2314]">
            🐾 A real dog. A real cause. On Solana.
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-200/80 border-2 border-amber-950 rounded-full shadow-[2px_2px_0px_#3d2314]">
            ⛓️ Built on Solana
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-200/80 border-2 border-amber-950 rounded-full shadow-[2px_2px_0px_#3d2314]">
            ❤️ 1% for pet shelters
          </span>
        </div>

        {/* 2-Column Split: Story Hero + Interactive Mascot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Column 1: Copy & Call-To-Actions (7 Cols) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-cartoon text-amber-950 tracking-tight leading-[1.1] mb-5">
              The Most Wholesome Family Movement on{' '}
              <span className="text-amber-500 underline decoration-wavy decoration-amber-400">Solana</span>
            </h1>

            <p className="text-xl sm:text-2xl font-bold font-cartoon text-amber-800 mb-4">
              Big Memes. Bigger Heart. Saving strays, one block at a time.
            </p>

            <p className="text-base sm:text-lg text-amber-950/80 font-medium leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0">
              Meet <strong className="text-amber-950 font-bold">CuteDoDo</strong>, a real 1.2-year-old CuteDODO from Chennai. No hidden team wallets: the family wallets that buy at launch, including our founder&apos;s grandmother&apos;s, are all listed publicly. Launching on pump.fun with <strong>0% marketing tokens</strong> and <strong>1% of the supply</strong> set aside for pet shelters that holders choose together.
            </p>

            {/* Token CA Container */}
            <div className="bg-amber-100/90 border-3 border-amber-950 rounded-2xl p-3 sm:p-4 shadow-[4px_4px_0px_#3d2314] mb-6 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" /> Token CA (Solana)
                </span>
                <span className="text-xs font-bold px-2 py-0.5 bg-amber-300 border border-amber-950 rounded-md text-amber-950">
                  Coming Soon
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 font-mono text-xs sm:text-sm text-amber-950 font-semibold bg-white/90 border-2 border-amber-950/40 rounded-xl px-3 py-2 truncate">
                  {contractAddress}
                </div>
                <button
                  onClick={handleCopy}
                  className="cartoon-btn px-4 py-2 bg-amber-400 hover:bg-amber-300 rounded-xl text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-1.5 shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-800" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-amber-950" />
                      <span>Copy CA</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6">
              <a
                href="#buy"
                onClick={() => {
                  sounds.coin();
                  if (onOpenBuyModal) onOpenBuyModal();
                }}
                className="cartoon-btn px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-cartoon text-lg font-bold rounded-2xl flex items-center gap-2 shadow-[4px_5px_0px_#3d2314]"
              >
                <Sparkles className="w-5 h-5 text-amber-900" />
                <span>Buy $DODO</span>
              </a>

              <a
                href="#community"
                onClick={() => sounds.pop()}
                className="cartoon-btn px-6 py-3.5 bg-white hover:bg-amber-50 text-amber-950 font-cartoon text-lg font-bold rounded-2xl flex items-center gap-2 shadow-[4px_5px_0px_#3d2314]"
              >
                <span>Join the Community</span>
                <ArrowRight className="w-5 h-5 text-amber-900" />
              </a>
            </div>

            {/* Quick Community Pack Badges */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs font-bold text-amber-950">
              <span className="text-amber-800">Join the pack:</span>
              <a
                href="https://t.me/+pjv_zrm5Cjc1MWNl"
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.pop()}
                className="hover:scale-110 transition-transform flex items-center gap-1 text-sky-700 bg-sky-100 border border-amber-950 px-2.5 py-1 rounded-lg"
              >
                ✈️ Telegram
              </a>
              <a
                href="https://x.com/CuteDoDoToken"
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.pop()}
                className="hover:scale-110 transition-transform flex items-center gap-1 text-slate-900 bg-slate-100 border border-amber-950 px-2.5 py-1 rounded-lg"
              >
                𝕏 Twitter
              </a>
              <a
                href="https://discord.gg/9f7bBxgRS9"
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.pop()}
                className="hover:scale-110 transition-transform flex items-center gap-1 text-indigo-700 bg-indigo-100 border border-amber-950 px-2.5 py-1 rounded-lg"
              >
                👾 Discord
              </a>
            </div>

          </div>

          {/* Column 2: Interactive Cartoon Mascot Visual (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Playful Speech Bubble */}
            <div className="relative mb-3 bg-white border-3 border-amber-950 rounded-2xl px-4 py-2.5 shadow-[3px_3px_0px_#3d2314] text-xs sm:text-sm font-bold text-amber-950 max-w-xs text-center animate-bounce">
              {speechBubbleText}
              {/* Bubble pointer */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-3 border-b-3 border-amber-950 rotate-45"></div>
            </div>

            {/* Mascot Character Avatar */}
            <div
              onClick={handleMascotClick}
              className="relative cursor-pointer group select-none"
              title="Click me to hear Dodo bark and get a happy thought!"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-4 border-amber-950 bg-amber-200 shadow-[8px_10px_0px_#3d2314] group-hover:scale-102 transition-all">
                <img
                  src="/src/assets/images/cutedodo_hero_mascot_1791659602047.jpg"
                  alt="CuteDODO mascot"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating collar bell overlay badge */}
                <div className="absolute bottom-3 right-3 bg-amber-400 border-2 border-amber-950 rounded-xl px-2.5 py-1 flex items-center gap-1 text-xs font-bold shadow-[2px_2px_0px_#3d2314]">
                  <span>🔔 Golden Bell</span>
                </div>

                {/* Chennai stamp */}
                <div className="absolute top-3 left-3 bg-white/95 border-2 border-amber-950 rounded-xl px-2.5 py-1 flex items-center gap-1 text-xs font-bold text-amber-950 shadow-[2px_2px_0px_#3d2314]">
                  <span>🇮🇳 Chennai, TN</span>
                </div>
              </div>

              {/* Tap prompt */}
              <div className="mt-3 text-center">
                <span className="inline-block text-xs font-bold text-amber-800 bg-amber-200/90 border border-amber-950 px-3 py-1 rounded-full shadow-[1px_1px_0px_#3d2314]">
                  👆 Tap CuteDoDo to hear him bark!
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Live Market Data Card Strip */}
        <div className="cartoon-card bg-amber-50 rounded-3xl p-5 sm:p-6 mb-16">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-amber-950/10">
            <div className="flex items-center gap-2">
              <span className="text-xl" role="img" aria-label="chart">📈</span>
              <h2 className="text-lg sm:text-xl font-bold font-cartoon text-amber-950">
                Live Solana Market Data
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-amber-800 hidden sm:inline">
                Live market data appears here automatically once $DODO is launched.
              </span>
              <button
                onClick={() => {
                  sounds.pop();
                  setLiveMode(!liveMode);
                }}
                className="text-xs font-bold px-3 py-1.5 bg-amber-200 hover:bg-amber-300 border-2 border-amber-950 rounded-xl shadow-[2px_2px_0px_#3d2314] active:translate-y-0.5 transition-all text-amber-950"
              >
                {liveMode ? 'Mode: Live Sim' : 'Mode: Pre-Launch'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border-2 border-amber-950 rounded-2xl p-4 shadow-[3px_3px_0px_#3d2314]">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">Price (USD)</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-amber-950">
                {liveMode ? '$0.0000692' : 'Soon'}
              </div>
              <div className="text-[11px] text-amber-700 font-semibold mt-1">
                {liveMode ? '🟢 +14.2% (1h)' : 'pump.fun launch'}
              </div>
            </div>

            <div className="bg-white border-2 border-amber-950 rounded-2xl p-4 shadow-[3px_3px_0px_#3d2314]">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">Market Cap</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-amber-950">
                {liveMode ? '$69,200' : 'Soon'}
              </div>
              <div className="text-[11px] text-amber-700 font-semibold mt-1">
                {liveMode ? 'Bonding curve: 98%' : 'Fair Launch Curve'}
              </div>
            </div>

            <div className="bg-white border-2 border-amber-950 rounded-2xl p-4 shadow-[3px_3px_0px_#3d2314]">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">Liquidity</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-amber-950">
                {liveMode ? '$28,450' : 'Soon'}
              </div>
              <div className="text-[11px] text-amber-700 font-semibold mt-1">
                {liveMode ? 'Raydium Migration' : 'Auto LP on DEX'}
              </div>
            </div>

            <div className="bg-white border-2 border-amber-950 rounded-2xl p-4 shadow-[3px_3px_0px_#3d2314]">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">24h Volume</div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-amber-950">
                {liveMode ? '$142,800' : 'Soon'}
              </div>
              <div className="text-[11px] text-amber-700 font-semibold mt-1">
                {liveMode ? '3,842 trades' : 'Tracking upon launch'}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid (Requested feature cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="cartoon-card bg-[#FFFDF0] rounded-3xl p-5">
            <div className="w-12 h-12 rounded-2xl bg-amber-300 border-2 border-amber-950 flex items-center justify-center text-2xl mb-3 shadow-[2px_2px_0px_#3d2314]">
              0%
            </div>
            <h3 className="text-lg font-bold font-cartoon text-amber-950 mb-1.5">
              Marketing tokens
            </h3>
            <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed font-medium">
              Ads, trending and listings are paid in SOL from our own pocket. We never sell $DODO to pay for ads.
            </p>
          </div>

          <div className="cartoon-card bg-[#FFFDF0] rounded-3xl p-5">
            <div className="w-12 h-12 rounded-2xl bg-sky-300 border-2 border-amber-950 flex items-center justify-center text-2xl mb-3 shadow-[2px_2px_0px_#3d2314]">
              👁️
            </div>
            <h3 className="text-lg font-bold font-cartoon text-amber-950 mb-1.5">
              Every team wallet public
            </h3>
            <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed font-medium">
              Each Guardian, dev and charity wallet is listed with its Solscan link, so you can watch every move.
            </p>
          </div>

          <div className="cartoon-card bg-[#FFFDF0] rounded-3xl p-5">
            <div className="w-12 h-12 rounded-2xl bg-rose-300 border-2 border-amber-950 flex items-center justify-center text-2xl mb-3 shadow-[2px_2px_0px_#3d2314]">
              1%
            </div>
            <h3 className="text-lg font-bold font-cartoon text-amber-950 mb-1.5">
              For pet shelters
            </h3>
            <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed font-medium">
              A public charity wallet. Holders vote on the shelters, and every donation is posted with proof.
            </p>
          </div>

          <div className="cartoon-card bg-[#FFFDF0] rounded-3xl p-5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-300 border-2 border-amber-950 flex items-center justify-center text-2xl mb-3 shadow-[2px_2px_0px_#3d2314]">
              0%
            </div>
            <h3 className="text-lg font-bold font-cartoon text-amber-950 mb-1.5">
              Buy &amp; sell tax
            </h3>
            <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed font-medium">
              A standard Solana token. Mint and freeze authority are revoked at launch.
            </p>
          </div>

        </div>

        {/* Read Transparency Promise Link */}
        <div className="mt-8 text-center">
          <a
            href="#transparency"
            onClick={() => sounds.pop()}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-amber-950 hover:text-amber-700 underline decoration-2 underline-offset-4"
          >
            Read our Transparency promise →
          </a>
        </div>

      </div>
    </section>
  );
};
