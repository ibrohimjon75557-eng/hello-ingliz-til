import { GrammarLesson } from '../types';

export const grammarLessons: GrammarLesson[] = [
  {
    id: 'g_pronouns',
    order: 1,
    titleEn: 'Personal Pronouns (I / You / He / She / It)',
    titleUz: 'Kishilik olmoshlari (I / You / He / She / It)',
    level: 'A1',
    icon: '👤',
    summaryEn: 'Learn how to refer to people and objects using subject pronouns.',
    summaryUz: 'Odamlar va narsalarni olmoshlar orqali ifodalashni o‘rganing.',
    explanationEn: 'Subject pronouns replace nouns as the subject of a sentence. In English, pronouns are essential because verbs must have a subject.',
    explanationUz: 'Kishilik olmoshlari gapda otlarning o‘rnini bosadi va ega vazifasida keladi. Ingliz tilida har bir gapda ega bo‘lishi shart.',
    rules: [
      {
        titleEn: 'Singular Pronouns',
        titleUz: 'Birlikdagi olmoshlar',
        pattern: 'I (Men), You (Sen/Siz), He (U - erkak), She (U - ayol), It (U - jonsiz/hayvon)',
        ruleExplanationEn: 'Use He for male persons, She for female persons, and It for objects or animals.',
        ruleExplanationUz: 'He — o‘g‘il bola yoki erkak kishiga, She — qiz yoki ayol kishiga, It — jonsiz narsalar va hayvonlarga ishlatiladi.',
        examples: [
          { en: 'He is my English teacher.', uz: 'U mening ingliz tili o‘qituvchim.' },
          { en: 'She likes reading books.', uz: 'U kitob o‘qishni yaxshi ko‘radi.' },
          { en: 'It is a sunny day in Tashkent.', uz: 'Toshkentda quyoshli kun.' }
        ]
      },
      {
        titleEn: 'Plural Pronouns',
        titleUz: 'Ko‘plikdagi olmoshlar',
        pattern: 'We (Biz), You (Sizlar), They (Ular)',
        ruleExplanationEn: 'They is used for any group of people or objects in the plural.',
        ruleExplanationUz: 'They kishilar yoki jonsiz narsalarning ko‘pligi uchun ishlatiladi.',
        examples: [
          { en: 'We are learning English together.', uz: 'Biz birgalikda ingliz tilini o‘rganyapmiz.' },
          { en: 'They live in Samarkand.', uz: 'Ular Samarqandda yashaydilar.' }
        ]
      }
    ],
    practiceQuestions: [
      {
        id: 'gq_1',
        type: 'fill_blank',
        question: '___ is my sister. Her name is Malika.',
        questionUz: '___ mening singlim. Uning ismi Malika.',
        options: ['She', 'He', 'It', 'They'],
        correctAnswer: 'She',
        explanation: 'We use "She" because Malika is female.',
        explanationUz: 'Malika ayol kishi bo‘lgani sababli "She" ishlatiladi.',
        category: 'Grammar',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      },
      {
        id: 'gq_2',
        type: 'fill_blank',
        question: 'Look at the cat! ___ is playing with a ball.',
        questionUz: 'Mushukka qara! ___ koptok bilan o‘ynayapti.',
        options: ['It', 'He', 'She', 'You'],
        correctAnswer: 'It',
        explanation: 'We refer to animals with "It" in basic English.',
        explanationUz: 'Hayvonlar va jonsiz narsalarga odatda "It" olmoshi qo‘llanadi.',
        category: 'Grammar',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      }
    ],
    starReward: 10,
    xpReward: 25
  },
  {
    id: 'g_tobe',
    order: 2,
    titleEn: 'To Be (Am / Is / Are)',
    titleUz: 'To Be fe’li (Am / Is / Are)',
    level: 'A1',
    icon: '⚡',
    summaryEn: 'Express identity, location, and states using am, is, and are.',
    summaryUz: 'Shaxs, holat va joylashuvni ifodalovchi to be fe’lini o‘rganing.',
    explanationEn: 'The verb "to be" tells us who someone is, where they are, or how they feel.',
    explanationUz: '"To be" fe’li o‘zbek tilidagi "-man, -san, -dir, -miz, -siz" qo‘shimchalariga to‘g‘ri keladi.',
    rules: [
      {
        titleEn: 'Forms of To Be',
        titleUz: 'To be shakllari',
        pattern: 'I + am | He/She/It + is | You/We/They + are',
        ruleExplanationEn: 'Always match the subject with its correct form.',
        ruleExplanationUz: 'Ega bilan to be shaklini doimo to‘g‘ri moslashtirish lozim.',
        examples: [
          { en: 'I am a student.', uz: 'Men talabaman / o‘quvchiman.' },
          { en: 'She is very smart.', uz: 'U juda aqlli.' },
          { en: 'They are in London.', uz: 'Ular Londonda.' }
        ]
      }
    ],
    practiceQuestions: [
      {
        id: 'gq_3',
        type: 'fill_blank',
        question: 'I ___ ready to practice English!',
        questionUz: 'Men ingliz tilini mashq qilishga tayyorman!',
        options: ['am', 'is', 'are', 'be'],
        correctAnswer: 'am',
        explanation: '"I" always takes "am" in present tense.',
        explanationUz: '"I" olmoshi hozirgi zamonda doimo "am" oladi.',
        category: 'Grammar',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      },
      {
        id: 'gq_4',
        type: 'fill_blank',
        question: 'We ___ happy to see you.',
        questionUz: 'Biz sizni ko‘rganimizdan xursandmiz.',
        options: ['are', 'is', 'am', 'was'],
        correctAnswer: 'are',
        explanation: '"We" is plural and takes "are".',
        explanationUz: '"We" ko‘plik bo‘lgani uchun "are" ishlatiladi.',
        category: 'Grammar',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      }
    ],
    starReward: 10,
    xpReward: 25
  },
  {
    id: 'g_presentsimple',
    order: 3,
    titleEn: 'Present Simple',
    titleUz: 'Oddiy hozirgi zamon (Present Simple)',
    level: 'A1',
    icon: '🔄',
    summaryEn: 'Talk about daily habits, routines, and general facts.',
    summaryUz: 'Kunlik odatlar, takrorlanuvchi ish-harakatlar va umumiy haqiqatlar.',
    explanationEn: 'Present Simple is used for things you do regularly or facts that are always true.',
    explanationUz: 'Present Simple har kuni, tez-tez yoki odat tusiga kirgan ish-harakatlar uchun ishlatiladi.',
    rules: [
      {
        titleEn: 'Third Person Singular (He / She / It + verb + s/es)',
        titleUz: 'Uchinchi shaxs birlikda fe’lga -s/-es qo‘shilishi',
        pattern: 'He/She/It + Verb(s/es)',
        ruleExplanationEn: 'When the subject is he, she, or it, add -s or -es to the base verb.',
        ruleExplanationUz: 'Agar ega He, She yoki It bo‘lsa, fe’l oxiriga -s yoki -es qo‘shiladi.',
        examples: [
          { en: 'He plays football every Saturday.', uz: 'U har shanba kuni futbol o‘ynaydi.' },
          { en: 'I speak English and Uzbek.', uz: 'Men ingliz va o‘zbek tillarida gapiraman.' }
        ]
      }
    ],
    practiceQuestions: [
      {
        id: 'gq_5',
        type: 'fill_blank',
        question: 'She ___ English vocabulary every day.',
        questionUz: 'U har kuni ingliz tili lug‘atini o‘rganadi.',
        options: ['learns', 'learn', 'learning', 'learned'],
        correctAnswer: 'learns',
        explanation: 'With "She", we add -s to the verb in Present Simple.',
        explanationUz: '"She" bilan Present Simple zamonida fe’lga -s qo‘shiladi.',
        category: 'Grammar',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      }
    ],
    starReward: 10,
    xpReward: 25
  },
  {
    id: 'g_presentcont',
    order: 4,
    titleEn: 'Present Continuous',
    titleUz: 'Hozirgi davomli zamon (Present Continuous)',
    level: 'A2',
    icon: '⏳',
    summaryEn: 'Actions happening right now at the moment of speaking.',
    summaryUz: 'Aynan ayni daqiqada sodir bo‘layotgan ish-harakatlar.',
    explanationEn: 'Use am/is/are + verb-ing to describe actions happening right now.',
    explanationUz: 'Ayni damda davom etayotgan harakatlar to be (am/is/are) + fe’l + -ing orqali yasaladi.',
    rules: [
      {
        titleEn: 'Structure',
        titleUz: 'Tuzilishi',
        pattern: 'Subject + am/is/are + Verb-ing',
        ruleExplanationEn: 'I am reading, He is writing, They are watching.',
        ruleExplanationUz: 'Ega + am/is/are + fe’l + -ing.',
        examples: [
          { en: 'I am studying English right now.', uz: 'Men ayni paytda ingliz tilini o‘rganyapman.' },
          { en: 'They are listening to music.', uz: 'Ular musiqa tinglayaptilar.' }
        ]
      }
    ],
    practiceQuestions: [
      {
        id: 'gq_6',
        type: 'fill_blank',
        question: 'Look! It ___ outside.',
        questionUz: 'Qara! Tashqarida yomg‘ir yog‘yapti.',
        options: ['is raining', 'rains', 'rained', 'rain'],
        correctAnswer: 'is raining',
        explanation: '"Look!" signals an action occurring right now: is raining.',
        explanationUz: '"Look!" hozir sodir bo‘layotgan harakatni bildiradi: is raining.',
        category: 'Grammar',
        difficulty: 'medium',
        rewardStars: 5,
        rewardXp: 10
      }
    ],
    starReward: 10,
    xpReward: 25
  },
  {
    id: 'g_pastsimple',
    order: 5,
    titleEn: 'Past Simple',
    titleUz: 'O‘tgan oddiy zamon (Past Simple)',
    level: 'A2',
    icon: '🕰️',
    summaryEn: 'Actions that started and finished in the past.',
    summaryUz: 'O‘tmishda tugallangan aniq ish-harakatlar.',
    explanationEn: 'For regular verbs, add -ed. Irregular verbs have unique past forms (go -> went, see -> saw).',
    explanationUz: 'To‘g‘ri fe’llarga -ed qo‘shiladi, noto‘g‘ri fe’llar esa maxsus shaklga ega (go -> went, see -> saw).',
    rules: [
      {
        titleEn: 'Regular & Irregular Verbs',
        titleUz: 'To‘g‘ri va noto‘g‘ri fe’llar',
        pattern: 'Verb + ed OR 2nd form of irregular verb',
        ruleExplanationEn: 'Yesterday, last week, and ago are common time expressions.',
        ruleExplanationUz: 'Yesterday (kecha), last week (o‘tgan hafta) kabi so‘zlar bilan keladi.',
        examples: [
          { en: 'I visited Samarkand last summer.', uz: 'Men o‘tgan yozda Samarqandni ziyorat qildim.' },
          { en: 'She went to school yesterday.', uz: 'U kecha maktabga bordi.' }
        ]
      }
    ],
    practiceQuestions: [
      {
        id: 'gq_7',
        type: 'fill_blank',
        question: 'Yesterday, we ___ a great English movie.',
        questionUz: 'Kecha biz ajoyib inglizcha kino ko‘rdik.',
        options: ['watched', 'watch', 'watching', 'watches'],
        correctAnswer: 'watched',
        explanation: '"Yesterday" requires Past Simple: watched.',
        explanationUz: '"Yesterday" o‘tgan zamon bo‘lgani uchun "watched" tanlanadi.',
        category: 'Grammar',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      }
    ],
    starReward: 10,
    xpReward: 25
  },
  {
    id: 'g_future',
    order: 6,
    titleEn: 'Future (Will & Going to)',
    titleUz: 'Kelasi zamon (Will va Be going to)',
    level: 'A2',
    icon: '🚀',
    summaryEn: 'Predictions, promises, and future plans.',
    summaryUz: 'Kelajakdagi rejalar, bashoratlar va niyatlar.',
    explanationEn: 'Use "will" for spontaneous decisions and promises. Use "be going to" for intentions and planned actions.',
    explanationUz: '"Will" to‘satdan qabul qilingan qarorlar uchun, "be going to" esa oldindan rejalashtirilgan ishlar uchun ishlatiladi.',
    rules: [
      {
        titleEn: 'Will + Base Verb',
        titleUz: 'Will + fe’l',
        pattern: 'Subject + will + Verb',
        ruleExplanationEn: 'Will never changes regardless of the subject pronoun.',
        ruleExplanationUz: 'Will barcha shaxslar uchun bir xil o‘zgarmas qoladi.',
        examples: [
          { en: 'I will help you with your homework.', uz: 'Men senga uy vazifangda yordam beraman.' },
          { en: 'We are going to travel next month.', uz: 'Biz keyingi oyda sayohat qilmoqchimiz.' }
        ]
      }
    ],
    practiceQuestions: [
      {
        id: 'gq_8',
        type: 'fill_blank',
        question: 'I promise I ___ call you tomorrow.',
        questionUz: 'Va’da beraman, ertaga senga qo‘ng‘iroq qilaman.',
        options: ['will', 'am', 'did', 'was'],
        correctAnswer: 'will',
        explanation: 'Promises take "will": I will call you.',
        explanationUz: 'Va’dalar va kelajakdagi harakatlar uchun "will" qo‘llanadi.',
        category: 'Grammar',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      }
    ],
    starReward: 10,
    xpReward: 25
  },
  {
    id: 'g_havehas',
    order: 7,
    titleEn: 'Have / Has (Possession)',
    titleUz: 'Have / Has (Egalik ifodalash)',
    level: 'A1',
    icon: '🎒',
    summaryEn: 'Show ownership and relationships.',
    summaryUz: 'Biror narsaga egalik yoki munosabatni ifodalash.',
    explanationEn: 'I/You/We/They have. He/She/It has.',
    explanationUz: 'I/You/We/They uchun have, He/She/It uchun has ishlatiladi.',
    rules: [
      {
        titleEn: 'Have vs Has',
        titleUz: 'Have va Has farqi',
        pattern: 'Have (I, you, we, they) / Has (he, she, it)',
        ruleExplanationEn: 'Use has for third person singular subjects.',
        ruleExplanationUz: 'Uchinchi shaxs birlik uchun has qo‘llaniladi.',
        examples: [
          { en: 'I have an English dictionary.', uz: 'Menda inglizcha lug‘at bor.' },
          { en: 'She has two brothers.', uz: 'Uning ikkita akasi bor.' }
        ]
      }
    ],
    practiceQuestions: [
      {
        id: 'gq_9',
        type: 'fill_blank',
        question: 'He ___ a fast bicycle.',
        questionUz: 'Uning tez yurar velosipedi bor.',
        options: ['has', 'have', 'having', 'is'],
        correctAnswer: 'has',
        explanation: '"He" takes "has" for possession.',
        explanationUz: '"He" uchinchi shaxs bo‘lgani uchun "has" qo‘yiladi.',
        category: 'Grammar',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      }
    ],
    starReward: 10,
    xpReward: 25
  },
  {
    id: 'g_can',
    order: 8,
    titleEn: 'Can / Can’t (Ability & Permission)',
    titleUz: 'Can / Can’t (Qobiliyat va ruxsat)',
    level: 'A1',
    icon: '💪',
    summaryEn: 'Talk about what you are able to do.',
    summaryUz: 'Qo‘lingizdan nima kelishini va nima qila olishingizni ifodalash.',
    explanationEn: '"Can" expresses ability. The negative form is "cannot" or "can\'t". Always followed by a bare infinitive.',
    explanationUz: '"Can" - qila olmoq, bajara olmoq. Inkor shakli can’t. Undan keyin asosiy fe’l o‘zgarishsiz keladi.',
    rules: [
      {
        titleEn: 'Can + Base Verb',
        titleUz: 'Can + oddiy fe’l',
        pattern: 'Subject + can + Verb',
        ruleExplanationEn: 'Do not add -s or -to after can.',
        ruleExplanationUz: 'Can dan so‘ng to qo‘shimchasi yoki -s qo‘shilmaydi.',
        examples: [
          { en: 'I can speak three languages.', uz: 'Men uchta tilda gaplasha olaman.' },
          { en: 'He can’t swim yet.', uz: 'U hali suza olmaydi.' }
        ]
      }
    ],
    practiceQuestions: [
      {
        id: 'gq_10',
        type: 'fill_blank',
        question: 'She can ___ the piano beautifully.',
        questionUz: 'U pianinoni juda chiroyli chala oladi.',
        options: ['play', 'plays', 'playing', 'to play'],
        correctAnswer: 'play',
        explanation: 'Modal verb "can" is followed by bare verb: play.',
        explanationUz: '"Can" dan so‘ng sof fe’l (play) ishlatiladi.',
        category: 'Grammar',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      }
    ],
    starReward: 10,
    xpReward: 25
  },
  {
    id: 'g_thereis',
    order: 9,
    titleEn: 'There is / There are',
    titleUz: 'There is / There are (Mavjudlik)',
    level: 'A1',
    icon: '📍',
    summaryEn: 'State the existence of people or objects in a place.',
    summaryUz: 'Biror joyda biror narsa yoki kishi mavjudligini bildirish.',
    explanationEn: 'Use "There is" for one singular item or uncountable nouns. Use "There are" for plural items.',
    explanationUz: 'Birlikdagi narsalar uchun "There is", ko‘plikdagi narsalar uchun "There are" ishlatiladi.',
    rules: [
      {
        titleEn: 'Singular vs Plural',
        titleUz: 'Birlik va ko‘plik',
        pattern: 'There is a/an [singular] | There are [plural]',
        ruleExplanationEn: 'There is a book on the desk. There are five books on the desk.',
        ruleExplanationUz: 'Stol ustida kitob bor (There is). Stol ustida 5 ta kitob bor (There are).',
        examples: [
          { en: 'There is a computer in the classroom.', uz: 'Sinfxonada kompyuter bor.' },
          { en: 'There are twenty students here.', uz: 'Bu yerda yigirmata o‘quvchi bor.' }
        ]
      }
    ],
    practiceQuestions: [
      {
        id: 'gq_11',
        type: 'fill_blank',
        question: '___ many stars in the sky tonight.',
        questionUz: 'Bugun tunda osmonda juda ko‘p yulduzlar bor.',
        options: ['There are', 'There is', 'It is', 'They are'],
        correctAnswer: 'There are',
        explanation: '"Many stars" is plural, so use "There are".',
        explanationUz: '"Many stars" (ko‘p yulduzlar) ko‘plik bo‘lgani sababli "There are" qo‘yiladi.',
        category: 'Grammar',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      }
    ],
    starReward: 10,
    xpReward: 25
  },
  {
    id: 'g_articles',
    order: 10,
    titleEn: 'Articles (A / An / The)',
    titleUz: 'Artikllar (A / An / The)',
    level: 'A1',
    icon: '📰',
    summaryEn: 'Learn indefinite (a/an) and definite (the) articles.',
    summaryUz: 'Noaniq (a/an) va aniq (the) artikllarini to‘g‘ri qo‘llash.',
    explanationEn: 'Use "a" before consonant sounds, "an" before vowel sounds. Use "the" when speaking of a specific item.',
    explanationUz: 'Undosh tovushlar oldidan "a", unli tovushlar oldidan "an", aniq ma’lum narsalar oldidan "the" qo‘yiladi.',
    rules: [
      {
        titleEn: 'A vs An',
        titleUz: 'A va An farqi',
        pattern: 'a + consonant sound | an + vowel sound',
        ruleExplanationEn: 'a book, a cat, an apple, an hour (h is silent!).',
        ruleExplanationUz: 'a book, a dog, an apple, an elephant, an umbrella.',
        examples: [
          { en: 'I want to eat an orange.', uz: 'Men apelsin yeyishni xohlayman.' },
          { en: 'He bought a new car.', uz: 'U yangi mashina sotib oldi.' }
        ]
      }
    ],
    practiceQuestions: [
      {
        id: 'gq_12',
        type: 'fill_blank',
        question: 'She is eating ___ apple.',
        questionUz: 'U olma yemoqda.',
        options: ['an', 'a', 'the', 'no article'],
        correctAnswer: 'an',
        explanation: '"Apple" begins with a vowel sound, requiring "an".',
        explanationUz: '"Apple" unli tovush bilan boshlanganligi uchun "an" artikli olinadi.',
        category: 'Grammar',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      }
    ],
    starReward: 10,
    xpReward: 25
  },
  {
    id: 'g_plurals',
    order: 11,
    titleEn: 'Plurals (-s, -es & Irregular)',
    titleUz: 'Otlarning ko‘pligi (-s, -es va Noto‘g‘ri)',
    level: 'A1',
    icon: '👥',
    summaryEn: 'Convert singular nouns into their plural forms.',
    summaryUz: 'Birlikdagi otlarni ko‘plik shakliga o‘tkazish.',
    explanationEn: 'Most nouns add -s (book -> books). Nouns ending in ch, sh, ss, x add -es. Some nouns are irregular (child -> children).',
    explanationUz: 'Ko‘p otlarga -s qo‘shiladi (cat -> cats). Ch, sh, s, x bilan tugasa -es qo‘shiladi. Noto‘g‘ri otlar o‘zagi o‘zgaradi (child -> children, person -> people).',
    rules: [
      {
        titleEn: 'Irregular Plurals',
        titleUz: 'Noto‘g‘ri ko‘pliklar',
        pattern: 'man -> men, child -> children, tooth -> teeth',
        ruleExplanationEn: 'Do not add -s to irregular plurals!',
        ruleExplanationUz: 'Noto‘g‘ri otlarga -s qo‘shilmaydi, o‘zagi o‘zgaradi.',
        examples: [
          { en: 'The children are playing outside.', uz: 'Bolalar tashqarida o‘ynashyapti.' },
          { en: 'There are five boxes on the shelf.', uz: 'Javonda beshta quti bor.' }
        ]
      }
    ],
    practiceQuestions: [
      {
        id: 'gq_13',
        type: 'fill_blank',
        question: 'There are five ___ in the park.',
        questionUz: 'Bog‘da beshta bola bor.',
        options: ['children', 'childs', 'child', 'childrens'],
        correctAnswer: 'children',
        explanation: 'Plural of "child" is "children".',
        explanationUz: '"Child" so‘zining ko‘pligi "children" bo‘ladi.',
        category: 'Grammar',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      }
    ],
    starReward: 10,
    xpReward: 25
  },
  {
    id: 'g_prepositions',
    order: 12,
    titleEn: 'Basic Prepositions (In, On, At, Under)',
    titleUz: 'Oddiy predloglar (In, On, At, Under)',
    level: 'A2',
    icon: '📦',
    summaryEn: 'Specify places, locations, and time positions.',
    summaryUz: 'Joy va vaqt o‘rnini ko‘rsatuvchi predloglar.',
    explanationEn: '"In" (inside/cities), "On" (surfaces/days), "At" (exact points/times), "Under" (beneath).',
    explanationUz: '"In" — ichida/shaharlar oldidan, "On" — ustida/kunlar oldidan, "At" — aniq soat/joyda, "Under" — ostida.',
    rules: [
      {
        titleEn: 'Time and Place Rules',
        titleUz: 'Vaqt va makon qoidalari',
        pattern: 'at 5 PM, on Monday, in the room, under the table',
        ruleExplanationEn: 'Always use "at" for exact clock times, "on" for days of the week.',
        ruleExplanationUz: 'Soat vaqtlari uchun "at", hafta kunlari uchun "on" qo‘llaniladi.',
        examples: [
          { en: 'Our lesson starts at 9:00 AM.', uz: 'Darsimiz soat 9:00 da boshlanadi.' },
          { en: 'The pen is on the desk.', uz: 'Ruchka stol ustida.' }
        ]
      }
    ],
    practiceQuestions: [
      {
        id: 'gq_14',
        type: 'fill_blank',
        question: 'We meet ___ Mondays to study.',
        questionUz: 'Biz dars qilish uchun dushanba kunlari uchrashamiz.',
        options: ['on', 'in', 'at', 'under'],
        correctAnswer: 'on',
        explanation: 'Days of the week always take "on": on Mondays.',
        explanationUz: 'Hafta kunlari oldidan "on" predlogi qo‘yiladi: on Mondays.',
        category: 'Grammar',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      }
    ],
    starReward: 10,
    xpReward: 25
  },
  {
    id: 'g_questionwords',
    order: 13,
    titleEn: 'Question Words (Who, What, Where, When, Why, How)',
    titleUz: 'So‘roq so‘zlari (Who, What, Where, When, Why, How)',
    level: 'A2',
    icon: '❓',
    summaryEn: 'Ask informative questions using WH- words.',
    summaryUz: 'So‘roq so‘zlari yordamida to‘g‘ri savol berishni o‘rganing.',
    explanationEn: 'Who (kim), What (nima), Where (qayerda), When (qachon), Why (nega), How (qanday).',
    explanationUz: 'Who — shaxs, What — narsa, Where — joy, When — vaqt, Why — sabab, How — usul so‘rash uchun ishlatiladi.',
    rules: [
      {
        titleEn: 'WH- Question Structure',
        titleUz: 'So‘roq gap tuzilishi',
        pattern: 'WH- word + auxiliary verb + subject + main verb?',
        ruleExplanationEn: 'Where do you live? Why are you laughing? What is your name?',
        ruleExplanationUz: 'So‘roq so‘zi + yordamchi fe’l + ega + asosiy fe’l?',
        examples: [
          { en: 'Where is the library?', uz: 'Kutubxona qayerda joylashgan?' },
          { en: 'Why are you learning English?', uz: 'Nega siz ingliz tilini o‘rganyapsiz?' }
        ]
      }
    ],
    practiceQuestions: [
      {
        id: 'gq_15',
        type: 'fill_blank',
        question: '___ is your favorite English teacher?',
        questionUz: 'Sizning sevimli ingliz tili o‘qituvchingiz kim?',
        options: ['Who', 'What', 'Where', 'When'],
        correctAnswer: 'Who',
        explanation: '"Who" asks about a person.',
        explanationUz: 'Kishi yoki shaxs haqida so‘rash uchun "Who" (Kim) ishlatiladi.',
        category: 'Grammar',
        difficulty: 'easy',
        rewardStars: 5,
        rewardXp: 10
      }
    ],
    starReward: 10,
    xpReward: 25
  }
];
