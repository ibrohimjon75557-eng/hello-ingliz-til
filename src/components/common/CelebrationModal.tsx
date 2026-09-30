import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { Award, Star, Sparkles, X, ChevronRight } from 'lucide-react';

export const CelebrationModal: React.FC = () => {
  const {
    language,
    starToast,
    levelUpModal,
    closeLevelUpModal,
    newAchievementUnlocked,
    closeAchievementToast
  } = useApp();
  const t = translations[language];

  return (
    <>
      {/* Star Earned Floating Pill Notification */}
      {starToast && starToast.show && (
        <div className="fixed top-20 right-6 z-50 animate-bounce pointer-events-none">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-bold shadow-lg shadow-amber-500/30 border border-amber-200">
            <span className="text-xl animate-spin">⭐</span>
            <span className="text-sm font-extrabold tracking-wide">{starToast.message}</span>
            <Sparkles className="w-4 h-4 text-amber-900 animate-pulse" />
          </div>
        </div>
      )}

      {/* Achievement Unlocked Popup */}
      {newAchievementUnlocked && (
        <div className="fixed bottom-24 right-6 z-50 max-w-sm w-full p-4 rounded-2xl glass-dropdown border border-amber-400/40 shadow-2xl shadow-amber-500/20 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-2xl shadow-md shrink-0">
              {newAchievementUnlocked.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                {language === 'uz' ? 'Yutuq ochildi!' : 'Achievement Unlocked!'}
              </div>
              <h4 className="font-bold text-white text-sm truncate mt-0.5">
                {language === 'uz' ? newAchievementUnlocked.titleUz : newAchievementUnlocked.titleEn}
              </h4>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                {language === 'uz' ? newAchievementUnlocked.descUz : newAchievementUnlocked.descEn}
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs font-bold text-amber-300">
                <span>+{newAchievementUnlocked.rewardStars} ⭐</span>
                <span>•</span>
                <span>+{newAchievementUnlocked.rewardXp} XP</span>
              </div>
            </div>
            <button
              onClick={closeAchievementToast}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Grand Level-Up Modal */}
      {levelUpModal && levelUpModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-md w-full p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 border-2 border-amber-400/60 shadow-2xl shadow-indigo-500/30 text-center overflow-hidden">
            {/* Glowing background halo */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-200 p-1 shadow-xl shadow-amber-500/30 mb-4 animate-bounce">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-4xl">
                  🏆
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold text-xs uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                {t.levelUpTitle}
              </div>

              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 mb-2">
                {language === 'uz' ? `DARAJA ${levelUpModal.newLevel}!` : `LEVEL ${levelUpModal.newLevel}!`}
              </h2>

              <p className="text-sm text-slate-300 max-w-xs mb-6">
                {t.levelUpSub}
              </p>

              <div className="w-full p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 mb-6 flex justify-around text-center">
                <div>
                  <div className="text-xs text-slate-400">{language === 'uz' ? 'Yangi nishon' : 'New Tier'}</div>
                  <div className="text-sm font-bold text-amber-300 mt-1 flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    Star Scholar
                  </div>
                </div>
                <div className="w-px bg-slate-700" />
                <div>
                  <div className="text-xs text-slate-400">{language === 'uz' ? 'Qo‘shimcha' : 'Bonus'}</div>
                  <div className="text-sm font-bold text-emerald-400 mt-1">
                    +50 ⭐ & +100 XP
                  </div>
                </div>
              </div>

              <button
                onClick={closeLevelUpModal}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/25 transition transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{t.btnContinue}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
