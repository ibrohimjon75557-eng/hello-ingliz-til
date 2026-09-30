import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { grammarLessons } from '../../data/grammarData';
import { GrammarLesson } from '../../types';
import { speakWord, playSound } from '../../utils/audio';
import {
  Brain,
  Star,
  CheckCircle,
  Volume2,
  Play,
  Sparkles,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export const GrammarSection: React.FC = () => {
  const { language, soundEnabled, user, completeGrammarLesson } = useApp();
  const t = translations[language];

  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson | null>(null);
  const [activeStep, setActiveStep] = useState<'explanation' | 'rules' | 'quiz' | 'completed'>('explanation');
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const handleOpenLesson = (lesson: GrammarLesson) => {
    setSelectedLesson(lesson);
    setActiveStep('explanation');
    setQuizQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    playSound('click', soundEnabled);
  };

  const handleStartQuiz = () => {
    setActiveStep('quiz');
    setQuizQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    playSound('click', soundEnabled);
  };

  const handleCheckAnswer = () => {
    if (!selectedLesson || !selectedAnswer || isAnswerChecked) return;
    setIsAnswerChecked(true);

    const q = selectedLesson.practiceQuestions[quizQuestionIndex];
    const isCorrect = selectedAnswer === q.correctAnswer;
    if (isCorrect) {
      playSound('correct', soundEnabled);
    } else {
      playSound('wrong', soundEnabled);
    }
  };

  const handleNextQuiz = () => {
    if (!selectedLesson) return;
    if (quizQuestionIndex < selectedLesson.practiceQuestions.length - 1) {
      setQuizQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
      playSound('click', soundEnabled);
    } else {
      // Completed!
      completeGrammarLesson(selectedLesson.id, selectedLesson.starReward, selectedLesson.xpReward);
      setActiveStep('completed');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 font-bold text-xs">
          <Brain className="w-3.5 h-3.5" />
          <span>{t.btnGrammar}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
          {language === 'uz' ? 'Grammatika Darslari (13 Asosiy Qoida)' : 'Grammar Mastery (13 Core Rules)'}
        </h2>
        <p className="text-sm text-slate-300">
          {language === 'uz'
            ? 'Qisqa va tushunarli tushuntirishlar, namunalar, mini-mashqlar va yulduzli mukofotlar.'
            : 'Concise explanations, real-life examples, mini-exercises, and star achievements.'}
        </p>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {grammarLessons.map((item) => {
          const isCompleted = user.completedGrammarIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => handleOpenLesson(item)}
              className="p-6 rounded-3xl glass-card border border-slate-800 hover:border-emerald-400/50 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between space-y-4 cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-2xl group-hover:scale-110 transition duration-300 shadow-md">
                    {item.icon}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {item.level}
                    </span>
                    {isCompleted && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {language === 'uz' ? 'Bajarildi' : 'Done'}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition">
                    {language === 'uz' ? item.titleUz : item.titleEn}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {language === 'uz' ? item.summaryUz : item.summaryEn}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  +{item.starReward} ⭐
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                  <span>{isCompleted ? t.btnTryAgain : t.btnStart}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grammar Lesson Interactive Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-2xl w-full rounded-3xl glass-dropdown border border-slate-700 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedLesson.icon}</span>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg font-display">
                    {language === 'uz' ? selectedLesson.titleUz : selectedLesson.titleEn}
                  </h3>
                  <div className="text-xs text-amber-400 font-semibold">
                    {selectedLesson.level} • {selectedLesson.rules.length} {language === 'uz' ? 'asosiy qoidalar' : 'rules'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedLesson(null)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-6 flex-1 overflow-y-auto space-y-6">
              
              {/* STEP 1 & 2: EXPLANATION & RULES */}
              {(activeStep === 'explanation' || activeStep === 'rules') && (
                <div className="space-y-6 animate-in slide-in-from-right duration-200">
                  
                  {/* Summary Callout */}
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200 space-y-1">
                    <div className="font-bold text-sm">
                      {language === 'uz' ? 'Qisqa tushuntirish' : 'Lesson Overview'}
                    </div>
                    <div>{language === 'uz' ? selectedLesson.explanationUz : selectedLesson.explanationEn}</div>
                  </div>

                  {/* Rules & Examples Cards */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      {language === 'uz' ? 'Qoidalar va Namunalar' : 'Rules and Examples'}
                    </h4>

                    {selectedLesson.rules.map((rule, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-white text-sm">
                            {language === 'uz' ? rule.titleUz : rule.titleEn}
                          </h5>
                          <span className="text-xs font-mono text-amber-300 font-bold bg-amber-400/10 px-2 py-0.5 rounded-lg border border-amber-400/20">
                            {rule.pattern}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300">
                          {language === 'uz' ? rule.ruleExplanationUz : rule.ruleExplanationEn}
                        </p>

                        <div className="space-y-2 pt-2 border-t border-slate-800/80">
                          {rule.examples.map((ex, exIdx) => (
                            <div key={exIdx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                              <div>
                                <span className="text-white font-medium">"{ex.en}"</span>
                                <span className="text-slate-400 italic block mt-0.5">"{ex.uz}"</span>
                              </div>
                              <button
                                onClick={() => speakWord(ex.en)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 transition"
                                title="Pronounce"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* STEP 3: PRACTICE QUIZ */}
              {activeStep === 'quiz' && (
                <div className="space-y-5 animate-in slide-in-from-right duration-200">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400 uppercase tracking-widest">
                    <span>
                      {language === 'uz'
                        ? `Grammatika testi (${quizQuestionIndex + 1}/${selectedLesson.practiceQuestions.length})`
                        : `Grammar Quiz (${quizQuestionIndex + 1}/${selectedLesson.practiceQuestions.length})`}
                    </span>
                  </div>

                  {(() => {
                    const q = selectedLesson.practiceQuestions[quizQuestionIndex];
                    return (
                      <div className="space-y-4">
                        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-2">
                          <h4 className="text-lg sm:text-xl font-bold text-white font-display">
                            {q.question}
                          </h4>
                          {q.questionUz && (
                            <p className="text-xs text-slate-400 italic">{q.questionUz}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {q.options.map((opt, i) => {
                            const isSelected = selectedAnswer === opt;
                            let style = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-600';

                            if (isAnswerChecked) {
                              if (opt === q.correctAnswer) {
                                style = 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold';
                              } else if (isSelected) {
                                style = 'bg-rose-500/20 border-rose-400 text-rose-300 font-bold';
                              }
                            } else if (isSelected) {
                              style = 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold';
                            }

                            return (
                              <button
                                key={i}
                                disabled={isAnswerChecked}
                                onClick={() => setSelectedAnswer(opt)}
                                className={`p-4 rounded-2xl border text-left text-sm font-semibold transition cursor-pointer ${style}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {isAnswerChecked && (
                          <div className={`p-4 rounded-2xl border text-xs space-y-1 animate-in zoom-in-95 duration-150 ${
                            selectedAnswer === q.correctAnswer
                              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                              : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
                          }`}>
                            <div className="font-bold text-sm">
                              {selectedAnswer === q.correctAnswer ? t.correctHeading : t.wrongHeading}
                            </div>
                            <div>{language === 'uz' ? q.explanationUz : q.explanation}</div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* STEP 4: COMPLETED CELEBRATION */}
              {activeStep === 'completed' && (
                <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 mx-auto flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/30 animate-bounce">
                    🧠
                  </div>
                  <h3 className="text-2xl font-black text-white font-display">
                    {language === 'uz' ? 'Grammatika muvaffaqiyatli o‘rganildi!' : 'Grammar Rule Conquered!'}
                  </h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    {language === 'uz'
                      ? 'Ushbu qoidani amalda qo‘llash ko‘nikmasiga ega bo‘ldingiz.'
                      : 'You mastered this grammar pattern and earned your reward!'}
                  </p>
                  <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-300 font-extrabold text-sm">
                    <span>+{selectedLesson.starReward} ⭐</span>
                    <span>•</span>
                    <span>+{selectedLesson.xpReward} XP</span>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              {activeStep === 'quiz' && (
                <button
                  onClick={() => setActiveStep('explanation')}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 transition"
                >
                  {language === 'uz' ? 'Qoidalarga qaytish' : 'Review Rules'}
                </button>
              )}

              <div className="ml-auto">
                {(activeStep === 'explanation' || activeStep === 'rules') && (
                  <button
                    onClick={handleStartQuiz}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>{t.btnPracticeQuiz}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {activeStep === 'quiz' && (
                  <>
                    {!isAnswerChecked ? (
                      <button
                        disabled={!selectedAnswer}
                        onClick={handleCheckAnswer}
                        className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition ${
                          selectedAnswer
                            ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md cursor-pointer'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        {t.btnCheck}
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuiz}
                        className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{quizQuestionIndex < selectedLesson.practiceQuestions.length - 1 ? t.btnNext : t.btnFinish}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </>
                )}

                {activeStep === 'completed' && (
                  <button
                    onClick={() => setSelectedLesson(null)}
                    className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-slate-950 font-black text-sm shadow-lg shadow-amber-400/20 transition cursor-pointer"
                  >
                    {t.btnContinue}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
