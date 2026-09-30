import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { mockLeaderboardPeers } from '../../data/leaderboardData';
import { LeaderboardUser } from '../../types';
import {
  Trophy,
  Star,
  Flame,
  Medal,
  Crown,
  Sparkles
} from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const { language, user } = useApp();
  const t = translations[language];

  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');

  // Inject current user into ranking list
  const rankedUsers = useMemo(() => {
    const currentUserEntry: LeaderboardUser = {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      level: user.level,
      stars: user.stars,
      xp: user.xp,
      streak: user.streak,
      badge: 'You',
      tier: user.stars > 500 ? 'Diamond' : user.stars > 250 ? 'Gold' : user.stars > 100 ? 'Silver' : 'Bronze',
      isCurrentUser: true
    };

    const multiplier = timeframe === 'weekly' ? 0.35 : timeframe === 'monthly' ? 0.7 : 1;

    const list = [
      ...mockLeaderboardPeers.map(p => ({
        ...p,
        stars: Math.floor(p.stars * multiplier),
        xp: Math.floor(p.xp * multiplier)
      })),
      {
        ...currentUserEntry,
        stars: Math.floor(currentUserEntry.stars * multiplier),
        xp: Math.floor(currentUserEntry.xp * multiplier)
      }
    ];

    list.sort((a, b) => b.stars - a.stars);
    return list;
  }, [user, timeframe]);

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold text-xs">
          <Trophy className="w-3.5 h-3.5" />
          <span>{t.navLeaderboard}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
          {language === 'uz' ? 'Star Akademiyasi Chempionlari' : 'Academy Champions Leaderboard'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          {language === 'uz'
            ? 'Ko‘proq darslar o‘ting, yulduzlar to‘plang va yuqori ligaga chiqing!'
            : 'Compete with fellow English learners, climb leagues, and showcase your stars!'}
        </p>
      </div>

      {/* Timeframe tabs */}
      <div className="flex p-1 rounded-2xl bg-slate-900 border border-slate-800 max-w-sm mx-auto">
        <button
          onClick={() => setTimeframe('weekly')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            timeframe === 'weekly' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          {language === 'uz' ? 'Haftalik' : 'Weekly'}
        </button>
        <button
          onClick={() => setTimeframe('monthly')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            timeframe === 'monthly' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          {language === 'uz' ? 'Oylik' : 'Monthly'}
        </button>
        <button
          onClick={() => setTimeframe('allTime')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            timeframe === 'allTime' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          {language === 'uz' ? 'Barcha vaqt' : 'All Time'}
        </button>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-3 items-end pt-4 pb-2">
        {/* 2nd Place */}
        {rankedUsers[1] && (
          <div className="p-4 rounded-3xl glass-card border border-slate-600 text-center flex flex-col items-center space-y-2">
            <span className="text-2xl">🥈</span>
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl shadow">
              {rankedUsers[1].avatar}
            </div>
            <div className="font-bold text-white text-xs truncate max-w-full">
              {rankedUsers[1].username}
            </div>
            <div className="text-xs font-extrabold text-amber-300 font-display">
              {rankedUsers[1].stars} ⭐
            </div>
          </div>
        )}

        {/* 1st Place */}
        {rankedUsers[0] && (
          <div className="p-5 rounded-3xl bg-gradient-to-b from-amber-500/20 to-slate-900 border-2 border-amber-400 text-center flex flex-col items-center space-y-2 shadow-xl shadow-amber-500/20 transform -translate-y-2">
            <span className="text-3xl animate-bounce">👑</span>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-3xl shadow-lg text-slate-950 font-bold">
              {rankedUsers[0].avatar}
            </div>
            <div className="font-black text-amber-300 text-sm truncate max-w-full">
              {rankedUsers[0].username}
            </div>
            <div className="text-sm font-black text-amber-400 font-display">
              {rankedUsers[0].stars} ⭐
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {rankedUsers[2] && (
          <div className="p-4 rounded-3xl glass-card border border-amber-800/60 text-center flex flex-col items-center space-y-2">
            <span className="text-2xl">🥉</span>
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl shadow">
              {rankedUsers[2].avatar}
            </div>
            <div className="font-bold text-white text-xs truncate max-w-full">
              {rankedUsers[2].username}
            </div>
            <div className="text-xs font-extrabold text-amber-300 font-display">
              {rankedUsers[2].stars} ⭐
            </div>
          </div>
        )}
      </div>

      {/* List Table */}
      <div className="space-y-2 pt-2">
        {rankedUsers.map((item, index) => {
          const rank = index + 1;
          const isMe = item.isCurrentUser;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border flex items-center justify-between transition ${
                isMe
                  ? 'bg-amber-400/15 border-amber-400/60 ring-2 ring-amber-400/30 shadow-lg'
                  : 'glass-card border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 text-center font-black text-sm font-mono text-slate-400">
                  #{rank}
                </span>

                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xl shadow">
                  {item.avatar}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm ${isMe ? 'text-amber-300' : 'text-white'}`}>
                      {item.username}
                    </span>
                    {isMe && (
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black">
                        {language === 'uz' ? 'SIZ' : 'YOU'}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>Level {item.level}</span>
                    <span>•</span>
                    <span className="text-orange-400 font-medium">🔥 {item.streak} d</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-black text-sm text-amber-400 font-display">
                  {item.stars} ⭐
                </div>
                <div className="text-[11px] text-slate-400">
                  {item.xp} XP
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
