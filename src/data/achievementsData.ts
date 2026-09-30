import { Achievement } from '../types';

export const initialAchievements: Achievement[] = [
  {
    id: 'ach_first_lesson',
    titleEn: 'First Step to Stardom',
    titleUz: 'Yulduzlik sari ilk qadam',
    descEn: 'Complete your first English lesson.',
    descUz: 'Dastlabki ingliz tili darsingizni muvaffaqiyatli yakunlang.',
    icon: '🌟',
    category: 'lessons',
    target: 1,
    rewardStars: 15,
    rewardXp: 30
  },
  {
    id: 'ach_words_10',
    titleEn: 'Word Collector',
    titleUz: 'So‘zlar yig‘uvchisi',
    descEn: 'Learn 10 new English vocabulary words.',
    descUz: '10 ta yangi inglizcha so‘zni o‘rganing.',
    icon: '📖',
    category: 'words',
    target: 10,
    rewardStars: 20,
    rewardXp: 40
  },
  {
    id: 'ach_words_50',
    titleEn: 'Vocabulary Master',
    titleUz: 'Lug‘at ustasi (50 so‘z)',
    descEn: 'Learn 50 vocabulary words in the flashcards.',
    descUz: 'Lug‘at tizimida 50 ta so‘zni to‘liq o‘zlashtiring.',
    icon: '📚',
    category: 'words',
    target: 50,
    rewardStars: 50,
    rewardXp: 100
  },
  {
    id: 'ach_streak_3',
    titleEn: 'Momentum Builder',
    titleUz: 'Kuchli boshlanish',
    descEn: 'Maintain a 3-day learning streak.',
    descUz: '3 kun ketma-ket ingliz tilini mashq qiling.',
    icon: '🔥',
    category: 'streak',
    target: 3,
    rewardStars: 25,
    rewardXp: 50
  },
  {
    id: 'ach_streak_7',
    titleEn: 'Unstoppable Flame',
    titleUz: 'To‘xtatib bo‘lmas alanga (7 kun)',
    descEn: 'Keep a 7-day daily learning streak.',
    descUz: '7 kunlik ketma-ketlikka erishing va maxsus bonus oling.',
    icon: '⚡',
    category: 'streak',
    target: 7,
    rewardStars: 70,
    rewardXp: 150
  },
  {
    id: 'ach_stars_100',
    titleEn: 'Star Explorer',
    titleUz: 'Yulduzlar tadqiqotchisi',
    descEn: 'Accumulate 100 ⭐ Stars.',
    descUz: 'Jami 100 ta yulduz to‘plang.',
    icon: '⭐',
    category: 'stars',
    target: 100,
    rewardStars: 30,
    rewardXp: 60
  },
  {
    id: 'ach_stars_500',
    titleEn: 'Galaxy of Stars',
    titleUz: 'Yulduzlar galaktikasi (500 ⭐)',
    descEn: 'Reach 500 ⭐ Stars in your treasury.',
    descUz: '500 ta yulduz to‘plab akademiya faxriyiga aylaning.',
    icon: '🌌',
    category: 'stars',
    target: 500,
    rewardStars: 100,
    rewardXp: 200
  },
  {
    id: 'ach_correct_25',
    titleEn: 'Sharp Thinker',
    titleUz: 'O‘tkir zehn',
    descEn: 'Answer 25 quiz questions correctly.',
    descUz: 'Testlarda 25 ta savolga to‘g‘ri javob bering.',
    icon: '🎯',
    category: 'quiz',
    target: 25,
    rewardStars: 20,
    rewardXp: 40
  },
  {
    id: 'ach_correct_100',
    titleEn: 'Quiz Champion',
    titleUz: 'Testlar chempioni (100 to‘g‘ri)',
    descEn: 'Answer 100 questions correctly.',
    descUz: 'Jami 100 ta savolga to‘g‘ri javob qaytaring.',
    icon: '🏆',
    category: 'quiz',
    target: 100,
    rewardStars: 80,
    rewardXp: 160
  },
  {
    id: 'ach_grammar_master',
    titleEn: 'Grammar Master',
    titleUz: 'Grammatika dahosi',
    descEn: 'Complete at least 5 grammar topics.',
    descUz: 'Kamida 5 ta grammatika darsini muvaffaqiyatli yakunlang.',
    icon: '🧠',
    category: 'lessons',
    target: 5,
    rewardStars: 40,
    rewardXp: 80
  },
  {
    id: 'ach_math_whiz',
    titleEn: 'Math Whiz',
    titleUz: 'Hisob-kitob ustasi',
    descEn: 'Solve 10 procedural math questions.',
    descUz: '10 ta matematik mashqni to‘g‘ri yeching.',
    icon: '🔢',
    category: 'math',
    target: 10,
    rewardStars: 20,
    rewardXp: 40
  }
];
