import React from 'react';
import { BsGripVertical } from 'react-icons/bs'; 
import { FaSearch, FaPlus } from 'react-icons/fa'; 

export default function Assignments() {
  return (
    <div id="wd-assignments" className="container mt-4">
      {/* Search Bar and Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Search Bar */}
        <div className="input-group" style={{ width: '300px' }}>
          <span className="input-group-text bg-white border-end-0">
            <FaSearch />
          </span>
          <input 
            id="wd-search-assignment"
            className="form-control border-start-0"
            placeholder="Search..." 
          />
        </div>

        {/* Buttons */}
        <div className="d-flex">
          <button className="btn btn-secondary me-2">SHOW BY DATE</button>
          <button className="btn btn-secondary">SHOW BY TYPE</button>
        </div>
      </div>

      {/* Upcoming Assignments Section */}
      <div className="mb-5">
        <h4 className="mb-3">Upcoming Assignments</h4>

        <ul className="list-group">
          {/* Assignment Example */}
          {[
            { title: 'A2', description: 'Not available until Oct 13 at 12:00am', due: 'Due Oct 14 at 11:59pm', points: '10 pts' },
            { title: 'A3', description: 'Not available until Oct 20 at 12:00am', due: 'Due Oct 21 at 11:59pm', points: '10 pts' },
            { title: 'Q2', description: 'Not available until Sep 27 at 12:00am', due: 'Due Sep 27 at 11:59pm', points: '10 pts' }
          ].map((assignment, idx) => (
            <li key={idx} className="list-group-item border-start border-3 border-success mb-2">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-3" />
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">{assignment.title}</span>
                    <span className="text-muted">{assignment.points}</span>
                  </div>
                  <div className="text-muted">{assignment.description}</div>
                  <div className="text-muted">{assignment.due}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Past Assignments Section */}
      <div>
        <h4 className="mb-3">Past Assignments</h4>

        <ul className="list-group">
          {/* Assignment Example */}
          {[
            { title: 'A1', description: 'Closed', due: 'Due Sep 19 at 11:59pm', points: 'Not Graded' },
            { title: 'Q1', description: 'Closed', due: 'Due Sep 14 at 11:59pm', points: '27/27 pts' }
          ].map((assignment, idx) => (
            <li key={idx} className="list-group-item border-start border-3 border-secondary mb-2">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-3" />
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">{assignment.title}</span>
                    <span className="text-muted">{assignment.points}</span>
                  </div>
                  <div className="text-muted">{assignment.description}</div>
                  <div className="text-muted">{assignment.due}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
