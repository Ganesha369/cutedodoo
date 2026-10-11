import React from 'react';
import { Heart, Sparkles, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-950 text-amber-100 pt-16 pb-12 border-t-4 border-amber-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 border-2 border-amber-300 flex items-center justify-center text-xl shadow-[2px_2px_0px_#000]">
                🐶
              </div>
              <span className="text-2xl font-bold font-cartoon text-white tracking-tight">
                CuteDoDo <span className="text-amber-400">$DODO</span>
              </span>
            </div>

            <p className="text-sm text-amber-200/90 font-medium leading-relaxed max-w-sm">
              Paws over Profits 🐾 A Solana community meme token inspired by Dodo the CuteDODO, with 1% of supply set aside for registered pet shelters and stray dog relief.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs bg-amber-900 text-amber-300 px-3 py-1 rounded-full font-bold border border-amber-800">
                🇮🇳 Born in Tamil Nadu, Loved Globally
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold font-cartoon text-amber-400 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-amber-200/80">
              <li>
                <a href="#about" onClick={() => sounds.pop()} className="hover:text-amber-300 transition-colors">
                  About Dodo
                </a>
              </li>
              <li>
                <a href="#tokenomics" onClick={() => sounds.pop()} className="hover:text-amber-300 transition-colors">
                  Tokenomics
                </a>
              </li>
              <li>
                <a href="#buy" onClick={() => sounds.pop()} className="hover:text-amber-300 transition-colors">
                  How to Buy
                </a>
              </li>
              <li>
                <a href="#charity" onClick={() => sounds.pop()} className="hover:text-amber-300 transition-colors">
                  Charity &amp; Proof
                </a>
              </li>
              <li>
                <a href="#wallets" onClick={() => sounds.pop()} className="hover:text-amber-300 transition-colors">
                  Transparency
                </a>
              </li>
              <li>
                <a href="#roadmap" onClick={() => sounds.pop()} className="hover:text-amber-300 transition-colors">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-bold font-cartoon text-amber-400 uppercase tracking-wider mb-4">
              Community
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-amber-200/80">
              <li>
                <a
                  href="https://t.me/+pjv_zrm5Cjc1MWNl"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.pop()}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Telegram</span>
                  <ExternalLink className="w-3 h-3 text-amber-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/CuteDoDoToken"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.pop()}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>X (Twitter)</span>
                  <ExternalLink className="w-3 h-3 text-amber-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/9f7bBxgRS9"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.pop()}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Discord</span>
                  <ExternalLink className="w-3 h-3 text-amber-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Solana Ecosystem */}
          <div>
            <h4 className="text-sm font-bold font-cartoon text-amber-400 uppercase tracking-wider mb-4">
              Solana Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-amber-200/80">
              <li>
                <a
                  href="https://pump.fun"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.pop()}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>pump.fun</span>
                  <ExternalLink className="w-3 h-3 text-amber-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://jup.ag"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.pop()}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Jupiter</span>
                  <ExternalLink className="w-3 h-3 text-amber-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://dexscreener.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.pop()}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>DexScreener</span>
                  <ExternalLink className="w-3 h-3 text-amber-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://solscan.io"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.pop()}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Solscan</span>
                  <ExternalLink className="w-3 h-3 text-amber-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Box */}
        <div className="p-4 rounded-2xl bg-amber-900/60 border border-amber-800 text-xs text-amber-300/80 leading-relaxed font-normal mb-8">
          <strong className="text-amber-200 font-bold block mb-1">Disclaimer:</strong>
          $DODO is a meme coin with no intrinsic value or expectation of financial return. It is not an investment or security. Crypto prices are volatile and you can lose all you put in. Do your own research and only use money you can afford to lose.
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-amber-900 text-xs text-amber-400 font-medium">
          <div>
            © 2026 CuteDoDo. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-amber-300">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 mx-0.5" />
            <span>for Dodo and stray doggos everywhere</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
