import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { Compass, BookOpen, Zap, Award, User } from 'lucide-react';

interface MobileNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentTab, setCurrentTab }) => {
  const { language } = useApp();
  const t = translations[language];

  const items = [
    { id: 'home', label: t.navHome, icon: Compass },
    { id: 'lessons', label: language === 'uz' ? 'Darslar' : 'Learn', icon: BookOpen },
    { id: 'quiz', label: language === 'uz' ? 'Mashq' : 'Practice', icon: Zap },
    { id: 'rewards', label: language === 'uz' ? 'Yutuqlar' : 'Rewards', icon: Award },
    { id: 'profile', label: t.navProfile, icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel bg-slate-950/90 border-t border-slate-800/80 backdrop-blur-xl px-2 py-2 safe-area-pb">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition duration-200 ${
                isActive
                  ? 'text-amber-400 scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-xl transition ${isActive ? 'bg-amber-400/15' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : ''}`} />
              </div>
              <span className={`text-[10px] font-semibold mt-0.5 tracking-tight ${isActive ? 'text-amber-300 font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
