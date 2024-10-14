import React from 'react';
import { Link } from 'react-router-dom';
import { courses } from './Database';

export default function CourseList() {
  return (
    <div id="wd-course-list">
      <h2>Courses</h2>
      <ul className="list-group">
        {courses.map((course) => (
          <li key={course._id} className="list-group-item border-0 p-3">
            {/* Display Course ID (number) and Name */}
            <Link
              to={`/Kanbas/Courses/${course._id}/Home`}
              className="text-danger"
              style={{ fontSize: '1.1rem', fontWeight: 'bold' }}
            >
              {course.number} - {course.name}
            </Link>

            {/* Additional details about the course */}
            <div className="course-details" style={{ fontSize: '0.9rem', color: 'gray' }}>
              <p className="mb-1">Term: {course.startDate} to {course.endDate}</p>
              <p className="mb-1">Department: {course.department}, {course.credits} Credits</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4">
        Welcome to your courses! To customize the list of courses, click on the "All Courses" link and star the courses to display.
      </p>
    </div>
  );
}
