import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { useSelector } from "react-redux";
import * as db from "./Database";

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

interface Enrollment {
  user: string;
  course: string;
}

interface AccountState {
  currentUser: {
    _id: string;
    username: string;
    role: string;
  };
}

export default function Dashboard({ 
  courses, 
  course, 
  setCourse, 
  addNewCourse,
  deleteCourse, 
  updateCourse 
}: DashboardProps) {
  const { currentUser } = useSelector((state: { accountReducer: AccountState }) => 
    state.accountReducer
  );
  const { enrollments } = db;

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
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

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses" className="row row-cols-1 row-cols-md-5 g-4">
        {courses
          .filter((course) =>
            enrollments.some(
              (enrollment: Enrollment) =>
                enrollment.user === currentUser._id &&
                enrollment.course === course._id
            ))
          .map((course) => (
            <div key={course._id} className="wd-dashboard-course col" style={{ width: '300px' }}>
              <div className="card rounded-3 overflow-hidden">
                <Link
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  to={`/Kanbas/Courses/${course._id}/Home`}
                >
                  <img src={course.image} width="100%" height={160} alt={course.name} />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">{course.name}</h5>
                    <p className="wd-dashboard-course-text card-text">{course.description}</p>
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
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}