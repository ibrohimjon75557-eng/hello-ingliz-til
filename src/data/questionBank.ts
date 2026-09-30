import { QuizQuestion, QuestionType } from '../types';
import { initialVocabulary } from './vocabularyData';

export const baseQuestions: QuizQuestion[] = [
  // TYPE 1: Choose the correct Uzbek translation for an English word
  {
    id: 'q_t1_1',
    type: 'translation',
    question: 'Book',
    questionUz: 'Ushbu inglizcha so‘zning to‘g‘ri tarjimasini tanlang:',
    options: ['Kitob', 'Stol', 'Qalam', 'Deraza'],
    correctAnswer: 'Kitob',
    explanation: '"Book" means "Kitob" in Uzbek.',
    explanationUz: '"Book" so‘zi o‘zbek tilida "Kitob" degan ma’noni bildiradi.',
    category: 'Vocabulary',
    difficulty: 'easy',
    rewardStars: 5,
    rewardXp: 10
  },
  {
    id: 'q_t1_2',
    type: 'translation',
    question: 'Butterfly',
    questionUz: 'Ushbu so‘zning to‘g‘ri ma’nosini toping:',
    options: ['Kapalak', 'Chumoli', 'Qaldirg‘och', 'Ari'],
    correctAnswer: 'Kapalak',
    explanation: '"Butterfly" translates to "Kapalak".',
    explanationUz: '"Butterfly" o‘zbek tilida "Kapalak" deyiladi.',
    category: 'Animals',
    difficulty: 'easy',
    rewardStars: 5,
    rewardXp: 10
  },
  {
    id: 'q_t1_3',
    type: 'translation',
    question: 'Friendship',
    questionUz: 'Ushbu so‘zning to‘g‘ri ma’nosini toping:',
    options: ['Do‘stlik', 'Oila', 'Qo‘shnichilik', 'Hamkorlik'],
    correctAnswer: 'Do‘stlik',
    explanation: '"Friendship" means "Do‘stlik".',
    explanationUz: '"Friendship" so‘zi "Do‘stlik" degani.',
    category: 'Vocabulary',
    difficulty: 'medium',
    rewardStars: 5,
    rewardXp: 10
  },

  // TYPE 2: Choose the correct English word for an Uzbek word
  {
    id: 'q_t2_1',
    type: 'word_to_en',
    question: 'Olma',
    questionUz: 'O‘zbekcha "Olma" so‘zining inglizcha tarjimasi qaysi?',
    options: ['Apple', 'Orange', 'Banana', 'Bread'],
    correctAnswer: 'Apple',
    explanation: '"Olma" in English is "Apple".',
    explanationUz: '"Olma" so‘zining inglizchasi "Apple".',
    category: 'Food',
    difficulty: 'easy',
    rewardStars: 5,
    rewardXp: 10
  },
  {
    id: 'q_t2_2',
    type: 'word_to_en',
    question: 'Kutubxona',
    questionUz: '"Kutubxona" so‘zining inglizcha tarjimasi qaysi?',
    options: ['Library', 'Bookstore', 'Classroom', 'Museum'],
    correctAnswer: 'Library',
    explanation: '"Library" is the place where books are kept for reading.',
    explanationUz: '"Kutubxona" ingliz tilida "Library" deyiladi.',
    category: 'School',
    difficulty: 'easy',
    rewardStars: 5,
    rewardXp: 10
  },
  {
    id: 'q_t2_3',
    type: 'word_to_en',
    question: 'Yulduz',
    questionUz: '"Yulduz" so‘zining inglizcha tarjimasi qaysi?',
    options: ['Star', 'Sun', 'Moon', 'Sky'],
    correctAnswer: 'Star',
    explanation: '"Star" means "Yulduz".',
    explanationUz: '"Star" — "Yulduz" degan ma’noni bildiradi.',
    category: 'Everyday English',
    difficulty: 'easy',
    rewardStars: 5,
    rewardXp: 10
  },

  // TYPE 3: Complete the sentence (Fill in the blank)
  {
    id: 'q_t3_1',
    type: 'fill_blank',
    question: 'I ___ a student at English Star Academy.',
    questionUz: 'Bo‘sh joyga to‘g‘ri so‘zni qo‘ying:',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 'am',
    explanation: 'The subject pronoun "I" pairs with the verb "am".',
    explanationUz: '"I" olmoshi bilan doimo "am" ishlatiladi.',
    category: 'Grammar',
    difficulty: 'easy',
    rewardStars: 5,
    rewardXp: 10
  },
  {
    id: 'q_t3_2',
    type: 'fill_blank',
    question: 'They ___ playing football in the school yard right now.',
    questionUz: 'Bo‘sh joyga to‘g‘ri fe’l shaklini qo‘ying:',
    options: ['are', 'is', 'am', 'was'],
    correctAnswer: 'are',
    explanation: '"They" is plural and requires "are" in Present Continuous.',
    explanationUz: '"They" ko‘plik bo‘lgani uchun "are" tanlanadi.',
    category: 'Grammar',
    difficulty: 'easy',
    rewardStars: 5,
    rewardXp: 10
  },
  {
    id: 'q_t3_3',
    type: 'fill_blank',
    question: 'Yesterday, she ___ her English homework early.',
    questionUz: 'O‘tgan zamon uchun to‘g‘ri fe’lni tanlang:',
    options: ['finished', 'finishes', 'finish', 'finishing'],
    correctAnswer: 'finished',
    explanation: '"Yesterday" denotes Past Simple, so we use "finished".',
    explanationUz: '"Yesterday" (kecha) o‘tgan zamon bo‘lgani sababli "finished" to‘g‘ri javob.',
    category: 'Grammar',
    difficulty: 'easy',
    rewardStars: 5,
    rewardXp: 10
  },
  {
    id: 'q_t3_4',
    type: 'fill_blank',
    question: 'My brother ___ speaks three foreign languages.',
    questionUz: 'Bo‘sh joyga mos keluvchi so‘zni tanlang:',
    options: ['fluently', 'fluent', 'fluency', 'fluentness'],
    correctAnswer: 'fluently',
    explanation: 'We need an adverb "fluently" to describe how he speaks.',
    explanationUz: 'Fe’lga nisbatan qanday gapirishini ifodalash uchun ravish "fluently" ishlatiladi.',
    category: 'Vocabulary',
    difficulty: 'medium',
    rewardStars: 5,
    rewardXp: 10
  },

  // TYPE 4: Choose the grammatically correct sentence
  {
    id: 'q_t4_1',
    type: 'correct_sentence',
    question: 'Choose the grammatically correct sentence:',
    questionUz: 'Grammatik jihatdan mutlaqo to‘g‘ri tuzilgan gapni tanlang:',
    options: [
      'She speaks English very fluently.',
      'She speak English very fluently.',
      'She is speak English very fluently.',
      'She speaking English very fluently.'
    ],
    correctAnswer: 'She speaks English very fluently.',
    explanation: 'In Present Simple, third-person singular "She" requires an "-s" suffix on the verb: speaks.',
    explanationUz: 'Present Simple zamonida "She" bilan fe’lga "-s" qo‘shiladi: speaks.',
    category: 'Grammar',
    difficulty: 'medium',
    rewardStars: 5,
    rewardXp: 10
  },
  {
    id: 'q_t4_2',
    type: 'correct_sentence',
    question: 'Choose the correct question form:',
    questionUz: 'To‘g‘ri tuzilgan so‘roq gapni toping:',
    options: [
      'Where do you live?',
      'Where you live?',
      'Where does you live?',
      'Where are you live?'
    ],
    correctAnswer: 'Where do you live?',
    explanation: 'WH- questions with "you" in Present Simple require the auxiliary verb "do": Where do you live?',
    explanationUz: '"You" bilan Present Simple so‘rog‘ida "do" yordamchi fe’li ishlatiladi.',
    category: 'Grammar',
    difficulty: 'medium',
    rewardStars: 5,
    rewardXp: 10
  },
  {
    id: 'q_t4_3',
    type: 'correct_sentence',
    question: 'Choose the correct comparison:',
    questionUz: 'To‘g‘ri qiyosiy darajadagi gapni tanlang:',
    options: [
      'An eagle flies faster than a pigeon.',
      'An eagle flies more fast than a pigeon.',
      'An eagle flies fastest than a pigeon.',
      'An eagle flies as fast then a pigeon.'
    ],
    correctAnswer: 'An eagle flies faster than a pigeon.',
    explanation: 'Short adjectives form comparisons with -er + than: faster than.',
    explanationUz: 'Bir bo‘g‘inli so‘zlarga -er + than qo‘shiladi: faster than.',
    category: 'Grammar',
    difficulty: 'medium',
    rewardStars: 5,
    rewardXp: 10
  },

  // TYPE 5: Find the incorrect word in the sentence
  {
    id: 'q_t5_1',
    type: 'incorrect_word',
    question: 'Find the incorrect word in this sentence:\n"He do not like waking up early in the morning."',
    questionUz: 'Ushbu gapdagi xato so‘zni aniqlang:\n"He do not like waking up early in the morning."',
    options: ['do', 'like', 'waking', 'early'],
    correctAnswer: 'do',
    explanation: 'With "He", the negative form should be "does not" (doesn\'t), not "do not".',
    explanationUz: '"He" uchinchi shaxs bo‘lgani uchun "do" emas, balki "does" bo‘lishi kerak.',
    category: 'Grammar',
    difficulty: 'medium',
    rewardStars: 5,
    rewardXp: 10
  },
  {
    id: 'q_t5_2',
    type: 'incorrect_word',
    question: 'Spot the incorrect word in this sentence:\n"There are three childs playing in the park."',
    questionUz: 'Gapdagi xato so‘zni toping:\n"There are three childs playing in the park."',
    options: ['childs', 'are', 'three', 'playing'],
    correctAnswer: 'childs',
    explanation: 'The plural of "child" is "children", not "childs".',
    explanationUz: '"Child" so‘zining ko‘pligi "children" bo‘ladi, "childs" noto‘g‘ri.',
    category: 'Grammar',
    difficulty: 'easy',
    rewardStars: 5,
    rewardXp: 10
  },
  {
    id: 'q_t5_3',
    type: 'incorrect_word',
    question: 'Spot the error:\n"She is more taller than her brother."',
    questionUz: 'Xatoni toping:\n"She is more taller than her brother."',
    options: ['more', 'is', 'taller', 'than'],
    correctAnswer: 'more',
    explanation: '"Taller" already has the comparative suffix -er, so "more" is redundant.',
    explanationUz: '"Taller" so‘zi oldidan ortiqcha "more" qo‘yilmaydi.',
    category: 'Grammar',
    difficulty: 'medium',
    rewardStars: 5,
    rewardXp: 10
  }
];

