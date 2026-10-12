import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeBanner } from './components/MarqueeBanner';
import { About } from './components/About';
import { InteractiveDogScenes } from './components/InteractiveDogScenes';
import { Gallery } from './components/Gallery';
import { Playroom } from './components/Playroom';
import { Tokenomics } from './components/Tokenomics';
import { HowToBuy } from './components/HowToBuy';
import { CharityMilestones } from './components/CharityMilestones';
import { PublicWallets } from './components/PublicWallets';
import { Roadmap } from './components/Roadmap';
import { Community } from './components/Community';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { InteractiveMouseTrail } from './components/InteractiveMouseTrail';
import { CartoonScrollProgressDog } from './components/CartoonScrollProgressDog';
import { sounds } from './utils/soundEffects';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeView, setActiveView] = useState<'all' | 'scenes' | 'story' | 'tokenomics' | 'charity' | 'wallets' | 'playroom'>('all');
  const [floatingToast, setFloatingToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setFloatingToast(msg);
    setTimeout(() => setFloatingToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] text-[#49200B] flex flex-col selection:bg-[#FFD36A] selection:text-[#49200B] overflow-x-hidden max-w-full relative">
      
      {/* Cartoon Scroll Progress Track with Sprinting CuteDODO */}
      <CartoonScrollProgressDog />

      {/* Top Navigation */}
      <Navbar
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenBuyModal={() => {
          const el = document.getElementById('buy');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Clean Secondary Navigation: Explore View strip */}
      <div className="bg-[#FFF9F0]/95 border-b border-[#49200B]/15 py-2 px-4 sticky top-18 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-bold font-heading text-[#79513B] hidden sm:inline mr-1">
              Explore View:
            </span>
            {[
              { id: 'all', label: '🌟 Full Experience' },
              { id: 'scenes', label: '🎬 5 Animated Scenes' },
              { id: 'story', label: '📖 Story & Photos' },
              { id: 'playroom', label: '🎮 Dodo Playroom' },
              { id: 'tokenomics', label: '🪙 Tokenomics & Buy' },
              { id: 'charity', label: '🐾 Charity & Strays' },
              { id: 'wallets', label: '👁️ Public Wallets' },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  sounds.pop();
                  setActiveView(v.id as typeof activeView);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                  activeView === v.id
                    ? 'bg-[#FFD36A] text-[#49200B] border-2 border-[#49200B] shadow-[2px_2px_0px_#49200B] -translate-y-0.5'
                    : 'bg-[#FFF9F0] text-[#79513B] border border-[#49200B]/20 hover:bg-[#F7D9C7] hover:text-[#49200B]'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0 text-xs font-bold text-[#79513B]">
            <span>🐾 1% to Pet Shelters</span>
            <span>·</span>
            <span>0% Tax</span>
            <span>·</span>
            <span className="text-emerald-700 font-semibold">Doxxed Team</span>
          </div>
        </div>
      </div>

      {/* Continuous Right-to-Left Text Marquee under header */}
      <MarqueeBanner variant="chocolate" direction="rtl" />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {activeView === 'all' && (
          <>
            <Hero />
            <MarqueeBanner variant="gold" direction="rtl" customMessages={[
              "ADOPT KINDNESS",
              "LOVE YOUR FOUR-LEGGED FRIENDS",
              "1% DEDICATED TO PET SHELTERS",
              "PROUD FAMILY MOVEMENT ON SOLANA",
              "EVERY PAW DESERVES LOVE",
              "100% TRANSPARENT FAMILY WALLETS",
            ]} />
            <About />
            <InteractiveDogScenes />
            <Gallery />
            <Playroom />
            <Tokenomics />
            <HowToBuy />
            <CharityMilestones />
            <PublicWallets />
            <Roadmap />
            <Community />
            <FAQ />
          </>
        )}

        {activeView === 'scenes' && (
          <div className="pt-4">
            <InteractiveDogScenes />
            <Playroom />
            <Community />
          </div>
        )}

        {activeView === 'story' && (
          <>
            <Hero />
            <About />
            <InteractiveDogScenes />
            <Gallery />
            <Playroom />
            <Community />
          </>
        )}

        {activeView === 'playroom' && (
          <div className="pt-6">
            <Playroom />
            <InteractiveDogScenes />
            <Gallery />
            <Community />
          </div>
        )}

        {activeView === 'tokenomics' && (
          <div className="pt-6">
            <Tokenomics />
            <HowToBuy />
            <Roadmap />
            <FAQ />
          </div>
        )}

        {activeView === 'charity' && (
          <div className="pt-6">
            <CharityMilestones />
            <InteractiveDogScenes />
            <About />
            <PublicWallets />
          </div>
        )}

        {activeView === 'wallets' && (
          <div className="pt-6">
            <PublicWallets />
            <Tokenomics />
            <CharityMilestones />
          </div>
        )}
      </main>

      {/* Secondary Bottom Marquee before Footer */}
      <MarqueeBanner variant="chocolate" direction="rtl" />

      {/* Footer */}
      <Footer />

      {/* Interactive Mouse Pointer Trail & Cartoon Click Ripples across the landing page */}
      <InteractiveMouseTrail />

      {/* Floating Interactive Dodo Quick Action Button */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
        <button
          onClick={() => {
            sounds.bark();
            showToast('Woof! Dodo sends you a happy tail wag! ❤️🐾');
          }}
          className="cartoon-btn p-3 bg-[#FFD36A] hover:bg-[#ffc947] rounded-2xl flex items-center gap-2 text-xs sm:text-sm font-bold font-heading text-[#49200B] shadow-[3px_3px_0px_#49200B] active:scale-95 transition-transform"
          title="Click to hear Dodo bark!"
        >
          <span className="text-xl">🐶</span>
          <span className="hidden sm:inline">Pet Dodo</span>
        </button>
      </div>

      {/* Floating Toast Notification */}
      {floatingToast && (
        <div className="fixed bottom-20 right-5 z-50 bg-[#49200B] text-[#FFF9F0] border-2 border-[#FFD36A] px-4 py-2.5 rounded-2xl shadow-[3px_3px_0px_#49200B] text-xs sm:text-sm font-bold flex items-center gap-2 animate-bounce">
          <Heart className="w-4 h-4 fill-[#FF9F00] text-[#FF9F00]" />
          <span>{floatingToast}</span>
        </div>
      )}

    </div>
  );
}
