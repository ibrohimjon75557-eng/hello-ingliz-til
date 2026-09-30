import { MathQuestion } from '../types';
import { shuffleArray } from '../data/questionBank';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateMathQuestions(count = 5): MathQuestion[] {
  const types: ('addition' | 'subtraction' | 'multiplication' | 'division' | 'equation')[] = [
    'addition',
    'subtraction',
    'multiplication',
    'division',
    'equation'
  ];

  const questions: MathQuestion[] = [];

  for (let i = 0; i < count; i++) {
    const qType = types[i % types.length];
    let equation = '';
    let correctAnswer = 0;
    let explanation = '';
    let explanationUz = '';

    if (qType === 'addition') {
      const a = getRandomInt(12, 58);
      const b = getRandomInt(7, 39);
      correctAnswer = a + b;
      equation = `${a} + ${b} = ?`;
      explanation = `${a} plus ${b} equals ${correctAnswer}.`;
      explanationUz = `${a} ga ${b} qo‘shilsa ${correctAnswer} bo‘ladi.`;
    } else if (qType === 'subtraction') {
      const a = getRandomInt(25, 95);
      const b = getRandomInt(8, a - 5);
      correctAnswer = a - b;
      equation = `${a} - ${b} = ?`;
      explanation = `${a} minus ${b} equals ${correctAnswer}.`;
      explanationUz = `${a} dan ${b} ayirilsa ${correctAnswer} qoladi.`;
    } else if (qType === 'multiplication') {
      const a = getRandomInt(3, 12);
      const b = getRandomInt(3, 9);
      correctAnswer = a * b;
      equation = `${a} × ${b} = ?`;
      explanation = `${a} times ${b} equals ${correctAnswer}.`;
      explanationUz = `${a} ni ${b} ga ko‘paytirilsa ${correctAnswer} chiqadi.`;
    } else if (qType === 'division') {
      const divisor = getRandomInt(3, 9);
      const quotient = getRandomInt(3, 12);
      const dividend = divisor * quotient;
      correctAnswer = quotient;
      equation = `${dividend} ÷ ${divisor} = ?`;
      explanation = `${dividend} divided by ${divisor} is ${correctAnswer}.`;
      explanationUz = `${dividend} ni ${divisor} ga bo‘lsak ${correctAnswer} bo‘ladi.`;
    } else {
      // Simple equation: x + a = b
      const a = getRandomInt(3, 18);
      const x = getRandomInt(4, 25);
      const b = x + a;
      correctAnswer = x;
      equation = `x + ${a} = ${b},  x = ?`;
      explanation = `Subtract ${a} from ${b}: x = ${b} - ${a} = ${x}.`;
      explanationUz = `${b} dan ${a} ni ayiramiz: x = ${b} - ${a} = ${x}.`;
    }

    // Generate 3 plausible distractors
    const distractors = new Set<number>();
    const offsets = [-3, -2, -1, 1, 2, 3, 5, 10];
    const shuffledOffsets = shuffleArray(offsets);

    for (const offset of shuffledOffsets) {
      const candidate = correctAnswer + offset;
      if (candidate !== correctAnswer && candidate >= 0) {
        distractors.add(candidate);
      }
      if (distractors.size >= 3) break;
    }

    const options = shuffleArray([correctAnswer, ...Array.from(distractors)]);

    questions.push({
      id: `math_${Date.now()}_${i}_${Math.random()}`,
      equation,
      options,
      correctAnswer,
      explanation,
      explanationUz,
      type: qType
    });
  }

  return shuffleArray(questions);
}
