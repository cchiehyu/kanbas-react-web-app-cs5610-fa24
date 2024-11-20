import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { toggleShowAllCourses, fetchEnrollments } from './Courses/Enrollment/client';
import { RootState, AppDispatch  } from './store';

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
}

interface CourseListProps {
  courses: Course[];
  allCourses: Course[];
}

export default function CourseList({ courses, allCourses }: CourseListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments, showAllCourses } = useSelector(
    (state: RootState) => state.enrollmentReducer
  );

  // Add useEffect to fetch enrollments
  useEffect(() => {
    allCourses.forEach((course) => {
      dispatch(fetchEnrollments(course._id));
    });
  }, [dispatch, allCourses, enrollments]);

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment) =>
        enrollment.user === currentUser._id &&
        enrollment.course === courseId
    );
  };

  // Update the filtering logic to use allCourses
  const enrolledCourses = allCourses.filter(course => isEnrolled(course._id));
  const availableCourses = allCourses.filter(course => !isEnrolled(course._id));
  const displayedCourses = showAllCourses ? availableCourses : enrolledCourses;

  return (
    <div id="wd-course-list" className="container-fluid px-4">
      <div className="row align-items-center mb-4 mt-3">
        <div className="col">
          <h2 className="m-0">
            {showAllCourses ? 'Available' : 'My'} Courses ({displayedCourses.length})
          </h2>
        </div>
        { (
          <div className="col-auto">
            <button
              className="btn btn-primary"
              style={{ minWidth: '140px' }}
              onClick={() => dispatch(toggleShowAllCourses())}
            >
              {showAllCourses ? 'Show My Courses' : 'Show All Courses'}
            </button>
          </div>
        )}
      </div>

      <ul className="list-group">
        {displayedCourses.map((course: Course) => (
          <li key={course._id} 
              className="list-group-item border-0 p-3"
              style={{
                borderBottom: '1px solid #dee2e6',
                marginBottom: '0.5rem'
              }}>
            <Link
              to={`/Kanbas/Courses/${course._id}/Home`}
              className="text-danger text-decoration-none d-block mb-2"
              style={{ fontSize: '1.1rem', fontWeight: 'bold' }}
            >
              {course.number} - {course.name}
            </Link>
            
            <div className="course-details" style={{ fontSize: '0.9rem', color: 'gray' }}>
              <p className="mb-1">Term: {course.startDate} to {course.endDate}</p>
              <p className="mb-1">Department: {course.department}, {course.credits} Credits</p>
              {currentUser.role === 'STUDENT' && isEnrolled(course._id) && (
                <p className="mb-0 text-success fw-bold">
                  ✓ Enrolled
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {enrolledCourses.length === 0 && !showAllCourses && (
        <div className="alert alert-info mt-4">
          You are not enrolled in any courses yet.
          <br />
          Click "Show All Courses" to view available courses.
        </div>
      )}

      {showAllCourses && availableCourses.length === 0 && (
        <div className="alert alert-info mt-4">
          No additional courses are available for enrollment at this time.
        </div>
      )}

      {showAllCourses && availableCourses.length > 0 && (
        <div className="alert alert-light mt-4 border">
          Browse all available courses above.
          Click "Show My Courses" to see only your enrolled courses.
        </div>
      )}
    </div>
  );
}