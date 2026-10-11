import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { HeaderDodo } from './HeaderDodo';

interface NavbarProps {
  onOpenBuyModal?: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBuyModal,
  soundEnabled,
  setSoundEnabled,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.bell();
  };

  const navLinks = [
    { label: 'About Dodo', href: '#about' },
    { label: 'Life Scenes 🎬', href: '#scenes' },
    { label: 'Tokenomics', href: '#tokenomics' },
    { label: 'How to Buy', href: '#buy' },
    { label: 'Charity', href: '#charity' },
    { label: 'Wallets', href: '#wallets' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF7]/95 backdrop-blur-md border-b-2 border-amber-900/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4 md:gap-8">
          
          {/* Zone 1: Single Brand Wordmark element + Floating Animated Dodo Mascot */}
          <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
            <a
              href="#"
              onClick={() => {
                sounds.bark();
              }}
              className="flex items-center gap-2.5 group"
            >
              {/* Floating Animated Header Dodo Character */}
              <HeaderDodo />

              <div className="flex flex-col">
                <span className="text-xl font-bold font-cartoon tracking-tight text-amber-950 group-hover:text-amber-700 transition-colors">
                  CuteDoDo <span className="text-amber-500">$DODO</span>
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-amber-900/80">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => sounds.pop()}
                className="hover:text-amber-950 hover:underline underline-offset-4 decoration-amber-400 decoration-2 transition-colors whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary CTA + Sound helper */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Mute cartoon sounds' : 'Enable cartoon sounds'}
              className="p-2 sm:px-3 sm:py-2 text-xs font-bold rounded-xl bg-amber-100 hover:bg-amber-200 border-2 border-amber-950 text-amber-950 flex items-center gap-1.5 shadow-[2px_2px_0px_#3d2314] active:translate-y-0.5 transition-all"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-amber-700" />
                  <span className="hidden sm:inline">Sound ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-amber-900/60" />
                  <span className="hidden sm:inline">Muted</span>
                </>
              )}
            </button>

            <a
              href="#buy"
              onClick={() => {
                sounds.coin();
                if (onOpenBuyModal) onOpenBuyModal();
              }}
              className="cartoon-btn px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-xl flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-4 h-4 text-amber-900" />
              <span>Buy $DODO</span>
            </a>

            {/* Mobile hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-amber-100 border-2 border-amber-950 text-amber-950"
              aria-label="Toggle Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 px-2 border-t border-amber-900/10 grid grid-cols-2 gap-2 text-xs font-bold text-amber-950">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  sounds.pop();
                  setMobileMenuOpen(false);
                }}
                className="p-2 rounded-lg hover:bg-amber-100 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
