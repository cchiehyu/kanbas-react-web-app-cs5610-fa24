import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentReducer from "./Courses/Enrollment/enrollmentSlice";
import quizzesReducer from "./Courses/Quizzes/reducer";
import questionsReducer from "./Courses/Quizzes/QuizQuestions/reducer";
import submissionsReducer from "./Courses/Quizzes/QuizPreview/QuizReview/reducer";
import { EnrollmentState } from "./Courses/Enrollment/types";
import { Quiz } from "./Courses/Quizzes/types";
import { QuizQuestion } from "./Courses/Quizzes/QuizQuestions/questionTypes";
import { SubmissionState } from "./Courses/Quizzes/QuizPreview/QuizReview/QuizSubmissionType";

export interface RootState {
  modulesReducer: any;
  accountReducer: any;
  assignmentsReducer: any;
  enrollmentReducer: EnrollmentState;
  quizzesReducer: {
    quizzes: Quiz[];
  };
  questionsReducer: {
    questions: QuizQuestion[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  submissionsReducer: SubmissionState;
}

const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentReducer,
    quizzesReducer,
    questionsReducer,
    submissionsReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export default store;