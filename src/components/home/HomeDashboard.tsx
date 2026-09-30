import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { speakWord } from '../../utils/audio';
import {
  BookOpen,
  Zap,
  Award,
  Flame,
  Star,
  Calculator,
  ChevronRight,
  Sparkles,
  Volume2,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface HomeDashboardProps {
  onNavigate: (tab: string) => void;
  onOpenDailyChallenge: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onNavigate,
  onOpenDailyChallenge
}) => {
  const { language, user, vocabulary, completeLesson } = useApp();
  const t = translations[language];

  // Daily streak days indicator (last 7 days)
  const daysOfWeek = language === 'uz'
    ? ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const today = new Date().toISOString().split('T')[0];
  const isChallengeDone = user.completedDailyChallengeDate === today;

  // Level XP calculations
  const xpInCurrentLevel = Math.max(0, user.xp - (user.level - 1) * 100);
  const xpNeeded = 100;
  const progressPercent = Math.min(100, Math.floor((xpInCurrentLevel / xpNeeded) * 100));

  // Quick word of the day
  const featuredWord = vocabulary[0] || {
    word: 'Brilliant',
    phonetic: '/ˈbrɪl.jənt/',
    uzbek: 'Aql bovar qilmas, juda aqlli',
    exampleEn: 'She gave a brilliant presentation in English.',
    exampleUz: 'U ingliz tilida ajoyib taqdimot qildi.'
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 border border-indigo-500/20 p-6 sm:p-10 shadow-2xl">
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>English Star Academy</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display leading-tight">
              {t.greeting}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.greetingSub}
            </p>

            {/* Quick Action Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('lessons')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-400/25 transition transform active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>{t.btnEnglishLessons}</span>
                <ArrowRight className="w-4 h-4 font-bold" />
              </button>

              <button
                onClick={onOpenDailyChallenge}
                className="px-5 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-orange-500/40 text-orange-300 hover:text-white font-bold text-sm transition transform active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-orange-400" />
                <span>{t.btnDailyChallenge}</span>
                {isChallengeDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold">
                    +25 ⭐
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Quick User Level & Stats Card */}
          <div className="w-full md:w-auto shrink-0 p-5 rounded-2xl glass-card border border-white/10 min-w-[280px] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-indigo-600 flex items-center justify-center text-2xl shadow-lg">
                  {user.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{user.username}</h3>
                  <p className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    Level {user.level} Star Learner
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 font-medium">{t.stars}</span>
                <div className="text-xl font-black text-amber-400 font-display">
                  {user.stars} ⭐
                </div>
              </div>
            </div>

            {/* XP Level Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300 font-medium">
                <span>{t.level} {user.level}</span>
                <span>{xpInCurrentLevel} / {xpNeeded} XP</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden relative border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Streak Status */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-1.5 text-orange-400 font-bold">
                <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
                <span>{user.streak} {t.streakDays} {t.streak.toLowerCase()}</span>
              </div>
              <span className="text-slate-400 font-semibold">{user.stats.totalCorrectAnswers} {language === 'uz' ? 'to‘g‘ri javob' : 'correct'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Dashboard Navigation Cards (English dominates) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 font-display">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>{language === 'uz' ? 'Ingliz Tili O‘quv Bo‘limlari' : 'English Learning Core'}</span>
          </h2>
          <span className="text-xs text-slate-400 hidden sm:inline">
            {language === 'uz' ? 'O‘zingizga mos bo‘limni tanlang' : 'Choose your training path'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: English Lessons */}
          <div
            onClick={() => onNavigate('lessons')}
            className="group relative p-6 rounded-3xl bg-gradient-to-b from-indigo-900/60 to-slate-900/90 border border-indigo-500/30 hover:border-indigo-400/60 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-indigo-500/20 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-3xl group-hover:scale-110 transition duration-300 shadow-md">
                📚
              </div>
              <div className="inline-block text-[11px] font-bold text-indigo-400 tracking-wider uppercase">
                A1 • A2 • B1 • B2
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
                {t.btnEnglishLessons}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'uz'
                  ? 'Boshlang‘ichdan yuqorigacha bosqichma-bosqich tizimli darslar va xaritalar.'
                  : 'Structured CEFR courses with interactive slides, dialogues, and star rewards.'}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-indigo-300 border-t border-slate-800/80 mt-4">
              <span>{user.completedLessonIds.length} / 8 {language === 'uz' ? 'tugatildi' : 'completed'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 2: Vocabulary */}
          <div
            onClick={() => onNavigate('vocab')}
            className="group relative p-6 rounded-3xl bg-gradient-to-b from-amber-950/40 to-slate-900/90 border border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-amber-500/20 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl group-hover:scale-110 transition duration-300 shadow-md">
                ⚡
              </div>
              <div className="inline-block text-[11px] font-bold text-amber-400 tracking-wider uppercase">
                17 {language === 'uz' ? 'mavzu' : 'Categories'}
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
                {t.btnVocabulary}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'uz'
                  ? 'Interaktiv kartalar, talaffuz (audio), o‘rganilgan so‘zlarni kuzatish.'
                  : 'Smart flashcards with audio pronunciation, example sentences, and review tracking.'}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-amber-300 border-t border-slate-800/80 mt-4">
              <span>{user.learnedWordIds.length} {t.wordsLearned.toLowerCase()}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 3: Grammar */}
          <div
            onClick={() => onNavigate('grammar')}
            className="group relative p-6 rounded-3xl bg-gradient-to-b from-emerald-950/40 to-slate-900/90 border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-emerald-500/20 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl group-hover:scale-110 transition duration-300 shadow-md">
                🧠
              </div>
              <div className="inline-block text-[11px] font-bold text-emerald-400 tracking-wider uppercase">
                13 {language === 'uz' ? 'qoida darslari' : 'Rules'}
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
                {t.btnGrammar}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'uz'
                  ? 'Present Simple, To Be, zamonlar va predloglarning oson tushuntirishlari.'
                  : 'Clear bite-sized explanations, real-world examples, and quick verification quizzes.'}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-emerald-300 border-t border-slate-800/80 mt-4">
              <span>{user.completedGrammarIds.length} / 13 {language === 'uz' ? 'o‘zlashtirildi' : 'mastered'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 4: Quizzes */}
          <div
            onClick={() => onNavigate('quiz')}
            className="group relative p-6 rounded-3xl bg-gradient-to-b from-purple-950/40 to-slate-900/90 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-purple-500/20 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-3xl group-hover:scale-110 transition duration-300 shadow-md">
                🎯
              </div>
              <div className="inline-block text-[11px] font-bold text-purple-400 tracking-wider uppercase">
                5 {language === 'uz' ? 'xil test turlari' : 'Quiz Types'}
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
                {t.navQuiz}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'uz'
                  ? 'Tarjima, bo‘sh joyni to‘ldirish, xatoni topish va tasodifiy savollar tizimi.'
                  : 'Smart dynamic question selector with instant star feedback and celebratory rewards.'}
              </p>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-purple-300 border-t border-slate-800/80 mt-4">
              <span>{user.stats.totalQuestionsAnswered} {language === 'uz' ? 'savol yechildi' : 'solved'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

        </div>
      </section>

      {/* Word of the Day + Streak Calendar + Mini Math Shortcut */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Word of the Day Interactive Card */}
        <div className="p-6 rounded-3xl glass-card border border-amber-400/20 relative overflow-hidden flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {language === 'uz' ? 'Kunning Inglizcha So‘zi' : 'Word of the Day'}
            </span>
            <button
              onClick={() => speakWord(featuredWord.word)}
              className="p-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/25 text-amber-300 transition"
              title="Pronounce"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-baseline gap-2.5">
              <h3 className="text-2xl font-black text-white tracking-wide font-display">
                {featuredWord.word}
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {featuredWord.phonetic}
              </span>
            </div>
            <p className="text-amber-300 font-bold text-sm">
              {featuredWord.uzbek}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs space-y-1">
            <div className="text-slate-200 font-medium">"{featuredWord.exampleEn}"</div>
            <div className="text-slate-400 italic">"{featuredWord.exampleUz}"</div>
          </div>

          <button
            onClick={() => onNavigate('vocab')}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-300 transition flex items-center justify-center gap-1.5"
          >
            <span>{language === 'uz' ? 'Barcha so‘zlarni ko‘rish' : 'Explore All Vocabulary'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 7-Day Streak Calendar Progress */}
        <div className="p-6 rounded-3xl glass-card border border-orange-500/20 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-orange-500" />
              {t.streak}
            </span>
            <span className="text-xs font-extrabold text-white px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30">
              {user.streak} {t.streakDays}
            </span>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-1">
              {language === 'uz' ? 'Har kunlik uzluksiz o‘rganish' : 'Consistent Daily Habit'}
            </h4>
            <p className="text-xs text-slate-400">
              {language === 'uz'
                ? '7 kunlik alanga bonusiga erishing va 50 ⭐ qo‘shimcha yulduz oling.'
                : 'Maintain your streak for 7 days to earn +50 ⭐ bonus stars.'}
            </p>
          </div>

          {/* 7 Day Badges */}
          <div className="grid grid-cols-7 gap-1.5 pt-2">
            {daysOfWeek.map((dayName, idx) => {
              const isPastStreak = idx < (user.streak % 7 || 7);
              return (
                <div
                  key={idx}
                  className={`p-2 rounded-xl text-center transition flex flex-col items-center gap-1 ${
                    isPastStreak
                      ? 'bg-gradient-to-b from-orange-500/20 to-amber-500/10 border border-orange-500/40 text-orange-300'
                      : 'bg-slate-800/40 border border-slate-800 text-slate-500'
                  }`}
                >
                  <span className="text-[10px] font-bold">{dayName}</span>
                  <span className="text-xs">
                    {isPastStreak ? '🔥' : '⚪'}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => onNavigate('rewards')}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-orange-300 transition flex items-center justify-center gap-1.5"
          >
            <span>{t.dailyRewardTitle}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Small Secondary Math Practice Card */}
        <div className="p-6 rounded-3xl glass-card border border-blue-500/20 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              {t.secMathTitle}
            </span>
            <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
              {language === 'uz' ? 'Qo‘shimcha' : 'Mini Practice'}
            </span>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-white text-base">
              {language === 'uz' ? 'Raqamlar bilan miyani charxlash' : 'Dynamic Math Sprint'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.secMathDesc}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-lg">🧮</span>
              <div>
                <div className="text-white font-bold">{user.stats.mathQuestionsSolved} {language === 'uz' ? 'masala yechildi' : 'solved'}</div>
                <div className="text-[10px] text-blue-300">+3 ⭐ {language === 'uz' ? 'har bir to‘g‘ri javobga' : 'per answer'}</div>
              </div>
            </div>
            <div className="text-xs font-mono font-bold text-blue-400">
              7+8=?
            </div>
          </div>

          <button
            onClick={() => onNavigate('math')}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600/30 to-indigo-600/30 hover:from-blue-600/50 hover:to-indigo-600/50 border border-blue-500/30 text-xs font-bold text-blue-200 transition flex items-center justify-center gap-1.5"
          >
            <span>{t.btnMathPractice}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </section>

    </div>
  );
};
