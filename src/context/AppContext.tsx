import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  Language,
  UserProfile,
  VocabularyWord,
  QuizQuestion,
  Achievement
} from '../types';
import { initialVocabulary } from '../data/vocabularyData';
import { baseQuestions } from '../data/questionBank';
import { initialAchievements } from '../data/achievementsData';
import { playSound } from '../utils/audio';

interface StarToastState {
  show: boolean;
  stars: number;
  message: string;
}

interface LevelUpModalState {
  show: boolean;
  newLevel: number;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  user: UserProfile;
  vocabulary: VocabularyWord[];
  questions: QuizQuestion[];
  achievements: Achievement[];
  
  // UI Celebration Modals
  starToast: StarToastState | null;
  levelUpModal: LevelUpModalState | null;
  closeLevelUpModal: () => void;
  newAchievementUnlocked: Achievement | null;
  closeAchievementToast: () => void;
  
  // Gamification Actions
  addStars: (amount: number, message?: string) => void;
  addXp: (amount: number) => void;
  markWordLearned: (wordId: string, learned: boolean) => void;
  completeLesson: (lessonId: string, stars: number, xp: number) => void;
  completeGrammarLesson: (grammarId: string, stars: number, xp: number) => void;
  recordQuizAnswer: (isCorrect: boolean, starsEarned: number, xpEarned: number) => void;
  recordMathSolved: (isCorrect: boolean) => void;
  claimDailyReward: () => { success: boolean; stars: number };
  completeDailyChallenge: (stars: number, xp: number) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  
  // Admin Operations
  addVocabularyWord: (word: Omit<VocabularyWord, 'id'>) => void;
  updateVocabularyWord: (id: string, updates: Partial<VocabularyWord>) => void;
  deleteVocabularyWord: (id: string) => void;
  addQuizQuestion: (q: Omit<QuizQuestion, 'id'>) => void;
  updateQuizQuestion: (id: string, updates: Partial<QuizQuestion>) => void;
  deleteQuizQuestion: (id: string) => void;
  resetAllData: () => void;
}

const STORAGE_KEY_USER = 'esa_user_profile_v1';
const STORAGE_KEY_VOCAB = 'esa_vocab_data_v1';
const STORAGE_KEY_QUESTIONS = 'esa_questions_data_v1';
const STORAGE_KEY_LANG = 'esa_language_v1';
const STORAGE_KEY_SOUND = 'esa_sound_v1';

const getTodayString = () => new Date().toISOString().split('T')[0];

