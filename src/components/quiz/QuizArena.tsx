import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { QuestionType, QuizQuestion } from '../../types';
import { generatePracticeSession } from '../../data/questionBank';
import { playSound } from '../../utils/audio';
import {
  Sparkles,
  Star,
  Shuffle,
  ChevronRight,
  Flame,
  Award,
  Layers,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export const QuizArena: React.FC = () => {
  const { language, soundEnabled, recordQuizAnswer } = useApp();
  const t = translations[language];

  const [activeFilter, setActiveFilter] = useState<QuestionType | 'mixed'>('mixed');
  const [sessionQuestions, setSessionQuestions] = useState<QuizQuestion[]>(() =>
    generatePracticeSession('mixed', 6)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [sessionScore, setSessionScore] = useState({ correct: 0, total: 0 });
  const [isSessionFinished, setIsSessionFinished] = useState(false);

  const startNewSession = (type: QuestionType | 'mixed') => {
    setActiveFilter(type);
    const newQuestions = generatePracticeSession(type, 6);
    setSessionQuestions(newQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsChecked(false);
    setSessionStreak(0);
    setSessionScore({ correct: 0, total: 0 });
    setIsSessionFinished(false);
    playSound('click', soundEnabled);
  };

  const currentQ = sessionQuestions[currentIndex];

  const handleCheckAnswer = () => {
    if (!currentQ || !selectedOption || isChecked) return;
    setIsChecked(true);

    const isCorrect = selectedOption === currentQ.correctAnswer;
    if (isCorrect) {
      playSound('correct', soundEnabled);
      setSessionStreak(prev => prev + 1);
      setSessionScore(prev => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
      recordQuizAnswer(true, currentQ.rewardStars || 5, currentQ.rewardXp || 10);
    } else {
      playSound('wrong', soundEnabled);
      setSessionStreak(0);
      setSessionScore(prev => ({ ...prev, total: prev.total + 1 }));
      recordQuizAnswer(false, 0, 0);
    }
  };

  const handleNext = () => {
    if (currentIndex < sessionQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsChecked(false);
      playSound('click', soundEnabled);
    } else {
      setIsSessionFinished(true);
      playSound('levelup', soundEnabled);
    }
  };

  const filterTabs: { id: QuestionType | 'mixed'; labelUz: string; labelEn: string; icon: string }[] = [
    { id: 'mixed', labelUz: 'Aralash test', labelEn: 'Mixed Challenge', icon: '🎲' },
    { id: 'translation', labelUz: 'Inglizcha -> O‘zbekcha', labelEn: 'EN to UZ', icon: '🇺🇿' },
    { id: 'word_to_en', labelUz: 'O‘zbekcha -> Inglizcha', labelEn: 'UZ to EN', icon: '🇬🇧' },
    { id: 'fill_blank', labelUz: 'Bo‘sh o‘rinni to‘ldirish', labelEn: 'Fill Blanks', icon: '✍️' },
    { id: 'correct_sentence', labelUz: 'To‘g‘ri gapni tanlash', labelEn: 'Sentence Logic', icon: '✨' },
    { id: 'incorrect_word', labelUz: 'Xatoni topish', labelEn: 'Find the Error', icon: '🔍' },
  ];

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-400/10 border border-purple-400/30 text-purple-300 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.navQuiz}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 font-display">
            {language === 'uz' ? 'Ingliz Tili Test Arenasi' : 'English Quiz Arena'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {language === 'uz'
              ? '5 xil interaktiv test turlari, doimiy yangilanuvchi savollar va yulduzli rag‘bat!'
              : 'Dynamic randomized question engine with 5 distinct question types and instant feedback.'}
          </p>
        </div>

        <button
          onClick={() => startNewSession(activeFilter)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-amber-400 transition"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>{t.btnRandomize}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => startNewSession(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 ring-2 ring-purple-400/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{language === 'uz' ? tab.labelUz : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* ACTIVE QUIZ SESSION */}
      {!isSessionFinished && currentQ ? (
        <div className="space-y-6">
          
          {/* Progress bar & Streak status */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1">
            <span>
              {language === 'uz'
                ? `Savol: ${currentIndex + 1} / ${sessionQuestions.length}`
                : `Question ${currentIndex + 1} of ${sessionQuestions.length}`}
            </span>

            <div className="flex items-center gap-3">
              {sessionStreak > 1 && (
                <div className="flex items-center gap-1 text-orange-400 font-bold animate-bounce">
                  <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
                  <span>{sessionStreak}x Streak!</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>+{currentQ.rewardStars || 5} ⭐</span>
              </div>
            </div>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-amber-400 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / sessionQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Presentation Card */}
          <div className="p-8 rounded-3xl glass-card border border-purple-500/30 text-center space-y-3 relative overflow-hidden shadow-2xl">
            <div className="inline-block text-[11px] font-bold text-purple-400 uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
              {currentQ.category} • {currentQ.difficulty.toUpperCase()}
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white whitespace-pre-line leading-relaxed font-display">
              {currentQ.question}
            </h3>

            {currentQ.questionUz && (
              <p className="text-xs sm:text-sm text-slate-400 italic">
                {currentQ.questionUz}
              </p>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedOption === opt;
              let style = 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-slate-600 hover:bg-slate-850';

              if (isChecked) {
                if (opt === currentQ.correctAnswer) {
                  style = 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold ring-2 ring-emerald-500/30';
                } else if (isSelected) {
                  style = 'bg-rose-500/20 border-rose-400 text-rose-300 font-bold';
                }
              } else if (isSelected) {
                style = 'bg-purple-500/20 border-purple-400 text-purple-200 font-bold ring-2 ring-purple-400/30';
              }

              return (
                <button
                  key={i}
                  disabled={isChecked}
                  onClick={() => setSelectedOption(opt)}
                  className={`p-4 rounded-2xl border text-left text-sm font-semibold transition cursor-pointer flex items-center justify-between ${style}`}
                >
                  <span className="leading-snug">{opt}</span>
                  <span className="w-6 h-6 rounded-lg bg-slate-800/80 text-xs text-slate-400 flex items-center justify-center font-mono shrink-0 ml-2">
                    {String.fromCharCode(65 + i)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feedback Card (Encouraging tone) */}
          {isChecked && (
            <div className={`p-5 rounded-2xl border text-xs sm:text-sm space-y-1.5 animate-in zoom-in-95 duration-200 ${
              selectedOption === currentQ.correctAnswer
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-base">
                {selectedOption === currentQ.correctAnswer ? (
                  <>
                    <span>{t.correctHeading}</span>
                    <span className="text-amber-400">+{currentQ.rewardStars || 5} ⭐</span>
                  </>
                ) : (
                  <>
                    <span>{t.wrongHeading}</span>
                  </>
                )}
              </div>

              <div>
                {t.correctAnswerIs} <strong className="text-amber-300">{currentQ.correctAnswer}</strong>
              </div>

              <div className="text-slate-300 pt-1">
                {language === 'uz' ? currentQ.explanationUz : currentQ.explanation}
              </div>
            </div>
          )}

          {/* Action button */}
          <div className="pt-2">
            {!isChecked ? (
              <button
                disabled={!selectedOption}
                onClick={handleCheckAnswer}
                className={`w-full py-4 rounded-2xl font-bold text-base transition ${
                  selectedOption
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white shadow-lg shadow-purple-500/25 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                {t.btnCheck}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base shadow-lg shadow-emerald-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{currentIndex < sessionQuestions.length - 1 ? t.btnNext : t.btnFinish}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

        </div>
      ) : isSessionFinished ? (
        /* Session Completed Summary Screen */
        <div className="text-center p-8 sm:p-10 rounded-3xl glass-card border border-purple-500/30 space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-amber-400 mx-auto flex items-center justify-center text-5xl shadow-xl shadow-purple-500/30 animate-bounce">
            🏆
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-black text-white font-display">
              {language === 'uz' ? 'Sinov Muvaffaqiyatli Yakunlandi!' : 'Quiz Session Conquered!'}
            </h3>
            <p className="text-sm text-slate-300">
              {language === 'uz'
                ? `Siz ${sessionScore.total} ta savoldan ${sessionScore.correct} tasiga to‘g‘ri javob berdingiz!`
                : `You scored ${sessionScore.correct} out of ${sessionScore.total} questions correctly!`}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-sm mx-auto flex justify-around text-center">
            <div>
              <div className="text-xs text-slate-400">{t.accuracy}</div>
              <div className="text-xl font-bold text-amber-400 font-display mt-1">
                {Math.round((sessionScore.correct / Math.max(1, sessionScore.total)) * 100)}%
              </div>
            </div>
            <div className="w-px bg-slate-700" />
            <div>
              <div className="text-xs text-slate-400">{t.stars}</div>
              <div className="text-xl font-bold text-emerald-400 font-display mt-1">
                +{sessionScore.correct * 5} ⭐
              </div>
            </div>
          </div>

          <button
            onClick={() => startNewSession(activeFilter)}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-slate-950 font-black text-base shadow-lg shadow-amber-400/25 transition cursor-pointer"
          >
            {language === 'uz' ? 'Yangi savollar to‘plami' : 'Start Fresh Practice'}
          </button>
        </div>
      ) : null}

    </div>
  );
};
