import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import {
  Star,
  Flame,
  Volume2,
  VolumeX,
  Globe,
  Settings,
  BookOpen,
  Award,
  Zap,
  Calculator,
  Compass,
  Check
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab, openAdmin }) => {
  const { language, setLanguage, soundEnabled, toggleSound, user } = useApp();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = translations[language];

  // Calculate XP progress in current level (each level is 100 XP)
  const currentLevelBaseXp = (user.level - 1) * 100;
  const xpInCurrentLevel = Math.max(0, user.xp - currentLevelBaseXp);
  const xpProgressPercent = Math.min(100, Math.floor((xpInCurrentLevel / 100) * 100));

  const navItems = [
    { id: 'home', label: t.navHome, icon: Compass },
    { id: 'lessons', label: t.navLessons, icon: BookOpen },
    { id: 'vocab', label: t.navVocab, icon: Zap },
    { id: 'grammar', label: t.navGrammar, icon: Award },
    { id: 'quiz', label: t.navQuiz, icon: Star },
    { id: 'challenge', label: t.navChallenge, icon: Flame, isSpecial: true },
    { id: 'math', label: t.navMath, icon: Calculator, isSecondary: true },
    { id: 'rewards', label: t.navRewards, icon: Award },
    { id: 'leaderboard', label: t.navLeaderboard, icon: Compass },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Logo & Brand */}
          <div
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 p-0.5 shadow-lg shadow-amber-500/25 group-hover:scale-105 transition duration-300">
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center">
                <span className="text-xl sm:text-2xl group-hover:rotate-12 transition transform duration-300">⭐</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-1.5 font-display">
                English Star <span className="text-amber-400">Academy</span>
              </span>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Quick Gamification Stats Center */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Stars Count */}
            <div
              onClick={() => setCurrentTab('rewards')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 hover:bg-amber-400/20 cursor-pointer transition shadow-sm"
              title={t.stars}
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
              <span className="font-extrabold text-sm sm:text-base font-display">{user.stars}</span>
            </div>

            {/* Streak Count */}
            <div
              onClick={() => setCurrentTab('rewards')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 cursor-pointer transition shadow-sm"
              title={t.streak}
            >
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              <span className="font-extrabold text-sm sm:text-base font-display">{user.streak}</span>
              <span className="text-xs text-orange-300 hidden md:inline">{t.streakDays}</span>
            </div>

            {/* Level & XP Mini Bar */}
            <div
              onClick={() => setCurrentTab('profile')}
              className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 cursor-pointer transition"
            >
              <div className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                {user.level}
              </div>
              <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${xpProgressPercent}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-slate-300">{xpProgressPercent}%</span>
            </div>
          </div>

          {/* Right Action Icons: Language, Sound, Admin, Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(prev => !prev)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-semibold text-slate-200 transition"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-bold">{language === 'uz' ? '🇺🇿 UZ' : '🇬🇧 EN'}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 glass-dropdown rounded-2xl shadow-xl border border-slate-700 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => {
                      setLanguage('uz');
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-left transition ${
                      language === 'uz' ? 'text-amber-400 bg-amber-400/10' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>🇺🇿 O‘zbek</span>
                    {language === 'uz' && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-left transition ${
                      language === 'en' ? 'text-amber-400 bg-amber-400/10' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>🇬🇧 English</span>
                    {language === 'en' && <Check className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition ${
                soundEnabled
                  ? 'bg-slate-900 border-slate-700 text-amber-400 hover:border-amber-400/50'
                  : 'bg-slate-900/60 border-slate-800 text-slate-500 hover:text-slate-400'
              }`}
              title={soundEnabled ? 'Sound On' : 'Sound Off'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Admin Shortcut */}
            <button
              onClick={openAdmin}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition"
              title={t.navAdmin}
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* User Profile Avatar */}
            <button
              onClick={() => setCurrentTab('profile')}
              className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 hover:border-amber-400 transition"
              title={t.navProfile}
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-indigo-600 flex items-center justify-center text-sm shadow-inner">
                {user.avatar}
              </div>
              <span className="text-xs font-bold text-slate-200 hidden lg:inline max-w-[80px] truncate">
                {user.username}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Secondary Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1.5 pb-2.5 overflow-x-auto no-scrollbar border-t border-slate-800/40 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                    : item.isSpecial
                    ? 'bg-orange-500/10 text-orange-300 hover:bg-orange-500/20 border border-orange-500/30'
                    : item.isSecondary
                    ? 'text-indigo-300 hover:text-indigo-200 hover:bg-indigo-950/40'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : ''}`} />
                <span>{item.label}</span>
                {item.isSpecial && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-md bg-orange-500 text-white text-[10px] font-extrabold animate-pulse">
                    Daily
                  </span>
                )}
                {item.isSecondary && (
                  <span className="ml-1 text-[10px] text-indigo-400 opacity-80">
                    Mini
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
