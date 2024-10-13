import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { courses } from './Database';

export default function CourseList() {
  return (
    <div id="wd-course-list">
      <h2>Courses</h2>
      <ul className="list-group">
        {courses.map((course) => (
          <li key={course._id} className="list-group-item border-0 p-3">
            {/* Course name as a clickable link */}
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

export function CourseModules() {
  const { courseId } = useParams();
  const selectedCourse = courses.find((course) => course._id === courseId);

  if (!selectedCourse) {
    return <p>Course not found</p>;
  }

  return (
    <div>
      <h2>{selectedCourse.number} - {selectedCourse.name}</h2>
      <p>Term: {selectedCourse.startDate} to {selectedCourse.endDate}</p>
      <p>Department: {selectedCourse.department}, {selectedCourse.credits} Credits</p>
      <img src={selectedCourse.image} alt={selectedCourse.name} style={{ width: '200px' }} />
      <p>{selectedCourse.description}</p>
      {/* Here you can render additional lessons or modules for the course */}
    </div>
  );
}
