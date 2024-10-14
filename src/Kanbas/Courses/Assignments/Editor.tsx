import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as db from '../../Database'; 

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

export default function AssignmentEditor() {
  const { aid } = useParams(); 
  const [assignment, setAssignment] = useState<Assignment | null>(null); 
  const [saveMessage, setSaveMessage] = useState<string>('');

  useEffect(() => {
    const foundAssignment = db.assignments.find((a: any) => a._id === aid);

    if (foundAssignment) {
      const completeAssignment: Assignment = {
        _id: foundAssignment._id,
        title: foundAssignment.title,
        course: foundAssignment.course, 
        description: foundAssignment.description || '', 
        points: foundAssignment.points || 0,
        dueDate: foundAssignment.dueDate || '',
        availableFrom: foundAssignment.availableFrom || '',
        availableUntil: foundAssignment.availableUntil || '',
        group: foundAssignment.group || 'Assignments',
        submissionType: foundAssignment.submissionType || 'online',
      };

      setAssignment(completeAssignment);
    } else {
      setAssignment(null); 
    }
  }, [aid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (assignment) {
      setAssignment({
        ...assignment,
        [e.target.id.replace('wd-', '')]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    if (assignment) {
      console.log('Saving assignment:', assignment);
      const index = db.assignments.findIndex((a: any) => a._id === assignment._id);
      if (index !== -1) {
        db.assignments[index] = assignment;
        setSaveMessage('Assignment saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('Error: Assignment not found');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    }
  };

  const handleCancel = () => {
    const originalAssignment = db.assignments.find((a: any) => a._id === aid);
    if (originalAssignment) {
      setAssignment(originalAssignment as Assignment);
      setSaveMessage('Changes discarded');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  if (!assignment) {
    return <div>Loading assignment...</div>; 
  }

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      {/* Assignment Name */}
      <div className="row mb-3">
        <label htmlFor="wd-title" className="form-label col-md-2">Assignment Name</label>
        <div className="col-md-10">
          <input id="wd-title" value={assignment.title} onChange={handleInputChange} className="form-control" />
        </div>
      </div>

      {/* Course */}
      <div className="row mb-3">
        <label htmlFor="wd-course" className="form-label col-md-2">Course</label>
        <div className="col-md-10">
          <input id="wd-course" value={assignment.course} onChange={handleInputChange} className="form-control" />
        </div>
      </div>

      {/* Assignment Description */}
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

      {/* Points and Assignment Group */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-points" className="form-label">Points</label>
          <input id="wd-points" type="number" value={assignment.points} onChange={handleInputChange} className="form-control" />
        </div>
        <div className="col-md-6">
          <label htmlFor="wd-group" className="form-label">Assignment Group</label>
          <select id="wd-group" value={assignment.group} onChange={handleInputChange} className="form-select">
            <option value="Assignments">Assignments</option>
            <option value="Quizzes">Quizzes</option>
            <option value="Projects">Projects</option>
            <option value="Exams">Exams</option>
          </select>
        </div>
      </div>

      {/* Submission Type */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-submissionType" className="form-label">Submission Type</label>
          <select id="wd-submissionType" value={assignment.submissionType} onChange={handleInputChange} className="form-select">
            <option value="online">Online</option>
            <option value="paper">Paper</option>
            <option value="external">External Tool</option>
          </select>
        </div>
      </div>

      {/* Due Date and Available Dates */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="wd-dueDate" className="form-label">Due</label>
          <input
            type="datetime-local"
            id="wd-dueDate"
            value={assignment.dueDate.slice(0, 16)}
            onChange={handleInputChange}
            className="form-control"
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
          <button id="wd-cancel" className="btn btn-secondary me-2" onClick={handleCancel}>Cancel</button>
          <button id="wd-save" className="btn btn-danger" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}