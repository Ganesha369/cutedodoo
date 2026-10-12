import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'What is CuteDoDo ($DODO)?',
      answer:
        'CuteDoDo is a genuine community meme movement on Solana inspired by Dodo, a 1.2-year-old CuteDODO from Chennai, Tamil Nadu. It turns the laughter of a family pet into real help for street dogs—providing fresh water, nutritious meals, medical vet care, and shelter support.',
    },
    {
      question: 'Where can I buy it?',
      answer:
        'CuteDoDo launches openly on pump.fun on Solana with no presale and no private round. When the bonding curve completes (at around $69k market cap), liquidity migrates automatically to a Solana DEX like Raydium, where it can be traded via Jupiter aggregator, Phantom, Solflare, or Backpack.',
    },
    {
      question: 'Is there a buy or sell tax?',
      answer:
        'No. $DODO has 0% buy tax and 0% sell tax. It is a standard SPL token on Solana. Mint authority and freeze authority are revoked at launch so no new tokens can ever be created and no wallets can ever be blacklisted.',
    },
    {
      question: 'How does the charity work?',
      answer:
        '1% of the total token supply is held in a dedicated, public multi-sig charity wallet (ASNxk6W4NhkUtYwyqotmtLx4FzTcgNLhQEvN6mFcsAX4). As $DODO hits market-cap milestones, token grants/funds are dispatched to vetted dog shelters starting in Chennai, India and expanding globally. Token holders vote on shelter recipients, and every transfer receipt and photo is published on Solscan.',
    },
    {
      question: 'Are there any marketing tokens?',
      answer:
        'Zero. There are 0% marketing tokens in the tokenomics. Any marketing, trending, DEX updates, or listings are funded directly in SOL from the founders’ own personal pocket. We never sell $DODO to pay for ads.',
    },
    {
      question: 'What are the Guardian wallets?',
      answer:
        'Guardian wallets belong to doxxed family members (including founder VJDurga’s grandmother in Chennai) and international dog lovers across 7 nations. Their addresses are published openly for anyone to track on Solscan. They follow a strict Never Sell pledge to guarantee long-term stability and integrity.',
    },
    {
      question: 'Is my wallet safe when I connect?',
      answer:
        'Yes, 100%. Our swap box connects via standard Solana wallet protocols (Phantom, Solflare, Backpack) and Jupiter aggregator. You must sign and approve every transaction yourself in your own wallet app. This website never has access to your private keys or seed phrase.',
    },
  ];

  const toggle = (idx: number) => {
    sounds.pop();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#FFF9F0] border-b border-[#49200B]/10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFD36A] border border-[#49200B]/30 rounded-xl text-xs font-bold font-heading text-[#49200B] shadow-[1.5px_1.5px_0px_#49200B] mb-3">
            <span>❓ Clear Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#49200B] tracking-tight mb-3">
            Frequently Asked <span className="text-[#FF9F00]">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-[#79513B] font-medium">
            Straight answers about $DODO.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="cartoon-card bg-[#FFF9F0] rounded-3xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-lg sm:text-xl text-[#49200B] hover:bg-[#F7D9C7]/30 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#FFD36A] border border-[#49200B] flex items-center justify-center text-sm font-bold font-heading shrink-0 text-[#49200B]">
                      Q
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border-2 border-[#49200B] bg-white flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#FFD36A]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 text-[#49200B]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#79513B] font-medium leading-relaxed border-t border-[#49200B]/15 bg-white/70">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
