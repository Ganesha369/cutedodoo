import React from 'react';
import { CheckCircle2, Circle, Clock, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface PhaseData {
  phaseNumber: string;
  badge: 'Next' | 'Planned';
  title: string;
  badgeColor: string;
  items: string[];
}

export const Roadmap: React.FC = () => {
  const phases: PhaseData[] = [
    {
      phaseNumber: 'Phase 01',
      badge: 'Next',
      title: 'Launch',
      badgeColor: 'bg-amber-300 text-amber-950',
      items: [
        'Public launch on pump.fun',
        'Mint & freeze authority revoked',
        'Website with live chart & swap',
        'Telegram, X & Discord community',
      ],
    },
    {
      phaseNumber: 'Phase 02',
      badge: 'Planned',
      title: 'Graduation',
      badgeColor: 'bg-sky-200 text-sky-950',
      items: [
        'Complete the bonding curve',
        'DEX liquidity & Jupiter routing',
        'DexScreener profile & token info',
        'First holder vote on shelters',
      ],
    },
    {
      phaseNumber: 'Phase 03',
      badge: 'Planned',
      title: 'Paws for a Cause',
      badgeColor: 'bg-rose-200 text-rose-950',
      items: [
        'First donation to a shelter in India',
        'Public charity wallet & receipts',
        'Adoption stories from the shelters',
        'Dodo meme & sticker packs',
      ],
    },
    {
      phaseNumber: 'Phase 04',
      badge: 'Planned',
      title: 'Grow the Pack',
      badgeColor: 'bg-emerald-200 text-emerald-950',
      items: [
        'CoinGecko & CoinMarketCap applications',
        'Shelter partners beyond India',
        'Dodo merch, proceeds to the fund',
        'Community-led events',
      ],
    },
  ];

  return (
    <section id="roadmap" className="py-16 md:py-24 bg-[#FFFDF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200 border-2 border-amber-950 rounded-full text-xs font-bold text-amber-950 shadow-[2px_2px_0px_#3d2314] mb-3">
            <span>🗺️ The Master Paw Plan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-cartoon text-amber-950 tracking-tight mb-3">
            The Plan, <span className="text-amber-500">Paw by Paw</span>
          </h2>
          <p className="text-base sm:text-lg text-amber-900/80 font-medium">
            Goals, not promises. Each phase is updated here as it happens.
          </p>
        </div>

        {/* 4 Phases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((ph, idx) => (
            <div
              key={ph.phaseNumber}
              className="cartoon-card bg-white rounded-3xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-amber-800">
                    {ph.phaseNumber}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border-2 border-amber-950 shadow-[1px_1px_0px_#3d2314] ${ph.badgeColor}`}>
                    {ph.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-cartoon text-amber-950 mb-4">
                  {ph.title}
                </h3>

                <ul className="space-y-3">
                  {ph.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-900/80 font-medium"
                    >
                      <div className="w-5 h-5 rounded-lg bg-amber-100 border border-amber-950/40 flex items-center justify-center shrink-0 mt-0.5 text-amber-800">
                        🐾
                      </div>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-950/10 text-[11px] font-semibold text-amber-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Phase Status: {ph.badge}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
