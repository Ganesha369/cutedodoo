import React, { useState } from 'react';
import { Heart, ExternalLink, CheckCircle2, Vote, Sparkles, Shield, Camera } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Milestone {
  target: string;
  title: string;
  desc: string;
  proof: string;
  status: 'Ready' | 'Upcoming';
  icon: string;
}

export const CharityMilestones: React.FC = () => {
  const [shelterVotes, setShelterVotes] = useState<Record<string, number>>({
    blueCrossChennai: 342,
    cupaBangalore: 215,
    strayReliefDelhi: 189,
    sarvohamAnimalTrust: 278,
  });
  const [hasVoted, setHasVoted] = useState(false);

  const totalVotes = Object.values(shelterVotes).reduce((a, b) => a + b, 0);

  const castVote = (id: string) => {
    if (hasVoted) return;
    sounds.bell();
    setShelterVotes((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
    setHasVoted(true);
  };

  const donationWallet = 'ASNxk6W4NhkUtYwyqotmtLx4FzTcgNLhQEvN6mFcsAX4';
  const [copiedDonation, setCopiedDonation] = useState(false);

  const copyDonationWallet = () => {
    sounds.coin();
    navigator.clipboard?.writeText(donationWallet);
    setCopiedDonation(true);
    setTimeout(() => setCopiedDonation(false), 2000);
  };

  const milestones: Milestone[] = [
    {
      target: 'Launch',
      title: 'Charity wallet goes public',
      desc: 'The charity wallet address is published on this page, so anyone can watch its balance.',
      proof: 'Proof: wallet address on Solscan',
      status: 'Ready',
      icon: '🔐',
    },
    {
      target: '$100k',
      title: 'First meals for strays',
      desc: 'Food for stray-dog shelters in Chennai, Dodo’s home town.',
      proof: 'Proof: Solscan transfer + photos on X & Telegram',
      status: 'Upcoming',
      icon: '🥣',
    },
    {
      target: '$300k',
      title: 'Holders pick the shelters',
      desc: 'A community poll chooses recognised animal shelters in India to receive support.',
      proof: 'Proof: poll result + Solscan transfer',
      status: 'Upcoming',
      icon: '🗳️',
    },
    {
      target: '$500k',
      title: 'Vet care',
      desc: 'Funding medical care for injured and sick street animals.',
      proof: 'Proof: Solscan transfer + shelter receipt',
      status: 'Upcoming',
      icon: '🩺',
    },
    {
      target: '$1M',
      title: 'Rescue & shelter support',
      desc: 'Larger support for rescue work and shelter space.',
      proof: 'Proof: Solscan transfer + video from the shelters',
      status: 'Upcoming',
      icon: '🏡',
    },
    {
      target: '$3M',
      title: 'Beyond India',
      desc: 'Shelters outside India, chosen only by $DODO holders.',
      proof: 'Proof: vote results published here',
      status: 'Upcoming',
      icon: '🌍',
    },
    {
      target: '$5M',
      title: 'A long-term shelter fund',
      desc: 'A lasting fund for animal welfare, if holders vote for it.',
      proof: 'Proof: full donation list on this site',
      status: 'Upcoming',
      icon: '🏆',
    },
  ];

  return (
    <section id="charity" className="py-16 md:py-24 bg-[#FFFDF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-200 border-2 border-amber-950 rounded-full text-xs font-bold text-amber-950 shadow-[2px_2px_0px_#3d2314] mb-3">
            <span>🐾 Paws for a Cause</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-cartoon text-amber-950 tracking-tight mb-3">
            Real Milestones. Real Donations. <span className="text-amber-500">Real Receipts.</span>
          </h2>
          <p className="text-base sm:text-lg text-amber-900/80 font-medium leading-relaxed">
            Where every milestone feeds a stray. <strong>1% of the supply sits in a public charity wallet</strong>. As $DODO grows, donations go out at these market-cap goals, and every one is posted here with its Solscan link and photos.
          </p>

          {/* Official Public Charity Donation Address Box */}
          <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-2 bg-amber-100 border-2 border-amber-950 p-2.5 sm:px-4 sm:py-2 rounded-2xl shadow-[3px_3px_0px_#3d2314] max-w-xl mx-auto">
            <span className="text-xs font-bold text-amber-900 shrink-0">Official Charity Wallet:</span>
            <span className="font-mono text-xs font-bold text-amber-950 bg-white border border-amber-950/40 px-2.5 py-1 rounded-lg truncate max-w-[240px] sm:max-w-[280px]">
              {donationWallet}
            </span>
            <button
              onClick={copyDonationWallet}
              className="cartoon-btn px-3 py-1 bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-bold rounded-xl flex items-center gap-1 shrink-0"
            >
              {copiedDonation ? 'Copied ✓' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Milestone Timeline Cards */}
        <div className="space-y-4 mb-16 max-w-4xl mx-auto">
          {milestones.map((m, idx) => (
            <div
              key={m.target}
              className="cartoon-card bg-white rounded-3xl p-5 sm:p-6 transition-all hover:bg-amber-50/50"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-200 border-2 border-amber-950 flex flex-col items-center justify-center shrink-0 shadow-[2px_2px_0px_#3d2314]">
                    <span className="text-xl">{m.icon}</span>
                    <span className="text-[11px] font-bold font-cartoon text-amber-950 mt-0.5">{m.target}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-cartoon text-amber-950">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-900/80 font-medium mt-1">
                      {m.desc}
                    </p>
                    <div className="mt-2 text-xs font-semibold text-amber-700 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-amber-600" />
                      <span>{m.proof}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 self-end sm:self-center">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border-2 border-amber-950 shadow-[1px_1px_0px_#3d2314] ${
                    m.status === 'Ready'
                      ? 'bg-emerald-300 text-emerald-950'
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {m.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notice on bonding curve */}
        <p className="text-xs text-center text-amber-800/80 max-w-2xl mx-auto mb-16 font-medium">
          Market-cap milestones are goals, not promises. The pump.fun bonding curve completes at around a $69k market cap, after which $DODO trades on a Solana DEX.
        </p>

        {/* Interactive Holder Shelter Voting Box */}
        <div className="cartoon-card bg-[#FFFDF0] rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-amber-950/10">
            <div>
              <h3 className="text-2xl font-bold font-cartoon text-amber-950 flex items-center gap-2">
                <Vote className="w-6 h-6 text-amber-600" />
                <span>Community Shelter Voting Poll</span>
              </h3>
              <p className="text-xs sm:text-sm text-amber-800 font-medium">
                Holders vote on which recognized shelter receives the next grant allocation!
              </p>
            </div>
            <div className="text-xs font-bold text-amber-950 bg-amber-200 border-2 border-amber-950 px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#3d2314]">
              Total Votes: {totalVotes}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                id: 'blueCrossChennai',
                name: 'Blue Cross of India (Chennai)',
                location: 'Chennai, Tamil Nadu',
                mission: 'Dodo’s hometown animal hospital and 24/7 rescue sanctuary',
              },
              {
                id: 'cupaBangalore',
                name: 'CUPA Animal Shelter (Bangalore)',
                location: 'Bangalore, Karnataka',
                mission: 'Compassion Unlimited Plus Action for injured street dogs',
              },
              {
                id: 'sarvohamAnimalTrust',
                name: 'Sarvoham Animal Sanctuary',
                location: 'Bengaluru',
                mission: 'Dedicated shelter for paralyzed and senior street dogs',
              },
              {
                id: 'strayReliefDelhi',
                name: 'Stray Relief and Animal Welfare (STRAW)',
                location: 'India Nationwide',
                mission: 'Animal welfare, emergency medical aid and stray feeding',
              },
            ].map((shelter) => {
              const votes = shelterVotes[shelter.id] || 0;
              const percentage = Math.round((votes / totalVotes) * 100);

              return (
                <div
                  key={shelter.id}
                  className="bg-white border-2 border-amber-950 rounded-2xl p-4 shadow-[2px_2px_0px_#3d2314] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="font-cartoon font-bold text-base text-amber-950">
                        {shelter.name}
                      </h4>
                      <span className="text-xs font-bold font-mono text-amber-800 shrink-0">
                        {percentage}%
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-amber-700 mb-2">
                      📍 {shelter.location}
                    </div>
                    <p className="text-xs text-amber-900/80 mb-3">
                      {shelter.mission}
                    </p>
                  </div>

                  <div>
                    {/* Vote progress bar */}
                    <div className="w-full h-3 bg-amber-100 rounded-full border border-amber-950 overflow-hidden mb-3">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <button
                      disabled={hasVoted}
                      onClick={() => castVote(shelter.id)}
                      className={`w-full py-2 rounded-xl text-xs font-bold border-2 border-amber-950 transition-all ${
                        hasVoted
                          ? 'bg-amber-100 text-amber-700 opacity-80 cursor-default'
                          : 'cartoon-btn bg-amber-300 hover:bg-amber-200 text-amber-950'
                      }`}
                    >
                      {hasVoted ? 'Vote Recorded ✓' : 'Vote For This Shelter 🐾'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
