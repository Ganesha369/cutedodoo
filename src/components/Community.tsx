import React from 'react';
import { Send, Twitter, MessageSquare, ExternalLink, Heart, Repeat, Share2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const Community: React.FC = () => {
  const posts = [
    {
      id: '1',
      author: 'CuteDoDo Official',
      handle: '@CuteDoDoToken',
      time: '2h ago',
      content: 'Grandma just poured Dodo his morning milk while reading the Solana charts! 🐶🥛 Remember: 0% marketing tokens, 1% strictly for pet shelters. We build for real dogs! 🐾',
      likes: '1,420',
      retweets: '389',
    },
    {
      id: '2',
      author: 'CuteDoDo Official',
      handle: '@CuteDoDoToken',
      time: '6h ago',
      content: 'Did you know Dodo will never let go of his bone? That is our exact policy for the Guardian Wallets: NEVER SELL. Pure loyalty and protection! 🦴✨',
      likes: '954',
      retweets: '241',
    },
    {
      id: '3',
      author: 'CuteDoDo Official',
      handle: '@CuteDoDoToken',
      time: '1d ago',
      content: 'First shelter milestone is Chennai, Tamil Nadu at $100k market cap! Fresh food & water bowls for thirsty strays in the summer heat. Receipts posted on Solscan! 🥣💧',
      likes: '2,810',
      retweets: '720',
    },
  ];

  return (
    <section id="community" className="py-16 md:py-24 bg-[#FFF9ED] border-b-3 border-amber-950/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200 border-2 border-amber-950 rounded-full text-xs font-bold text-amber-950 shadow-[2px_2px_0px_#3d2314] mb-3">
            <span>🌐 Global Pack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-cartoon text-amber-950 tracking-tight mb-3">
            Join the <span className="text-amber-500">Dodo Pack</span>
          </h2>
          <p className="text-base sm:text-lg text-amber-900/80 font-medium">
            Driven by community. Fueled by kindness. Launch news, memes and the shelter votes all happen here.
          </p>
        </div>

        {/* 3 Main Community Hub Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <a
            href="https://t.me/+pjv_zrm5Cjc1MWNl"
            target="_blank"
            rel="noreferrer"
            onClick={() => sounds.pop()}
            className="cartoon-card bg-white rounded-3xl p-6 text-center group hover:bg-sky-50 transition-all flex flex-col items-center justify-between"
          >
            <div>
              <div className="w-16 h-16 rounded-3xl bg-sky-300 border-3 border-amber-950 flex items-center justify-center text-3xl mb-4 mx-auto shadow-[3px_3px_0px_#3d2314] group-hover:scale-110 transition-transform">
                ✈️
              </div>
              <h3 className="text-2xl font-bold font-cartoon text-amber-950 mb-1">
                Telegram
              </h3>
              <p className="text-sm font-semibold text-sky-800 mb-3">
                Chat with the pack
              </p>
              <p className="text-xs text-amber-900/80 font-medium leading-relaxed">
                Live 24/7 community voice, launch countdown, memes, and direct updates from VJDurga.
              </p>
            </div>
            <div className="mt-6 w-full py-2.5 rounded-xl bg-sky-200 border-2 border-amber-950 font-bold text-xs text-sky-950 flex items-center justify-center gap-1">
              <span>Join Telegram Group</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          <a
            href="https://x.com/CuteDoDoToken"
            target="_blank"
            rel="noreferrer"
            onClick={() => sounds.pop()}
            className="cartoon-card bg-white rounded-3xl p-6 text-center group hover:bg-amber-50 transition-all flex flex-col items-center justify-between"
          >
            <div>
              <div className="w-16 h-16 rounded-3xl bg-amber-400 border-3 border-amber-950 flex items-center justify-center text-3xl mb-4 mx-auto shadow-[3px_3px_0px_#3d2314] group-hover:scale-110 transition-transform">
                𝕏
              </div>
              <h3 className="text-2xl font-bold font-cartoon text-amber-950 mb-1">
                X (Twitter)
              </h3>
              <p className="text-sm font-semibold text-amber-900 mb-3">
                Announcements &amp; memes
              </p>
              <p className="text-xs text-amber-900/80 font-medium leading-relaxed">
                Official news, viral dog memes, milestone updates, and daily videos of Dodo!
              </p>
            </div>
            <div className="mt-6 w-full py-2.5 rounded-xl bg-amber-200 border-2 border-amber-950 font-bold text-xs text-amber-950 flex items-center justify-center gap-1">
              <span>Follow @CuteDoDoToken</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          <a
            href="https://discord.gg/9f7bBxgRS9"
            target="_blank"
            rel="noreferrer"
            onClick={() => sounds.pop()}
            className="cartoon-card bg-white rounded-3xl p-6 text-center group hover:bg-indigo-50 transition-all flex flex-col items-center justify-between"
          >
            <div>
              <div className="w-16 h-16 rounded-3xl bg-indigo-300 border-3 border-amber-950 flex items-center justify-center text-3xl mb-4 mx-auto shadow-[3px_3px_0px_#3d2314] group-hover:scale-110 transition-transform">
                👾
              </div>
              <h3 className="text-2xl font-bold font-cartoon text-amber-950 mb-1">
                Discord
              </h3>
              <p className="text-sm font-semibold text-indigo-900 mb-3">
                Holder chat &amp; votes
              </p>
              <p className="text-xs text-amber-900/80 font-medium leading-relaxed">
                Holder verification, shelter governance channel, meme contests, and international chat.
              </p>
            </div>
            <div className="mt-6 w-full py-2.5 rounded-xl bg-indigo-200 border-2 border-amber-950 font-bold text-xs text-indigo-950 flex items-center justify-center gap-1">
              <span>Enter Discord Server</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

        </div>

        {/* Latest from @CuteDoDoToken Feed */}
        <div className="cartoon-card bg-white rounded-3xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-amber-950/10">
            <div>
              <h3 className="text-2xl font-bold font-cartoon text-amber-950">
                Latest from @CuteDoDoToken
              </h3>
              <p className="text-xs sm:text-sm text-amber-800 font-medium">
                See the latest posts and community drops on X.
              </p>
            </div>
            <a
              href="https://twitter.com/CuteDoDoToken"
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.pop()}
              className="cartoon-btn px-4 py-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5"
            >
              <span>Open @CuteDoDoToken</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-amber-50/70 border-2 border-amber-950 rounded-2xl p-4 shadow-[2px_2px_0px_#3d2314] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-amber-300 border border-amber-950 flex items-center justify-center text-sm font-bold">
                      🐶
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-950">{post.author}</div>
                      <div className="text-[11px] text-amber-800">{post.handle} · {post.time}</div>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed mb-4">
                    {post.content}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-amber-950/10 text-xs font-semibold text-amber-800">
                  <span className="flex items-center gap-1 text-rose-600">
                    <Heart className="w-3.5 h-3.5 fill-rose-500" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-700">
                    <Repeat className="w-3.5 h-3.5" /> {post.retweets}
                  </span>
                  <span className="flex items-center gap-1 text-amber-700">
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
