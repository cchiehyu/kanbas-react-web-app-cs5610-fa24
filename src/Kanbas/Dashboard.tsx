import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { toggleShowAllCourses, enrollInCourse, unenrollFromCourse } from './Courses/Enrollment/enrollmentSlice';
import { RootState } from './store';
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
  course: Course;
  setCourse: (course: Course) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse
}: DashboardProps) {
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const enrollmentState = useSelector((state: RootState) => state.enrollmentReducer);
  const { enrollments, showAllCourses } = enrollmentState;
  
  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment) =>
        enrollment.user === currentUser._id &&
        enrollment.course === courseId
    );
  };

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

  const displayedCourses = showAllCourses 
    ? courses 
    : courses.filter(course => isEnrolled(course._id));

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

      <h2 id="wd-dashboard-published">
        {showAllCourses ? 'All Courses' : 'My Courses'} ({displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" className="row row-cols-1 row-cols-md-5 g-4">
        {displayedCourses.map((course) => (
          <div key={course._id} className="wd-dashboard-course col" style={{ width: '300px' }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to={`/Kanbas/Courses/${course._id}/Home`}
                onClick={(e) => handleCourseClick(course._id, e)}
              >
                <img src={course.image} width="100%" height={160} alt={course.name} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">{course.name}</h5>
                  <p className="wd-dashboard-course-text card-text">{course.description}</p>
                  
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
                    <>
                      <button className="btn btn-primary">Go</button>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }}
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>
                      <button
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end"
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-warning float-end me-2"
                        onClick={updateCourse}
                        id="wd-update-course-click"
                      >
                        Update
                      </button>
                    </>
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