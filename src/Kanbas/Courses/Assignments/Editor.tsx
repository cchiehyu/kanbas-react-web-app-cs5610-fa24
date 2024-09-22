import React from 'react';

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container mt-4">
      {/* Assignment Name */}
      <div className="row mb-3">
        <label htmlFor="wd-name" className="form-label col-md-2">Assignment Name</label>
        <div className="col-md-10">
          <input id="wd-name" value="A1" className="form-control" />
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
            defaultValue={`The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.
            The landing page should include the following:
            - Your full name and section
            - Links to each of the lab assignments
            - Link to the Kanbas application
            - Links to all relevant source code repositories
            The Kanbas application should include a link to navigate back to the landing page.`}
          />
        </div>
      </div>

      {/* Points and Assignment Group */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-points" className="form-label">Points</label>
          <input id="wd-points" value={100} className="form-control" />
        </div>
        <div className="col-md-6">
          <label htmlFor="wd-assignment-group" className="form-label">Assignment Group</label>
          <select id="wd-assignment-group" className="form-select">
            <option value="assignments">Assignments</option>
          </select>
        </div>
      </div>

      {/* Display Grade as */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-display-grade" className="form-label">Display Grade as</label>
          <select id="wd-display-grade" className="form-select">
            <option value="percentage">Percentage</option>
            <option value="points">Points</option>
            <option value="complete/incomplete">Complete/Incomplete</option>
          </select>
        </div>
      </div>

      {/* Submission Type */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
          <select id="wd-submission-type" className="form-select">
            <option value="online">Online</option>
            <option value="paper">Paper</option>
            <option value="external">External Tool</option>
          </select>
        </div>
      </div>

      {/* Online Entry Options */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Online Entry Options</label>
          <div className="form-check">
            <input type="checkbox" id="text-entry" className="form-check-input" />
            <label htmlFor="text-entry" className="form-check-label">Text Entry</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="website-url" className="form-check-input" checked />
            <label htmlFor="website-url" className="form-check-label">Website URL</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="media-recordings" className="form-check-input" />
            <label htmlFor="media-recordings" className="form-check-label">Media Recordings</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="student-annotation" className="form-check-input" />
            <label htmlFor="student-annotation" className="form-check-label">Student Annotation</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="file-uploads" className="form-check-input" />
            <label htmlFor="file-uploads" className="form-check-label">File Uploads</label>
          </div>
        </div>
      </div>

      {/* Assign to */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-assign-to" className="form-label">Assign To</label>
          <input id="wd-assign-to" value="Everyone" className="form-control" />
        </div>
      </div>

      {/* Due Date and Available Dates */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-due-date" className="form-label">Due</label>
          <input type="datetime-local" id="wd-due-date" value="2024-05-13T23:59" className="form-control" />
        </div>
        <div className="col-md-6">
          <label htmlFor="wd-available-from" className="form-label">Available From</label>
          <input type="datetime-local" id="wd-available-from" value="2024-05-06T00:00" className="form-control" />
          <label htmlFor="wd-available-until" className="form-label mt-2">Until</label>
          <input type="datetime-local" id="wd-available-until" value="2024-05-20T23:59" className="form-control" />
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
