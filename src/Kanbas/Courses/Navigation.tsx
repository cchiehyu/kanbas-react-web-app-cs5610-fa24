import React from 'react';
import { Link, useLocation } from "react-router-dom";

export default function CoursesNavigation() {
  const location = useLocation(); // Get current location from react-router

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {/* Apply active class based on the current route */}
      <Link
        id="wd-course-home-link"
        className={`list-group-item border-0 ${location.pathname === '/Kanbas/Courses/1234/Home' ? 'active' : ''}`}
        to="/Kanbas/Courses/1234/Home"
      >
        Home
      </Link>

      <Link
        id="wd-course-modules-link"
        className={`list-group-item border-0 ${location.pathname === '/Kanbas/Courses/1234/Modules' ? 'active' : ''}`}
        to="/Kanbas/Courses/1234/Modules"
      >
        Modules
      </Link>
      
      <Link
        id="wd-course-piazza-link"
        className={`list-group-item border-0 ${location.pathname === '/Kanbas/Courses/1234/Piazza' ? 'active' : ''}`}
        to="/Kanbas/Courses/1234/Piazza"
      >
        Piazza
      </Link>
      
      <Link
        id="wd-course-zoom-link"
        className={`list-group-item border-0 ${location.pathname === '/Kanbas/Courses/1234/Zoom' ? 'active' : ''}`}
        to="/Kanbas/Courses/1234/Zoom"
      >
        Zoom
      </Link>
      
      <Link
        id="wd-course-assignments-link"
        className={`list-group-item border-0 ${location.pathname === '/Kanbas/Courses/1234/Assignments' ? 'active' : ''}`}
        to="/Kanbas/Courses/1234/Assignments"
      >
        Assignments
      </Link>
      
      <Link
        id="wd-course-quizzes-link"
        className={`list-group-item border-0 ${location.pathname === '/Kanbas/Courses/1234/Quizzes' ? 'active' : ''}`}
        to="/Kanbas/Courses/1234/Quizzes"
      >
        Quizzes
      </Link>
      
      <Link
        id="wd-course-grades-link"
        className={`list-group-item border-0 ${location.pathname === '/Kanbas/Courses/1234/Grades' ? 'active' : ''}`}
        to="/Kanbas/Courses/1234/Grades"
      >
        Grades
      </Link>

      <Link
        id="wd-course-people-link"
        className={`list-group-item border-0 ${location.pathname === '/Kanbas/Courses/1234/People' ? 'active' : ''}`}
        to="/Kanbas/Courses/1234/People"
      >
        People
      </Link>
    </div>
  );
}
