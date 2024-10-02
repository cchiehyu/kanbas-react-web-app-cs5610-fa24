import React from 'react';
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {/* Add Module Button */}
      <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </button>

      {/* Publish All Dropdown */}
      <div className="dropdown d-inline me-1 float-end">
        <button
          id="wd-publish-all-btn"
          className="btn btn-lg btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          <GreenCheckmark />
          Publish All
        </button>
        <ul className="dropdown-menu">
          {/* Publish all modules and items */}
          <li>
            <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item" href="#/Kanbas/Courses/1234/Home">
              <GreenCheckmark />
              Publish all modules and items
            </a>
          </li>

          {/* Publish modules only */}
          <li>
            <a id="wd-publish-modules-only-btn" className="dropdown-item" href="#/Kanbas/Courses/1234/Home">
              <GreenCheckmark />
              Publish modules only
            </a>
          </li>

          {/* Unpublish all modules and items */}
          <li>
            <a id="wd-unpublish-all-modules-and-items" className="dropdown-item" href="#/Kanbas/Courses/1234/Home">
              <GreenCheckmark />
              Unpublish all modules and items
            </a>
          </li>

          {/* Unpublish modules only */}
          <li>
            <a id="wd-unpublish-modules-only" className="dropdown-item" href="#/Kanbas/Courses/1234/Home" >
              <GreenCheckmark />
              Unpublish modules only
            </a>
          </li>
        </ul>
      </div>

      {/* View Progress Button */}
      <button
        id="wd-view-progress"
        className="btn btn-lg btn-outline-primary me-1 float-end"
      >
        View Progress
      </button>

      {/* Collapse All Button */}
      <button
        id="wd-collapse-all"
        className="btn btn-lg btn-outline-primary me-1 float-end"
      >
        Collapse All
      </button>
    </div>
  );
}
