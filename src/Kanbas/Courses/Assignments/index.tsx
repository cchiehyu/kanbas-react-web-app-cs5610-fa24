import React from 'react';
import { BsGripVertical, BsPlus } from 'react-icons/bs'; 
import { FaSearch } from 'react-icons/fa'; 

export default function Assignments() {
  return (
    <div id="wd-assignments" className="container mt-4">
      {/* Search Bar and Filter Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="input-group" style={{ width: '250px' }}>
          <span className="input-group-text bg-white">
            <FaSearch />
          </span>
          <input 
            id="wd-search-assignment"
            className="form-control"
            placeholder="Search for Assignments" 
          />
        </div>
        <div>
          <button className="btn btn-secondary me-2">SHOW BY DATE</button>
          <button className="btn btn-secondary">SHOW BY TYPE</button>
          <button className="btn btn-danger ms-3">
            <BsPlus className="me-1" /> Assignment
          </button>
        </div>
      </div>

      {/* Upcoming Assignments Header */}
      <h4 className="mb-3">Upcoming Assignments</h4>

      {/* Upcoming Assignments List */}
      <ul id="wd-upcoming-assignment-list" className="list-group rounded-0">
        {/* Assignment 3 */}
        <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray" style={{ borderLeft: '5px solid green' }}>
          <BsGripVertical className="me-2 fs-3" />
          <div className="wd-title p-3 ps-2 bg-light">A3 - JavaScript + React</div>
          <ul className="wd-assignments-list list-group rounded-0">
            <li className="wd-assignment-item list-group-item p-3 ps-1">
              <div className="d-flex justify-content-between">
                <a className="wd-assignment-link text-decoration-none" href="#/Kanbas/Courses/1234/Assignments/125">
                  A3 - JavaScript + React
                </a>
                <span className="text-muted"> Not available until Nov 1 at 12:00am</span>
              </div>
              <div className="d-flex justify-content-between">
                <div><strong>Due:</strong> Nov 1 at 11:59pm</div>
                <div><strong>17 pts</strong></div>
              </div>
            </li>
          </ul>
        </li>

        {/* Assignment 4 */}
        <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray" style={{ borderLeft: '5px solid green' }}>
          <BsGripVertical className="me-2 fs-3" />
          <div className="wd-title p-3 ps-2 bg-light">A4 - Final Project</div>
          <ul className="wd-assignments-list list-group rounded-0">
            <li className="wd-assignment-item list-group-item p-3 ps-1">
              <div className="d-flex justify-content-between">
                <a className="wd-assignment-link text-decoration-none" href="#/Kanbas/Courses/1234/Assignments/126">
                  A4 - Final Project
                </a>
                <span className="text-muted"> Not available until Dec 10 at 12:00am</span>
              </div>
              <div className="d-flex justify-content-between">
                <div><strong>Due:</strong> Dec 10 at 11:59pm</div>
                <div><strong>100 pts</strong></div>
              </div>
            </li>
          </ul>
        </li>
      </ul>

      {/* Past Assignments Header */}
      <h4 className="mb-3">Past Assignments</h4>

      {/* Past Assignments List */}
      <ul id="wd-past-assignment-list" className="list-group rounded-0">
        {/* Assignment 1 */}
        <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray" style={{ borderLeft: '5px solid gray' }}>
          <BsGripVertical className="me-2 fs-3" />
          <div className="wd-title p-3 ps-2 bg-light">A1 - ENV + HTML</div>
          <ul className="wd-assignments-list list-group rounded-0">
            <li className="wd-assignment-item list-group-item p-3 ps-1">
              <div className="d-flex justify-content-between">
                <a className="wd-assignment-link text-decoration-none" href="#/Kanbas/Courses/1234/Assignments/123">
                  A1 - ENV + HTML
                </a>
                <span className="text-muted"> Completed on Oct 1 at 11:59pm</span>
              </div>
              <div className="d-flex justify-content-between">
                <div><strong>Points Earned:</strong> 23 pts</div>
                <div><strong>Grade:</strong> 100%</div>
              </div>
            </li>
          </ul>
        </li>

        {/* Assignment 2 */}
        <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray" style={{borderLeft: '5px solid gray'  }}>
          <BsGripVertical className="me-2 fs-3" />
          <div className="wd-title p-3 ps-2 bg-light">A2 - CSS + BOOTSTRAP</div>
          <ul className="wd-assignments-list list-group rounded-0">
            <li className="wd-assignment-item list-group-item p-3 ps-1">
              <div className="d-flex justify-content-between">
                <a className="wd-assignment-link text-decoration-none" href="#/Kanbas/Courses/1234/Assignments/124">
                  A2 - CSS + BOOTSTRAP
                </a>
                <span className="text-muted"> Completed on Oct 18 at 11:59pm</span>
              </div>
              <div className="d-flex justify-content-between">
                <div><strong>Points Earned:</strong> 31 pts</div>
                <div><strong>Grade:</strong> 95%</div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
