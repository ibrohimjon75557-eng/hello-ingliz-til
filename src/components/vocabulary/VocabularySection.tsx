import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { VOCAB_CATEGORIES } from '../../data/vocabularyData';
import { VocabCategory, VocabularyWord } from '../../types';
import { speakWord, playSound } from '../../utils/audio';
import { shuffleArray } from '../../data/questionBank';
import {
  Volume2,
  CheckCircle,
  XCircle,
  RotateCw,
  Search,
  Sparkles,
  Layers,
  LayoutGrid,
  Check,
  Star,
  Shuffle,
  ChevronRight
} from 'lucide-react';

export const VocabularySection: React.FC = () => {
  const { language, soundEnabled, vocabulary, user, markWordLearned, recordQuizAnswer } = useApp();
  const t = translations[language];

  const [activeCategory, setActiveCategory] = useState<VocabCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'flashcards' | 'grid' | 'quiz'>('flashcards');

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Vocabulary practice quiz state
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [isQuizChecked, setIsQuizChecked] = useState(false);

  // Filter words
  const filteredWords = useMemo(() => {
    return vocabulary.filter(w => {
      const matchCat = activeCategory === 'All' || w.category === activeCategory;
      const matchSearch =
        w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.uzbek.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [vocabulary, activeCategory, searchQuery]);

  // Randomized vocabulary list for flashcards or quiz
  const [sessionWords, setSessionWords] = useState<VocabularyWord[]>(() => shuffleArray(filteredWords));

  // Reset session when filter changes
  const handleRandomize = () => {
    setSessionWords(shuffleArray(filteredWords));
    setFlashcardIndex(0);
    setIsFlipped(false);
    setCurrentQuizIndex(0);
    setQuizSelectedOption(null);
    setIsQuizChecked(false);
    setQuizScore({ correct: 0, total: 0 });
    playSound('click', soundEnabled);
  };

  // Flashcard controls
  const currentCard = sessionWords[flashcardIndex] || sessionWords[0];
  const isCurrentCardLearned = currentCard ? user.learnedWordIds.includes(currentCard.id) : false;

  const handleNextCard = (learned: boolean) => {
    if (!currentCard) return;
    markWordLearned(currentCard.id, learned);
    setIsFlipped(false);

    if (learned) {
      playSound('correct', soundEnabled);
    } else {
      playSound('click', soundEnabled);
    }

    if (flashcardIndex < sessionWords.length - 1) {
      setFlashcardIndex(prev => prev + 1);
    } else {
      // Loop back or reshuffle
      setSessionWords(shuffleArray(filteredWords));
      setFlashcardIndex(0);
    }
  };

  // Quiz mode options generator for current question
  const currentQuizWord = sessionWords[currentQuizIndex];
  const quizOptions = useMemo(() => {
    if (!currentQuizWord) return [];
    const otherWords = vocabulary.filter(w => w.id !== currentQuizWord.id);
    const distractors = shuffleArray(otherWords).slice(0, 3).map(w => w.uzbek);
    return shuffleArray([currentQuizWord.uzbek, ...distractors]);
  }, [currentQuizWord, vocabulary]);

  const handleCheckQuiz = () => {
    if (!currentQuizWord || !quizSelectedOption || isQuizChecked) return;
    setIsQuizChecked(true);

    const isCorrect = quizSelectedOption === currentQuizWord.uzbek;
    if (isCorrect) {
      playSound('correct', soundEnabled);
      recordQuizAnswer(true, 5, 10);
      setQuizScore(prev => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      playSound('wrong', soundEnabled);
      recordQuizAnswer(false, 0, 0);
      setQuizScore(prev => ({ ...prev, total: prev.total + 1 }));
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < sessionWords.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setQuizSelectedOption(null);
      setIsQuizChecked(false);
      playSound('click', soundEnabled);
    } else {
      handleRandomize();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.btnVocabulary}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 font-display">
            {language === 'uz' ? 'Lug‘at Olami & Flashcards' : 'Vocabulary Studio & Flashcards'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {language === 'uz'
              ? `${user.learnedWordIds.length} ta so‘z to‘liq o‘zlashtirildi. Har kuni yangi so‘zlar yodlang!`
              : `${user.learnedWordIds.length} words learned so far. Practice daily to expand your lexicon!`}
          </p>
        </div>

        {/* View mode toggle & Randomize */}
        <div className="flex items-center gap-2">
          <div className="flex p-1 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => { setViewMode('flashcards'); playSound('click', soundEnabled); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'flashcards' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Flashcards</span>
            </button>
            <button
              onClick={() => { setViewMode('quiz'); playSound('click', soundEnabled); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'quiz' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Quiz Mode</span>
            </button>
            <button
              onClick={() => { setViewMode('grid'); playSound('click', soundEnabled); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'grid' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid List</span>
            </button>
          </div>

          <button
            onClick={handleRandomize}
            className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 hover:text-amber-300 transition"
            title={t.btnRandomize}
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'uz' ? 'So‘z yoki tarjimani qidirish...' : 'Search word or translation...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => { setActiveCategory('All'); handleRandomize(); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeCategory === 'All'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            🌟 {language === 'uz' ? 'Barcha mavzular' : 'All Categories'} ({vocabulary.length})
          </button>
          {VOCAB_CATEGORIES.map((cat) => {
            const count = vocabulary.filter(w => w.category === cat.name).length;
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => { setActiveCategory(cat.name); handleRandomize(); }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{language === 'uz' ? cat.uzName : cat.name}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: INTERACTIVE 3D FLASHCARDS */}
      {viewMode === 'flashcards' && (
        <div className="max-w-xl mx-auto space-y-6 pt-2">
          {sessionWords.length > 0 && currentCard ? (
            <div className="space-y-4">
              
              {/* Progress & Card Index */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-2">
                <span>
                  {language === 'uz' ? `Karta: ${flashcardIndex + 1} / ${sessionWords.length}` : `Card ${flashcardIndex + 1} of ${sessionWords.length}`}
                </span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>+2 ⭐ {t.starsEarned}</span>
                </div>
              </div>

              {/* The Flip Card Container */}
              <div
                onClick={() => { setIsFlipped(prev => !prev); playSound('click', soundEnabled); }}
                className="relative min-h-[300px] w-full rounded-3xl p-8 glass-card border border-amber-400/30 shadow-2xl flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-300 hover:border-amber-400/60 select-none group"
              >
                {/* Badge top */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
                    {currentCard.category}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakWord(currentCard.word);
                    }}
                    className="p-2.5 rounded-2xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 transition"
                    title="Pronounce"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Front or Back View */}
                {!isFlipped ? (
                  <div className="space-y-3 my-auto animate-in fade-in duration-200">
                    <h3 className="text-4xl sm:text-5xl font-black text-white tracking-wide font-display">
                      {currentCard.word}
                    </h3>
                    {currentCard.phonetic && (
                      <p className="text-sm font-mono text-slate-400">
                        {currentCard.phonetic}
                      </p>
                    )}
                    <div className="text-xs text-amber-400/80 font-medium pt-2 flex items-center justify-center gap-1">
                      <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition duration-500" />
                      <span>{t.btnFlipCard}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 my-auto animate-in zoom-in-95 duration-200">
                    <div className="text-xs text-slate-400 uppercase tracking-wider">{language === 'uz' ? 'O‘zbekcha tarjimasi:' : 'Meaning in Uzbek:'}</div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-display">
                      {currentCard.uzbek}
                    </h3>

                    {/* Example sentence */}
                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-left space-y-1.5 max-w-sm mx-auto">
                      <div className="font-semibold text-slate-200">"{currentCard.exampleEn}"</div>
                      <div className="text-slate-400 italic">"{currentCard.exampleUz}"</div>
                    </div>
                  </div>
                )}

                {/* Footer status */}
                <div className="w-full flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                  <span>{currentCard.partOfSpeech}</span>
                  {isCurrentCardLearned && (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {language === 'uz' ? 'O‘rganilgan' : 'Learned'}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons: "I Don't Know" & "I Know" */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleNextCard(false)}
                  className="py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-rose-500/30 text-rose-300 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>{t.btnIDontKnow}</span>
                </button>

                <button
                  onClick={() => handleNextCard(true)}
                  className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4 text-slate-950" />
                  <span>{t.btnIKnow}</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 glass-card rounded-3xl p-8 space-y-3">
              <p className="text-slate-400 text-sm">So‘zlar topilmadi.</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
              >
                Barchasini ko‘rsatish
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: VOCABULARY QUIZ MODE */}
      {viewMode === 'quiz' && (
        <div className="max-w-xl mx-auto space-y-6 pt-2">
          {currentQuizWord ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>
                  {language === 'uz' ? `Savol: ${currentQuizIndex + 1} / ${sessionWords.length}` : `Question ${currentQuizIndex + 1} of ${sessionWords.length}`}
                </span>
                <span className="text-amber-400 font-bold">
                  {language === 'uz' ? `Natija: ${quizScore.correct} / ${quizScore.total}` : `Score: ${quizScore.correct} / ${quizScore.total}`}
                </span>
              </div>

              {/* Question Card */}
              <div className="p-8 rounded-3xl glass-card border border-amber-400/30 text-center space-y-3">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
                  {language === 'uz' ? 'To‘g‘ri tarjimani toping' : 'Find the correct translation'}
                </span>
                <div className="flex items-center justify-center gap-3">
                  <h3 className="text-3xl sm:text-4xl font-black text-white font-display">
                    {currentQuizWord.word}
                  </h3>
                  <button
                    onClick={() => speakWord(currentQuizWord.word)}
                    className="p-2 rounded-xl bg-amber-400/15 hover:bg-amber-400/30 text-amber-300 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                {currentQuizWord.phonetic && (
                  <p className="text-xs font-mono text-slate-400">{currentQuizWord.phonetic}</p>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizOptions.map((opt, i) => {
                  const isSelected = quizSelectedOption === opt;
                  let style = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-600';

                  if (isQuizChecked) {
                    if (opt === currentQuizWord.uzbek) {
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
                      disabled={isQuizChecked}
                      onClick={() => setQuizSelectedOption(opt)}
                      className={`p-4 rounded-2xl border text-left text-sm font-semibold transition cursor-pointer ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Actions */}
              {isQuizChecked && (
                <div className={`p-4 rounded-2xl border text-xs space-y-1 animate-in zoom-in-95 duration-150 ${
                  quizSelectedOption === currentQuizWord.uzbek
                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
                }`}>
                  <div className="font-bold text-sm">
                    {quizSelectedOption === currentQuizWord.uzbek ? t.correctHeading : t.wrongHeading}
                  </div>
                  <div>
                    {t.correctAnswerIs} <strong className="text-amber-300">{currentQuizWord.uzbek}</strong>
                  </div>
                  <div className="text-slate-400 italic pt-1">
                    "{currentQuizWord.exampleEn}" — {currentQuizWord.exampleUz}
                  </div>
                </div>
              )}

              <div className="pt-2">
                {!isQuizChecked ? (
                  <button
                    disabled={!quizSelectedOption}
                    onClick={handleCheckQuiz}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm transition ${
                      quizSelectedOption
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md cursor-pointer'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {t.btnCheck}
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuiz}
                    className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t.btnNext}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* VIEW 3: GRID CARDS VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((item) => {
            const isLearned = user.learnedWordIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="p-5 rounded-3xl glass-card border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20">
                      {item.category}
                    </span>
                    <div className="flex items-baseline gap-2 mt-2">
                      <h4 className="text-xl font-bold text-white group-hover:text-amber-300 transition">
                        {item.word}
                      </h4>
                      {item.phonetic && (
                        <span className="text-xs font-mono text-slate-400">{item.phonetic}</span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-amber-300 mt-0.5">
                      {item.uzbek}
                    </p>
                  </div>

                  <button
                    onClick={() => speakWord(item.word)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 transition"
                    title="Pronounce"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs space-y-1">
                  <div className="text-slate-200">"{item.exampleEn}"</div>
                  <div className="text-slate-400 italic">"{item.exampleUz}"</div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">{item.partOfSpeech}</span>
                  <button
                    onClick={() => markWordLearned(item.id, !isLearned)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                      isLearned
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${isLearned ? 'text-emerald-400' : ''}`} />
                    <span>{isLearned ? (language === 'uz' ? 'O‘rganilgan' : 'Learned') : (language === 'uz' ? 'Yodlash' : 'Mark as Learned')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
