import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EnrollmentState } from './types';

const initialState: EnrollmentState = {
  enrollments: [
    { "_id": "1", "user": "123", "course": "RS101" },
    { "_id": "2", "user": "234", "course": "RS101" },
    { "_id": "3", "user": "345", "course": "RS101" },
    { "_id": "4", "user": "456", "course": "RS101" },
    { "_id": "5", "user": "567", "course": "RS101" },
    { "_id": "6", "user": "234", "course": "RS102" },
    { "_id": "7", "user": "789", "course": "RS102" },
    { "_id": "8", "user": "890", "course": "RS102" },
    { "_id": "9", "user": "123", "course": "RS102" }
  ],
  showAllCourses: false
};

const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    toggleShowAllCourses(state) {
      state.showAllCourses = !state.showAllCourses;
    },
    enrollInCourse(state, action: PayloadAction<{ userId: string; courseId: string }>) {
      const newId = (state.enrollments.length + 1).toString();
      state.enrollments.push({
        _id: newId,
        user: action.payload.userId,
        course: action.payload.courseId
      });
    },
    unenrollFromCourse(state, action: PayloadAction<{ userId: string; courseId: string }>) {
      state.enrollments = state.enrollments.filter(
        enrollment => 
          !(enrollment.user === action.payload.userId && 
            enrollment.course === action.payload.courseId)
      );
    }
  }
});

export const { toggleShowAllCourses, enrollInCourse, unenrollFromCourse } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;