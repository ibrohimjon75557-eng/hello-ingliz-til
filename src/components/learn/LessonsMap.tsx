import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { courseLessons } from '../../data/courseLessons';
import { CourseLesson, CEFRLevel } from '../../types';
import { speakWord, playSound } from '../../utils/audio';
import {
  Lock,
  CheckCircle,
  Star,
  Play,
  Volume2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  BookOpen,
  Award
} from 'lucide-react';

export const LessonsMap: React.FC = () => {
  const { language, soundEnabled, user, completeLesson } = useApp();
  const t = translations[language];

  const [activeLevel, setActiveLevel] = useState<CEFRLevel>('A1');
  const [selectedLesson, setSelectedLesson] = useState<CourseLesson | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isLessonCompletedModal, setIsLessonCompletedModal] = useState(false);

  const levels: { id: CEFRLevel; title: string; desc: string; icon: string }[] = [
    { id: 'A1', title: t.levelA1, desc: language === 'uz' ? 'Boshlang‘ich so‘zlar va asoslar' : 'Foundations & Greetings', icon: '🌱' },
    { id: 'A2', title: t.levelA2, desc: language === 'uz' ? 'Kundalik suhbat va odatlar' : 'Daily Routines & Food', icon: '🌿' },
    { id: 'B1', title: t.levelB1, desc: language === 'uz' ? 'Sayohat va mustaqil nutq' : 'Travel & Expression', icon: '🌳' },
    { id: 'B2', title: t.levelB2, desc: language === 'uz' ? 'Chuqur fikrlash va bahslar' : 'Debates & Fluency', icon: '👑' },
  ];

  const filteredLessons = courseLessons.filter(l => l.level === activeLevel);

  // Lesson status helper
  const isLessonUnlocked = (lesson: CourseLesson) => {
    // If level is A1 and it's the first lesson, unlocked
    if (lesson.level === 'A1' && lesson.order === 1) return true;
    
    // Check if previous lesson in sequence is completed
    const currentIndex = courseLessons.findIndex(l => l.id === lesson.id);
    if (currentIndex <= 0) return true;

    const previousLesson = courseLessons[currentIndex - 1];
    return user.completedLessonIds.includes(previousLesson.id);
  };

  const handleStartLesson = (lesson: CourseLesson) => {
    if (!isLessonUnlocked(lesson)) return;
    setSelectedLesson(lesson);
    setSlideIndex(0);
    setQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setIsLessonCompletedModal(false);
    playSound('click', soundEnabled);
  };

  const handleNextSlide = () => {
    if (!selectedLesson) return;
    if (slideIndex < selectedLesson.slides.length - 1) {
      setSlideIndex(prev => prev + 1);
      playSound('click', soundEnabled);
    } else {
      // Move to quiz phase
      setSlideIndex(selectedLesson.slides.length);
    }
  };

  const handleCheckQuizAnswer = () => {
    if (!selectedLesson || !selectedAnswer || isAnswerChecked) return;
    setIsAnswerChecked(true);

    const currentQ = selectedLesson.quizQuestions[quizIndex];
    const isCorrect = selectedAnswer === currentQ.correctAnswer;

    if (isCorrect) {
      playSound('correct', soundEnabled);
    } else {
      playSound('wrong', soundEnabled);
    }
  };

  const handleNextQuizQuestion = () => {
    if (!selectedLesson) return;
    if (quizIndex < selectedLesson.quizQuestions.length - 1) {
      setQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
      playSound('click', soundEnabled);
    } else {
      // Complete lesson!
      completeLesson(selectedLesson.id, selectedLesson.starReward, selectedLesson.xpReward);
      setIsLessonCompletedModal(true);
    }
  };

  const handleClosePlayer = () => {
    setSelectedLesson(null);
    setIsLessonCompletedModal(false);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold text-xs">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{language === 'uz' ? 'CEFR Bosqichlari' : 'CEFR Curriculum Map'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
          {language === 'uz' ? 'Ingliz Tili O‘quv Xaritasi' : 'English Learning Path'}
        </h2>
        <p className="text-sm text-slate-300">
          {language === 'uz'
            ? 'A1 darajadan boshlang, har bir darsni o‘zlashtirib yulduzlar to‘plang va yangi bosqichlarni oching!'
            : 'Progress step-by-step from A1 to B2. Master each lesson to unlock subsequent quests!'}
        </p>
      </div>

      {/* CEFR Level Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
        {levels.map((lvl) => {
          const isActive = activeLevel === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => {
                setActiveLevel(lvl.id);
                playSound('click', soundEnabled);
              }}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition duration-200 cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-gradient-to-b from-indigo-900/80 to-slate-900 border-indigo-400/80 shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-400/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{lvl.icon}</span>
                <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {lvl.id}
                </span>
              </div>
              <div>
                <div className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {lvl.title.split('-')[1]?.trim() || lvl.title}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {lvl.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lesson Path Nodes */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="relative pl-6 sm:pl-8 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-1 before:bg-gradient-to-b before:from-indigo-500 before:via-amber-400 before:to-slate-800 space-y-6">
          {filteredLessons.map((lesson, idx) => {
            const unlocked = isLessonUnlocked(lesson);
            const completed = user.completedLessonIds.includes(lesson.id);

            return (
              <div key={lesson.id} className="relative group">
                
                {/* Node Milestone Circle */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md border-2 transition ${
                    completed
                      ? 'bg-emerald-500 border-emerald-300 text-slate-950'
                      : unlocked
                      ? 'bg-amber-400 border-amber-200 text-slate-950 animate-pulse'
                      : 'bg-slate-900 border-slate-700 text-slate-500'
                  }`}
                >
                  {completed ? <CheckCircle className="w-4 h-4 text-slate-950" /> : idx + 1}
                </div>

                {/* Lesson Card */}
                <div
                  onClick={() => handleStartLesson(lesson)}
                  className={`p-5 sm:p-6 rounded-3xl border transition duration-300 ${
                    unlocked
                      ? 'glass-card border-slate-700/80 hover:border-amber-400/60 shadow-xl hover:shadow-indigo-500/10 cursor-pointer hover:-translate-y-0.5'
                      : 'bg-slate-900/40 border-slate-800/80 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-2xl shrink-0">
                        {lesson.icon}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                            {lesson.level} • {language === 'uz' ? `${lesson.order}-dars` : `Lesson ${lesson.order}`}
                          </span>
                          {completed && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold">
                              {language === 'uz' ? 'Tugallangan' : 'Completed'}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition">
                          {language === 'uz' ? lesson.titleUz : lesson.titleEn}
                        </h3>

                        <p className="text-xs text-slate-400 line-clamp-2">
                          {language === 'uz' ? lesson.descriptionUz : lesson.descriptionEn}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>+{lesson.starReward} ⭐</span>
                      </div>

                      {unlocked ? (
                        <button
                          className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1 transition"
                        >
                          <Play className="w-3.5 h-3.5 fill-slate-950" />
                          <span>{completed ? t.btnTryAgain : t.btnStart}</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                          <Lock className="w-3.5 h-3.5" />
                          <span>{language === 'uz' ? 'Qulflangan' : 'Locked'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Lesson Modal Player */}
      {selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-2xl w-full rounded-3xl glass-dropdown border border-slate-700 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Player Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedLesson.icon}</span>
                <div>
                  <h3 className="font-bold text-white text-base sm:text-lg">
                    {language === 'uz' ? selectedLesson.titleUz : selectedLesson.titleEn}
                  </h3>
                  <div className="text-xs text-slate-400">
                    {selectedLesson.level} • {selectedLesson.slides.length} {language === 'uz' ? 'slayd' : 'slides'} + {selectedLesson.quizQuestions.length} {language === 'uz' ? 'savol' : 'questions'}
                  </div>
                </div>
              </div>

              <button
                onClick={handleClosePlayer}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition"
              >
                ✕
              </button>
            </div>

            {/* Player Body Content */}
            <div className="py-6 flex-1 overflow-y-auto space-y-6">
              
              {/* SLIDE PHASE */}
              {slideIndex < selectedLesson.slides.length && (
                <div className="space-y-5 animate-in slide-in-from-right duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                      {language === 'uz' ? `Qadam ${slideIndex + 1} / ${selectedLesson.slides.length}` : `Step ${slideIndex + 1} of ${selectedLesson.slides.length}`}
                    </span>
                    {selectedLesson.slides[slideIndex].audioText && (
                      <button
                        onClick={() => speakWord(selectedLesson.slides[slideIndex].audioText!)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 font-bold text-xs transition"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>{t.btnListen}</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-3 p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <h4 className="text-xl font-bold text-white">
                      {language === 'uz'
                        ? selectedLesson.slides[slideIndex].titleUz
                        : selectedLesson.slides[slideIndex].titleEn}
                    </h4>

                    <div className="text-base text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                      {selectedLesson.slides[slideIndex].bodyEn}
                    </div>

                    <div className="text-sm text-slate-400 border-t border-slate-800/80 pt-3 italic whitespace-pre-line">
                      {selectedLesson.slides[slideIndex].bodyUz}
                    </div>
                  </div>
                </div>
              )}

              {/* QUIZ PHASE */}
              {slideIndex >= selectedLesson.slides.length && !isLessonCompletedModal && (
                <div className="space-y-5 animate-in slide-in-from-right duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {language === 'uz'
                        ? `Bilimni tekshirish (${quizIndex + 1}/${selectedLesson.quizQuestions.length})`
                        : `Check Knowledge (${quizIndex + 1}/${selectedLesson.quizQuestions.length})`}
                    </span>
                  </div>

                  {(() => {
                    const q = selectedLesson.quizQuestions[quizIndex];
                    return (
                      <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-2">
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
                            let btnStyle = 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-600';

                            if (isAnswerChecked) {
                              if (opt === q.correctAnswer) {
                                btnStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold';
                              } else if (isSelected) {
                                btnStyle = 'bg-rose-500/20 border-rose-400 text-rose-300 font-bold';
                              }
                            } else if (isSelected) {
                              btnStyle = 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold';
                            }

                            return (
                              <button
                                key={i}
                                disabled={isAnswerChecked}
                                onClick={() => setSelectedAnswer(opt)}
                                className={`p-4 rounded-2xl border text-left text-sm font-semibold transition cursor-pointer ${btnStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation feedback */}
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

              {/* CELEBRATION PHASE */}
              {isLessonCompletedModal && (
                <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 mx-auto flex items-center justify-center text-4xl shadow-xl shadow-amber-500/30 animate-bounce">
                    🎉
                  </div>
                  <h3 className="text-2xl font-black text-white font-display">
                    {t.lessonCompleted}
                  </h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    {language === 'uz'
                      ? 'Darsdagi barcha tushunchalar va savollarni muvaffaqiyatli yakunladingiz!'
                      : 'You mastered all lesson objectives and answered the questions successfully!'}
                  </p>
                  <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-300 font-extrabold text-sm">
                    <span>+{selectedLesson.starReward} ⭐ {t.starsEarned}</span>
                    <span>•</span>
                    <span>+{selectedLesson.xpReward} XP</span>
                  </div>
                </div>
              )}

            </div>

            {/* Player Footer Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              {slideIndex > 0 && !isLessonCompletedModal && (
                <button
                  onClick={() => {
                    if (slideIndex >= selectedLesson.slides.length) {
                      setSlideIndex(selectedLesson.slides.length - 1);
                    } else {
                      setSlideIndex(prev => Math.max(0, prev - 1));
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 transition flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{language === 'uz' ? 'Orqaga' : 'Back'}</span>
                </button>
              )}

              <div className="ml-auto">
                {slideIndex < selectedLesson.slides.length && (
                  <button
                    onClick={handleNextSlide}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>{slideIndex === selectedLesson.slides.length - 1 ? t.btnPracticeQuiz : t.btnNext}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {slideIndex >= selectedLesson.slides.length && !isLessonCompletedModal && (
                  <>
                    {!isAnswerChecked ? (
                      <button
                        disabled={!selectedAnswer}
                        onClick={handleCheckQuizAnswer}
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
                        onClick={handleNextQuizQuestion}
                        className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{quizIndex < selectedLesson.quizQuestions.length - 1 ? t.btnNext : t.btnFinish}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </>
                )}

                {isLessonCompletedModal && (
                  <button
                    onClick={handleClosePlayer}
                    className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-400/20 transition cursor-pointer"
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
