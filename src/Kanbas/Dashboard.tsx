import React, { useEffect, Dispatch, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchEnrollments } from './Courses/Enrollment/client';
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
  courses: Course[] | null;
  allCourses: Course[] | null;
  course: Course;
  setCourse: (course: Course) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: Dispatch<SetStateAction<boolean>>;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}

export default function Dashboard({
  courses,
  allCourses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment 
}: DashboardProps) {
 const dispatch = useDispatch<AppDispatch>();

 const [notification, setNotification] = useState<{
  message: string;
  type: 'success' | 'danger' | 'info';
  visible: boolean;
} | null>(null);

const showNotification = (message: string, type: 'success' | 'danger' | 'info') => {
  setNotification({ message, type, visible: true });
  setTimeout(() => {
    setNotification(null);
  }, 3000);
};

const handleEnrollment = async (courseId: string, enrolled: boolean) => {
  await updateEnrollment(courseId, enrolled);
  showNotification(
    enrolled ? 'Successfully enrolled in course' : 'Successfully unenrolled from course',
    'success'
  );
};

const handleAddCourse = async () => {
  await addNewCourse();
  showNotification('Course successfully added', 'success');
};

// For update course
const handleUpdateCourse = async () => {
  await updateCourse();
  showNotification('Course successfully updated', 'success');
};


 const { currentUser } = useSelector((state: RootState) => state.accountReducer);
 const isAdmin = currentUser.role === 'ADMIN';
 const isFaculty = currentUser.role === 'FACULTY';
 const isAdminOrFaculty = currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN';
 const isStudentOrFaulty = currentUser.role === 'STUDENT' || currentUser.role === 'FACULTY';
 const hasFacultyPermission = (courseId: string) => {
  if (isAdmin) return true;
  if (isFaculty) {
    return enrolledCourses.some(c => c._id === courseId);
  }
  return false;
};

 useEffect(() => {
  if (Array.isArray(allCourses)) {
    const coursesToCheck = allCourses;
    coursesToCheck.forEach((course) => {
      dispatch(fetchEnrollments(course._id));
    });
  }
}, [dispatch, allCourses]);


const handleCourseClick = (courseId: string, event: React.MouseEvent) => {
  if (isStudentOrFaulty && !enrolledCourses.some(c => c._id === courseId)) {
    event.preventDefault();
    return;
  }
};

const enrolledCourses = courses || [];

const availableCourses = (Array.isArray(allCourses) ? allCourses : [])
  .filter(course => !enrolledCourses.some(enrolled => enrolled._id === course._id));

const displayedCourses = isAdminOrFaculty 
  ? (Array.isArray(allCourses) ? allCourses : [])
  : (enrolling ? availableCourses : enrolledCourses);
  
  const allCoursesCount = Array.isArray(allCourses) ? allCourses.length : 0;
     const availableCoursesCount = availableCourses.length;
     const enrolledCoursesCount = enrolledCourses.length;


     return (
      <div className="container-fluid bg-light min-vh-100 py-4">
        <div className="row">
          <div className="col-12">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center bg-white p-3 rounded shadow-sm mb-4">
              <h1 className="h3 mb-0 text-dark">Dashboard</h1>
              {isStudentOrFaulty && (
                <button
                  className="btn btn-outline-dark"
                  onClick={() => setEnrolling(!enrolling)}
                >
                  {enrolling ? "My Courses" : "All Courses"}
                </button>
              )}
            </div>

            {notification && notification.visible && (
              <div className={`alert alert-${notification.type} alert-dismissible fade show`} role="alert">
                {notification.message}
                <button type="button" className="btn-close" onClick={() => setNotification(null)}></button>
              </div>
            )}
  
            {/* Faculty Course Creation Form */}
            {isAdminOrFaculty && (
              <div className="bg-white p-4 rounded shadow-sm mb-4">
                <h5 className="mb-3 text-dark">Create New Course</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      value={course.name}
                      className="form-control"
                      onChange={(e) => setCourse({ ...course, name: e.target.value })}
                      placeholder="Course Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      value={course.number}
                      className="form-control"
                      onChange={(e) => setCourse({ ...course, number: e.target.value })}
                      placeholder="Course Number"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="date"
                      value={course.startDate}
                      className="form-control"
                      onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="date"
                      value={course.endDate}
                      className="form-control"
                      onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      value={course.image}
                      className="form-control"
                      onChange={(e) => setCourse({ ...course, image: e.target.value })}
                      placeholder="Course Image URL"
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      value={course.description}
                      className="form-control"
                      rows={3}
                      onChange={(e) => setCourse({ ...course, description: e.target.value })}
                      placeholder="Course Description"
                    />
                  </div>
                  <div className="col-12">
                    <div className="d-flex gap-2">
                      <button 
                        className={`btn ${course._id ? 'btn-warning' : 'btn-success'}`}
                        onClick={course._id ? handleUpdateCourse : handleAddCourse}
                      >
                        {course._id ? "Update Course" : "Add Course"}
                      </button>
                      {course._id && (
                        <button 
                          className="btn btn-secondary"
                          onClick={() => setCourse({
                            _id: "",
                            name: "",
                            number: "",
                            startDate: "",
                            endDate: "",
                            image: "",
                            description: ""
                          })}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
  
            {/* Courses Section */}
            <div className="bg-white p-4 rounded shadow-sm">
              <h2 className="h4 mb-4 text-dark">
                {isAdmin
                  ? `Available Courses (${allCoursesCount})`
                  : (enrolling
                      ? `Available Courses (${availableCoursesCount})` 
                      : `My Courses (${enrolledCoursesCount})`)
                }
              </h2>
              
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {displayedCourses.map((course) => (
                  <div key={course._id} className="col">
                    <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden">
                      <Link
                        className="text-decoration-none"
                        to={`/Kanbas/Courses/${course._id}/Home`}
                        onClick={(e) => handleCourseClick(course._id, e)}
                      >
                        <div className="position-relative">
                          <img 
                            src={course.image} 
                            className="card-img-top" 
                            style={{ height: '140px', objectFit: 'cover' }} 
                            alt={course.name}
                          />
                          <div className="position-absolute top-0 end-0 p-2">
                            {isStudentOrFaulty && (
                              <button
                                className={`btn ${enrolledCourses.some(c => c._id === course._id) ? 'btn-danger' : 'btn-success'} btn-sm`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleEnrollment(course._id, !enrolledCourses.some(c => c._id === course._id));
                                }}
                              >
                                {enrolledCourses.some(c => c._id === course._id) ? 'Unenroll' : 'Enroll'}
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title text-dark mb-2">{course.name}</h5>
                          <p className="card-text text-muted small mb-3">{course.number}</p>
                          <p className="card-text text-dark">{course.description}</p>
                        </div>
                      </Link>
                      
                      {isAdminOrFaculty && (
                        <div className="card-footer bg-white border-top-0 p-3">
                          <div className="d-flex gap-2 justify-content-between">
                            <Link
                              to={`/Kanbas/Courses/${course._id}/Home`}
                              className="btn btn-sm flex-grow-1"
                              style={{ 
                                backgroundColor: '#0d6efd',
                                color: 'white',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3d8bfd'}
                              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0d6efd'}
                            >
                              View Course
                            </Link>
                            {(isAdmin || hasFacultyPermission(course._id)) && (
                              <>
                                <button
                                  onClick={(event) => {
                                    event.preventDefault();
                                    setCourse(course);
                                  }}
                                  className="btn btn-sm"
                                  style={{ 
                                    backgroundColor: '#ffc107',
                                    color: 'black',
                                    transition: 'all 0.2s ease'
                                  }}
                                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ffcd39'}
                                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffc107'}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={(event) => {
                                    event.preventDefault();
                                    deleteCourse(course._id);
                                  }}
                                  className="btn btn-sm"
                                  style={{ 
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    transition: 'all 0.2s ease'
                                  }}
                                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e35d6a'}
                                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  