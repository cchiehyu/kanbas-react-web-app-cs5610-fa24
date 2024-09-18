import React from 'react';
interface ModulesProps {
  courseCode: string;
}

export default function Modules({ courseCode }: ModulesProps) {
  return (
    <div id="wd-modules">
      <h2>Course {courseCode}</h2>
      
      {/* Buttons for module actions */}
      <div id="wd-module-actions">
        <button>Collapse All</button>
        <button>View Progress</button>
        <button>Publish All</button>
        <button>+ Module</button>
      </div>

      {/* Week 1, Lecture 1 */}
      <ul id="wd-module-list">
        <li className="wd-module">
          <div className="wd-title">Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</div>
          <ul className="wd-lessons">
            {/* LEARNING OBJECTIVES */}
            <li className="wd-lesson">
              <span className="wd-lesson-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
            </li>

            {/* READING */}
            <li className="wd-lesson">
              <span className="wd-lesson-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Developer - Chapter 1: Introduction</li>
                <li className="wd-content-item">Full Stack Developer - Chapter 2: Creating User Interfaces</li>
              </ul>
            </li>

            {/* SLIDES */}
            <li className="wd-lesson">
              <span className="wd-lesson-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to Web Development</li>
                <li className="wd-content-item">Creating an HTTP server with Node.js</li>
                <li className="wd-content-item">Creating a React Application</li>
              </ul>
            </li>
          </ul>
        </li>
        
        <p>
          
      </p>
        {/* Week 1, Lecture 2 */}

        <li className="wd-module">
          <div className="wd-title">Week 1, Lecture 2 - Formatting User Interfaces with HTML</div>
          <ul className="wd-lessons">
            {/* LEARNING OBJECTIVES */}
            <li className="wd-lesson">
              <span className="wd-lesson-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                <li className="wd-content-item">Deploy the assignment to Netlify</li>
              </ul>
            </li>

            {/* SLIDES */}
            <li className="wd-lesson">
              <span className="wd-lesson-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to HTML and the DOM</li>
                <li className="wd-content-item">Formatting Web content with Headings and Lists</li>
                <li className="wd-content-item">Formatting content with Lists and Tables</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

  