// Helper: Fisher-Yates shuffle algorithm
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Procedural Dynamic Question Generator:
 * Generates fresh questions on-the-fly from the vocabulary database
 * so questions and answer options NEVER repeat the exact same sequence!
 */
export function generateVocabQuestions(count = 5): QuizQuestion[] {
  const shuffledVocab = shuffleArray(initialVocabulary);
  const questions: QuizQuestion[] = [];

  for (let i = 0; i < Math.min(count, shuffledVocab.length); i++) {
    const targetWord = shuffledVocab[i];
    // Pick 3 random distractor words from other items
    const otherWords = initialVocabulary.filter(w => w.id !== targetWord.id);
    const distractors = shuffleArray(otherWords).slice(0, 3);

    // Alternate between EN -> UZ and UZ -> EN
    const isEnToUz = i % 2 === 0;

    if (isEnToUz) {
      const options = shuffleArray([
        targetWord.uzbek,
        ...distractors.map(d => d.uzbek)
      ]);
      questions.push({
        id: `gen_v1_${Date.now()}_${i}`,
        type: 'translation',
        question: targetWord.word,
        questionUz: `Ushbu so‘zning to‘g‘ri ma’nosini tanlang:`,
        options,
        correctAnswer: targetWord.uzbek,
        explanation: `"${targetWord.word}" means "${targetWord.uzbek}". Example: ${targetWord.exampleEn}`,
        explanationUz: `"${targetWord.word}" so‘zi "${targetWord.uzbek}" degani. Misol: ${targetWord.exampleUz}`,
        category: targetWord.category,
        difficulty: targetWord.difficulty,
        rewardStars: 5,
        rewardXp: 10
      });
    } else {
      const options = shuffleArray([
        targetWord.word,
        ...distractors.map(d => d.word)
      ]);
      questions.push({
        id: `gen_v2_${Date.now()}_${i}`,
        type: 'word_to_en',
        question: targetWord.uzbek,
        questionUz: `"${targetWord.uzbek}" so‘zining inglizchasini tanlang:`,
        options,
        correctAnswer: targetWord.word,
        explanation: `"${targetWord.uzbek}" in English is "${targetWord.word}". Example: ${targetWord.exampleEn}`,
        explanationUz: `"${targetWord.uzbek}" ingliz tilida "${targetWord.word}". Misol: ${targetWord.exampleUz}`,
        category: targetWord.category,
        difficulty: targetWord.difficulty,
        rewardStars: 5,
        rewardXp: 10
      });
    }
  }

  return questions;
}

