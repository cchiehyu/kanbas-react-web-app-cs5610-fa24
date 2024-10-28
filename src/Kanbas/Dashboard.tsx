import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { courses as dbCourses } from './Database';

export default function Dashboard() {
  const [courses, setCourses] = useState<any[]>(dbCourses);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description"
  });

  const addCourse = () => {
    const newCourse = { ...course, _id: (courses.length + 1).toString() };
    setCourses([...courses, newCourse]);
    setCourse({
      _id: "0",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      image: "/images/reactjs.jpg",
      description: "New Description"
    });
  };
  const updateCourse = () => {
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  const addNewCourse = () => {
    const newCourse = {
      ...course,
      _id: new Date().getTime().toString()
    };
    setCourses([...courses, { ...course, ...newCourse }]);
  };

  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  
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
      />
      <input
        value={course.number}
        className="form-control mb-2"
        onChange={(e) => setCourse({ ...course, number: e.target.value })}
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
      />
      <textarea
        value={course.description}
        className="form-control mb-2"
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <button className="btn btn-success mb-4" onClick={addCourse}>
        Add Course
      </button>
      <hr />

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses" className="row row-cols-1 row-cols-md-5 g-4">
        {courses.map((course) => (
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
                  <button onClick={(event) => {
                    event.preventDefault();
                    deleteCourse(course._id);
                  }} className="btn btn-danger float-end"
                    id="wd-delete-course-click">
                    Delete
                  </button>
                  <button id="wd-edit-course-click"
                    onClick={(event) => {
                      event.preventDefault();
                      setCourse(course);
                    }}
                    className="btn btn-warning me-2 float-end" >
                    Edit
                  </button>
                  <button className="btn btn-warning float-end me-2"
                    onClick={updateCourse} id="wd-update-course-click">
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