const initialUser: UserProfile = {
  id: 'usr_default',
  username: 'Yulduz O‘quvchi',
  avatar: '⭐',
  joinedDate: getTodayString(),
  level: 1,
  xp: 40,
  stars: 35,
  streak: 3,
  lastActiveDate: getTodayString(),
  streakDates: [getTodayString()],
  completedLessonIds: [],
  completedGrammarIds: [],
  learnedWordIds: ['v_food_1', 'v_anim_1'],
  unlockedAchievementIds: [],
  dailyRewardDay: 3,
  lastDailyRewardClaimDate: '',
  completedDailyChallengeDate: '',
  stats: {
    totalQuizzesTaken: 4,
    totalQuestionsAnswered: 12,
    totalCorrectAnswers: 10,
    mathQuestionsSolved: 3,
    totalTimeSpentMinutes: 24,
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    return saved === 'en' ? 'en' : 'uz';
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SOUND);
    return saved !== null ? saved === 'true' : true;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load user from localStorage', e);
    }
    return initialUser;
  });

  const [vocabulary, setVocabulary] = useState<VocabularyWord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VOCAB);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialVocabulary;
  });

  const [questions, setQuestions] = useState<QuizQuestion[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUESTIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return baseQuestions;
  });

  const [achievements] = useState<Achievement[]>(initialAchievements);
  const [starToast, setStarToast] = useState<StarToastState | null>(null);
  const [levelUpModal, setLevelUpModal] = useState<LevelUpModalState | null>(null);
  const [newAchievementUnlocked, setNewAchievementUnlocked] = useState<Achievement | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LANG, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SOUND, String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_VOCAB, JSON.stringify(vocabulary));
  }, [vocabulary]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(questions));
  }, [questions]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    playSound('click', soundEnabled);
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  // Trigger celebratory confetti
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F59E0B', '#FBBF24', '#10B981', '#6366F1', '#EC4899']
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  // Add stars with animated notification and sound
  const addStars = useCallback((amount: number, message = '') => {
    if (amount <= 0) return;
    setUser(prev => ({
      ...prev,
      stars: prev.stars + amount
    }));

    playSound('star', soundEnabled);
    setStarToast({
      show: true,
      stars: amount,
      message: message || `+${amount} ⭐`
    });

    setTimeout(() => {
      setStarToast(null);
    }, 2800);
  }, [soundEnabled]);

  // Check achievements after state updates
  const checkAchievementsInternal = useCallback((targetUser: UserProfile) => {
    const newlyUnlocked: Achievement[] = [];

    achievements.forEach(ach => {
      if (targetUser.unlockedAchievementIds.includes(ach.id)) return;

      let achieved = false;
      if (ach.id === 'ach_first_lesson' && targetUser.completedLessonIds.length >= 1) achieved = true;
      if (ach.id === 'ach_words_10' && targetUser.learnedWordIds.length >= 10) achieved = true;
      if (ach.id === 'ach_words_50' && targetUser.learnedWordIds.length >= 50) achieved = true;
      if (ach.id === 'ach_streak_3' && targetUser.streak >= 3) achieved = true;
      if (ach.id === 'ach_streak_7' && targetUser.streak >= 7) achieved = true;
      if (ach.id === 'ach_stars_100' && targetUser.stars >= 100) achieved = true;
      if (ach.id === 'ach_stars_500' && targetUser.stars >= 500) achieved = true;
      if (ach.id === 'ach_correct_25' && targetUser.stats.totalCorrectAnswers >= 25) achieved = true;
      if (ach.id === 'ach_correct_100' && targetUser.stats.totalCorrectAnswers >= 100) achieved = true;
      if (ach.id === 'ach_grammar_master' && targetUser.completedGrammarIds.length >= 5) achieved = true;
      if (ach.id === 'ach_math_whiz' && targetUser.stats.mathQuestionsSolved >= 10) achieved = true;

      if (achieved) {
        newlyUnlocked.push(ach);
      }
    });

    if (newlyUnlocked.length > 0) {
      const first = newlyUnlocked[0];
      setNewAchievementUnlocked(first);
      playSound('levelup', soundEnabled);
      triggerConfetti();

      setUser(prev => ({
        ...prev,
        stars: prev.stars + first.rewardStars,
        xp: prev.xp + first.rewardXp,
        unlockedAchievementIds: [...prev.unlockedAchievementIds, ...newlyUnlocked.map(a => a.id)]
      }));
    }
  }, [achievements, soundEnabled, triggerConfetti]);

  // Add XP with automatic Level-up calculation
  const addXp = useCallback((amount: number) => {
    if (amount <= 0) return;
    setUser(prev => {
      const newXp = prev.xp + amount;
      const currentLevel = prev.level;
      // 100 XP per level
      const calculatedLevel = Math.floor(newXp / 100) + 1;

      let levelIncreased = false;
      if (calculatedLevel > currentLevel) {
        levelIncreased = true;
      }

      const updated = {
        ...prev,
        xp: newXp,
        level: calculatedLevel
      };

      if (levelIncreased) {
        setTimeout(() => {
          setLevelUpModal({ show: true, newLevel: calculatedLevel });
          playSound('levelup', soundEnabled);
          triggerConfetti();
        }, 300);
      }

      setTimeout(() => {
        checkAchievementsInternal(updated);
      }, 500);

      return updated;
    });
  }, [soundEnabled, triggerConfetti, checkAchievementsInternal]);

  // Daily Streak check on load / interaction
  useEffect(() => {
    const today = getTodayString();
    setUser(prev => {
      if (prev.lastActiveDate === today) {
        return prev;
      }

      // Check if last active was yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      let newStreak = prev.streak;
      if (prev.lastActiveDate === yesterdayStr) {
        newStreak += 1;
        playSound('streak', soundEnabled);
      } else if (prev.lastActiveDate !== today) {
        // Missed a day
        newStreak = 1;
      }

      const updatedStreakDates = prev.streakDates.includes(today)
        ? prev.streakDates
        : [...prev.streakDates, today];

      return {
        ...prev,
        lastActiveDate: today,
        streak: newStreak,
        streakDates: updatedStreakDates
      };
    });
  }, [soundEnabled]);

  // Vocabulary progress tracking
  const markWordLearned = (wordId: string, learned: boolean) => {
    setUser(prev => {
      const alreadyLearned = prev.learnedWordIds.includes(wordId);
      let newLearned = [...prev.learnedWordIds];
      if (learned && !alreadyLearned) {
        newLearned.push(wordId);
        addStars(2);
        addXp(5);
      } else if (!learned && alreadyLearned) {
        newLearned = newLearned.filter(id => id !== wordId);
      }

      const updated = { ...prev, learnedWordIds: newLearned };
      checkAchievementsInternal(updated);
      return updated;
    });
  };

  // Complete course lesson
  const completeLesson = (lessonId: string, stars: number, xp: number) => {
    setUser(prev => {
      const alreadyCompleted = prev.completedLessonIds.includes(lessonId);
      const newCompleted = alreadyCompleted
        ? prev.completedLessonIds
        : [...prev.completedLessonIds, lessonId];

      const awardStars = alreadyCompleted ? Math.floor(stars / 2) : stars;
      const awardXp = alreadyCompleted ? Math.floor(xp / 2) : xp;

      addStars(awardStars, `+${awardStars} ⭐ Lesson Completed!`);
      addXp(awardXp);
      triggerConfetti();

      const updated = {
        ...prev,
        completedLessonIds: newCompleted,
        stats: {
          ...prev.stats,
          totalTimeSpentMinutes: prev.stats.totalTimeSpentMinutes + 6
        }
      };

      checkAchievementsInternal(updated);
      return updated;
    });
  };

  // Complete grammar lesson
  const completeGrammarLesson = (grammarId: string, stars: number, xp: number) => {
    setUser(prev => {
      const already = prev.completedGrammarIds.includes(grammarId);
      const newCompleted = already
        ? prev.completedGrammarIds
        : [...prev.completedGrammarIds, grammarId];

      const awardStars = already ? Math.floor(stars / 2) : stars;
      const awardXp = already ? Math.floor(xp / 2) : xp;

      addStars(awardStars, `+${awardStars} ⭐ Grammar Mastered!`);
      addXp(awardXp);
      triggerConfetti();

      const updated = {
        ...prev,
        completedGrammarIds: newCompleted
      };
      checkAchievementsInternal(updated);
      return updated;
    });
  };

  // Record quiz answer
  const recordQuizAnswer = (isCorrect: boolean, starsEarned: number, xpEarned: number) => {
    setUser(prev => {
      const updated = {
        ...prev,
        stats: {
          ...prev.stats,
          totalQuestionsAnswered: prev.stats.totalQuestionsAnswered + 1,
          totalCorrectAnswers: prev.stats.totalCorrectAnswers + (isCorrect ? 1 : 0),
          totalQuizzesTaken: prev.stats.totalQuizzesTaken + 1
        }
      };

      if (isCorrect) {
        addStars(starsEarned || 5);
        addXp(xpEarned || 10);
      }

      checkAchievementsInternal(updated);
      return updated;
    });
  };

  // Record math question solved
  const recordMathSolved = (isCorrect: boolean) => {
    setUser(prev => {
      const updated = {
        ...prev,
        stats: {
          ...prev.stats,
          mathQuestionsSolved: prev.stats.mathQuestionsSolved + (isCorrect ? 1 : 0)
        }
      };

      if (isCorrect) {
        addStars(3, '+3 ⭐ Math Solved!');
        addXp(6);
      }

      checkAchievementsInternal(updated);
      return updated;
    });
  };

  // Claim 7-day daily reward
  const claimDailyReward = () => {
    const today = getTodayString();
    if (user.lastDailyRewardClaimDate === today) {
      return { success: false, stars: 0 };
    }

    const rewardMap: Record<number, number> = {
      1: 5,
      2: 10,
      3: 15,
      4: 20,
      5: 25,
      6: 30,
      7: 50
    };

    const currentDay = user.dailyRewardDay || 1;
    const rewardStars = rewardMap[currentDay] || 10;
    const nextDay = currentDay >= 7 ? 1 : currentDay + 1;

    setUser(prev => ({
      ...prev,
      stars: prev.stars + rewardStars,
      dailyRewardDay: nextDay,
      lastDailyRewardClaimDate: today
    }));

    addStars(rewardStars, `+${rewardStars} ⭐ Daily Reward!`);
    playSound('levelup', soundEnabled);
    triggerConfetti();

    return { success: true, stars: rewardStars };
  };

  // Complete daily challenge
  const completeDailyChallenge = (stars: number, xp: number) => {
    const today = getTodayString();
    setUser(prev => ({
      ...prev,
      completedDailyChallengeDate: today
    }));

    addStars(stars || 25, `+${stars || 25} ⭐ Daily Challenge Conquered!`);
    addXp(xp || 50);
    triggerConfetti();
  };

  const closeLevelUpModal = () => setLevelUpModal(null);
  const closeAchievementToast = () => setNewAchievementUnlocked(null);

  // Admin Operations
  const addVocabularyWord = (wordData: Omit<VocabularyWord, 'id'>) => {
    const newWord: VocabularyWord = {
      ...wordData,
      id: `v_custom_${Date.now()}`
    };
    setVocabulary(prev => [newWord, ...prev]);
  };

  const updateVocabularyWord = (id: string, updates: Partial<VocabularyWord>) => {
    setVocabulary(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
  };

  const deleteVocabularyWord = (id: string) => {
    setVocabulary(prev => prev.filter(w => w.id !== id));
  };

  const addQuizQuestion = (qData: Omit<QuizQuestion, 'id'>) => {
    const newQ: QuizQuestion = {
      ...qData,
      id: `q_custom_${Date.now()}`
    };
    setQuestions(prev => [newQ, ...prev]);
  };

  const updateQuizQuestion = (id: string, updates: Partial<QuizQuestion>) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const deleteQuizQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_VOCAB);
    localStorage.removeItem(STORAGE_KEY_QUESTIONS);
    setUser(initialUser);
    setVocabulary(initialVocabulary);
    setQuestions(baseQuestions);
    playSound('correct', soundEnabled);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        soundEnabled,
        toggleSound,
        user,
        vocabulary,
        questions,
        achievements,
        starToast,
        levelUpModal,
        closeLevelUpModal,
        newAchievementUnlocked,
        closeAchievementToast,
        addStars,
        addXp,
        markWordLearned,
        completeLesson,
        completeGrammarLesson,
        recordQuizAnswer,
        recordMathSolved,
        claimDailyReward,
        completeDailyChallenge,
        updateUser,
        addVocabularyWord,
        updateVocabularyWord,
        deleteVocabularyWord,
        addQuizQuestion,
        updateQuizQuestion,
        deleteQuizQuestion,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
