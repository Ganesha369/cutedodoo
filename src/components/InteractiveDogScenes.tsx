import React, { useState } from 'react';
import { ScenePlaying } from './scenes/ScenePlaying';
import { SceneWalking } from './scenes/SceneWalking';
import { SceneGrandma } from './scenes/SceneGrandma';
import { SceneFeedingTray } from './scenes/SceneFeedingTray';
import { SceneStreetDogs } from './scenes/SceneStreetDogs';
import { sounds } from '../utils/soundEffects';
import { ChevronLeft, ChevronRight, Film, Sparkles } from 'lucide-react';

export const InteractiveDogScenes: React.FC = () => {
  const [activeSceneIdx, setActiveSceneIdx] = useState<number>(0);

  const scenes = [
    {
      id: 'play',
      num: '01',
      title: 'Playful Zoomies',
      subtitle: 'CuteDODO Playing Happily',
      icon: '🎾',
      component: <ScenePlaying />,
    },
    {
      id: 'walk',
      num: '02',
      title: 'Park Stroll',
      subtitle: 'Walking on Leash with Dad',
      icon: '🚶‍♂️',
      component: <SceneWalking />,
    },
    {
      id: 'grandma',
      num: '03',
      title: 'Grandma’s Lap',
      subtitle: 'Affectionate Veranda Story',
      icon: '👵',
      component: <SceneGrandma />,
    },
    {
      id: 'feeding',
      num: '04',
      title: 'Mealtime Tray',
      subtitle: 'Preparing Wholesome Food',
      icon: '🥣',
      component: <SceneFeedingTray />,
    },
    {
      id: 'street',
      num: '05',
      title: 'Saving Strays',
      subtitle: 'Feeding Street Dogs in Chennai',
      icon: '🐕',
      component: <SceneStreetDogs />,
    },
  ];

  const currentScene = scenes[activeSceneIdx];

  const handleNext = () => {
    sounds.pop();
    setActiveSceneIdx((prev) => (prev + 1) % scenes.length);
  };

  const handlePrev = () => {
    sounds.pop();
    setActiveSceneIdx((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  return (
    <section id="scenes" className="py-16 md:py-24 bg-[#FFF9ED] border-b-3 border-amber-950/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-300 border-2 border-amber-950 rounded-full text-xs font-bold text-amber-950 shadow-[2px_2px_0px_#3d2314] mb-3">
            <Film className="w-3.5 h-3.5 text-amber-950" />
            <span>Interactive Animated Theater · 5 Life Scenes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-cartoon text-amber-950 tracking-tight mb-3">
            The Life &amp; Mission of <span className="text-amber-500">CuteDODO</span>
          </h2>
          <p className="text-base sm:text-lg text-amber-900/80 font-medium">
            Explore 5 hand-crafted animated scenes showing Dodo playing, walking on leash, cuddling with grandma, enjoying meals, and sharing food with street dogs.
          </p>
        </div>

        {/* Scene Navigation Selector Tabs */}
        <div className="flex items-center justify-between gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center gap-2 sm:gap-3 mx-auto">
            {scenes.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => {
                  sounds.pop();
                  setActiveSceneIdx(idx);
                }}
                className={`cartoon-btn px-3 sm:px-5 py-2 sm:py-3 rounded-2xl flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm font-bold transition-all ${
                  activeSceneIdx === idx
                    ? 'bg-amber-400 text-amber-950 shadow-[3px_4px_0px_#3d2314] -translate-y-1'
                    : 'bg-white text-amber-900 hover:bg-amber-100'
                }`}
              >
                <span className="text-base sm:text-lg">{scene.icon}</span>
                <div className="text-left hidden sm:block">
                  <div className="text-[10px] font-mono opacity-70">Scene {scene.num}</div>
                  <div>{scene.title}</div>
                </div>
                <span className="sm:hidden">{scene.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scene Theater Viewport Container with Smooth Crossfade Animation */}
        <div className="relative min-h-[500px]">
          <div
            key={currentScene.id}
            className="transition-opacity duration-300 animate-[popIn_0.3s_cubic-bezier(0.16,1,0.3,1)]"
          >
            {currentScene.component}
          </div>
        </div>

        {/* Bottom Pager Controls */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-amber-950/10">
          <button
            onClick={handlePrev}
            className="cartoon-btn px-4 sm:px-5 py-2.5 bg-white hover:bg-amber-100 rounded-xl text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Scene</span>
          </button>

          <div className="text-xs font-bold font-cartoon text-amber-900">
            Scene {activeSceneIdx + 1} of {scenes.length} · {currentScene.subtitle}
          </div>

          <button
            onClick={handleNext}
            className="cartoon-btn px-4 sm:px-5 py-2.5 bg-amber-400 hover:bg-amber-300 rounded-xl text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-2"
          >
            <span>Next Scene</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
