import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAssignment } from './reducer';

interface AssignmentForm {
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableFromDate: string;
  availableUntilDate: string;
}

export default function AssignmentEditor() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<AssignmentForm>({
    title: '',
    description: '',
    points: 100,
    dueDate: '',
    availableFromDate: '',
    availableUntilDate: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const newAssignment = {
      ...formData,
      course: cid,
    };
    
    dispatch(addAssignment(newAssignment));
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div className="p-4">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Assignment Name</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="New Assignment"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Assignment Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          placeholder="New Assignment Description"
        />
      </div>

      <div className="mb-3">
        <div className="row align-items-center">
          <div className="col-1">
            <label htmlFor="points" className="form-label">Points</label>
          </div>
          <div className="col-11">
            <input
              type="number"
              className="form-control"
              id="points"
              name="points"
              value={formData.points}
              onChange={handleInputChange}
              style={{ width: '100px' }}
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="row">
          <div className="col-1">
            <label className="form-label">Assign</label>
          </div>
          <div className="col-11">
            <div className="border p-3">
              <div className="mb-3">
                <label htmlFor="dueDate" className="form-label">Due</label>
                <div className="input-group">
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <label htmlFor="availableFromDate" className="form-label">Available from</label>
                  <div className="input-group">
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="availableFromDate"
                      name="availableFromDate"
                      value={formData.availableFromDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <label htmlFor="availableUntilDate" className="form-label">Until</label>
                  <div className="input-group">
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="availableUntilDate"
                      name="availableUntilDate"
                      value={formData.availableUntilDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-end">
        <button
          type="button"
          className="btn btn-light me-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}