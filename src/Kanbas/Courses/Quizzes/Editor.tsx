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
  const [showTimeLimit, setShowTimeLimit] = useState(false);

  const quiz = useSelector((state: RootState) => 
    state.quizzesReducer.quizzes.find(q => q._id === qid)
  );

  const [formData, setFormData] = useState<QuizForm>({
    title: '',
    description: '',
    points: 0,
    dueDate: '',
    availableFromDate: '',
    availableUntilDate: '',
    numberOfQuestions: 0,
    quizType: 'GRADED_QUIZ',
    assignmentGroup: 'ASSIGNMENTS',
    shuffleAnswers: false,
    timeLimit: 0,
    multipleAttempts: false,
    numberOfAttempts: 1,
    showCorrectAnswers: true,
    accessCode: '',
    oneQuestionAtTime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false
  });
  
  useEffect(() => {
    if (quiz) {
      setFormData({
        title: quiz.title || '',
        description: quiz.description || '',
        points: quiz.points || 0,
        dueDate: quiz.dueDate || '',
        availableFromDate: quiz.availableFromDate || '',
        availableUntilDate: quiz.availableUntilDate || '',
        numberOfQuestions: quiz.numberOfQuestions || 0,
        quizType: quiz.quizType || 'GRADED_QUIZ',
        assignmentGroup: quiz.assignmentGroup || 'ASSIGNMENTS',
        shuffleAnswers: quiz.shuffleAnswers || false,
        timeLimit: quiz.timeLimit || 0,
        multipleAttempts: quiz.multipleAttempts || false,
        numberOfAttempts: quiz.numberOfAttempts || 1,
        showCorrectAnswers: quiz.showCorrectAnswers || true,
        accessCode: quiz.accessCode || '',
        oneQuestionAtTime: quiz.oneQuestionAtTime || true,
        webcamRequired: quiz.webcamRequired || false,
        lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering || false
      });

      setShowTimeLimit(quiz.timeLimit > 0); 
    }
  }, [quiz]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async () => {
    try {
      if (qid && qid !== 'new') {
        const updatedQuiz = await client.updateQuiz(qid, {
          ...formData,
          _id: qid,
          course: cid
        });
        dispatch(updateQuiz(updatedQuiz));
      } else {
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
    <div className="wd-kanbas-quiz-editor p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>Points {formData.points || 0}</div>
        <div className="d-flex align-items-center gap-2">
          <div className="form-check d-flex align-items-center gap-1">
            <input
              type="checkbox"
              className="form-check-input"
              checked={!quiz?.published}
              readOnly
            />
            <label className="form-check-label">Not Published</label>
          </div>
          <button className="btn btn-light border p-1">⋮</button>
        </div>
      </div>
  
      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <a className="nav-link active">Details</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-danger">Questions</a>
        </li>
      </ul>
  
      {/* Quiz Title */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Unnamed Quiz"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>
  
      {/* Rich Text Editor */}
      <div className="mb-4">
        <div className="bg-light border rounded-top p-2">
          <div className="d-flex gap-2">
            <div className="d-flex gap-2 align-items-center">
              <select className="form-select form-select-sm" style={{ width: "70px" }}>
                <option>12pt</option>
              </select>
              <select className="form-select form-select-sm" style={{ width: "120px" }}>
                <option>Paragraph</option>
              </select>
              <div className="btn-group">
                <button className="btn btn-light btn-sm border">B</button>
                <button className="btn btn-light btn-sm border">I</button>
                <button className="btn btn-light btn-sm border">U</button>
              </div>
              <button className="btn btn-light btn-sm border">A̸</button>
              <button className="btn btn-light btn-sm border">≡</button>
            </div>
          </div>
        </div>
        <div className="border rounded-bottom p-2">
          <textarea
            className="form-control border-0"
            rows={4}
            placeholder="Quiz Instructions"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <div className="d-flex justify-content-between align-items-center border-top mt-2 pt-2">
            <span className="text-muted">p</span>
            <div className="d-flex align-items-center gap-2">
              <span className="text-danger">0 words</span>
              <button className="btn btn-light btn-sm border">&lt;/&gt;</button>
              <button className="btn btn-light btn-sm border">≡</button>
            </div>
          </div>
        </div>
      </div>
  
      {/* Quiz Type */}
      <div className="mb-3">
        <label className="d-block mb-1">Quiz Type</label>
        <select
          className="form-select"
          name="quizType"
          value={formData.quizType}
          onChange={handleInputChange}
        >
          <option value="GRADED_QUIZ">Graded Quiz</option>
          <option value="PRACTICE_QUIZ">Practice Quiz</option>
          <option value="GRADED_SURVEY">Graded Survey</option>
          <option value="UNGRADED_SURVEY">Ungraded Survey</option>
        </select>
      </div>
  
      {/* Assignment Group */}
      <div className="mb-4">
        <label className="d-block mb-1">Assignment Group</label>
        <select
          className="form-select"
          name="assignmentGroup"
          value={formData.assignmentGroup}
          onChange={handleInputChange}
        >
          <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          <option value="QUIZZES">QUIZZES</option>
          <option value="EXAMS">EXAMS</option>
          <option value="PROJECT">PROJECT</option>
        </select>
      </div>
  
      {/* Options */}
      <div className="mb-4">
        <h6 className="mb-3">Options</h6>
        <div className="ps-4">
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="shuffleAnswers"
              name="shuffleAnswers"
              checked={formData.shuffleAnswers}
              onChange={(e) => setFormData(prev => ({ ...prev, shuffleAnswers: e.target.checked }))}
            />
            <label className="form-check-label" htmlFor="shuffleAnswers">
              Shuffle Answers
            </label>
          </div>
  
          <div className="mb-3">
            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="timeLimit"
                checked={showTimeLimit}
                onChange={(e) => {
                  setShowTimeLimit(e.target.checked);
                  if (!e.target.checked) {
                    setFormData(prev => ({
                      ...prev,
                      timeLimit: 0
                    }));
                  }
                }}
              />
              <label className="form-check-label" htmlFor="timeLimit">
                Time Limit
              </label>
            </div>
            {showTimeLimit && (
              <div className="ps-4 d-flex align-items-center gap-2">
                <input
                  type="number"
                  className="form-control"
                  style={{ width: "100px" }}
                  value={formData.timeLimit}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    timeLimit: parseInt(e.target.value) || 0
                  }))}
                />
                <span>Minutes</span>
              </div>
            )}
          </div>
  
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="multipleAttempts"
              name="multipleAttempts"
              checked={formData.multipleAttempts}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                multipleAttempts: e.target.checked 
              }))}
            />
            <label className="form-check-label" htmlFor="multipleAttempts">
              Allow Multiple Attempts
            </label>
            {formData.multipleAttempts && (
              <div className="ps-4 mt-2">
                <input
                  type="number"
                  className="form-control"
                  style={{ width: "100px" }}
                  value={formData.numberOfAttempts}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    numberOfAttempts: parseInt(e.target.value) || 1 
                  }))}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="form-check mb-3">
      <input
        type="checkbox"
        className="form-check-input"
        id="showCorrectAnswers"
        name="showCorrectAnswers"
        checked={formData.showCorrectAnswers}
        onChange={(e) => setFormData(prev => ({ 
          ...prev, 
          showCorrectAnswers: e.target.checked 
        }))}
      />
      <label className="form-check-label" htmlFor="showCorrectAnswers">
        Show Correct Answers
      </label>
    </div>

    <div className="mb-3">
      <label className="form-label">Access Code</label>
      <input
        type="text"
        className="form-control"
        name="accessCode"
        value={formData.accessCode}
        onChange={handleInputChange}
        placeholder="Optional"
      />
    </div>

  <div className="form-check mb-3">
    <input
      type="checkbox"
      className="form-check-input"
      id="oneQuestionAtTime"
      name="oneQuestionAtTime"
      checked={formData.oneQuestionAtTime}
      onChange={(e) => setFormData(prev => ({ 
        ...prev, 
        oneQuestionAtTime: e.target.checked 
      }))}
    />
    <label className="form-check-label" htmlFor="oneQuestionAtTime">
      One Question at a Time
    </label>
  </div>

  <div className="form-check mb-3">
    <input
      type="checkbox"
      className="form-check-input"
      id="webcamRequired"
      name="webcamRequired"
      checked={formData.webcamRequired}
      onChange={(e) => setFormData(prev => ({ 
        ...prev, 
        webcamRequired: e.target.checked 
      }))}
    />
    <label className="form-check-label" htmlFor="webcamRequired">
      Webcam Required
    </label>
  </div>

  <div className="form-check mb-3">
    <input
      type="checkbox"
      className="form-check-input"
      id="lockQuestions"
      name="lockQuestionsAfterAnswering"
      checked={formData.lockQuestionsAfterAnswering}
      onChange={(e) => setFormData(prev => ({ 
        ...prev, 
        lockQuestionsAfterAnswering: e.target.checked 
      }))}
    />
    <label className="form-check-label" htmlFor="lockQuestions">
      Lock Questions After Answering
    </label>
  </div>
  
      {/* Assign Section */}
      <div className="mb-4">
        <h6 className="mb-3">Assign</h6>
        <div className="border rounded p-3">
          <div className="mb-3">
            <label className="d-block mb-1">Assign to</label>
            <div className="position-relative">
              <input 
                type="text" 
                className="form-control" 
                value="Everyone" 
                readOnly 
              />
              <button className="btn position-absolute top-50 end-0 translate-middle-y me-2">
                ×
              </button>
            </div>
          </div>
  
          <div className="mb-3">
            <label className="d-block mb-1">Due</label>
            <input
              type="datetime-local"
              className="form-control"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
            />
          </div>
  
          <div className="row g-3">
            <div className="col-md-6">
              <label className="d-block mb-1">Available from</label>
              <input
                type="datetime-local"
                className="form-control"
                name="availableFromDate"
                value={formData.availableFromDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label className="d-block mb-1">Until</label>
              <input
                type="datetime-local"
                className="form-control"
                name="availableUntilDate"
                value={formData.availableUntilDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
  
          <button className="btn btn-link mt-3">+ Add</button>
        </div>
      </div>
  
      {/* Footer Buttons */}
      <div className="d-flex justify-content-center gap-2">
        <button 
          className="btn btn-light" 
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
        >
          Cancel
        </button>
        <button 
          className="btn btn-primary" 
          onClick={handleSubmit}
        >
          Save
        </button>
        <button 
          className="btn btn-success"
          onClick={() => {
            setFormData(prev => ({ ...prev, published: true }));
            handleSubmit();
          }}
        >
          Save & Publish
        </button>
      </div>
    </div>
  );
}