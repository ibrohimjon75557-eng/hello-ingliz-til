import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../data/translations';
import { VocabCategory, QuestionType, Difficulty } from '../../types';
import { VOCAB_CATEGORIES } from '../../data/vocabularyData';
import {
  Shield,
  X,
  Plus,
  Trash2,
  Edit2,
  Check,
  Search,
  Database,
  Users,
  Star,
  BookOpen,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const {
    language,
    user,
    vocabulary,
    questions,
    addVocabularyWord,
    deleteVocabularyWord,
    addQuizQuestion,
    deleteQuizQuestion,
    resetAllData
  } = useApp();
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'overview' | 'vocab' | 'quiz'>('overview');
  
  // Vocabulary form state
  const [isAddingWord, setIsAddingWord] = useState(false);
  const [newWord, setNewWord] = useState({
    word: '',
    uzbek: '',
    phonetic: '',
    category: 'Everyday English' as VocabCategory,
    exampleEn: '',
    exampleUz: '',
    difficulty: 'easy' as Difficulty,
    partOfSpeech: 'noun'
  });

  // Quiz question form state
  const [isAddingQuiz, setIsAddingQuiz] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    type: 'fill_blank' as QuestionType,
    question: '',
    questionUz: '',
    opt1: '',
    opt2: '',
    opt3: '',
    opt4: '',
    correctAnswer: '',
    explanation: '',
    explanationUz: '',
    category: 'Grammar',
    difficulty: 'medium' as Difficulty,
    rewardStars: 5,
    rewardXp: 10
  });

  const [searchFilter, setSearchFilter] = useState('');

  if (!isOpen) return null;

  const handleCreateWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.word || !newWord.uzbek) return;

    addVocabularyWord({
      word: newWord.word.trim(),
      uzbek: newWord.uzbek.trim(),
      phonetic: newWord.phonetic.trim() || undefined,
      category: newWord.category,
      exampleEn: newWord.exampleEn.trim() || `I use the word ${newWord.word}.`,
      exampleUz: newWord.exampleUz.trim() || `Men ${newWord.uzbek} so‘zini ishlataman.`,
      difficulty: newWord.difficulty,
      partOfSpeech: newWord.partOfSpeech
    });

    setNewWord({
      word: '',
      uzbek: '',
      phonetic: '',
      category: 'Everyday English',
      exampleEn: '',
      exampleUz: '',
      difficulty: 'easy',
      partOfSpeech: 'noun'
    });
    setIsAddingWord(false);
  };

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuiz.question || !newQuiz.correctAnswer) return;

    const options = [newQuiz.opt1, newQuiz.opt2, newQuiz.opt3, newQuiz.opt4]
      .map(o => o.trim())
      .filter(Boolean);

    if (!options.includes(newQuiz.correctAnswer.trim())) {
      options.push(newQuiz.correctAnswer.trim());
    }

    addQuizQuestion({
      type: newQuiz.type,
      question: newQuiz.question.trim(),
      questionUz: newQuiz.questionUz.trim() || undefined,
      options,
      correctAnswer: newQuiz.correctAnswer.trim(),
      explanation: newQuiz.explanation.trim() || `The correct answer is ${newQuiz.correctAnswer}.`,
      explanationUz: newQuiz.explanationUz.trim() || `To‘g‘ri javob: ${newQuiz.correctAnswer}.`,
      category: newQuiz.category,
      difficulty: newQuiz.difficulty,
      rewardStars: Number(newQuiz.rewardStars) || 5,
      rewardXp: Number(newQuiz.rewardXp) || 10
    });

    setNewQuiz({
      type: 'fill_blank',
      question: '',
      questionUz: '',
      opt1: '',
      opt2: '',
      opt3: '',
      opt4: '',
      correctAnswer: '',
      explanation: '',
      explanationUz: '',
      category: 'Grammar',
      difficulty: 'medium',
      rewardStars: 5,
      rewardXp: 10
    });
    setIsAddingQuiz(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-4xl w-full rounded-3xl glass-dropdown border border-slate-700 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-xl text-indigo-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <span>{t.adminTitle}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                  Demo Superadmin
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {t.adminDesc}
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

        {/* Tab switch */}
        <div className="flex gap-2 py-3 border-b border-slate-800/80">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-amber-400 text-slate-950 font-black'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('vocab')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'vocab'
                ? 'bg-amber-400 text-slate-950 font-black'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            Vocabulary ({vocabulary.length})
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-amber-400 text-slate-950 font-black'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            Quiz Bank ({questions.length})
          </button>
        </div>

        {/* Body Content */}
        <div className="py-4 flex-1 overflow-y-auto space-y-6">
          
          {/* TAB 1: OVERVIEW METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <Users className="w-4 h-4 text-indigo-400" />
                    <span>{t.adminTotalUsers}</span>
                  </div>
                  <div className="text-2xl font-black text-white font-display">8</div>
                  <div className="text-[10px] text-emerald-400 font-bold mt-1">● Active Demo Pool</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>{t.adminTotalWords}</span>
                  </div>
                  <div className="text-2xl font-black text-amber-400 font-display">
                    {vocabulary.length}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">17 categories</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <HelpCircle className="w-4 h-4 text-purple-400" />
                    <span>{t.adminTotalQuestions}</span>
                  </div>
                  <div className="text-2xl font-black text-purple-400 font-display">
                    {questions.length}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">5 core types + gen</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span>Stars Circulating</span>
                  </div>
                  <div className="text-2xl font-black text-white font-display">
                    {user.stars + 3500} ⭐
                  </div>
                  <div className="text-[10px] text-amber-400 mt-1">Active reward pool</div>
                </div>
              </div>

              {/* Database & Architecture Info */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <Database className="w-4 h-4 text-indigo-400" />
                  <span>Architecture & Persistence Layer</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  The application uses an isolated and type-safe Local Storage data layer with automatic state synchronization.
                  Data structures for Vocabulary, Grammar, Quiz Question Banks, and User Profiles are modeled to seamlessly integrate with Firebase Firestore or Cloud SQL if remote provisioning is added.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-rose-500/30 bg-rose-950/20 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{t.adminResetData}</h4>
                  <p className="text-xs text-slate-400">Restore all default words, questions, and stats.</p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Reset all demo data?')) {
                      resetAllData();
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition"
                >
                  Reset All
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: VOCABULARY CRUD */}
          {activeTab === 'vocab' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Filter vocabulary..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />

                <button
                  onClick={() => setIsAddingWord(prev => !prev)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.adminAddWord}</span>
                </button>
              </div>

              {/* Add Word Form */}
              {isAddingWord && (
                <form onSubmit={handleCreateWord} className="p-4 rounded-2xl bg-slate-900 border border-amber-400/40 space-y-3 animate-in zoom-in-95 duration-150">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400">Add New Vocabulary Item</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <input
                      type="text"
                      placeholder="English Word (e.g. Blossom)"
                      required
                      value={newWord.word}
                      onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Uzbek Translation (e.g. Gul ochilishi)"
                      required
                      value={newWord.uzbek}
                      onChange={(e) => setNewWord({ ...newWord, uzbek: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Phonetic (optional)"
                      value={newWord.phonetic}
                      onChange={(e) => setNewWord({ ...newWord, phonetic: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      placeholder="Example Sentence (EN)"
                      value={newWord.exampleEn}
                      onChange={(e) => setNewWord({ ...newWord, exampleEn: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Example Sentence (UZ)"
                      value={newWord.exampleUz}
                      onChange={(e) => setNewWord({ ...newWord, exampleUz: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingWord(false)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                    >
                      Save Word
                    </button>
                  </div>
                </form>
              )}

              {/* Words list */}
              <div className="space-y-2">
                {vocabulary
                  .filter(w => w.word.toLowerCase().includes(searchFilter.toLowerCase()) || w.uzbek.toLowerCase().includes(searchFilter.toLowerCase()))
                  .map(w => (
                    <div key={w.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white mr-2">{w.word}</span>
                        <span className="text-amber-300 mr-2">— {w.uzbek}</span>
                        <span className="text-[10px] text-slate-500">({w.category})</span>
                      </div>
                      <button
                        onClick={() => deleteVocabularyWord(w.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 3: QUIZ QUESTION CRUD */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Manage base questions and answer choices</span>
                <button
                  onClick={() => setIsAddingQuiz(prev => !prev)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500 text-white font-bold text-xs hover:bg-purple-400 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.adminAddQuiz}</span>
                </button>
              </div>

              {/* Add Question Form */}
              {isAddingQuiz && (
                <form onSubmit={handleCreateQuiz} className="p-4 rounded-2xl bg-slate-900 border border-purple-500/40 space-y-3 animate-in zoom-in-95 duration-150">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider text-purple-400">Add New Quiz Question</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      placeholder="Question (EN)"
                      required
                      value={newQuiz.question}
                      onChange={(e) => setNewQuiz({ ...newQuiz, question: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Prompt / Translation (UZ)"
                      value={newQuiz.questionUz}
                      onChange={(e) => setNewQuiz({ ...newQuiz, questionUz: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <input
                      type="text"
                      placeholder="Option A"
                      required
                      value={newQuiz.opt1}
                      onChange={(e) => setNewQuiz({ ...newQuiz, opt1: e.target.value })}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Option B"
                      required
                      value={newQuiz.opt2}
                      onChange={(e) => setNewQuiz({ ...newQuiz, opt2: e.target.value })}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Option C"
                      value={newQuiz.opt3}
                      onChange={(e) => setNewQuiz({ ...newQuiz, opt3: e.target.value })}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Option D"
                      value={newQuiz.opt4}
                      onChange={(e) => setNewQuiz({ ...newQuiz, opt4: e.target.value })}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      placeholder="Correct Answer (must match one option exactly)"
                      required
                      value={newQuiz.correctAnswer}
                      onChange={(e) => setNewQuiz({ ...newQuiz, correctAnswer: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-emerald-500/50 text-xs text-emerald-300"
                    />
                    <input
                      type="text"
                      placeholder="Explanation (UZ)"
                      value={newQuiz.explanationUz}
                      onChange={(e) => setNewQuiz({ ...newQuiz, explanationUz: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingQuiz(false)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-purple-500 text-white font-bold text-xs"
                    >
                      Save Question
                    </button>
                  </div>
                </form>
              )}

              {/* Questions list */}
              <div className="space-y-2">
                {questions.map((q) => (
                  <div key={q.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="max-w-[80%] truncate">
                      <span className="font-bold text-white mr-2">[{q.type}]</span>
                      <span className="text-slate-300 mr-2">{q.question}</span>
                      <span className="text-emerald-400 font-semibold">(Ans: {q.correctAnswer})</span>
                    </div>
                    <button
                      onClick={() => deleteQuizQuestion(q.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
};
