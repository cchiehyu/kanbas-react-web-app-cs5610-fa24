import React from 'react';
import { Link, useLocation } from "react-router-dom"; // Import useLocation

export default function TOC() {
  const { pathname } = useLocation(); // Get the current pathname

  return (
    <ul className="nav nav-pills">
      {/* Labs Link */}
      <li className="nav-item">
        <Link to="/Labs" className="nav-link">
          Labs
        </Link>
      </li>

      {/* Lab 1 Link */}
      <li className="nav-item">
        <Link
          to="/Labs/Lab1"
          className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`}
        >
          Lab 1
        </Link>
      </li>

      {/* Lab 2 Link */}
      <li className="nav-item">
        <Link
          to="/Labs/Lab2"
          className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`}
        >
          Lab 2
        </Link>
      </li>

      {/* Lab 3 Link */}
      <li className="nav-item">
        <Link
          to="/Labs/Lab3"
          className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`}
        >
          Lab 3
        </Link>
      </li>

      {/* Kanbas Link */}
      <li className="nav-item">
        <Link to="/Kanbas" className="nav-link">
          Kanbas
        </Link>
      </li>

      {/* LinkedIn Link */}
      <li className="nav-item">
        <a
          href="https://www.linkedin.com/in/joyce-chen-1686b3199/"
          className="nav-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </li>

      {/* GitHub Link */}
      <li className="nav-item">
        <a
          href="https://github.com/cchiehyu/kanbas-react-web-app-cs5610-fa24"
          className="nav-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </li>
    </ul>
  );
}
