import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { generateDailyChallengeSet } from '../../data/questionBank';
import { QuizQuestion } from '../../types';
import { playSound } from '../../utils/audio';
import {
  Flame,
  Star,
  CheckCircle,
  X,
  ChevronRight,
  Sparkles,
  Trophy
} from 'lucide-react';

interface DailyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({ isOpen, onClose }) => {
  const { language, soundEnabled, user, completeDailyChallenge } = useApp();
  const t = translations[language];

  const today = new Date().toISOString().split('T')[0];
  const isAlreadyCompletedToday = user.completedDailyChallengeDate === today;

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Generate randomized challenge set on open
  useEffect(() => {
    if (isOpen) {
      setQuestions(generateDailyChallengeSet());
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsChecked(false);
      setScore(0);
      setIsFinished(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];

  const handleCheck = () => {
    if (!currentQ || !selectedOption || isChecked) return;
    setIsChecked(true);

    const isCorrect = selectedOption === currentQ.correctAnswer;
    if (isCorrect) {
      playSound('correct', soundEnabled);
      setScore(prev => prev + 1);
    } else {
      playSound('wrong', soundEnabled);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsChecked(false);
      playSound('click', soundEnabled);
    } else {
      // Completed challenge!
      if (!isAlreadyCompletedToday) {
        completeDailyChallenge(25, 50);
      }
      setIsFinished(true);
      playSound('levelup', soundEnabled);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-2xl w-full rounded-3xl glass-dropdown border border-orange-500/40 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-xl">
              🔥
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                <span>{t.challengeTitle}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30">
                  {today}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {t.challengeDesc}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 flex-1 overflow-y-auto space-y-6">
          
          {/* Already completed today notice */}
          {isAlreadyCompletedToday && !isFinished && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{t.challengeCompletedToday}</span>
            </div>
          )}

          {!isFinished && currentQ ? (
            <div className="space-y-5">
              
              {/* Progress */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>
                  {language === 'uz' ? `Savol: ${currentIndex + 1} / ${questions.length}` : `Question ${currentIndex + 1} of ${questions.length}`}
                </span>
                <span className="text-orange-400 font-bold">
                  {currentQ.category}
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-2">
                <h4 className="text-lg sm:text-xl font-bold text-white font-display">
                  {currentQ.question}
                </h4>
                {currentQ.questionUz && (
                  <p className="text-xs text-slate-400 italic">{currentQ.questionUz}</p>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt, i) => {
                  const isSelected = selectedOption === opt;
                  let style = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-600';

                  if (isChecked) {
                    if (opt === currentQ.correctAnswer) {
                      style = 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold';
                    } else if (isSelected) {
                      style = 'bg-rose-500/20 border-rose-400 text-rose-300 font-bold';
                    }
                  } else if (isSelected) {
                    style = 'bg-orange-500/20 border-orange-400 text-orange-300 font-bold';
                  }

                  return (
                    <button
                      key={i}
                      disabled={isChecked}
                      onClick={() => setSelectedOption(opt)}
                      className={`p-4 rounded-2xl border text-left text-sm font-semibold transition cursor-pointer ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isChecked && (
                <div className={`p-4 rounded-2xl border text-xs space-y-1 animate-in zoom-in-95 duration-150 ${
                  selectedOption === currentQ.correctAnswer
                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
                }`}>
                  <div className="font-bold text-sm">
                    {selectedOption === currentQ.correctAnswer ? t.correctHeading : t.wrongHeading}
                  </div>
                  <div>{language === 'uz' ? currentQ.explanationUz : currentQ.explanation}</div>
                </div>
              )}

            </div>
          ) : isFinished ? (
            /* Finished screen */
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 mx-auto flex items-center justify-center text-4xl shadow-xl shadow-orange-500/30 animate-bounce">
                🌟
              </div>
              <h3 className="text-2xl font-black text-white font-display">
                {language === 'uz' ? 'Kunlik Sinov Muvaffaqiyatli Bajarildi!' : 'Daily Challenge Complete!'}
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                {language === 'uz'
                  ? `Siz 10 ta savoldan ${score} tasini to‘g‘ri topdingiz.`
                  : `You correctly answered ${score} out of 10 challenge questions.`}
              </p>

              <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-300 font-extrabold text-sm max-w-xs mx-auto">
                {isAlreadyCompletedToday ? (
                  <span>Bugungi bonus avvalroq olingan edi!</span>
                ) : (
                  <span>+25 ⭐ Yulduz va +50 XP to‘plandi!</span>
                )}
              </div>
            </div>
          ) : null}

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end">
          {!isFinished ? (
            <>
              {!isChecked ? (
                <button
                  disabled={!selectedOption}
                  onClick={handleCheck}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm transition ${
                    selectedOption
                      ? 'bg-orange-500 hover:bg-orange-400 text-slate-950 shadow-md cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {t.btnCheck}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{currentIndex < questions.length - 1 ? t.btnNext : t.btnFinish}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 font-black text-sm shadow-lg transition cursor-pointer"
            >
              {t.btnContinue}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
