import React from 'react';
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

interface ModulesControlsProps {
  onCollapseAll: () => void;
  onExpandAll: () => void;
}

export default function ModulesControls({ onCollapseAll, onExpandAll }: ModulesControlsProps) {
  return (
    <div className="d-flex justify-content-end align-items-center mb-3">
      <button
        id="wd-collapse-all"
        className="btn btn-outline-secondary me-2"
        onClick={() => onCollapseAll()}
        type="button"
      >
        Collapse All
      </button>

      <button
        id="wd-view-progress"
        className="btn btn-outline-secondary me-2"
      >
        View Progress
      </button>

      <div className="dropdown me-2">
        <button
          id="wd-publish-all-btn"
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <GreenCheckmark />
          Publish All
        </button>
        <ul className="dropdown-menu">
          <li>
            <button 
              className="dropdown-item"
              id="wd-publish-all-modules-and-items-btn"
            >
              <GreenCheckmark />
              Publish all modules and items
            </button>
          </li>
          <li>
            <button 
              className="dropdown-item"
              id="wd-publish-modules-only-btn"
            >
              <GreenCheckmark />
              Publish modules only
            </button>
          </li>
          <li>
            <button 
              className="dropdown-item"
              id="wd-unpublish-all-modules-and-items"
            >
              <GreenCheckmark />
              Unpublish all modules and items
            </button>
          </li>
          <li>
            <button 
              className="dropdown-item"
              id="wd-unpublish-modules-only"
            >
              <GreenCheckmark />
              Unpublish modules only
            </button>
          </li>
        </ul>
      </div>

      <button 
        id="wd-add-module-btn"
        className="btn btn-danger"
      >
        <FaPlus className="me-2" style={{ marginBottom: "2px" }} />
        Module
      </button>
    </div>
  );
}