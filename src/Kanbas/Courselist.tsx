import React from 'react';
import { Link } from "react-router-dom";
import './styles.css';

const courses = [
  {
    code: 'CS1234',
    name: 'React JS',
    term: 'Spring 2024',
  },
  {
    code: 'CS5610',
    name: 'Web Development',
    term: 'Summer Full 2024',
  },
  {
    code: 'CS5200',
    name: 'Database Management',
    term: 'Summer Full 2024',
  },
  {
    code: 'CS5550',
    name: 'AI and Machine Learning',
    term: 'Fall 2024',
  }
  ,
  {
    code: 'CS6700',
    name: 'Data Science',
    term: 'Fall 2024',
  }
  ,
  {
    code: 'CS7800',
    name: 'Software Architecture',
    term: 'Fall 2024',
  }
  ,
  {
    code: 'CS6400',
    name: 'Cybersecurity',
    term: 'Fall 2024',
  }
  ,
  {
    code: 'CS7000',
    name: 'Cloud Computing',
    term: 'Fall 2024',
  }
];

export default function CourseList() {
    return (
      <div className="wd-course-list">
        <h1>Courses</h1>
        <hr />
        <h2 className="text-danger">All Courses</h2>
        <hr />
        {courses.map((course) => (
          <div key={course.code} className="wd-course-item">
            <Link to={`/Kanbas/Courses/${course.code}/Modules`} className="text-danger text-decoration-none">
              <h3>{course.code} {course.name}</h3>
              <p>{course.term}</p>
            </Link>
          </div>
        ))}
        <p>
          Welcome to your courses! To customize the list of courses, click on the "All Courses" link and star the courses to display.
        </p>
      </div>
    );
  }