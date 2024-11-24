import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { BsGripVertical } from 'react-icons/bs';
import ModuleControlButtons from './ModuleControlButtons';
import ModulesControls from './ModulesControls';
import { courses } from '../../Database';
import { useSelector, useDispatch } from "react-redux";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import * as coursesClient from "../client";
import * as modulesClient from "../client";

interface ModulesProps {
  courseCode?: string;
}

export default function Modules({ courseCode }: ModulesProps = {}) {
  
  // const [isExpanded, setIsExpanded] = useState({
  //   module1: true,
  //   module2: true
  // });
  const [moduleName, setModuleName] = useState("");
  
  const { cid } = useParams();
  const currentCourseId = courseCode || cid;
  const course = courses.find((course) => course._id === currentCourseId);
 
  const dispatch = useDispatch();
  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };

  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
  };

  const fetchModules = useCallback(async () => {
    if (!cid) return;
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  }, [cid, dispatch]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  const modules = useSelector((state: any) => state.modulesReducer.modules);
  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };



  // const toggleModule = (moduleId: 'module1' | 'module2') => {
  //   setIsExpanded(prev => ({
  //     ...prev,
  //     [moduleId]: !prev[moduleId]
  //   }));
  // };

  const handleCollapseAll = () => {
    // setIsExpanded({
    //   module1: false,
    //   module2: false
    // });
  };

  const handleExpandAll = () => {
    // setIsExpanded({
    //   module1: true,
    //   module2: true
    // });
  };

  return (
    <div id="wd-modules">
      <h2>Course {course && course.number}</h2>

      {/* Modules Controls */}
      <ModulesControls
        onCollapseAll={handleCollapseAll}
        onExpandAll={handleExpandAll}
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={createModuleForCourse}
      />
      <br /><br /><br /><br />

      {/* Dynamic modules */}
      <ul className="list-group rounded-0">
        {modules
          //.filter((module: any) => module.course === currentCourseId)
          .map((module: any) => (
            <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing ? (
                  module.name
                ) : (
                  <input
                    className="form-control w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(updateModule({ ...module, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveModule({ ...module, editing: false });

                      }
                    }}
                    defaultValue={module.name}
                  />
                )}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => removeModule(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>

              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <li key={lesson.id} className="wd-lesson list-group-item p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}
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