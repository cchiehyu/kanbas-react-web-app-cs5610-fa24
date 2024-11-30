import { createSlice } from '@reduxjs/toolkit';
import { EnrollmentState } from './types';
import { enrollInCourse, unenrollFromCourse, fetchEnrollments } from './client';

const initialState: EnrollmentState = {
  enrollments: [],
  showAllCourses: false
};

export const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    toggleShowAllCourses(state) {
      state.showAllCourses = !state.showAllCourses;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        // Add safety check for payload
        const newEnrollments = Array.isArray(action.payload) ? action.payload : [action.payload];
        
        // Clear existing enrollments for this course if needed
        // state.enrollments = [];
        
        // Add new enrollments, avoiding duplicates
        newEnrollments.forEach((newEnroll: any) => {
          if (newEnroll && newEnroll.user && newEnroll.course) {
            const exists = state.enrollments.some(
              e => e.user === newEnroll.user && e.course === newEnroll.course
            );
            if (!exists) {
              state.enrollments.push(newEnroll);
            }
          }
        });
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        // Add safety check
        if (action.payload && action.payload.user && action.payload.course) {
          const exists = state.enrollments.some(
            e => e.user === action.payload.user && e.course === action.payload.course
          );
          if (!exists) {
            state.enrollments.push(action.payload);
          }
        }
      })
      .addCase(unenrollFromCourse.fulfilled, (state, action) => {
        const { userId, courseId } = action.payload;
        if (userId && courseId) {
          state.enrollments = state.enrollments.filter(
            enrollment => 
              !(enrollment.user === userId && 
                enrollment.course === courseId)
          );
        }
      });
  }
});

export const { toggleShowAllCourses } = enrollmentSlice.actions;
export const enrollmentReducer = enrollmentSlice.reducer;
export default enrollmentSlice.reducer;