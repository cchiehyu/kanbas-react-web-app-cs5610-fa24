import React from 'react';
import { useDispatch } from 'react-redux';
import { addModule, updateModule } from './reducer';
import { useParams } from 'react-router';
import * as client from './client';

interface ModuleEditorProps {
  dialogTitle: string;
  moduleName: string;
  setModuleName: (name: string) => void;
  addModule: () => void;
  isEditing?: boolean;
  moduleId?: string;
}

export default function ModuleEditor({ 
  dialogTitle, 
  moduleName, 
  setModuleName, 
  addModule: parentAddModule,
  isEditing = false,
  moduleId
}: ModuleEditorProps) {
  const dispatch = useDispatch();
  const { cid } = useParams<{ cid: string }>();

  const handleAction = async () => {
    try {
      if (!moduleName.trim()) {
        alert("Module name cannot be empty");
        return;
      }

      if (isEditing && moduleId) {
        // Update existing module
        const updatedModule = await client.updateModuleAPI(moduleId, moduleName);
        dispatch(updateModule({ _id: moduleId, name: moduleName }));
      } else {
        // Create new module
        const newModule = await client.createModuleAPI(cid!, moduleName);
        dispatch(addModule({ name: moduleName, course: cid }));
        parentAddModule();
      }

      // Reset input
      setModuleName("");
    } catch (error) {
      console.error("Error with module:", error);
      alert(isEditing ? "Failed to update module" : "Failed to add module");
    }
  };

  return (
    <div 
      id="wd-add-module-dialog" 
      className="modal fade" 
      data-bs-backdrop="static" 
      data-bs-keyboard="false"
      tabIndex={-1}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {dialogTitle}
            </h1>
            <button 
              type="button" 
              className="btn-close" 
              data-bs-dismiss="modal" 
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <input
              className="form-control"
              value={moduleName}
              placeholder="Module Name"
              onChange={(e) => setModuleName(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button 
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={handleAction}
            >
              {isEditing ? 'Update Module' : 'Add Module'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}