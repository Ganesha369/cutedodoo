import React from 'react';

interface MarqueeBannerProps {
  variant?: 'amber' | 'dark' | 'cream';
  speed?: 'normal' | 'slow' | 'fast';
  direction?: 'rtl' | 'ltr';
  customMessages?: string[];
}

export const MarqueeBanner: React.FC<MarqueeBannerProps> = ({
  variant = 'dark',
  speed = 'normal',
  direction = 'rtl',
  customMessages,
}) => {
  const defaultMessages = [
    'GOOD DOGS, HAPPY HEARTS',
    'EVERY PAW DESERVES LOVE',
    'WALK. PLAY. CARE. REPEAT.',
    'ADOPT KINDNESS',
    'LOVE YOUR FOUR-LEGGED FRIENDS',
    '🐾 1% DEDICATED TO PET SHELTERS',
    'PROUD FAMILY MOVEMENT ON SOLANA',
    'SAVING STRAYS ONE BLOCK AT A TIME',
  ];

  const messages = customMessages || defaultMessages;

  // Background & border themes
  const variantStyles = {
    dark: 'bg-amber-950 text-amber-200 border-y-3 border-amber-900',
    amber: 'bg-amber-400 text-amber-950 border-y-3 border-amber-950 shadow-[0_2px_4px_rgba(0,0,0,0.06)]',
    cream: 'bg-[#FFF9ED] text-amber-950 border-y-2 border-amber-950/20',
  };

  const animClass = direction === 'rtl' ? 'animate-marquee-rtl' : 'animate-marquee-ltr';

  const renderContentGroup = (keySuffix: string) => (
    <div key={keySuffix} className="flex items-center shrink-0">
      {messages.map((text, idx) => (
        <span
          key={`${keySuffix}-${idx}`}
          className="inline-flex items-center text-xs sm:text-sm md:text-base font-extrabold font-cartoon tracking-wider whitespace-nowrap px-4 sm:px-6 py-2.5 sm:py-3.5 select-none"
        >
          <span>{text}</span>
          <span className="mx-4 sm:mx-6 text-amber-500/80 text-sm sm:text-lg" aria-hidden="true">
            🐾
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`relative w-full overflow-hidden ${variantStyles[variant]} z-20`}
      aria-label="Continuous Announcement Ticker"
    >
      <div className={`flex w-max ${animClass}`}>
        {/* Render twice for seamless continuous loop */}
        {renderContentGroup('group-1')}
        {renderContentGroup('group-2')}
      </div>
    </div>
  );
};
