import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { generateMathQuestions } from '../../utils/mathGenerator';
import { MathQuestion } from '../../types';
import { playSound } from '../../utils/audio';
import {
  Calculator,
  Star,
  Shuffle,
  ChevronRight,
  Info,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export const MathSection: React.FC = () => {
  const { language, soundEnabled, user, recordMathSolved } = useApp();
  const t = translations[language];

  const [questions, setQuestions] = useState<MathQuestion[]>(() => generateMathQuestions(5));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const startNewBatch = () => {
    setQuestions(generateMathQuestions(5));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setSessionScore(0);
    setIsCompleted(false);
    playSound('click', soundEnabled);
  };

  const currentQ = questions[currentIndex];

  const handleCheck = () => {
    if (!currentQ || selectedAnswer === null || isAnswerChecked) return;
    setIsAnswerChecked(true);

    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    if (isCorrect) {
      playSound('correct', soundEnabled);
      setSessionScore(prev => prev + 1);
      recordMathSolved(true);
    } else {
      playSound('wrong', soundEnabled);
      recordMathSolved(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
      playSound('click', soundEnabled);
    } else {
      setIsCompleted(true);
      playSound('levelup', soundEnabled);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-2xl mx-auto">
      
      {/* Notice Banner that Math is secondary */}
      <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 flex items-center gap-3">
        <Info className="w-5 h-5 text-blue-400 shrink-0" />
        <span>{t.mathNotice}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-400/10 border border-blue-400/30 text-blue-300 font-bold text-xs">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.mathHeading}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 font-display">
            {language === 'uz' ? 'Dinamik Arifmetika Mashqi' : 'Dynamic Math Sprint'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {language === 'uz'
              ? 'Raqamlar har safar avtomatik generatsiya qilinadi. Har bir to‘g‘ri javobga +3 ⭐!'
              : 'Procedurally generated numbers every single time. Earn +3 ⭐ per correct answer!'}
          </p>
        </div>

        <button
          onClick={startNewBatch}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-blue-300 transition"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>{t.btnRandomize}</span>
        </button>
      </div>

      {/* ACTIVE BATCH */}
      {!isCompleted && currentQ ? (
        <div className="space-y-6">
          
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1">
            <span>
              {language === 'uz' ? `Savol: ${currentIndex + 1} / ${questions.length}` : `Question ${currentIndex + 1} of ${questions.length}`}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>+3 ⭐</span>
            </div>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Equation Card */}
          <div className="p-8 sm:p-10 rounded-3xl glass-card border border-blue-500/30 text-center space-y-3 shadow-2xl">
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              {currentQ.type.toUpperCase()}
            </span>

            <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-wider">
              {currentQ.equation}
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswer === opt;
              let style = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-600';

              if (isAnswerChecked) {
                if (opt === currentQ.correctAnswer) {
                  style = 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold';
                } else if (isSelected) {
                  style = 'bg-rose-500/20 border-rose-400 text-rose-300 font-bold';
                }
              } else if (isSelected) {
                style = 'bg-blue-500/20 border-blue-400 text-blue-200 font-bold';
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswerChecked}
                  onClick={() => setSelectedAnswer(opt)}
                  className={`p-4 rounded-2xl border text-center text-xl font-bold font-mono transition cursor-pointer ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {isAnswerChecked && (
            <div className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1 animate-in zoom-in-95 duration-150 ${
              selectedAnswer === currentQ.correctAnswer
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
            }`}>
              <div className="font-bold">
                {selectedAnswer === currentQ.correctAnswer ? t.correctHeading : t.wrongHeading}
              </div>
              <div>{language === 'uz' ? currentQ.explanationUz : currentQ.explanation}</div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2">
            {!isAnswerChecked ? (
              <button
                disabled={selectedAnswer === null}
                onClick={handleCheck}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm transition ${
                  selectedAnswer !== null
                    ? 'bg-blue-500 hover:bg-blue-400 text-slate-950 shadow-md cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                {t.btnCheck}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{currentIndex < questions.length - 1 ? t.btnNext : t.btnFinish}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      ) : isCompleted ? (
        <div className="text-center p-8 rounded-3xl glass-card border border-blue-500/30 space-y-5 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 rounded-full bg-blue-500/20 border border-blue-500/40 mx-auto flex items-center justify-center text-4xl shadow-lg">
            🧮
          </div>

          <h3 className="text-2xl font-black text-white font-display">
            {language === 'uz' ? 'Matematik Mashq Tugallandi!' : 'Math Sprint Complete!'}
          </h3>
          <p className="text-xs text-slate-300">
            {language === 'uz'
              ? `5 ta hisoblash savolidan ${sessionScore} tasiga to‘g‘ri javob berdingiz!`
              : `You solved ${sessionScore} out of 5 arithmetic questions correctly!`}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold text-sm">
            <span>+{sessionScore * 3} ⭐ {t.starsEarned}</span>
          </div>

          <div>
            <button
              onClick={startNewBatch}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-sm shadow-lg transition cursor-pointer"
            >
              {language === 'uz' ? 'Yangi raqamlar bilan yechish' : 'Solve with New Numbers'}
            </button>
          </div>
        </div>
      ) : null}

    </div>
  );
};
