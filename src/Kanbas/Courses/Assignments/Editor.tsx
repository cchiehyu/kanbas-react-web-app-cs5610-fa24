import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as db from '../../Database'; // Import assignment data

// Define types for the assignment
interface Assignment {
  _id: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  group: string;
  submissionType: string;
}

export default function AssignmentEditor() {
  const { aid } = useParams(); // Get assignment ID from URL
  const [assignment, setAssignment] = useState<Assignment | null>(null); // State to store the current assignment

  useEffect(() => {
    // Find the corresponding assignment based on aid
    const foundAssignment = db.assignments.find((a: any) => a._id === aid);

    if (foundAssignment) {
      // Add missing fields with defaults if they don't exist
      const completeAssignment: Assignment = {
        _id: foundAssignment._id,
        title: foundAssignment.title,
        description: foundAssignment.description || '', // Provide default values
        points: foundAssignment.points || 0,
        dueDate: foundAssignment.dueDate || '',
        availableFrom: foundAssignment.availableFrom || '',
        availableUntil: foundAssignment.availableUntil || '',
        group: foundAssignment.group || 'assignments',
        submissionType: foundAssignment.submissionType || 'online',
      };

      setAssignment(completeAssignment);
    } else {
      setAssignment(null); // Handle the case where no assignment is found
    }
  }, [aid]);

  if (!assignment) {
    return <div>Loading assignment...</div>; // Fallback for when assignment is not found or loading
  }

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      {/* Assignment Name */}
      <div className="row mb-3">
        <label htmlFor="wd-name" className="form-label col-md-2">Assignment Name</label>
        <div className="col-md-10">
          <input id="wd-name" value={assignment.title} className="form-control" readOnly />
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
            defaultValue={assignment.description}
          />
        </div>
      </div>

      {/* Points and Assignment Group */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-points" className="form-label">Points</label>
          <input id="wd-points" value={assignment.points} className="form-control" readOnly />
        </div>
        <div className="col-md-6">
          <label htmlFor="wd-assignment-group" className="form-label">Assignment Group</label>
          <select id="wd-assignment-group" className="form-select">
            <option value={assignment.group}>{assignment.group}</option>
          </select>
        </div>
      </div>

      {/* Display Grade as */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-display-grade" className="form-label">Display Grade as</label>
          <select id="wd-display-grade" className="form-select">
            <option value="percentage">Percentage</option>
            <option value="points" selected={assignment.submissionType === 'points'}>Points</option>
            <option value="complete/incomplete">Complete/Incomplete</option>
          </select>
        </div>
      </div>

      {/* Submission Type */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
          <select id="wd-submission-type" className="form-select">
            <option value="online" selected={assignment.submissionType === 'online'}>Online</option>
            <option value="paper" selected={assignment.submissionType === 'paper'}>Paper</option>
            <option value="external" selected={assignment.submissionType === 'external'}>External Tool</option>
          </select>
        </div>
      </div>

      {/* Due Date and Available Dates */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-due-date" className="form-label">Due</label>
          <input
            type="datetime-local"
            id="wd-due-date"
            value={assignment.dueDate.slice(0, 16)}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="wd-available-from" className="form-label">Available From</label>
          <input
            type="datetime-local"
            id="wd-available-from"
            value={assignment.availableFrom.slice(0, 16)}
            className="form-control"
          />
          <label htmlFor="wd-available-until" className="form-label mt-2">Until</label>
          <input
            type="datetime-local"
            id="wd-available-until"
            value={assignment.availableUntil.slice(0, 16)}
            className="form-control"
          />
        </div>
      </div>

      {/* Save and Cancel Buttons */}
      <div className="row mt-4">
        <div className="col-md-12 d-flex justify-content-end">
          <button id="wd-cancel" className="btn btn-secondary me-2">Cancel</button>
          <button id="wd-save" className="btn btn-danger">Save</button>
        </div>
      </div>
    </div>
  );
}
