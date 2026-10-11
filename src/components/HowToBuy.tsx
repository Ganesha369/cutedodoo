import React, { useState } from 'react';
import { ArrowDownUp, Wallet, ShieldCheck, Sparkles, ExternalLink, Check, Copy } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const HowToBuy: React.FC = () => {
  const [solAmount, setSolAmount] = useState<string>('0.5');
  const [slippage, setSlippage] = useState<string>('1.0');
  const [walletConnected, setWalletConnected] = useState(false);
  const [connectedWalletName, setConnectedWalletName] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [copiedCA, setCopiedCA] = useState(false);
  const [swapStatusMessage, setSwapStatusMessage] = useState<string | null>(null);

  const CA = 'Coming soon';

  // Approx calculated DODO rate based on hypothetical SOL price ($160) and $DODO launch valuation
  const estimatedDodo = solAmount && !isNaN(parseFloat(solAmount))
    ? Math.floor(parseFloat(solAmount) * 2315000).toLocaleString()
    : '0';

  const handleConnectWallet = (wallet: string) => {
    sounds.bell();
    setConnectedWalletName(wallet);
    setWalletConnected(true);
    setShowWalletModal(false);
  };

  const handleCopyCA = () => {
    sounds.coin();
    navigator.clipboard?.writeText(CA);
    setCopiedCA(true);
    setTimeout(() => setCopiedCA(false), 2000);
  };

  const steps = [
    {
      step: '1',
      title: 'Get a Solana Wallet',
      description: 'Install Phantom, Solflare or Backpack from the official app store or phantom.com / solflare.com.',
      icon: '👛',
    },
    {
      step: '2',
      title: 'Add SOL',
      description: 'Buy SOL on an exchange and send it to your wallet. Keep a little extra for network fees.',
      icon: '🪙',
    },
    {
      step: '3',
      title: 'Check the CA',
      description: 'Only use the contract address shown on this site and our official channels. Copy it with the button at the top.',
      icon: '🔍',
    },
    {
      step: '4',
      title: 'Swap Right Here',
      description: 'Use the swap box below: connect your wallet, enter the SOL amount, confirm in your wallet. Welcome to the pack!',
      icon: '🎉',
    },
  ];

  return (
    <section id="buy" className="py-16 md:py-24 bg-[#FFF9ED] border-b-3 border-amber-950/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200 border-2 border-amber-950 rounded-full text-xs font-bold text-amber-950 shadow-[2px_2px_0px_#3d2314] mb-3">
            <span>🚀 Easy Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-cartoon text-amber-950 tracking-tight mb-3">
            Get <span className="text-amber-500">$DODO</span> in 4 Steps
          </h2>
          <p className="text-base sm:text-lg text-amber-900/80 font-medium">
            New to Solana? It takes about five minutes.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((st) => (
            <div
              key={st.step}
              className="cartoon-card bg-white rounded-3xl p-6 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-300 border-2 border-amber-950 flex items-center justify-center font-cartoon font-extrabold text-xl text-amber-950 shadow-[2px_2px_0px_#3d2314]">
                    {st.step}
                  </div>
                  <span className="text-3xl">{st.icon}</span>
                </div>
                <h3 className="text-xl font-bold font-cartoon text-amber-950 mb-2">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-amber-900/80 font-medium leading-relaxed">
                  {st.description}
                </p>
              </div>

              {st.step === '3' && (
                <div className="mt-4 pt-3 border-t border-amber-950/10">
                  <button
                    onClick={handleCopyCA}
                    className="w-full cartoon-btn py-1.5 px-2 bg-amber-100 hover:bg-amber-200 text-xs font-bold text-amber-950 rounded-xl flex items-center justify-center gap-1.5"
                  >
                    {copiedCA ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCA ? 'CA Copied!' : 'Copy Verified CA'}</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Jupiter Swap Box Interface */}
        <div className="max-w-xl mx-auto">
          <div className="cartoon-card bg-white rounded-3xl p-6 sm:p-8 shadow-[6px_8px_0px_#3d2314]">
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-amber-950/10">
              <div>
                <h3 className="text-2xl font-bold font-cartoon text-amber-950">
                  Swap SOL for $DODO
                </h3>
                <p className="text-xs text-amber-800 font-medium">
                  Powered by Jupiter aggregator &amp; pump.fun
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-950/40 px-2.5 py-1 rounded-lg">
                  Slippage: {slippage}%
                </span>
              </div>
            </div>

            {/* Input SOL */}
            <div className="bg-amber-50 border-2 border-amber-950 rounded-2xl p-4 mb-3">
              <div className="flex justify-between text-xs font-bold text-amber-800 mb-1">
                <span>You Pay</span>
                <span>Balance: {walletConnected ? '2.45 SOL' : '0.00 SOL'}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <input
                  type="number"
                  value={solAmount}
                  onChange={(e) => setSolAmount(e.target.value)}
                  placeholder="0.0"
                  step="0.1"
                  min="0"
                  className="bg-transparent text-2xl font-extrabold font-mono text-amber-950 focus:outline-none w-2/3"
                />
                <div className="flex items-center gap-1.5 bg-amber-200 border-2 border-amber-950 px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm text-amber-950 shadow-[1px_1px_0px_#3d2314]">
                  <span>☀️ SOL</span>
                </div>
              </div>
            </div>

            {/* Invert Arrow */}
            <div className="flex justify-center -my-1 relative z-10">
              <button
                onClick={() => sounds.pop()}
                className="w-8 h-8 rounded-full bg-amber-300 border-2 border-amber-950 flex items-center justify-center text-amber-950 shadow-[1px_2px_0px_#3d2314] hover:rotate-180 transition-transform duration-300"
              >
                <ArrowDownUp className="w-4 h-4" />
              </button>
            </div>

            {/* Output $DODO */}
            <div className="bg-amber-50 border-2 border-amber-950 rounded-2xl p-4 mb-4">
              <div className="flex justify-between text-xs font-bold text-amber-800 mb-1">
                <span>You Receive (Estimated)</span>
                <span>1% for stray dogs included</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="text-2xl font-extrabold font-mono text-amber-950 truncate w-2/3">
                  {estimatedDodo}
                </div>
                <div className="flex items-center gap-1.5 bg-amber-400 border-2 border-amber-950 px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm text-amber-950 shadow-[1px_1px_0px_#3d2314]">
                  <span>🐶 $DODO</span>
                </div>
              </div>
            </div>

            {/* Slippage options */}
            <div className="flex items-center justify-between gap-2 mb-6 text-xs font-bold text-amber-950">
              <span className="text-amber-800">Slippage Tolerance:</span>
              <div className="flex gap-1.5">
                {['0.5', '1.0', '2.0'].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      sounds.pop();
                      setSlippage(val);
                    }}
                    className={`px-2.5 py-1 rounded-lg border-2 border-amber-950 transition-all ${
                      slippage === val ? 'bg-amber-400 font-extrabold shadow-[1px_1px_0px_#3d2314]' : 'bg-white'
                    }`}
                  >
                    {val}%
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Banner / Status */}
            <div className="p-4 bg-amber-100/90 border-2 border-amber-950 rounded-2xl text-center mb-6 shadow-[2px_2px_0px_#3d2314]">
              <div className="text-xl mb-1">🐶</div>
              <h4 className="text-base font-bold font-cartoon text-amber-950 mb-1">
                $DODO is launching soon
              </h4>
              <p className="text-xs text-amber-900/80 leading-relaxed font-medium">
                The swap box switches on automatically as soon as the token is live. Follow our channels so you don&apos;t miss the launch.
              </p>
            </div>

            {/* Primary Action Button */}
            {!walletConnected ? (
              <button
                onClick={() => {
                  sounds.pop();
                  setShowWalletModal(true);
                }}
                className="cartoon-btn w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-cartoon text-lg font-bold rounded-2xl flex items-center justify-center gap-2"
              >
                <Wallet className="w-5 h-5 text-amber-950" />
                <span>Connect Solana Wallet</span>
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    sounds.coin();
                    setSwapStatusMessage('Token launch pending! You are connected and ready to buy the moment trading opens on pump.fun! 🚀🐾');
                    setTimeout(() => setSwapStatusMessage(null), 5000);
                  }}
                  className="cartoon-btn w-full py-3.5 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-cartoon text-lg font-bold rounded-2xl flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-emerald-950" />
                  <span>Ready to Swap (Connected: {connectedWalletName})</span>
                </button>
                {swapStatusMessage && (
                  <div className="p-3 bg-emerald-100 border-2 border-emerald-800 rounded-xl text-xs font-bold text-emerald-950 text-center animate-bounce">
                    {swapStatusMessage}
                  </div>
                )}
                <button
                  onClick={() => {
                    setWalletConnected(false);
                    setSwapStatusMessage(null);
                  }}
                  className="w-full text-xs text-amber-800 underline text-center"
                >
                  Disconnect Wallet
                </button>
              </div>
            )}

            <p className="text-[11px] text-amber-800/80 text-center mt-4">
              Your wallet signs every trade; this website never holds your funds or keys.
            </p>

          </div>
        </div>

        {/* Wallet Connect Modal */}
        {showWalletModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
            <div className="cartoon-card bg-white rounded-3xl p-6 max-w-sm w-full">
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-amber-950/10">
                <h4 className="text-xl font-bold font-cartoon text-amber-950">
                  Connect Solana Wallet
                </h4>
                <button
                  onClick={() => setShowWalletModal(false)}
                  className="text-amber-950 font-bold p-1 hover:bg-amber-100 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Phantom', desc: 'Most popular Solana wallet', icon: '👻' },
                  { name: 'Solflare', desc: 'Secure web & mobile wallet', icon: '☀️' },
                  { name: 'Backpack', desc: 'Web3 & crypto wallet', icon: '🎒' },
                ].map((w) => (
                  <button
                    key={w.name}
                    onClick={() => handleConnectWallet(w.name)}
                    className="cartoon-btn w-full p-3 bg-amber-50 hover:bg-amber-100 rounded-2xl flex items-center gap-3 text-left"
                  >
                    <span className="text-2xl">{w.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-amber-950">{w.name}</div>
                      <div className="text-[11px] text-amber-800">{w.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
