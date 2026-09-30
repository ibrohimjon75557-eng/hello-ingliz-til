import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import {
  Gift,
  Star,
  Flame,
  Award,
  CheckCircle2,
  Lock,
  Sparkles,
  Calendar
} from 'lucide-react';

export const RewardsPage: React.FC = () => {
  const { language, user, achievements, claimDailyReward } = useApp();
  const t = translations[language];

  const today = new Date().toISOString().split('T')[0];
  const isAlreadyClaimedToday = user.lastDailyRewardClaimDate === today;

  const rewardCalendarDays = [
    { day: 1, stars: 5, icon: '🎁' },
    { day: 2, stars: 10, icon: '🎁' },
    { day: 3, stars: 15, icon: '🎁' },
    { day: 4, stars: 20, icon: '🎁' },
    { day: 5, stars: 25, icon: '🎁' },
    { day: 6, stars: 30, icon: '🎁' },
    { day: 7, stars: 50, icon: '👑' },
  ];

  const handleClaim = () => {
    claimDailyReward();
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="max-w-2xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold text-xs">
          <Gift className="w-3.5 h-3.5" />
          <span>{t.navRewards}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
          {t.dailyRewardTitle}
        </h2>
        <p className="text-sm text-slate-300">
          {t.dailyRewardDesc}
        </p>
      </div>

      {/* 7-Day Reward Calendar Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-indigo-950/60 border border-amber-400/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {language === 'uz' ? 'Kunlik Mukofotlar Zanjiri' : 'Daily Check-in Chain'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {language === 'uz' ? `${user.dailyRewardDay}-kunlik sovg‘a tayyor!` : `Day ${user.dailyRewardDay} reward waiting!`}
            </h3>
          </div>

          <button
            disabled={isAlreadyClaimedToday}
            onClick={handleClaim}
            className={`px-6 py-3 rounded-2xl font-black text-sm transition transform flex items-center gap-2 cursor-pointer ${
              !isAlreadyClaimedToday
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-slate-950 shadow-lg shadow-amber-400/30 active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>{isAlreadyClaimedToday ? t.btnClaimed : t.btnClaim}</span>
          </button>
        </div>

        {/* 7 Day Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {rewardCalendarDays.map((item) => {
            const isClaimedPast = item.day < user.dailyRewardDay;
            const isTodayTarget = item.day === user.dailyRewardDay;

            let cardStyle = 'bg-slate-900/60 border-slate-800 text-slate-500';
            if (isTodayTarget) {
              cardStyle = isAlreadyClaimedToday
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-amber-400/15 border-amber-400/60 text-amber-300 ring-2 ring-amber-400/40 animate-pulse';
            } else if (isClaimedPast) {
              cardStyle = 'bg-slate-800/60 border-slate-700 text-slate-400 opacity-75';
            }

            return (
              <div
                key={item.day}
                className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-between min-h-[110px] transition ${cardStyle}`}
              >
                <div className="text-[11px] font-bold">
                  {language === 'uz' ? `${item.day}-kun` : `Day ${item.day}`}
                </div>

                <div className="text-2xl my-1">
                  {isClaimedPast ? '✅' : item.icon}
                </div>

                <div className="text-xs font-black flex items-center gap-1 font-display">
                  <Star className="w-3 h-3 fill-current" />
                  <span>+{item.stars}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Streak Milestones */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2 font-display">
          <Flame className="w-5 h-5 text-orange-500" />
          <span>{language === 'uz' ? 'Alanga Ketma-ketligi (Streak)' : 'Streak Milestones'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl glass-card border border-orange-500/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-2xl">
              🔥
            </div>
            <div>
              <div className="text-xs text-orange-400 font-bold">{t.streak}</div>
              <div className="text-2xl font-black text-white font-display">
                {user.streak} {t.streakDays}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-3xl glass-card border border-amber-500/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl">
              ⭐
            </div>
            <div>
              <div className="text-xs text-amber-400 font-bold">{t.stars}</div>
              <div className="text-2xl font-black text-white font-display">
                {user.stars} ⭐
              </div>
            </div>
          </div>

          <div className="p-5 rounded-3xl glass-card border border-indigo-500/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-2xl">
              🏆
            </div>
            <div>
              <div className="text-xs text-indigo-400 font-bold">{t.level} & XP</div>
              <div className="text-2xl font-black text-white font-display">
                Level {user.level} ({user.xp} XP)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 font-display">
            <Award className="w-5 h-5 text-amber-400" />
            <span>{language === 'uz' ? 'Yutuqlar va Nishonlar' : 'Academy Achievements'}</span>
          </h3>
          <span className="text-xs text-slate-400 font-bold">
            {user.unlockedAchievementIds.length} / {achievements.length} {language === 'uz' ? 'ochildi' : 'unlocked'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => {
            const isUnlocked = user.unlockedAchievementIds.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-5 rounded-3xl border transition duration-300 flex items-start gap-4 ${
                  isUnlocked
                    ? 'glass-card border-amber-400/40 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/40 border-slate-800 opacity-60'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-md ${
                  isUnlocked
                    ? 'bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {isUnlocked ? ach.icon : '🔒'}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-bold text-sm truncate ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                      {language === 'uz' ? ach.titleUz : ach.titleEn}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {language === 'uz' ? ach.descUz : ach.descEn}
                  </p>

                  <div className="flex items-center gap-3 pt-1 text-[11px] font-bold text-amber-300">
                    <span>+{ach.rewardStars} ⭐</span>
                    <span>•</span>
                    <span>+{ach.rewardXp} XP</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
