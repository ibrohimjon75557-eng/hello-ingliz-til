import { CourseLesson } from '../types';

export const courseLessons: CourseLesson[] = [
  // ================= A1 BEGINNER =================
  {
    id: 'l_a1_1',
    level: 'A1',
    order: 1,
    titleEn: 'Meet & Greet (Greetings & Introductions)',
    titleUz: 'Salomlashish va Tanishuv',
    descriptionEn: 'Learn how to introduce yourself, say hello, and ask someone’s name.',
    descriptionUz: 'O‘zingizni tanishtirish, salomlashish va ism so‘rashni o‘rganing.',
    icon: '👋',
    durationMinutes: 5,
    slides: [
      {
        id: 's1',
        type: 'concept',
        titleEn: 'Friendly Greetings',
        titleUz: 'Salomlashish iboralari',
        bodyEn: 'In English, common greetings include "Hello", "Good morning", and "How are you?".',
        bodyUz: 'Ingliz tilida eng ko‘p ishlatiladigan salomlar: "Hello" (Salom), "Good morning" (Xayrli tong) va "How are you?" (Qalaysiz?).',
        audioText: 'Hello, good morning, how are you?'
      },
      {
        id: 's2',
        type: 'dialogue',
        titleEn: 'Short Dialogue',
        titleUz: 'Qisqa dialog',
        bodyEn: 'Alex: "Hello! My name is Alex. What is your name?"\nSara: "Hi Alex! Nice to meet you. I am Sara."',
        bodyUz: 'Aleks: "Salom! Mening ismim Aleks. Sizning ismingiz nima?"\nSara: "Salom Aleks! Tanishganimdan xursandman. Men Saraman."',
        audioText: 'Hello! My name is Alex. Nice to meet you.'
      }
    ],
    quizQuestions: [
      {
        id: 'q_l_a1_1',
        type: 'translation',
        question: 'Nice to meet you',
        questionUz: 'Ushbu iboraning o‘zbekcha tarjimasi qaysi?',
        options: ['Tanishganimdan xursandman', 'Xayr, ko‘rishguncha', 'Xush kelibsiz', 'Kechirasiz'],
        correctAnswer: 'Tanishganimdan xursandman',
        explanation: '"Nice to meet you" expresses pleasure upon meeting someone.',
        explanationUz: '"Nice to meet you" — tanishganimdan mamnunman degani.',
        category: 'Everyday English',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      },
      {
        id: 'q_l_a1_2',
        type: 'fill_blank',
        question: 'Hello! My name ___ Jasur.',
        questionUz: 'Bo‘sh o‘ringa to‘g‘ri so‘zni qo‘ying:',
        options: ['is', 'are', 'am', 'be'],
        correctAnswer: 'is',
        explanation: '"My name" is singular third-person, requiring "is".',
        explanationUz: '"My name" birlikda bo‘lgani uchun "is" olinadi.',
        category: 'Grammar',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      }
    ],
    starReward: 15,
    xpReward: 30
  },
  {
    id: 'l_a1_2',
    level: 'A1',
    order: 2,
    titleEn: 'Everyday Objects & Classroom',
    titleUz: 'Kundalik buyumlar va Sinfxona',
    descriptionEn: 'Name objects around you: book, pen, notebook, desk, computer.',
    descriptionUz: 'Atrofingizdagi buyumlarni inglizcha nomlashni o‘rganing.',
    icon: '🎒',
    durationMinutes: 5,
    slides: [
      {
        id: 's2_1',
        type: 'vocab',
        titleEn: 'Classroom Essentials',
        titleUz: 'Sinfxona buyumlari',
        bodyEn: 'A pen is for writing. A book is for reading. A desk is for studying.',
        bodyUz: 'Pen (ruchka) — yozish uchun. Book (kitob) — o‘qish uchun. Desk (parta/stol) — dars qilish uchun.',
        audioText: 'A pen, a book, a notebook, a desk.'
      }
    ],
    quizQuestions: [
      {
        id: 'q_l_a1_3',
        type: 'word_to_en',
        question: 'Daftar',
        questionUz: '"Daftar" so‘zining inglizchasi qaysi?',
        options: ['Notebook', 'Ruler', 'Pencil', 'Backpack'],
        correctAnswer: 'Notebook',
        explanation: 'A notebook is used for taking notes in class.',
        explanationUz: '"Daftar" ingliz tilida "Notebook" deb ataladi.',
        category: 'School',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      }
    ],
    starReward: 15,
    xpReward: 30
  },
  {
    id: 'l_a1_3',
    level: 'A1',
    order: 3,
    titleEn: 'My Loving Family',
    titleUz: 'Mening Mehribon Oilam',
    descriptionEn: 'Talk about father, mother, brother, sister, and grandparents.',
    descriptionUz: 'Ota, ona, aka-uka, opa-singil va bobo-buvilar haqida so‘zlash.',
    icon: '👨‍👩‍👧‍👦',
    durationMinutes: 6,
    slides: [
      {
        id: 's3_1',
        type: 'concept',
        titleEn: 'Family Members',
        titleUz: 'Oila a’zolari',
        bodyEn: 'Parents = Father + Mother. Siblings = Brothers + Sisters.',
        bodyUz: 'Parents — ota-ona. Siblings — aka-uka va opa-singillar.',
        audioText: 'Father, mother, brother, sister, grandfather, grandmother.'
      }
    ],
    quizQuestions: [
      {
        id: 'q_l_a1_4',
        type: 'fill_blank',
        question: 'My father and mother are my ___.',
        questionUz: 'Otam va onam mening ___ hisoblanadi.',
        options: ['parents', 'children', 'cousins', 'teachers'],
        correctAnswer: 'parents',
        explanation: 'Father and mother together are called parents.',
        explanationUz: 'Ota va ona birgalikda "parents" deyiladi.',
        category: 'Family',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      }
    ],
    starReward: 15,
    xpReward: 30
  },
  {
    id: 'l_a1_4',
    level: 'A1',
    order: 4,
    titleEn: 'Colors & Numbers Celebration',
    titleUz: 'Ranglar va Raqamlar bayrami',
    descriptionEn: 'Master numbers from 1 to 100 and vibrant colors.',
    descriptionUz: '1 dan 100 gacha sonlar va ranglar olamini o‘rganing.',
    icon: '🎨',
    durationMinutes: 6,
    slides: [
      {
        id: 's4_1',
        type: 'concept',
        titleEn: 'Expressing Colors and Numbers',
        titleUz: 'Rang va sonlarni ifodalash',
        bodyEn: 'In English, adjectives always go BEFORE nouns: "three red apples", "a golden star".',
        bodyUz: 'Ingliz tilida sifat va sonlar otdan OLDIN keladi: "uchta qizil olma", "oltin yulduz".',
        audioText: 'Three red apples and a bright golden star.'
      }
    ],
    quizQuestions: [
      {
        id: 'q_l_a1_5',
        type: 'correct_sentence',
        question: 'Choose the correct order:',
        questionUz: 'To‘g‘ri so‘z tartibidagi gapni toping:',
        options: [
          'I see two yellow stars.',
          'I see stars two yellow.',
          'I see yellow two stars.',
          'I see two stars yellow.'
        ],
        correctAnswer: 'I see two yellow stars.',
        explanation: 'Number + Adjective + Noun: "two yellow stars".',
        explanationUz: 'Son + Sifat + Ot tartibi to‘g‘ri: "two yellow stars".',
        category: 'Grammar',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      }
    ],
    starReward: 20,
    xpReward: 40
  },

  // ================= A2 ELEMENTARY =================
  {
    id: 'l_a2_1',
    level: 'A2',
    order: 1,
    titleEn: 'Daily Routines & Habits',
    titleUz: 'Kun tartibi va Odatlar',
    descriptionEn: 'Describe waking up, having breakfast, going to work/school, and relaxing.',
    descriptionUz: 'Uyg‘onish, nonushta qilish, ishga yoki maktabga borish haqida gapiring.',
    icon: '⏰',
    durationMinutes: 7,
    slides: [
      {
        id: 's_a2_1',
        type: 'concept',
        titleEn: 'Routine Verbs',
        titleUz: 'Kunlik harakat fe’llari',
        bodyEn: 'Wake up, brush teeth, have breakfast, catch the bus, study English.',
        bodyUz: 'Wake up (uyg‘onmoq), have breakfast (nonushta qilmoq), study (o‘rganmoq).',
        audioText: 'I wake up at seven and have breakfast with my family.'
      }
    ],
    quizQuestions: [
      {
        id: 'q_l_a2_1',
        type: 'fill_blank',
        question: 'He usually ___ up at 7 o’clock in the morning.',
        questionUz: 'U odatda ertalab soat 7 da uyg‘onadi:',
        options: ['wakes', 'wake', 'waking', 'waked'],
        correctAnswer: 'wakes',
        explanation: 'Present Simple with "He" adds -s: wakes up.',
        explanationUz: '"He" bilan Present Simple da fe’lga -s qo‘shiladi.',
        category: 'Grammar',
        difficulty: 'medium',
        rewardStars: 10,
        rewardXp: 20
      }
    ],
    starReward: 20,
    xpReward: 40
  },
  {
    id: 'l_a2_2',
    level: 'A2',
    order: 2,
    titleEn: 'Ordering Food in a Restaurant',
    titleUz: 'Restoranda taom buyurtma qilish',
    descriptionEn: 'Polite requests: "I would like...", "Could I have...", "The bill please".',
    descriptionUz: 'Xushmuomala iboralar orqali taom buyurtma qilishni o‘rganing.',
    icon: '🍕',
    durationMinutes: 7,
    slides: [
      {
        id: 's_a2_2',
        type: 'dialogue',
        titleEn: 'At the Cafe',
        titleUz: 'Kafeda',
        bodyEn: 'Waiter: "What would you like to drink?"\nCustomer: "Could I have a cup of green tea and an apple pie, please?"',
        bodyUz: 'Ofitsiant: "Nima ichishni xohlaysiz?"\nMijoz: "Iltimos, bir chashka ko‘k choy va olma pirogi bersangiz."',
        audioText: 'Could I have a cup of green tea, please?'
      }
    ],
    quizQuestions: [
      {
        id: 'q_l_a2_2',
        type: 'translation',
        question: 'Could I have the bill, please?',
        questionUz: 'Ushbu xushmuomala jumlani tarjima qiling:',
        options: ['Hisobni bersangiz, iltimos', 'Menyu bormi?', 'Bu yer qayer?', 'Choy bering'],
        correctAnswer: 'Hisobni bersangiz, iltimos',
        explanation: '"Could I have the bill, please?" is standard polite English for asking to pay.',
        explanationUz: 'Restoranda hisob-kitobni so‘rashning eng xushmuomala usuli.',
        category: 'Everyday English',
        difficulty: 'medium',
        rewardStars: 10,
        rewardXp: 20
      }
    ],
    starReward: 20,
    xpReward: 40
  },

  // ================= B1 INTERMEDIATE =================
  {
    id: 'l_b1_1',
    level: 'B1',
    order: 1,
    titleEn: 'Travel & Exploring the World',
    titleUz: 'Sayohat va Dunyo bo‘ylab sarguzashtlar',
    descriptionEn: 'Airport procedures, hotel check-in, and giving directions abroad.',
    descriptionUz: 'Aeroport jarayonlari, mehmonxona va chet elda yo‘nalish so‘rash.',
    icon: '✈️',
    durationMinutes: 8,
    slides: [
      {
        id: 's_b1_1',
        type: 'concept',
        titleEn: 'Navigating Travel',
        titleUz: 'Sayohat iboralari',
        bodyEn: 'Boarding pass, departure gate, currency exchange, sightseeing landmarks.',
        bodyUz: 'Boarding pass (qo‘nish taloni), gate (darvoza), landmarks (diqqatga sazovor joylar).',
        audioText: 'Please proceed to gate number four with your boarding pass.'
      }
    ],
    quizQuestions: [
      {
        id: 'q_l_b1_1',
        type: 'translation',
        question: 'Boarding pass',
        questionUz: 'Ushbu aeroport atamasining ma’nosi:',
        options: ['Samolyotga chiqish taloni', 'Chipta narxi', 'Pasport nazorati', 'Yuk bo‘limi'],
        correctAnswer: 'Samolyotga chiqish taloni',
        explanation: 'A boarding pass allows a passenger to board an airplane.',
        explanationUz: 'Samolyotga chiqish huquqini beruvchi rasmiy talon.',
        category: 'Travel',
        difficulty: 'medium',
        rewardStars: 10,
        rewardXp: 20
      }
    ],
    starReward: 25,
    xpReward: 50
  },

  // ================= B2 UPPER INTERMEDIATE =================
  {
    id: 'l_b2_1',
    level: 'B2',
    order: 1,
    titleEn: 'Academic & Professional Debates',
    titleUz: 'Ilmiy va Kasbiy Bahs-munozaralar',
    descriptionEn: 'Formulate persuasive arguments, counter-arguments, and express nuances.',
    descriptionUz: 'Ishonarli dalillar keltirish, o‘z fikrini asoslash va muhokama qilish.',
    icon: '🎓',
    durationMinutes: 10,
    slides: [
      {
        id: 's_b2_1',
        type: 'concept',
        titleEn: 'Persuasive Connectors',
        titleUz: 'Bog‘lovchi va asoslovchi iboralar',
        bodyEn: 'Furthermore, consequently, nevertheless, in contrast, from my perspective.',
        bodyUz: 'Furthermore (bundan tashqari), nevertheless (shunga qaramay), from my perspective (mening nuqtai nazarimdan).',
        audioText: 'Nevertheless, from my perspective, consistent practice yields outstanding results.'
      }
    ],
    quizQuestions: [
      {
        id: 'q_l_b2_1',
        type: 'correct_sentence',
        question: 'Choose the sentence with correct advanced linking word:',
        questionUz: 'Bog‘lovchi so‘z to‘g‘ri qo‘llangan gapni toping:',
        options: [
          'Nevertheless, he decided to pursue his studies abroad.',
          'Nevertheless he to decided pursue studies abroad.',
          'Despite he decided to pursue his studies.',
          'Although of his studies abroad, he worked.'
        ],
        correctAnswer: 'Nevertheless, he decided to pursue his studies abroad.',
        explanation: '"Nevertheless" is followed by a comma and a full independent clause.',
        explanationUz: '"Nevertheless" dan keyin vergul va to‘liq mustaqil gap keladi.',
        category: 'Everyday English',
        difficulty: 'hard',
        rewardStars: 15,
        rewardXp: 30
      }
    ],
    starReward: 30,
    xpReward: 60
  }
];
