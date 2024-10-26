import React, { useState } from 'react';
import LessonControlButtons from './LessonControlButtons';
import ModulesControls from './ModulesControls';
import { BsGripVertical } from 'react-icons/bs';

interface ModulesProps {
  courseCode: string;
}

export default function Modules({ courseCode }: ModulesProps) {
  const [isExpanded, setIsExpanded] = useState({
    module1: true,
    module2: true
  });

  const toggleModule = (moduleId: 'module1' | 'module2') => {
    setIsExpanded(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleCollapseAll = () => {
    setIsExpanded({
      module1: false,
      module2: false
    });
  };

  const handleExpandAll = () => {
    setIsExpanded({
      module1: true,
      module2: true
    });
  };

  return (
    <div id="wd-modules">
      <h2>Course {courseCode}</h2>

      {/* Modules Controls */}
      <ModulesControls onCollapseAll={handleCollapseAll} onExpandAll={handleExpandAll} />
      <br /><br /><br /><br />

      <ul className="list-group rounded-0 mt-4">
        {/* Week 1, Lecture 1 */}
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div 
            className="d-flex align-items-center" 
            onClick={() => toggleModule('module1')}
            style={{ cursor: 'pointer' }}
          >
            <BsGripVertical className="me-2 fs-3" />
            <div className="wd-title p-3 ps-2 bg-secondary text-white w-100">
              {isExpanded.module1 ? '▼' : '▶'} Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda
            </div>
          </div>
          <LessonControlButtons />
          
          {isExpanded.module1 && (
            <ul className="list-group rounded-0">
              {/* Learning Objectives Section */}
              <li className="list-group-item p-0">
                <div className="p-3 ps-4 bg-light fw-bold">LEARNING OBJECTIVES</div>
                <ul className="list-group rounded-0">
                  <li className="list-group-item p-3 ps-5">Introduction to the course</li>
                  <li className="list-group-item p-3 ps-5">Learn what is Web Development</li>
                </ul>
              </li>

              {/* Reading Section */}
              <li className="list-group-item p-0">
                <div className="p-3 ps-4 bg-light fw-bold">READING</div>
                <ul className="list-group rounded-0">
                  <li className="list-group-item p-3 ps-5">Full Stack Developer - Chapter 1: Introduction</li>
                  <li className="list-group-item p-3 ps-5">Full Stack Developer - Chapter 2: Creating User Interfaces</li>
                </ul>
              </li>

              {/* Slides Section */}
              <li className="list-group-item p-0">
                <div className="p-3 ps-4 bg-light fw-bold">SLIDES</div>
                <ul className="list-group rounded-0">
                  <li className="list-group-item p-3 ps-5">Introduction to Web Development</li>
                  <li className="list-group-item p-3 ps-5">Creating an HTTP server with Node.js</li>
                  <li className="list-group-item p-3 ps-5">Creating a React Application</li>
                </ul>
              </li>
            </ul>
          )}
        </li>

        {/* Week 1, Lecture 2 */}
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div 
            className="d-flex align-items-center"
            onClick={() => toggleModule('module2')}
            style={{ cursor: 'pointer' }}
          >
            <BsGripVertical className="me-2 fs-3" />
            <div className="wd-title p-3 ps-2 bg-secondary text-white w-100">
              {isExpanded.module2 ? '▼' : '▶'} Week 1, Lecture 2 - Formatting User Interfaces with HTML
            </div>
          </div>
          <LessonControlButtons />
          
          {isExpanded.module2 && (
            <ul className="list-group rounded-0">
              {/* Learning Objectives Section */}
              <li className="list-group-item p-0">
                <div className="p-3 ps-4 bg-light fw-bold">LEARNING OBJECTIVES</div>
                <ul className="list-group rounded-0">
                  <li className="list-group-item p-3 ps-5">Learn how to create user interfaces with HTML</li>
                  <li className="list-group-item p-3 ps-5">Deploy the assignment to Netlify</li>
                </ul>
              </li>

              {/* Slides Section */}
              <li className="list-group-item p-0">
                <div className="p-3 ps-4 bg-light fw-bold">SLIDES</div>
                <ul className="list-group rounded-0">
                  <li className="list-group-item p-3 ps-5">Introduction to HTML and the DOM</li>
                  <li className="list-group-item p-3 ps-5">Formatting Web content with Headings and Lists</li>
                  <li className="list-group-item p-3 ps-5">Formatting content with Lists and Tables</li>
                </ul>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}