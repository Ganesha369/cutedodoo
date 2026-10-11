import React from 'react';
import { Heart, Scale, Lock, Globe2, PawPrint } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-[#FFF9ED] border-y-3 border-amber-950/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200 border-2 border-amber-950 rounded-full text-xs font-bold text-amber-950 shadow-[2px_2px_0px_#3d2314] mb-3">
            <span>🐾 About CuteDoDo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-cartoon text-amber-950 tracking-tight mb-4">
            The Real Dog Behind <span className="text-amber-500">$DODO</span>
          </h2>
          <p className="text-base sm:text-lg text-amber-900/80 font-medium leading-relaxed">
            Dodo is a 1.2-year-old CuteDODO from Chennai, India. He loves dressing up, long naps and every person who walks through the door. $DODO turns that joy into a community, and part of it goes back to dogs who don&apos;t have a home yet.
          </p>
          <p className="text-sm font-bold text-amber-800 mt-2 font-cartoon">
            Inspired by one happy CuteDODO. Dedicated to giving every dog a home.
          </p>
        </div>

        {/* Big Heartwarming Story Showcase */}
        <div className="cartoon-card bg-white rounded-3xl p-6 sm:p-8 lg:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-4 text-amber-950 leading-relaxed font-medium">
              <div className="flex items-center gap-2 text-rose-600 font-cartoon font-bold text-lg">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                <span>In a small home in Tamil Nadu...</span>
              </div>
              
              <p className="text-base sm:text-lg text-amber-900/90 font-semibold">
                In a small home in Tamil Nadu, a fluffy little guy named CuteDODO came into VJDurga’s family 1.5–2 years ago. From the first day, this happy soul filled every corner with love and laughter.
              </p>

              <p className="text-sm sm:text-base text-amber-950/80">
                Kids play with him, grandma sits beside him, and every visitor falls in love the moment they see his smiling face. CuteDODO is sharp, active and full of fun—he keeps the whole house smiling every single day.
              </p>

              <div className="p-4 bg-amber-50 border-2 border-amber-950 rounded-2xl shadow-[2px_2px_0px_#3d2314]">
                <p className="text-sm sm:text-base font-bold text-amber-950">
                  Seeing how much joy one small dog can bring, the VJDurga family and close friends decided to do something bigger.
                </p>
                <p className="text-xs sm:text-sm text-amber-800 mt-1">
                  We are launching CuteDODO token not for quick pumps, but for a real long-term mission: A true charity that helps street dogs—giving water to thirsty ones, food to hungry ones, and shelter to those who have none.
                </p>
              </div>

              <p className="text-sm sm:text-base text-amber-950/80">
                Real people stand behind this project who are <strong>doxxed, genuine dog lovers</strong> from different countries, connected through VJDurga’s journey across 7 nations and the web3 world. Guardian wallets never sell. Donation wallets openly show every help that reaches the dogs.
              </p>

              <p className="text-base font-bold font-cartoon text-amber-900 pt-2">
                &ldquo;This is not just a coin. This is a family dog’s story turning into hope for thousands of other dogs. For everyone who believes in the pure love of pets... CuteDODO is here to stay and make a real difference.&rdquo;
              </p>
            </div>

            {/* Wholesome Illustration */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-3 border-amber-950 shadow-[6px_6px_0px_#3d2314] bg-amber-100">
                <img
                  src="/src/assets/images/cutedodo_saving_strays_1791659633565.jpg"
                  alt="CuteDODO sharing food and clean water with street puppies"
                  className="w-full h-auto object-cover"
                />
                <div className="p-3 bg-amber-200/95 border-t-2 border-amber-950 flex items-center justify-between text-xs font-bold text-amber-950">
                  <span>🐾 DODO feeding street puppies in Chennai</span>
                  <span className="text-[11px] bg-white px-2 py-0.5 rounded border border-amber-950">100% Real Cause</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="cartoon-card bg-white rounded-3xl p-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-300 border-2 border-amber-950 flex items-center justify-center text-2xl mb-4 shadow-[2px_2px_0px_#3d2314]">
              <Scale className="w-6 h-6 text-amber-950" />
            </div>
            <h3 className="text-xl font-bold font-cartoon text-amber-950 mb-2">
              Open Launch
            </h3>
            <p className="text-sm text-amber-900/80 font-medium leading-relaxed">
              Launched on pump.fun. No presale, no private round. Every team wallet that buys at launch is listed on our Transparency page.
            </p>
          </div>

          <div className="cartoon-card bg-white rounded-3xl p-6">
            <div className="w-12 h-12 rounded-2xl bg-sky-300 border-2 border-amber-950 flex items-center justify-center text-2xl mb-4 shadow-[2px_2px_0px_#3d2314]">
              <Lock className="w-6 h-6 text-amber-950" />
            </div>
            <h3 className="text-xl font-bold font-cartoon text-amber-950 mb-2">
              Authorities Revoked
            </h3>
            <p className="text-sm text-amber-900/80 font-medium leading-relaxed">
              Mint and freeze authority are revoked at launch, so no new $DODO can be created and no wallet can be frozen. Check it on Solscan.
            </p>
          </div>

          <div className="cartoon-card bg-white rounded-3xl p-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-300 border-2 border-amber-950 flex items-center justify-center text-2xl mb-4 shadow-[2px_2px_0px_#3d2314]">
              <Globe2 className="w-6 h-6 text-amber-950" />
            </div>
            <h3 className="text-xl font-bold font-cartoon text-amber-950 mb-2">
              Graduates On-Chain
            </h3>
            <p className="text-sm text-amber-900/80 font-medium leading-relaxed">
              When the pump.fun bonding curve completes (around a $69k market cap), liquidity moves to a Solana DEX automatically.
            </p>
          </div>

          <div className="cartoon-card bg-white rounded-3xl p-6">
            <div className="w-12 h-12 rounded-2xl bg-rose-300 border-2 border-amber-950 flex items-center justify-center text-2xl mb-4 shadow-[2px_2px_0px_#3d2314]">
              <PawPrint className="w-6 h-6 text-amber-950" />
            </div>
            <h3 className="text-xl font-bold font-cartoon text-amber-950 mb-2">
              Paws for a Cause
            </h3>
            <p className="text-sm text-amber-900/80 font-medium leading-relaxed">
              1% of the supply is set aside for pet shelters and orphanages, starting in India. Holders vote on which shelters receive it.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
