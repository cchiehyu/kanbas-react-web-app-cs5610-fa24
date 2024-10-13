import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import '../styles.css'; // Correct path to the styles.css file

export default function CoursesNavigation() {
  // Get the course ID from the URL parameters
  const { cid } = useParams();
  
  // Get the current location (pathname)
  const location = useLocation();

  // Array of navigation links
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const linkPath = `/Kanbas/Courses/${cid}/${link}`;
        const isActive = location.pathname.includes(link.toLowerCase());

        return (
          <Link
            key={link}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item ${isActive ? 'active' : ''}`}
            to={linkPath}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
