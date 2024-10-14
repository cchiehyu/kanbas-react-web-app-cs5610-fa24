import React from 'react';
import { useParams } from 'react-router'; 
import { BsGripVertical } from 'react-icons/bs'; 
import LessonControlButtons from './LessonControlButtons'; 
import { courses } from '../../Database';  
import ModulesControls from './ModulesControls'; 
import * as db from '../../Database'; 
import { useEffect }  from 'react';


export default function Modules() {
  const { cid } = useParams(); 
  const modules = db.modules; 
  const course = courses.find((course) => course._id === cid);
  useEffect(() => {
    console.log(`Total modules: ${modules.length}`);
    const filteredModules = modules.filter((module: any) => module.course === cid);
    console.log(`Modules for course ${cid}: ${filteredModules.length}`);
  }, [modules, cid]);


  return (
    <div id="wd-modules">
      <h2>Course {course && course.number}</h2>

      {/* Modules Controls */}
      <ModulesControls />
      <br /><br /><br /><br />

      

      {/* Dynamically rendered modules based on the course ID */}
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid) // Filter modules by course ID
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
    </div>
  );
}