/**
 * Generate a Daily Challenge set:
 * Exactly 5 Vocabulary questions + 3 Grammar questions + 2 Sentence questions = 10 items
 */
export function generateDailyChallengeSet(): QuizQuestion[] {
  const vocabQs = generateVocabQuestions(5);

  const grammarPool = baseQuestions.filter(q => q.type === 'fill_blank' || q.category === 'Grammar');
  const shuffledGrammar = shuffleArray(grammarPool).slice(0, 3).map(q => ({
    ...q,
    options: shuffleArray(q.options)
  }));

  const sentencePool = baseQuestions.filter(q => q.type === 'correct_sentence' || q.type === 'incorrect_word');
  const shuffledSentence = shuffleArray(sentencePool).slice(0, 2).map(q => ({
    ...q,
    options: shuffleArray(q.options)
  }));

  return shuffleArray([...vocabQs, ...shuffledGrammar, ...shuffledSentence]);
}

/**
 * Generate a smart randomized quiz session from any subset or type
 */
export function generatePracticeSession(type?: QuestionType | 'mixed', count = 5): QuizQuestion[] {
  let pool = [...baseQuestions];
  if (type && type !== 'mixed') {
    pool = pool.filter(q => q.type === type);
  }

  // Also infuse fresh dynamically generated vocabulary questions
  const dynamicVocab = generateVocabQuestions(count);
  const combined = shuffleArray([...pool, ...dynamicVocab]);

  const selected = combined.slice(0, count).map(q => ({
    ...q,
    options: shuffleArray(q.options)
  }));

  return selected;
}
