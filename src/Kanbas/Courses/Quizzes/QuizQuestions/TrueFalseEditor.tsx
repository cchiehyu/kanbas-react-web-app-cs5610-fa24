// TrueFalseEditor.tsx
import React, { useState } from 'react';
import { QuizQuestionForm } from './questionTypes';

export default function TrueFalseEditor({ questionId, onClose }: { questionId?: string; onClose: () => void }) {
  const [correctAnswer, setCorrectAnswer] = useState<boolean>(true);

  return (
    <div>
      <div className="mb-4">
        <p className="text-secondary mb-2">Enter your question text, then select if True or False is the correct answer.</p>
        
        <div className="border rounded">
          <div className="bg-light border-bottom p-2">
            <div className="d-flex gap-2">
              <select className="form-select form-select-sm" style={{ width: '70px' }}>
                <option>12pt</option>
              </select>
              <select className="form-select form-select-sm" style={{ width: '120px' }}>
                <option>Paragraph</option>
              </select>
              <div className="btn-group">
                <button className="btn btn-light btn-sm border">B</button>
                <button className="btn btn-light btn-sm border">I</button>
                <button className="btn btn-light btn-sm border">U</button>
              </div>
            </div>
          </div>
          
          <div className="p-3">
            <textarea 
              className="form-control border-0"
              placeholder="Question"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h6>Answers:</h6>
        <div className="ms-2">
          <div className="form-check mb-2">
            <input
              type="radio"
              className="form-check-input"
              name="trueFalse"
              checked={correctAnswer === true}
              onChange={() => setCorrectAnswer(true)}
            />
            <label className="form-check-label">True</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="trueFalse"
              checked={correctAnswer === false}
              onChange={() => setCorrectAnswer(false)}
            />
            <label className="form-check-label">False</label>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-start gap-2">
        <button className="btn btn-light" onClick={onClose}>Cancel</button>
        <button className="btn btn-danger">Update Question</button>
      </div>
    </div>
  );
}