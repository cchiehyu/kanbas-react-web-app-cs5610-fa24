import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addQuiz, updateQuiz } from './reducer';
import * as client from "./client";
import { QuizForm, Quiz, RootState } from './types';


export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get existing quiz if editing
  const quiz = useSelector((state: RootState) => 
    state.quizzesReducer.quizzes.find(q => q._id === qid)
  );

  const [formData, setFormData] = useState<QuizForm>({
    title: '',
    description: '',
    points: 100,
    dueDate: '',
    availableFromDate: '',
    availableUntilDate: '',
    numberOfQuestions: 0
  });

  // Load existing quiz data when editing
  useEffect(() => {
    if (quiz) {
      setFormData({
        title: quiz.title || '',
        description: quiz.description || '',
        points: quiz.points || 100,
        dueDate: quiz.dueDate || '',
        availableFromDate: quiz.availableFromDate || '',
        availableUntilDate: quiz.availableUntilDate || '',
        numberOfQuestions: quiz.numberOfQuestions || 0
      });
    }
  }, [quiz]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'points' || name === 'numberOfQuestions' 
        ? parseInt(value) || 0 
        : value
    }));
  };

  const handleSubmit = async () => {
    try {
      if (qid && qid !== 'new') {
        // Editing existing quiz
        const updatedQuiz = await client.updateQuiz(qid, {
          ...formData,
          _id: qid,
          course: cid
        });
        dispatch(updateQuiz(updatedQuiz));
      } else {
        // Creating new quiz
        const newQuiz = await client.createQuiz(cid as string, {
          ...formData,
          course: cid,
          published: false
        });
        dispatch(addQuiz(newQuiz));
      }
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Quiz Name</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="New Quiz"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Quiz Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Quiz Description"
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="points" className="form-label">Points</label>
          <input
            type="number"
            className="form-control"
            id="points"
            name="points"
            value={formData.points}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="numberOfQuestions" className="form-label">Number of Questions</label>
          <input
            type="number"
            className="form-control"
            id="numberOfQuestions"
            name="numberOfQuestions"
            value={formData.numberOfQuestions}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <div className="row">
          <div className="col-12">
            <label className="form-label">Assign</label>
            <div className="border p-3">
              <div className="mb-3">
                <label htmlFor="dueDate" className="form-label">Due Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="availableFromDate" className="form-label">Available from</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="availableFromDate"
                    name="availableFromDate"
                    value={formData.availableFromDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="availableUntilDate" className="form-label">Available until</label>
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

      <div className="mt-4 d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleSubmit}
        >
          {qid && qid !== 'new' ? 'Save Changes' : 'Create Quiz'}
        </button>
      </div>
    </div>
  );
}