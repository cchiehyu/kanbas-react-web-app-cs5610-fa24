import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { BsGripVertical } from 'react-icons/bs';
import ModuleControlButtons from './ModuleControlButtons';
import ModulesControls from './ModulesControls';
import { courses } from '../../Database';
import { useSelector, useDispatch } from "react-redux";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import * as client from "./client";
import { RootState } from '../../store';
interface ModulesProps {
  courseCode?: string;
}

export default function Modules({ courseCode }: ModulesProps = {}) {
  const [moduleName, setModuleName] = useState("");
  const { cid } = useParams();
  const currentCourseId = courseCode || cid;
  const dispatch = useDispatch();
  const modules = useSelector((state: any) => state.modulesReducer.modules);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  // Save/Update module
  const saveModule = async (module: any) => {
    try {
      await client.updateModuleAPI(module._id, module.name);
      dispatch(updateModule({ ...module, editing: false }));
    } catch (error) {
      console.error("Error updating module:", error);
      alert("Failed to update module");
    }
  };

  // Delete module
  const removeModule = async (moduleId: string) => {
    try {
      await client.deleteModuleAPI(moduleId);
      dispatch(deleteModule(moduleId));
    } catch (error) {
      console.error("Error deleting module:", error);
      alert("Failed to delete module");
    }
  };

  // Create module
  const createModuleForCourse = async () => {
    if (!currentCourseId || !moduleName.trim()) {
      alert("Module name cannot be empty");
      return;
    }
    
    try {
      const createdModule = await client.createModuleAPI(currentCourseId, moduleName);
      dispatch(addModule(createdModule));
      setModuleName(""); // Reset input after successful creation
    } catch (error) {
      console.error("Error creating module:", error);
      alert("Failed to create module");
    }
  };

  // Fetch modules
  const fetchModules = useCallback(async () => {
    if (!currentCourseId) return;
    try {
      const modules = await client.findModulesForCourse(currentCourseId);
      dispatch(setModules(modules));
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  }, [currentCourseId, dispatch]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return (
    <div id="wd-modules">
      {currentUser.role !== 'STUDENT' && (
        <ModulesControls
          onCollapseAll={() => {}}
          onExpandAll={() => {}}
          setModuleName={setModuleName}
          moduleName={moduleName}
          addModule={createModuleForCourse}
        />
      )}
      
      <br /><br /><br /><br />

      <ul className="list-group rounded-0">
        {modules.map((module: any) => (
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
                      saveModule({ ...module, name: module.name }); // Use the module's current name
                    }
                  }}
                  defaultValue={module.name}
                />
              )}
              {currentUser.role !== 'STUDENT' && (
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={removeModule}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              )}
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