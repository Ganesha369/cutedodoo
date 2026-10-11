import React, { useState } from 'react';
import { Sparkles, Camera, Palette, Heart, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface DodoCard {
  id: string;
  title: string;
  subtitle: string;
  realImage: string;
  cartoonImage: string;
  description: string;
  funFact: string;
}

export const Gallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<'both' | 'real' | 'cartoon'>('both');
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const cards: DodoCard[] = [
    {
      id: 'royal',
      title: 'His Highness Dodo',
      subtitle: 'Royal silk & peacock crown',
      realImage: '/src/assets/images/cutedodo_royal_costume_1791659611900.jpg',
      cartoonImage: '/src/assets/images/cutedodo_royal_costume_1791659611900.jpg',
      description: 'Dressed up like royalty on festive days in Tamil Nadu! He sat so patiently while everyone took photos of his regal posture.',
      funFact: 'Grandma made him a miniature velvet cushion to sit on like a little Maharaja!'
    },
    {
      id: 'beach',
      title: 'The Fashion Icon',
      subtitle: 'Blue silk scarf & beach chilling',
      realImage: '/src/assets/images/dodo_beach_photo_1791659728175.jpg',
      cartoonImage: '/src/assets/images/cutedodo_beach_fun_1791659622316.jpg',
      description: 'Relaxing by the waves on Chennai beach on his favorite blue patterned mat, looking back with a happy open-mouth smile.',
      funFact: 'He loves barking at the gentle incoming foam and digging little sand paws!'
    },
    {
      id: 'relaxing',
      title: 'Professional Napper',
      subtitle: 'Chill is a lifestyle',
      realImage: '/src/assets/images/dodo_lawn_grass_1791659704495.jpg',
      cartoonImage: '/src/assets/images/cutedodo_hero_mascot_1791659602047.jpg',
      description: 'Lying relaxed on green lawn grass after a fun sprint. The ultimate master of stretching his legs and soaking in sunshine.',
      funFact: 'Can fall asleep within 30 seconds if you gently stroke between his brown fluffy ears.'
    },
    {
      id: 'bone',
      title: 'Bone Connoisseur',
      subtitle: 'Never lets go of his chew treat',
      realImage: '/src/assets/images/dodo_bone_bed_1791659717865.jpg',
      cartoonImage: '/src/assets/images/cutedodo_hero_mascot_1791659602047.jpg',
      description: 'Sitting on the bed with his prized bone held firmly in his mouth and his signature golden collar bell.',
      funFact: 'He will proudly carry this bone to show every single person entering the house!'
    },
    {
      id: 'flag',
      title: 'Proud Chennai Boy',
      subtitle: 'Bow tie & tricolour',
      realImage: '/src/assets/images/dodo_bowtie_flag_1791659739239.jpg',
      cartoonImage: '/src/assets/images/cutedodo_coin_badge_1791659647166.jpg',
      description: 'Wearing a handsome bow tie standing beside the tricolour ribbon, proud of his Tamil Nadu roots and community love.',
      funFact: 'The entire neighborhood knows him by name and waves when he goes on his evening walk.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FFFDF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200 border-2 border-amber-950 rounded-full text-xs font-bold text-amber-950 shadow-[2px_2px_0px_#3d2314] mb-3">
            <span>📸 Real Pet Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-cartoon text-amber-950 tracking-tight mb-3">
            Meet the Real Dodo
          </h2>
          <p className="text-base sm:text-lg text-amber-800 font-bold font-cartoon">
            No stock photos: this is Dodo himself.
          </p>
          <p className="text-sm text-amber-900/70 mt-1 max-w-xl mx-auto">
            From playful candid moments with the family to cartoon storybook creations, see the pure joy that inspired $DODO!
          </p>

          {/* View mode toggle buttons */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => {
                sounds.pop();
                setViewMode('both');
              }}
              className={`cartoon-btn px-4 py-2 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 ${
                viewMode === 'both' ? 'bg-amber-400 text-amber-950' : 'bg-white text-amber-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-900" />
              <span>Side-by-Side</span>
            </button>

            <button
              onClick={() => {
                sounds.pop();
                setViewMode('real');
              }}
              className={`cartoon-btn px-4 py-2 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 ${
                viewMode === 'real' ? 'bg-amber-400 text-amber-950' : 'bg-white text-amber-900'
              }`}
            >
              <Camera className="w-4 h-4 text-amber-900" />
              <span>Real Photos 📸</span>
            </button>

            <button
              onClick={() => {
                sounds.pop();
                setViewMode('cartoon');
              }}
              className={`cartoon-btn px-4 py-2 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 ${
                viewMode === 'cartoon' ? 'bg-amber-400 text-amber-950' : 'bg-white text-amber-900'
              }`}
            >
              <Palette className="w-4 h-4 text-amber-900" />
              <span>Cartoon Art 🎨</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => {
            const isSelected = activeCard === card.id;

            return (
              <div
                key={card.id}
                onClick={() => {
                  sounds.bell();
                  setActiveCard(isSelected ? null : card.id);
                }}
                className={`cartoon-card bg-white rounded-3xl overflow-hidden cursor-pointer transition-all ${
                  isSelected ? 'ring-4 ring-amber-400 scale-[1.02]' : ''
                }`}
              >
                {/* Image Container with view mode logic */}
                <div className="relative aspect-4/3 bg-amber-100 overflow-hidden border-b-3 border-amber-950">
                  {viewMode === 'both' ? (
                    <div className="grid grid-cols-2 h-full w-full">
                      <div className="relative h-full overflow-hidden border-r-2 border-amber-950">
                        <img
                          src={card.realImage}
                          alt={`${card.title} real`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 bg-black/60 text-white rounded">
                          Real 📸
                        </span>
                      </div>
                      <div className="relative h-full overflow-hidden">
                        <img
                          src={card.cartoonImage}
                          alt={`${card.title} cartoon`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 bg-amber-400 text-amber-950 border border-amber-950 rounded">
                          Cartoon 🎨
                        </span>
                      </div>
                    </div>
                  ) : viewMode === 'real' ? (
                    <img
                      src={card.realImage}
                      alt={card.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <img
                      src={card.cartoonImage}
                      alt={card.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {/* Corner Heart */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border-2 border-amber-950 flex items-center justify-center text-rose-500 shadow-[1px_1px_0px_#3d2314]">
                    <Heart className="w-4 h-4 fill-rose-500" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-bold font-cartoon text-amber-950">
                      {card.title}
                    </h3>
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 border border-amber-950/40 px-2 py-0.5 rounded-lg">
                      {card.subtitle}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-amber-900/80 font-medium leading-relaxed mb-3">
                    {card.description}
                  </p>

                  <div className="p-3 bg-amber-50/80 border border-amber-950/30 rounded-xl text-xs text-amber-950 font-medium flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">✨ Fun fact:</span>
                    <span>{card.funFact}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
