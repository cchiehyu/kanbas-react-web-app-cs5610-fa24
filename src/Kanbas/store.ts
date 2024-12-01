import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentReducer from "./Courses/Enrollment/enrollmentSlice";
import quizzesReducer from "./Courses/Quizzes/reducer";
import { EnrollmentState } from "./Courses/Enrollment/types";
import { Quiz } from "./Courses/Quizzes/types";

export interface RootState {
  modulesReducer: any;
  accountReducer: any;
  assignmentsReducer: any;
  enrollmentReducer: EnrollmentState;
  quizzesReducer: {
    quizzes: Quiz[];
  };
}

const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentReducer,
    quizzesReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export default store;