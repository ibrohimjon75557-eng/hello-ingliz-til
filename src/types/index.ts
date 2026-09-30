export type Language = 'uz' | 'en';

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2';

export type QuestionType =
  | 'translation'       // English to Uzbek
  | 'word_to_en'       // Uzbek to English
  | 'fill_blank'        // I ___ a student.
  | 'correct_sentence'  // Choose the correct sentence
  | 'incorrect_word';   // Spot the incorrect word

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  questionUz?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  explanationUz: string;
  category: string;
  difficulty: Difficulty;
  rewardStars: number;
  rewardXp: number;
}

export type VocabCategory =
  | 'Animals'
  | 'Food'
  | 'Family'
  | 'School'
  | 'House'
  | 'Clothes'
  | 'Colors'
  | 'Numbers'
  | 'Days'
  | 'Months'
  | 'Weather'
  | 'Sports'
  | 'Technology'
  | 'Travel'
  | 'Common verbs'
  | 'Common adjectives'
  | 'Everyday English';

export interface VocabularyWord {
  id: string;
  word: string;
  uzbek: string;
  phonetic?: string;
  category: VocabCategory;
  exampleEn: string;
  exampleUz: string;
  difficulty: Difficulty;
  partOfSpeech: string;
  synonyms?: string[];
  active?: boolean;
}

export interface GrammarRule {
  titleEn: string;
  titleUz: string;
  pattern: string;
  ruleExplanationEn: string;
  ruleExplanationUz: string;
  examples: {
    en: string;
    uz: string;
  }[];
}

export interface GrammarLesson {
  id: string;
  order: number;
  titleEn: string;
  titleUz: string;
  level: CEFRLevel;
  icon: string;
  summaryEn: string;
  summaryUz: string;
  explanationEn: string;
  explanationUz: string;
  rules: GrammarRule[];
  practiceQuestions: QuizQuestion[];
  starReward: number;
  xpReward: number;
}

export interface LessonSlide {
  id: string;
  type: 'concept' | 'vocab' | 'dialogue' | 'practice';
  titleEn: string;
  titleUz: string;
  bodyEn: string;
  bodyUz: string;
  audioText?: string;
  interactiveOptions?: string[];
  correctIndex?: number;
}

export interface CourseLesson {
  id: string;
  level: CEFRLevel;
  order: number;
  titleEn: string;
  titleUz: string;
  descriptionEn: string;
  descriptionUz: string;
  icon: string;
  durationMinutes: number;
  slides: LessonSlide[];
  quizQuestions: QuizQuestion[];
  starReward: number;
  xpReward: number;
}

export interface Achievement {
  id: string;
  titleEn: string;
  titleUz: string;
  descEn: string;
  descUz: string;
  icon: string;
  category: 'streak' | 'words' | 'lessons' | 'stars' | 'quiz' | 'math';
  target: number;
  rewardStars: number;
  rewardXp: number;
}

export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  joinedDate: string;
  level: number;
  xp: number;
  stars: number;
  streak: number;
  lastActiveDate: string;
  streakDates: string[]; // YYYY-MM-DD
  completedLessonIds: string[];
  completedGrammarIds: string[];
  learnedWordIds: string[];
  unlockedAchievementIds: string[];
  dailyRewardDay: number; // 1-7
  lastDailyRewardClaimDate: string;
  completedDailyChallengeDate: string;
  stats: {
    totalQuizzesTaken: number;
    totalQuestionsAnswered: number;
    totalCorrectAnswers: number;
    mathQuestionsSolved: number;
    totalTimeSpentMinutes: number;
  };
}

export interface LeaderboardUser {
  id: string;
  username: string;
  avatar: string;
  level: number;
  stars: number;
  xp: number;
  streak: number;
  badge: string;
  tier: 'Diamond' | 'Gold' | 'Silver' | 'Bronze';
  isCurrentUser?: boolean;
}

export interface MathQuestion {
  id: string;
  equation: string;
  options: number[];
  correctAnswer: number;
  explanation: string;
  explanationUz: string;
  type: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'equation';
}
