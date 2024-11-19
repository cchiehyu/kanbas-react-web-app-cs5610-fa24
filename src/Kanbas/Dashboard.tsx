import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { toggleShowAllCourses, enrollInCourse, unenrollFromCourse, fetchEnrollments } from './Courses/Enrollment/client';
import { RootState } from './store';
import { AppDispatch } from './store';
import './styles.css';

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image: string;
  description: string;
}

interface DashboardProps {
  courses: Course[];
  allCourses: Course[];
  course: Course;
  setCourse: (course: Course) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}

export default function Dashboard({
  courses,
  allCourses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse
}: DashboardProps) {
  const dispatch = useDispatch<AppDispatch>();
  
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const enrollmentState = useSelector((state: RootState) => state.enrollmentReducer);
  const { enrollments, showAllCourses } = enrollmentState;

  useEffect(() => {
    const coursesToCheck = allCourses;
    coursesToCheck.forEach((course) => {
      dispatch(fetchEnrollments(course._id));
    });
  }, [dispatch, courses, allCourses, currentUser.role]);

  
  
  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment) =>
        enrollment.user === currentUser._id &&
        enrollment.course === courseId
    );
  };

  useEffect(() => {
    const coursesToCheck = allCourses;
    coursesToCheck.forEach((course) => {
      dispatch(fetchEnrollments(course._id));
    });
  }, [dispatch, allCourses, enrollments]); // Remove courses and currentUser.role, add enrollments
  

  const handleEnrollmentClick = (courseId: string) => {
    if (isEnrolled(courseId)) {
      dispatch(unenrollFromCourse({ userId: currentUser._id, courseId }));
    } else {
      dispatch(enrollInCourse({ userId: currentUser._id, courseId }));
    }
  };

  const handleCourseClick = (courseId: string, event: React.MouseEvent) => {
    if (currentUser.role === 'STUDENT' && !isEnrolled(courseId)) {
      event.preventDefault();
      return;
    }
  };

  const enrolledCourses = allCourses.filter(course => isEnrolled(course._id));
  const availableCourses = allCourses.filter(course => !isEnrolled(course._id));
  const displayedCourses = currentUser.role === 'FACULTY' 
    ? allCourses 
    : (showAllCourses ? availableCourses : enrolledCourses);

  return (
    <div id="wd-dashboard" className="p-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        {currentUser.role === 'STUDENT' && (
          <button
            className="btn btn-primary"
            onClick={() => dispatch(toggleShowAllCourses())}
          >
            {showAllCourses ? 'Show My Courses' : 'Show All Courses'}
          </button>
        )}
      </div>
      <hr />

      {currentUser.role === 'FACULTY' && (
        <>
          <h5>New Course</h5>
          <br />
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            placeholder="Course Name"
          />
          <input
            value={course.number}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, number: e.target.value })}
            placeholder="Course Number"
          />
          <input
            type="date"
            value={course.startDate}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
          />
          <input
            type="date"
            value={course.endDate}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
          />
          <input
            value={course.image}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, image: e.target.value })}
            placeholder="Course Image URL"
          />
          <textarea
            value={course.description}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            placeholder="Course Description"
          />
          <button className="btn btn-success mb-4" onClick={addNewCourse}>
            Add Course
          </button>
          <hr />
        </>
      )}

      <h2>
        {currentUser.role === 'FACULTY' 
          ? `Available Courses (${allCourses.length})`
          : (showAllCourses 
              ? `Available Courses (${availableCourses.length})` 
              : `My Courses (${enrolledCourses.length})`
          )
        }
      </h2>
      <hr />

      <div className="row row-cols-1 row-cols-md-5 g-4">
        {displayedCourses.map((course) => (
          <div key={course._id} className="col" style={{ width: '300px' }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="text-decoration-none text-dark"
                to={`/Kanbas/Courses/${course._id}/Home`}
                onClick={(e) => handleCourseClick(course._id, e)}
              >
                <img src={course.image} width="100%" height={160} alt={course.name} />
                <div className="card-body">
                  <h5 className="card-title">{course.name}</h5>
                  <p className="card-text">{course.description}</p>
                  
                  {currentUser.role === 'STUDENT' && (
                    <button
                      className={`btn ${isEnrolled(course._id) ? 'btn-danger' : 'btn-success'}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleEnrollmentClick(course._id);
                      }}
                    >
                      {isEnrolled(course._id) ? 'Unenroll' : 'Enroll'}
                    </button>
                  )}
                  
                  {currentUser.role === 'FACULTY' && (
                    <div className="d-flex gap-2 mt-2">
                      <Link 
                        to={`/Kanbas/Courses/${course._id}/Home`}
                        className="btn btn-primary"
                      >
                        Go to Course
                      </Link>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}