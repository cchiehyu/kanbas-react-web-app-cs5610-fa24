export interface QuizSubmissionAnswer {
  questionId: string;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_BLANK';
  userAnswer: string | boolean;  // The answer user provided
  correctAnswer: string | boolean;  // The correct answer
  points: number;  // Points earned for this question
  maxPoints: number;  // Maximum possible points
  isCorrect: boolean;
  question: string;  // Store the question text
  explanation?: string;  // Optional explanation for correct answer
  choices?: { text: string; isCorrect: boolean; }[];  // For multiple choice
}

export interface QuizSubmission {
  _id: string;
  quizId: string;
  courseId: string;
  studentId: string;
  attemptNumber: number;
  answers: {
    questionId: string;
    questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_BLANK';
    userAnswer: string | boolean;
    correctAnswer: string | boolean;
    points: number;
    maxPoints: number;
    isCorrect: boolean;
    question: string;
    choices?: {
      text: string;
      isCorrect: boolean;
    }[];
  }[];
  startTime: Date;
  endTime: Date;
  timeSpent: number;
  score: number;
  maxScore: number;
  percentage: number;
  status: 'completed' | 'in-progress';
}

export interface SubmissionState {
  submissions: QuizSubmission[];
  currentSubmission: QuizSubmission | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}