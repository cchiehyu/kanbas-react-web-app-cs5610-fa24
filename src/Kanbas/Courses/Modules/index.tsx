import React from 'react';
import { useParams } from 'react-router'; 
import { BsGripVertical } from 'react-icons/bs'; 
import LessonControlButtons from './LessonControlButtons'; 
import { courses } from '../../Database';  
import ModulesControls from './ModulesControls'; 
import * as db from '../../Database'; 
import { useEffect, useState } from 'react';

// Making the interface props optional since we're using useParams
interface ModulesProps {
  courseCode?: string;
}

export default function Modules({ courseCode }: ModulesProps = {}) {
  const [isExpanded, setIsExpanded] = useState({
    module1: true,
    module2: true
  });

  const { cid } = useParams(); 
  const currentCourseId = courseCode || cid;
  const [modules, setModules] = useState<any[]>(db.modules);
  const course = courses.find((course) => course._id === currentCourseId);

  useEffect(() => {
    console.log(`Total modules: ${modules.length}`);
    const filteredModules = modules.filter((module: any) => module.course === currentCourseId);
    console.log(`Modules for course ${currentCourseId}: ${filteredModules.length}`);
  }, [modules, currentCourseId]);

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
      <h2>Course {course && course.number}</h2>

      {/* Modules Controls */}
      <ModulesControls onCollapseAll={handleCollapseAll} onExpandAll={handleExpandAll} />
      <br /><br /><br /><br />

      {/* Dynamic modules */}
      <ul className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === currentCourseId)
          .map((module: any) => (
            <li key={module.id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" /> {module.name} <LessonControlButtons />
              </div>

              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <li key={lesson.id} className="wd-lesson list-group-item p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>

      {/* Static modules */}
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
              <li className="list-group-item p-0">
                <div className="p-3 ps-4 bg-light fw-bold">LEARNING OBJECTIVES</div>
                <ul className="list-group rounded-0">
                  <li className="list-group-item p-3 ps-5">Introduction to the course</li>
                  <li className="list-group-item p-3 ps-5">Learn what is Web Development</li>
                </ul>
              </li>

              <li className="list-group-item p-0">
                <div className="p-3 ps-4 bg-light fw-bold">READING</div>
                <ul className="list-group rounded-0">
                  <li className="list-group-item p-3 ps-5">Full Stack Developer - Chapter 1: Introduction</li>
                  <li className="list-group-item p-3 ps-5">Full Stack Developer - Chapter 2: Creating User Interfaces</li>
                </ul>
              </li>

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
              <li className="list-group-item p-0">
                <div className="p-3 ps-4 bg-light fw-bold">LEARNING OBJECTIVES</div>
                <ul className="list-group rounded-0">
                  <li className="list-group-item p-3 ps-5">Learn how to create user interfaces with HTML</li>
                  <li className="list-group-item p-3 ps-5">Deploy the assignment to Netlify</li>
                </ul>
              </li>

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