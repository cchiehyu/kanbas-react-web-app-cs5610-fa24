import React from 'react';
import LessonControlButtons from './LessonControlButtons'; // Import for lesson controls
import ModulesControls from './ModulesControls'; // Import for modules controls
import { BsGripVertical } from 'react-icons/bs'; // Importing the vertical grip icon

interface ModulesProps {
  courseCode: string;
}

export default function Modules({ courseCode }: ModulesProps) {
  return (
    <div id="wd-modules">
      <h2>Course {courseCode}</h2>

      {/* Modules Controls */}
      <ModulesControls />
      <br /><br /><br /><br />

      {/* Original Module List */}
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

      {/* Additional Module List with list-group styling */}
      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <BsGripVertical className="me-2 fs-3" />
          <div className="wd-title p-3 ps-2 bg-secondary">Week 1</div>

          {/* Module Control Buttons */}
          <LessonControlButtons /> 
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1">LEARNING OBJECTIVES</li>
            <LessonControlButtons /> 
            <li className="wd-lesson list-group-item p-3 ps-1">Introduction to the course</li>
            <LessonControlButtons /> 

            <li className="wd-lesson list-group-item p-3 ps-1">Learn what is Web Development</li>
            <li className="wd-lesson list-group-item p-3 ps-1">LESSON 1</li>
            <li className="wd-lesson list-group-item p-3 ps-1">LESSON 2</li>
          </ul>
        </li>

        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <BsGripVertical className="me-2 fs-3" />
          <div className="wd-title p-3 ps-2 bg-secondary">Week 2</div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1">LEARNING OBJECTIVES</li>
            <li className="wd-lesson list-group-item p-3 ps-1">LESSON 1</li>
            <li className="wd-lesson list-group-item p-3 ps-1">LESSON 2</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
