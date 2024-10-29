import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAssignment, updateAssignment } from './reducer';

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  group: string;
  submissionType: string;
}

interface KanbasState {
  assignmentsReducer: {
    assignments: Assignment[];
  };
}

export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const isNewAssignment = aid === 'new';
  
  // Get assignments from Redux store
  const assignments = useSelector((state: KanbasState) => 
    state.assignmentsReducer.assignments);
  
  const [assignment, setAssignment] = useState<Assignment>({
    _id: isNewAssignment ? new Date().getTime().toString() : '',
    title: '',
    course: cid || '',
    description: '',
    points: 100,
    dueDate: '',
    availableFrom: '',
    availableUntil: '',
    group: 'Assignments',
    submissionType: 'online'
  });
  
  const [saveMessage, setSaveMessage] = useState<string>('');

  useEffect(() => {
    if (!isNewAssignment) {
      const foundAssignment = assignments.find((a) => a._id === aid);
      if (foundAssignment) {
        setAssignment({
          ...foundAssignment,
          description: foundAssignment.description || '',
          points: foundAssignment.points || 0,
          dueDate: foundAssignment.dueDate || '',
          availableFrom: foundAssignment.availableFrom || '',
          availableUntil: foundAssignment.availableUntil || '',
          group: foundAssignment.group || 'Assignments',
          submissionType: foundAssignment.submissionType || 'online',
        });
      }
    }
  }, [aid, assignments, isNewAssignment]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setAssignment(prev => ({
      ...prev,
      [id.replace('wd-', '')]: value,
    }));
  };

  const handleSave = () => {
    if (isNewAssignment) {
      dispatch(addAssignment(assignment));
      setSaveMessage('New assignment created successfully!');
    } else {
      dispatch(updateAssignment(assignment));
      setSaveMessage('Assignment updated successfully!');
    }
    
    setTimeout(() => {
      setSaveMessage('');
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
    }, 2000);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <h4>{isNewAssignment ? 'Create New Assignment' : 'Edit Assignment'}</h4>
      
      {/* Assignment Name */}
      <div className="row mb-3">
        <label htmlFor="wd-title" className="form-label col-md-2">Assignment Name *</label>
        <div className="col-md-10">
          <input 
            id="wd-title" 
            value={assignment.title} 
            onChange={handleInputChange} 
            className="form-control"
            required 
          />
        </div>
      </div>

      {/* Description */}
      <div className="row mb-4">
        <label htmlFor="wd-description" className="form-label col-md-2">Description</label>
        <div className="col-md-10">
          <textarea
            id="wd-description"
            className="form-control"
            rows={6}
            value={assignment.description}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Points */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-points" className="form-label">Points *</label>
          <input 
            id="wd-points" 
            type="number" 
            value={assignment.points} 
            onChange={handleInputChange} 
            className="form-control"
            required 
          />
        </div>
      </div>

      {/* Due Date and Available Dates */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="wd-dueDate" className="form-label">Due Date *</label>
          <input
            type="datetime-local"
            id="wd-dueDate"
            value={assignment.dueDate.slice(0, 16)}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="wd-availableFrom" className="form-label">Available From</label>
          <input
            type="datetime-local"
            id="wd-availableFrom"
            value={assignment.availableFrom.slice(0, 16)}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="wd-availableUntil" className="form-label">Until</label>
          <input
            type="datetime-local"
            id="wd-availableUntil"
            value={assignment.availableUntil.slice(0, 16)}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className="row mb-3">
          <div className="col-md-12">
            <div className="alert alert-info" role="alert">
              {saveMessage}
            </div>
          </div>
        </div>
      )}

      {/* Save and Cancel Buttons */}
      <div className="row mt-4">
        <div className="col-md-12 d-flex justify-content-end">
          <button 
            id="wd-cancel" 
            className="btn btn-secondary me-2" 
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button 
            id="wd-save" 
            className="btn btn-danger" 
            onClick={handleSave}
            disabled={!assignment.title || !assignment.points || !assignment.dueDate}
          >
            {isNewAssignment ? 'Create' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}