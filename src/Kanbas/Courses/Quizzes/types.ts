export interface Quiz {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points: number;
  dueDate: string;
  availableFromDate: string;
  availableUntilDate: string;
  published: boolean;
  numberOfQuestions: number;
}

export interface RootState {
  quizzesReducer: {
    quizzes: Quiz[];
  };
  accountReducer: {
    currentUser: {
      role: string;
    };
  };
}