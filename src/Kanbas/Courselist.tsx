import React from 'react';
import { Link } from 'react-router-dom'; // To navigate between different course pages
import { courses } from './Database'; // Importing the courses data from your Database

export default function CourseList() {
  return (
    <div id="wd-course-list">
      <h2>Courses</h2>
      <ul className="list-group">
        {courses.map((course) => (
          <li key={course._id} className="list-group-item border-0 p-3">
            {/* Course name as a clickable link */}
            <Link to={`/courses/${course._id}`} className="text-danger" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
              {course.number} {course.name}
            </Link>

            {/* Additional details about the course */}
            <div className="course-details" style={{ fontSize: '0.9rem', color: 'gray' }}>
              <p className="mb-1">Term: {course.startDate} to {course.endDate}</p>
              <p className="mb-1">Semester Full Term, {course.credits} Credits</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4">Welcome to your courses! To customize the list of courses, click on the "All Courses" link and star the courses to display.</p>
    </div>
  );
}
