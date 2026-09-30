import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { playSound } from '../../utils/audio';
import {
  User,
  Star,
  Flame,
  Award,
  BookOpen,
  Zap,
  Target,
  Clock,
  Edit2,
  Check,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { language, soundEnabled, user, updateUser, achievements, resetAllData } = useApp();
  const t = translations[language];

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user.username);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const avatars = ['⭐', '🦁', '🚀', '🦉', '🦊', '🐯', '🌟', '🦄', '🎓', '💎', '🔥', '🌸'];

  const handleSaveName = () => {
    if (nameInput.trim()) {
      updateUser({ username: nameInput.trim() });
      setIsEditingName(false);
      playSound('correct', soundEnabled);
    }
  };

  const handleSelectAvatar = (av: string) => {
    updateUser({ avatar: av });
    setShowAvatarPicker(false);
    playSound('click', soundEnabled);
  };

  const accuracyRate = user.stats.totalQuestionsAnswered > 0
    ? Math.round((user.stats.totalCorrectAnswers / user.stats.totalQuestionsAnswered) * 100)
    : 100;

  // XP Progress in Level
  const currentBase = (user.level - 1) * 100;
  const currentLevelXp = Math.max(0, user.xp - currentBase);
  const levelProgress = Math.min(100, Math.floor((currentLevelXp / 100) * 100));

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      
      {/* Profile Header Hero */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-indigo-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          
          {/* Avatar with edit button */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-indigo-600 to-purple-600 p-1 shadow-xl">
              <div className="w-full h-full rounded-[22px] bg-slate-950 flex items-center justify-center text-5xl">
                {user.avatar}
              </div>
            </div>
            <button
              onClick={() => setShowAvatarPicker(prev => !prev)}
              className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-md transition"
              title="Change Avatar"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              {!isEditingName ? (
                <>
                  <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                    {user.username}
                  </h2>
                  <button
                    onClick={() => { setNameInput(user.username); setIsEditingName(true); }}
                    className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="px-3 py-1 rounded-xl bg-slate-900 border border-amber-400 text-white font-bold text-lg focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-1.5 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                Level {user.level} Scholar
              </span>
              <span className="text-slate-400">
                {language === 'uz' ? 'Qo‘shilgan sana:' : 'Joined:'} {user.joinedDate}
              </span>
            </div>

            {/* Level XP Bar */}
            <div className="space-y-1.5 pt-2 max-w-xs">
              <div className="flex justify-between text-xs text-slate-300 font-medium">
                <span>Level {user.level}</span>
                <span>{currentLevelXp} / 100 XP</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Total Stars & Streak Highlights */}
        <div className="flex gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center min-w-[90px]">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400 mx-auto mb-1" />
            <div className="text-xl font-black text-amber-400 font-display">{user.stars}</div>
            <div className="text-[10px] text-slate-400 font-semibold">{t.stars}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center min-w-[90px]">
            <Flame className="w-5 h-5 fill-orange-500 text-orange-500 mx-auto mb-1" />
            <div className="text-xl font-black text-orange-400 font-display">{user.streak}</div>
            <div className="text-[10px] text-slate-400 font-semibold">{t.streakDays}</div>
          </div>
        </div>
      </div>

      {/* Avatar Picker Modal */}
      {showAvatarPicker && (
        <div className="p-6 rounded-3xl glass-card border border-amber-400/40 space-y-3 animate-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-white text-sm">
              {language === 'uz' ? 'Yangi avatar tanlang:' : 'Choose your avatar:'}
            </h4>
            <button
              onClick={() => setShowAvatarPicker(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {avatars.map((av) => (
              <button
                key={av}
                onClick={() => handleSelectAvatar(av)}
                className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center transition transform hover:scale-110 cursor-pointer ${
                  user.avatar === av
                    ? 'bg-amber-400 text-slate-950 ring-2 ring-white shadow-lg'
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                {av}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Learning Statistics Dashboard */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2 font-display">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>{language === 'uz' ? 'O‘quv Ko‘rsatkichlari & Statistika' : 'Learning Statistics'}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl glass-card border border-slate-800 space-y-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <div className="text-2xl font-black text-white font-display">
              {user.learnedWordIds.length}
            </div>
            <div className="text-xs text-slate-400">{t.wordsLearned}</div>
          </div>

          <div className="p-5 rounded-3xl glass-card border border-slate-800 space-y-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <div className="text-2xl font-black text-white font-display">
              {user.completedLessonIds.length}
            </div>
            <div className="text-xs text-slate-400">{t.lessonsCompleted}</div>
          </div>

          <div className="p-5 rounded-3xl glass-card border border-slate-800 space-y-2">
            <Target className="w-5 h-5 text-emerald-400" />
            <div className="text-2xl font-black text-emerald-400 font-display">
              {accuracyRate}%
            </div>
            <div className="text-xs text-slate-400">{t.accuracy}</div>
          </div>

          <div className="p-5 rounded-3xl glass-card border border-slate-800 space-y-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <div className="text-2xl font-black text-white font-display">
              {user.stats.totalTimeSpentMinutes} m
            </div>
            <div className="text-xs text-slate-400">{language === 'uz' ? 'O‘quv vaqti' : 'Learning Time'}</div>
          </div>
        </div>
      </div>

      {/* Visual Progress Breakdown */}
      <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
        <h4 className="font-bold text-white text-base">
          {language === 'uz' ? 'Akademiya Bo‘yicha Rivojlanish' : 'Academy Progress Breakdown'}
        </h4>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>{t.btnEnglishLessons} (8 lessons)</span>
              <span>{Math.round((user.completedLessonIds.length / 8) * 100)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all"
                style={{ width: `${(user.completedLessonIds.length / 8) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>{t.btnGrammar} (13 topics)</span>
              <span>{Math.round((user.completedGrammarIds.length / 13) * 100)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${(user.completedGrammarIds.length / 13) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>{language === 'uz' ? 'Matematika mashqlari' : 'Math Challenges'}</span>
              <span>{user.stats.mathQuestionsSolved} {language === 'uz' ? 'yechildi' : 'solved'}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${Math.min(100, user.stats.mathQuestionsSolved * 10)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reset Demo Data Action */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={() => {
            if (window.confirm(language === 'uz' ? 'Barcha ma’lumotlarni dastlabki holatga qaytarmoqchimisiz?' : 'Are you sure you want to reset all demo data?')) {
              resetAllData();
            }
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.adminResetData}</span>
        </button>
      </div>

    </div>
  );
};
