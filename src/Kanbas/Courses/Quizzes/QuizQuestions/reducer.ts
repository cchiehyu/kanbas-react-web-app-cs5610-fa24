import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizQuestion } from "./questionTypes";

interface QuestionOrder {
  questionId: string;
  order: number;
}

interface ReorderPayload {
  quizId: string;
  questionOrders: QuestionOrder[];
}

const initialState = {
  questions: [] as QuizQuestion[],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<QuizQuestion[]>) => {
      state.questions = action.payload;
    },
    addQuestion: (state, { payload: question }: PayloadAction<QuizQuestion>) => {
      state.questions.push(question);
    },
    deleteQuestion: (state, { payload: questionId }: PayloadAction<string>) => {
      state.questions = state.questions.filter(
        question => question._id !== questionId
      );
    },
    updateQuestion: (state, { payload: question }: PayloadAction<QuizQuestion>) => {
      state.questions = state.questions.map(q =>
        q._id === question._id ? question : q
      );
    },
    reorderQuestions: (state, { payload }: PayloadAction<ReorderPayload>) => {
      const { quizId, questionOrders } = payload;
      state.questions = state.questions.map(question => {
        if (question.quizId === quizId) {
          const orderInfo = questionOrders.find(
            (order: QuestionOrder) => order.questionId === question._id
          );
          if (orderInfo) {
            return { ...question, order: orderInfo.order };
          }
        }
        return question;
      });
    },
  },
});

export const {
  setQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
  reorderQuestions,
} = questionsSlice.actions;

export default questionsSlice.reducer;