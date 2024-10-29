import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsGripVertical, BsPlus } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
}

interface Course {
  _id: string;
  name: string;
  number: string;
}

interface KanbasState {
  assignmentsReducer: {
    assignments: Assignment[];
  };
}

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();

  // Get assignments from Redux store
  const assignments = useSelector((state: KanbasState) => 
    state.assignmentsReducer.assignments.filter(
      assignment => assignment.course === cid
    )
  );

  // Get course details from Redux store (assuming you have a coursesReducer)
  const course = useSelector((state: any) => 
    state.coursesReducer?.courses.find((c: Course) => c._id === cid)
  );

  const handleAddAssignment = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/new`);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
          <button 
            className="btn btn-danger ms-3"
            onClick={handleAddAssignment}
          >
            <BsPlus className="me-1" /> Assignment
          </button>
        </div>
      </div>

      {/* Assignments List Header */}
      <h4 className="mb-3">
        {course ? `Assignments for ${course.number} - ${course.name}` : 'Loading course details...'}
      </h4>

      {/* Assignments List */}
      <ul id="wd-assignments-list" className="list-group rounded-0">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <li 
              key={assignment._id}
              className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray"
              style={{ borderLeft: '5px solid green' }}
            >
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <div className="wd-title p-3 ps-2 bg-light flex-grow-1">
                  {assignment.title}
                </div>
              </div>
              <ul className="wd-assignments-list list-group rounded-0">
                <li className="wd-assignment-item list-group-item p-3 ps-1">
                  <div className="d-flex justify-content-between">
                    <a 
                      className="wd-assignment-link text-decoration-none" 
                      href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                    >
                      {assignment.title}
                    </a>
                    <span className="text-muted">
                      {formatDate(assignment.dueDate || '')}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>Points:</strong> {assignment.points || 0}
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          ))
        ) : (
          <p>No assignments found for this course.</p>
        )}
      </ul>
    </div>
  );
}