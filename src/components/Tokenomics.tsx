import React, { useState } from 'react';
import { PieChart, ShieldCheck, CheckCircle2, Lock, Flame, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const Tokenomics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'public' | 'guardian' | 'charity' | 'dev'>('all');

  const allocations = [
    {
      id: 'public',
      label: 'Public Fair Launch',
      percentage: '85%',
      tokens: '850,000,000 $DODO',
      description: 'pump.fun bonding curve, the large majority. Open to everyone with zero private rounds or VC allocation.',
      color: 'bg-amber-400',
      border: 'border-amber-950',
    },
    {
      id: 'guardian',
      label: 'Guardian Wallets',
      percentage: '8%',
      tokens: '80,000,000 $DODO',
      description: 'Doxxed team and family wallets (including founder’s grandma). Every address is public, non-dumping, and publicly verifiable.',
      color: 'bg-sky-300',
      border: 'border-amber-950',
    },
    {
      id: 'dev',
      label: 'Development & Tools',
      percentage: '6%',
      tokens: '60,000,000 $DODO',
      description: 'Website hosting, RPC nodes, custom community bots, and platform upkeep. Managed transparently.',
      color: 'bg-emerald-300',
      border: 'border-amber-950',
    },
    {
      id: 'charity',
      label: 'Charity Fund (Strays)',
      percentage: '1%',
      tokens: '10,000,000 $DODO',
      description: 'Dedicated to registered animal shelters & street dog rescues. Holders vote on allocations with Solscan transaction proofs.',
      color: 'bg-rose-300',
      border: 'border-amber-950',
    },
  ];

  return (
    <section id="tokenomics" className="py-16 md:py-24 bg-[#FFFDF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200 border-2 border-amber-950 rounded-full text-xs font-bold text-amber-950 shadow-[2px_2px_0px_#3d2314] mb-3">
            <span>🪙 Clean Tokenomics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-cartoon text-amber-950 tracking-tight mb-3">
            Where Every <span className="text-amber-500">$DODO</span> Goes
          </h2>
          <p className="text-base sm:text-lg text-amber-900/80 font-medium leading-relaxed">
            1,000,000,000 $DODO in total. Nothing more can ever be minted. The final split is being set now and will be published here before launch. <strong>0% of the supply</strong> is set aside for marketing.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Column 1: 3D Coin Badge & Visual Supply Bar (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="cartoon-card bg-amber-100/70 rounded-3xl p-6 w-full max-w-sm text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-4 rounded-3xl overflow-hidden border-3 border-amber-950 shadow-[4px_4px_0px_#3d2314] bg-amber-300 animate-float">
                <img
                  src="/assets/images/cutedodo_coin_badge_1791659647166.jpg"
                  alt="3D CuteDodo Coin Badge"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="inline-block bg-amber-400 border-2 border-amber-950 px-4 py-1.5 rounded-2xl text-base font-bold font-cartoon text-amber-950 shadow-[2px_2px_0px_#3d2314] mb-2">
                1,000,000,000 Total $DODO
              </div>
              <p className="text-xs font-semibold text-amber-800">
                Hard Capped Supply · Zero Inflation
              </p>

              {/* Progress representation bar */}
              <div className="w-full h-6 rounded-xl border-2 border-amber-950 bg-white overflow-hidden flex mt-4 shadow-[1px_1px_0px_#3d2314]">
                <div style={{ width: '85%' }} className="bg-amber-400 h-full title='85% Public'" />
                <div style={{ width: '8%' }} className="bg-sky-300 h-full title='8% Guardians'" />
                <div style={{ width: '6%' }} className="bg-emerald-300 h-full title='6% Dev'" />
                <div style={{ width: '1%' }} className="bg-rose-400 h-full title='1% Charity'" />
              </div>

              <div className="flex justify-between text-[11px] font-bold text-amber-900 mt-2 px-1">
                <span>Public: 85%</span>
                <span>Guardians: 8%</span>
                <span>Dev: 6%</span>
                <span className="text-rose-600">Charity: 1%</span>
              </div>
            </div>
          </div>

          {/* Column 2: Allocation Breakdown List (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {allocations.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  sounds.pop();
                  setActiveTab(item.id as typeof activeTab);
                }}
                className={`cartoon-card p-5 rounded-2xl cursor-pointer transition-all ${
                  activeTab === item.id ? 'bg-amber-100/90 ring-3 ring-amber-400' : 'bg-white'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-full border border-amber-950 ${item.color}`} />
                    <h3 className="text-lg font-bold font-cartoon text-amber-950">
                      {item.label}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-amber-900 bg-amber-50 border border-amber-950/40 px-2 py-0.5 rounded-lg">
                      {item.tokens}
                    </span>
                    <span className="text-base font-extrabold font-cartoon text-amber-950">
                      {item.percentage}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-amber-900/80 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}

            {/* Zero Marketing Note */}
            <div className="p-4 bg-emerald-50 border-2 border-amber-950 rounded-2xl shadow-[2px_2px_0px_#3d2314] flex items-center gap-3">
              <span className="text-2xl">🌱</span>
              <div className="text-xs sm:text-sm font-semibold text-emerald-950">
                <strong>0% Marketing Tokens:</strong> Ads, trending, and listings are paid in SOL directly from our own personal pocket. We never sell $DODO to pay for ads.
              </div>
            </div>
          </div>

        </div>

        {/* Technical Specs Table */}
        <div className="cartoon-card bg-[#FFFDF0] rounded-3xl p-6 sm:p-8">
          <h3 className="text-2xl font-bold font-cartoon text-amber-950 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-600" />
            <span>Token Specification &amp; Contract Safety</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            
            <div className="bg-white border-2 border-amber-950 rounded-xl p-4 shadow-[2px_2px_0px_#3d2314]">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Token Symbol</div>
              <div className="text-xl font-extrabold font-cartoon text-amber-950">$DODO</div>
            </div>

            <div className="bg-white border-2 border-amber-950 rounded-xl p-4 shadow-[2px_2px_0px_#3d2314]">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Network</div>
              <div className="text-xl font-bold font-cartoon text-amber-950">Solana (SPL)</div>
            </div>

            <div className="bg-white border-2 border-amber-950 rounded-xl p-4 shadow-[2px_2px_0px_#3d2314]">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Total Supply</div>
              <div className="text-xl font-bold font-mono text-amber-950">1,000,000,000</div>
            </div>

            <div className="bg-white border-2 border-amber-950 rounded-xl p-4 shadow-[2px_2px_0px_#3d2314]">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Token Tax</div>
              <div className="text-xl font-bold font-cartoon text-emerald-700">0% Buy / 0% Sell</div>
            </div>

            <div className="bg-white border-2 border-amber-950 rounded-xl p-4 shadow-[2px_2px_0px_#3d2314]">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Mint Authority</div>
              <div className="text-base font-bold text-amber-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Revoked at launch
              </div>
            </div>

            <div className="bg-white border-2 border-amber-950 rounded-xl p-4 shadow-[2px_2px_0px_#3d2314]">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Freeze Authority</div>
              <div className="text-base font-bold text-amber-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Revoked at launch
              </div>
            </div>

          </div>

          <p className="text-xs sm:text-sm text-amber-900/70 font-medium leading-relaxed text-center sm:text-left">
            Trading on pump.fun, a Solana DEX or Jupiter carries the platform&apos;s own small swap fee and Solana network fees; $DODO itself adds no tax.
          </p>
        </div>

      </div>
    </section>
  );
};
