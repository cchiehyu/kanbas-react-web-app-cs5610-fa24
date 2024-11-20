import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsGripVertical, BsPlus } from 'react-icons/bs';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { deleteAssignment, setAssignments } from './reducer';
import * as assignmentsClient from "./client";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
}

interface KanbasState {
  assignmentsReducer: {
    assignments: Assignment[];
  };
}

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    assignmentId: '',
    assignmentTitle: ''
  });

  const assignments = useSelector((state: KanbasState) => 
    state.assignmentsReducer.assignments.filter(
      assignment => assignment.course === cid
    )
  );

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const assignments = await assignmentsClient.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    fetchAssignments();
  }, [cid, dispatch]);

  const handleAddAssignment = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/new`);
  };

  const handleDeleteClick = (assignmentId: string, title: string) => {
    setDeleteDialog({
      isOpen: true,
      assignmentId,
      assignmentTitle: title
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await assignmentsClient.deleteAssignment(deleteDialog.assignmentId);
      dispatch(deleteAssignment(deleteDialog.assignmentId));
      setDeleteDialog({
        isOpen: false,
        assignmentId: '',
        assignmentTitle: ''
      });
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({
      isOpen: false,
      assignmentId: '',
      assignmentTitle: ''
    });
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

      <ul id="wd-assignments-list" className="list-group rounded-0">
        {assignments.map((assignment) => (
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
                  <div className="d-flex flex-column">
                    <Link 
                      to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                      className="text-decoration-none"
                    >
                      {assignment.title}
                    </Link>
                    {assignment.description && (
                      <p className="text-muted mb-0">
                        {assignment.description.substring(0, 100)}
                        {assignment.description.length > 100 ? '...' : ''}
                      </p>
                    )}
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="text-end me-3">
                      <div className="text-muted">
                        Due: {formatDate(assignment.dueDate || '')}
                      </div>
                      <div>
                        <strong>Points:</strong> {assignment.points || 0}
                      </div>
                    </div>
                    <div>
                      <Link 
                        to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                        className="text-decoration-none me-2"
                      >
                        <FaPen className="text-primary" />
                      </Link>
                      <FaTrash
                        className="text-danger"
                        onClick={() => handleDeleteClick(assignment._id, assignment.title)}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        ))}
      </ul>

      {deleteDialog.isOpen && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Assignment</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={handleDeleteCancel}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete the assignment "{deleteDialog.assignmentTitle}"?
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleDeleteCancel}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}