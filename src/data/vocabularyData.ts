import { VocabularyWord } from '../types';

export const initialVocabulary: VocabularyWord[] = [
  // Animals
  {
    id: 'v_anim_1',
    word: 'Lion',
    uzbek: 'Sher, arslon',
    phonetic: '/ˈlaɪ.ən/',
    category: 'Animals',
    exampleEn: 'The lion is known as the king of the jungle.',
    exampleUz: 'Sher o‘rmon podshosi sifatida tanilgan.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_anim_2',
    word: 'Eagle',
    uzbek: 'Burgut',
    phonetic: '/ˈiː.ɡəl/',
    category: 'Animals',
    exampleEn: 'An eagle flies high in the clear blue sky.',
    exampleUz: 'Burgut moviy musaffo osmonda baland uchadi.',
    difficulty: 'medium',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_anim_3',
    word: 'Dolphin',
    uzbek: 'Delfin',
    phonetic: '/ˈdɒl.fɪn/',
    category: 'Animals',
    exampleEn: 'Dolphins are very intelligent ocean mammals.',
    exampleUz: 'Delfinlar juda aqlli okean sutemizuvchilaridir.',
    difficulty: 'medium',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_anim_4',
    word: 'Horse',
    uzbek: 'Ot',
    phonetic: '/hɔːs/',
    category: 'Animals',
    exampleEn: 'He can ride a horse very well.',
    exampleUz: 'U otni juda yaxshi minadi.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_anim_5',
    word: 'Rabbit',
    uzbek: 'Quyon',
    phonetic: '/ˈræb.ɪt/',
    category: 'Animals',
    exampleEn: 'The small white rabbit hops in the green grass.',
    exampleUz: 'Kichkina oq quyon yashil o‘tlar orasida sakraydi.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },

  // Food
  {
    id: 'v_food_1',
    word: 'Apple',
    uzbek: 'Olma',
    phonetic: '/ˈæp.əl/',
    category: 'Food',
    exampleEn: 'I eat a fresh red apple every morning.',
    exampleUz: 'Men har tong yangi qizil olma yeyman.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_food_2',
    word: 'Bread',
    uzbek: 'Non',
    phonetic: '/bred/',
    category: 'Food',
    exampleEn: 'Fresh bread smells wonderful in the kitchen.',
    exampleUz: 'Yangi yopilgan non oshxonada ajoyib hid taratadi.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_food_3',
    word: 'Honey',
    uzbek: 'Asal',
    phonetic: '/ˈhʌn.i/',
    category: 'Food',
    exampleEn: 'I like putting sweet natural honey in my hot tea.',
    exampleUz: 'Men issiq choyimga shirin tabiiy asal qo‘shishni yoqtiraman.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_food_4',
    word: 'Cheese',
    uzbek: 'Pishloq',
    phonetic: '/tʃiːz/',
    category: 'Food',
    exampleEn: 'This homemade cheese tastes delicious.',
    exampleUz: 'Ushbu uy pishlog‘i juda mazali.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_food_5',
    word: 'Pomegranate',
    uzbek: 'Anor',
    phonetic: '/ˈpɒm.ɪˌɡræn.ɪt/',
    category: 'Food',
    exampleEn: 'Pomegranate juice is rich in vitamins.',
    exampleUz: 'Anor sharbati vitaminlarga juda boy.',
    difficulty: 'medium',
    partOfSpeech: 'noun'
  },

  // Family
  {
    id: 'v_fam_1',
    word: 'Parents',
    uzbek: 'Ota-ona',
    phonetic: '/ˈpeə.rənts/',
    category: 'Family',
    exampleEn: 'My parents always support my English education.',
    exampleUz: 'Ota-onam har doim mening ingliz tili ta’limimni qo‘llab-quvvatlaydilar.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_fam_2',
    word: 'Sibling',
    uzbek: 'Aka-uka yoki opa-singil',
    phonetic: '/ˈsɪb.lɪŋ/',
    category: 'Family',
    exampleEn: 'Do you have any brothers, sisters, or siblings?',
    exampleUz: 'Sizning aka-uka yoki opa-singlingiz bormi?',
    difficulty: 'medium',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_fam_3',
    word: 'Grandmother',
    uzbek: 'Buvijon, buvi',
    phonetic: '/ˈɡræn.mʌð.ər/',
    category: 'Family',
    exampleEn: 'My grandmother bakes the best traditional bread.',
    exampleUz: 'Buvijonim eng mazali milliy nonlarni yopadilar.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },

  // School
  {
    id: 'v_sch_1',
    word: 'Dictionary',
    uzbek: 'Lug‘at kitobi',
    phonetic: '/ˈdɪk.ʃən.ər.i/',
    category: 'School',
    exampleEn: 'Always keep an English-Uzbek dictionary on your desk.',
    exampleUz: 'Stolingiz ustida doimo inglizcha-o‘zbekcha lug‘at tursin.',
    difficulty: 'medium',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_sch_2',
    word: 'Notebook',
    uzbek: 'Daftar',
    phonetic: '/ˈnəʊt.bʊk/',
    category: 'School',
    exampleEn: 'Write down new grammar rules in your notebook.',
    exampleUz: 'Yangi grammatika qoidalarini daftaringizga yozib oling.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_sch_3',
    word: 'Library',
    uzbek: 'Kutubxona',
    phonetic: '/ˈlaɪ.brər.i/',
    category: 'School',
    exampleEn: 'The school library has hundreds of English storybooks.',
    exampleUz: 'Maktab kutubxonasida yuzlab inglizcha qiziqarli kitoblar bor.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },

  // House
  {
    id: 'v_house_1',
    word: 'Balcony',
    uzbek: 'Balkon, ayvon',
    phonetic: '/ˈbæl.kə.ni/',
    category: 'House',
    exampleEn: 'We drink coffee on the balcony in the morning.',
    exampleUz: 'Biz ertalab balkonda qahva ichamiz.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_house_2',
    word: 'Mirror',
    uzbek: 'Oyna, ko‘zgu',
    phonetic: '/ˈmɪr.ər/',
    category: 'House',
    exampleEn: 'There is a large mirror in the hallway.',
    exampleUz: 'Yo‘lakda katta ko‘zgu bor.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },

  // Clothes
  {
    id: 'v_clot_1',
    word: 'Jacket',
    uzbek: 'Kurtka, nimcha',
    phonetic: '/ˈdʒæk.ɪt/',
    category: 'Clothes',
    exampleEn: 'Put on your warm jacket, it is chilly outside.',
    exampleUz: 'Issiq kurtkangizni kiying, tashqarida havo sovuq.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_clot_2',
    word: 'Shoes',
    uzbek: 'Poyabzal, oyoq kiyim',
    phonetic: '/ʃuːz/',
    category: 'Clothes',
    exampleEn: 'Please take off your shoes before entering.',
    exampleUz: 'Iltimos, kirishdan oldin poyabzalingizni yeching.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },

  // Colors
  {
    id: 'v_col_1',
    word: 'Golden',
    uzbek: 'Oltin rang, tilla',
    phonetic: '/ˈɡəʊl.dən/',
    category: 'Colors',
    exampleEn: 'The morning sun cast a bright golden light.',
    exampleUz: 'Ertalabki quyosh yorqin tillarang nur sochdi.',
    difficulty: 'easy',
    partOfSpeech: 'adjective'
  },
  {
    id: 'v_col_2',
    word: 'Emerald',
    uzbek: 'Zumrad yashil',
    phonetic: '/ˈem.ər.əld/',
    category: 'Colors',
    exampleEn: 'The valley looked emerald green after the rain.',
    exampleUz: 'Yomg‘irdan so‘ng vodiy zumrad yashil tusga kirdi.',
    difficulty: 'medium',
    partOfSpeech: 'adjective'
  },

  // Numbers
  {
    id: 'v_num_1',
    word: 'Thousand',
    uzbek: 'Ming',
    phonetic: '/ˈθaʊ.zənd/',
    category: 'Numbers',
    exampleEn: 'One thousand stars are twinkling in the night sky.',
    exampleUz: 'Tungi osmonda minglab yulduzlar miltillamoqda.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_num_2',
    word: 'Hundred',
    uzbek: 'Yuz',
    phonetic: '/ˈhʌn.drəd/',
    category: 'Numbers',
    exampleEn: 'There are one hundred centimeters in a meter.',
    exampleUz: 'Bir metrda bir yuz santimetr bor.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },

  // Days & Months
  {
    id: 'v_day_1',
    word: 'Wednesday',
    uzbek: 'Chorshanba',
    phonetic: '/ˈwenz.deɪ/',
    category: 'Days',
    exampleEn: 'Our English speaking club meets every Wednesday.',
    exampleUz: 'Ingliz tili so‘zlashuv klubimiz har chorshanba yig‘iladi.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_mon_1',
    word: 'September',
    uzbek: 'Sentabr',
    phonetic: '/sepˈtem.bər/',
    category: 'Months',
    exampleEn: 'The new school academic year begins in September.',
    exampleUz: 'Yangi maktab o‘quv yili sentabr oyida boshlanadi.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },

  // Weather
  {
    id: 'v_wea_1',
    word: 'Breeze',
    uzbek: 'Mayin shabada',
    phonetic: '/briːz/',
    category: 'Weather',
    exampleEn: 'A cool gentle breeze made the hot evening pleasant.',
    exampleUz: 'Salqin mayin shabada issiq oqshomni yoqimli qildi.',
    difficulty: 'medium',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_wea_2',
    word: 'Sunny',
    uzbek: 'Quyoshli',
    phonetic: '/ˈsʌn.i/',
    category: 'Weather',
    exampleEn: 'Tashkent has many warm sunny days throughout the year.',
    exampleUz: 'Toshkentda yil davomida ko‘plab iliq quyoshli kunlar bo‘ladi.',
    difficulty: 'easy',
    partOfSpeech: 'adjective'
  },

  // Sports
  {
    id: 'v_spo_1',
    word: 'Champion',
    uzbek: 'Chempion, g‘olib',
    phonetic: '/ˈtʃæm.pi.ən/',
    category: 'Sports',
    exampleEn: 'He trained hard and became an international champion.',
    exampleUz: 'U qattiq mashq qilib, xalqaro chempion bo‘ldi.',
    difficulty: 'medium',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_spo_2',
    word: 'Goal',
    uzbek: 'Darvoza, maqsad, gol',
    phonetic: '/ɡəʊl/',
    category: 'Sports',
    exampleEn: 'Our team scored a fantastic goal in the final minute.',
    exampleUz: 'Jamoamiz so‘nggi daqiqada ajoyib gol urdi.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },

  // Technology
  {
    id: 'v_tech_1',
    word: 'Keyboard',
    uzbek: 'Klaviatura',
    phonetic: '/ˈkiː.bɔːd/',
    category: 'Technology',
    exampleEn: 'You can type English essays faster with a good keyboard.',
    exampleUz: 'Yaxshi klaviatura bilan inglizcha insholarni tezroq yoza olasiz.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_tech_2',
    word: 'Internet',
    uzbek: 'Internet tarmog‘i',
    phonetic: '/ˈɪn.tə.net/',
    category: 'Technology',
    exampleEn: 'The internet allows students worldwide to study together.',
    exampleUz: 'Internet dunyo bo‘ylab o‘quvchilarga birgalikda o‘rganish imkonini beradi.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },

  // Travel
  {
    id: 'v_trav_1',
    word: 'Passport',
    uzbek: 'Pasport',
    phonetic: '/ˈpɑːs.pɔːt/',
    category: 'Travel',
    exampleEn: 'Do not forget to pack your passport before going to the airport.',
    exampleUz: 'Aeroportga borishdan oldin pasportingizni olishni unutmang.',
    difficulty: 'easy',
    partOfSpeech: 'noun'
  },
  {
    id: 'v_trav_2',
    word: 'Luggage',
    uzbek: 'Yuk, chamadon',
    phonetic: '/ˈlʌɡ.ɪdʒ/',
    category: 'Travel',
    exampleEn: 'We collected our luggage at the arrival terminal.',
    exampleUz: 'Biz yuklarimizni yetib kelish zalida qabul qilib oldik.',
    difficulty: 'medium',
    partOfSpeech: 'noun'
  },

  // Common Verbs
  {
    id: 'v_vrb_1',
    word: 'Achieve',
    uzbek: 'Erishmoq, zabt etmoq',
    phonetic: '/əˈtʃiːv/',
    category: 'Common verbs',
    exampleEn: 'With consistent practice, you will achieve your English goals.',
    exampleUz: 'Muntazam mashg‘ulotlar orqali siz ingliz tili maqsadlaringizga erishasiz.',
    difficulty: 'medium',
    partOfSpeech: 'verb'
  },
  {
    id: 'v_vrb_2',
    word: 'Discover',
    uzbek: 'Kashf qilmoq, topmoq',
    phonetic: '/dɪˈskʌv.ər/',
    category: 'Common verbs',
    exampleEn: 'Read books to discover exciting new expressions.',
    exampleUz: 'Qiziqarli yangi iboralarni kashf qilish uchun kitoblar o‘qing.',
    difficulty: 'medium',
    partOfSpeech: 'verb'
  },
  {
    id: 'v_vrb_3',
    word: 'Practice',
    uzbek: 'Mashq qilmoq, shug‘ullanmoq',
    phonetic: '/ˈpræk.tɪs/',
    category: 'Common verbs',
    exampleEn: 'Practice speaking English with your friends every day.',
    exampleUz: 'Har kuni do‘stlaringiz bilan inglizcha gaplashishni mashq qiling.',
    difficulty: 'easy',
    partOfSpeech: 'verb'
  },

  // Common Adjectives
  {
    id: 'v_adj_1',
    word: 'Brilliant',
    uzbek: 'Aql bovar qilmas, yorqin, juda aqlli',
    phonetic: '/ˈbrɪl.jənt/',
    category: 'Common adjectives',
    exampleEn: 'She gave a brilliant presentation in English class.',
    exampleUz: 'U ingliz tili darsida ajoyib va yorqin taqdimot qildi.',
    difficulty: 'medium',
    partOfSpeech: 'adjective'
  },
  {
    id: 'v_adj_2',
    word: 'Curious',
    uzbek: 'Qiziquvchan, bilishga intiluvchan',
    phonetic: '/ˈkjʊə.ri.əs/',
    category: 'Common adjectives',
    exampleEn: 'Curious learners always ask great questions.',
    exampleUz: 'Qiziquvchan o‘quvchilar doimo ajoyib savollar berishadi.',
    difficulty: 'medium',
    partOfSpeech: 'adjective'
  },

  // Everyday English
  {
    id: 'v_eve_1',
    word: 'Fortunately',
    uzbek: 'Xayriyatki, baxtimizga',
    phonetic: '/ˈfɔː.tʃən.ət.li/',
    category: 'Everyday English',
    exampleEn: 'Fortunately, the rain stopped just in time for our walk.',
    exampleUz: 'Xayriyatki, sayrimiz oldidan yomg‘ir o‘z vaqtida tindi.',
    difficulty: 'medium',
    partOfSpeech: 'adverb'
  },
  {
    id: 'v_eve_2',
    word: 'Welcome',
    uzbek: 'Xush kelibsiz',
    phonetic: '/ˈwel.kəm/',
    category: 'Everyday English',
    exampleEn: 'You are always welcome to our study group.',
    exampleUz: 'Bizning o‘quv guruhimizga doimo xush kelibsiz.',
    difficulty: 'easy',
    partOfSpeech: 'phrase'
  }
];

export const VOCAB_CATEGORIES: { name: import('../types').VocabCategory; icon: string; uzName: string }[] = [
  { name: 'Animals', icon: '🦁', uzName: 'Hayvonlar' },
  { name: 'Food', icon: '🍎', uzName: 'Yeguliklar' },
  { name: 'Family', icon: '👨‍👩‍👧', uzName: 'Oila' },
  { name: 'School', icon: '📚', uzName: 'Maktab' },
  { name: 'House', icon: '🏡', uzName: 'Uy-joy' },
  { name: 'Clothes', icon: '👕', uzName: 'Kiyimlar' },
  { name: 'Colors', icon: '🎨', uzName: 'Ranglar' },
  { name: 'Numbers', icon: '🔢', uzName: 'Sonlar' },
  { name: 'Days', icon: '📅', uzName: 'Hafta kunlari' },
  { name: 'Months', icon: '🗓️', uzName: 'Oylar' },
  { name: 'Weather', icon: '⛅', uzName: 'Ob-havo' },
  { name: 'Sports', icon: '⚽', uzName: 'Sport' },
  { name: 'Technology', icon: '💻', uzName: 'Texnologiya' },
  { name: 'Travel', icon: '✈️', uzName: 'Sayohat' },
  { name: 'Common verbs', icon: '⚡', uzName: 'Fasl fe’llari' },
  { name: 'Common adjectives', icon: '✨', uzName: 'Sifatlar' },
  { name: 'Everyday English', icon: '💬', uzName: 'Kundalik iboralar' },
];
